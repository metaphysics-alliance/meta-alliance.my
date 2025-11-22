import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { GLOBAL_I18N } from '../src/i18n/global.ts';
import { updateHealth } from './health.ts';
type Locale = keyof typeof GLOBAL_I18N;

type TranslatorCache = {
  version: number;
  locales: Record<Locale, string[]>;
  updatedAt: string;
};

const CACHE_PATH = path.resolve(process.cwd(), 'scripts/.translator-cache.json');
const ALERT_LOG_PATH = path.resolve(process.cwd(), 'scripts/translator-alerts.log');
const WATCH_GLOBS = [
  path.resolve(process.cwd(), 'src/i18n'),
  path.resolve(process.cwd(), 'src/pages'),
  path.resolve(process.cwd(), 'src/components'),
  path.resolve(process.cwd(), 'src/styles'),
  path.resolve(process.cwd(), 'Reference Docs'),
  path.resolve(process.cwd(), 'AGENTS.md')
];

const LOCALES = Object.keys(GLOBAL_I18N) as Locale[];

const defaultCache: TranslatorCache = {
  version: 1,
  locales: LOCALES.reduce<Record<Locale, string[]>>((acc, locale) => {
    acc[locale] = [];
    return acc;
  }, {} as Record<Locale, string[]>),
  updatedAt: new Date(0).toISOString()
};

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (value === null || value === undefined) return [];
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return prefix ? [prefix] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenKeys(item, `${prefix}[${index}]`));
  }
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      flattenKeys(child, prefix ? `${prefix}.${key}` : key)
    );
  }
  return [];
}

function buildLocaleKeyMap(): Record<Locale, string[]> {
  return LOCALES.reduce<Record<Locale, string[]>>((acc, locale) => {
    acc[locale] = flattenKeys(GLOBAL_I18N[locale]);
    return acc;
  }, {} as Record<Locale, string[]>);
}

function loadCache(): TranslatorCache {
  if (!fs.existsSync(CACHE_PATH)) return defaultCache;
  try {
    const data = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) as TranslatorCache;
    return {
      version: data.version ?? 1,
      locales: LOCALES.reduce<Record<Locale, string[]>>((acc, locale) => {
        acc[locale] = data.locales?.[locale] ?? [];
        return acc;
      }, {} as Record<Locale, string[]>),
      updatedAt: data.updatedAt ?? new Date(0).toISOString()
    };
  } catch (err) {
    console.warn('[Translator Autopilot] Corrupt cache ignored', err);
    return defaultCache;
  }
}

function persistCache(locals: Record<Locale, string[]>) {
  const payload: TranslatorCache = {
    version: 1,
    locales: locals,
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(CACHE_PATH, JSON.stringify(payload, null, 2));
}

function logAlert(message: string) {
  const timestamped = `[${new Date().toISOString()}] ${message}`;
  console.log(`[Translator Autopilot] ${timestamped}`);
  fs.appendFileSync(ALERT_LOG_PATH, `${timestamped}\n`);
}

let scanTimeout: NodeJS.Timeout | null = null;
let pendingReason = 'initial scan';

function scheduleScan(reason: string) {
  pendingReason = pendingReason ? `${pendingReason}; ${reason}` : reason;
  if (scanTimeout) return;
  scanTimeout = setTimeout(() => {
    scan(pendingReason);
    pendingReason = '';
    scanTimeout = null;
  }, 350);
}

function diffKeys(oldKeys: string[], newKeys: string[]): { added: string[]; removed: string[] } {
  const oldSet = new Set(oldKeys);
  const newSet = new Set(newKeys);
  const added = Array.from(newSet).filter((key) => !oldSet.has(key));
  const removed = Array.from(oldSet).filter((key) => !newSet.has(key));
  return { added, removed };
}

function scan(reason: string) {
  const cache = loadCache();
  const currentKeys = buildLocaleKeyMap();
  const reports = LOCALES.map((locale) => diffKeys(cache.locales[locale], currentKeys[locale]));
  const hasChanges = reports.some((report) => report.added.length || report.removed.length);
  if (hasChanges) {
    const summary = reports
      .map((report, index) => {
        const locale = LOCALES[index];
        const parts: string[] = [];
        if (report.added.length) parts.push(`${report.added.length} new`);
        if (report.removed.length) parts.push(`${report.removed.length} removed`);
        return `${locale}: ${parts.join(', ')}`;
      })
    .join(' | ');
    logAlert(`New strings detected (${reason}) — ${summary}`);
  } else {
    console.log(`[Translator Autopilot] No new strings (${reason})`);
  }
  persistCache(currentKeys);
  updateHealth('translator', {
    reason,
    status: hasChanges ? 'updated' : 'idle'
  });
}

function startWatcher() {
  console.log('[Translator Autopilot] Monitoring copy for translation drift...');
  const watcher = chokidar.watch(WATCH_GLOBS, {
    ignoreInitial: true,
    usePolling: false,
    interval: 200,
    depth: 5,
    awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 }
  });
  watcher.on('all', (event, filePath) => {
    const relative = path.relative(process.cwd(), filePath);
    const reason = `${event} @ ${relative}`;
    scheduleScan(reason);
  });
  watcher.on('error', (error) => {
    console.error('[Translator Autopilot] Watcher error', error);
  });
  process.on('SIGINT', () => {
    watcher.close();
    console.log('\n[Translator Autopilot] Watcher stopped.');
    process.exit(0);
  });
}

function ensureCacheFolder() {
  const dir = path.dirname(CACHE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const runOnce = process.argv.includes('--once');

ensureCacheFolder();
scan('initial run');
if (runOnce) {
  process.exit(0);
}
startWatcher();
