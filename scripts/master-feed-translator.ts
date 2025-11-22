import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { updateHealth } from './health.ts';

config({ path: '.env.local' });
config();

type FeedConfig = { table: string; key: string };

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const FEED_CONFIG = process.env.MASTER_TRANSLATOR_FEEDS;

const DEFAULT_FEEDS: FeedConfig[] = [
  { table: 'bazi_records', key: 'id' },
  { table: 'ziwei_records', key: 'id' },
  { table: 'qimen_records', key: 'id' }
];

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase credentials for master feed translator.');
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const feeds: FeedConfig[] = (() => {
  if (!FEED_CONFIG) return DEFAULT_FEEDS;
  try {
    const parsed = JSON.parse(FEED_CONFIG);
    if (Array.isArray(parsed) && parsed.every((item) => item.table && item.key)) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_FEEDS;
})();

const runOnce = process.argv.includes('--once');
let heartbeatInterval: NodeJS.Timeout | null = null;
let realtimeChannel: ReturnType<typeof admin['channel']> | null = null;

function pingHealth(details: Record<string, unknown> = {}) {
  updateHealth('master-translator', {
    status: 'running',
    ...details
  });
}

function extractLocales(row: Record<string, unknown>) {
  const updates: Record<string, unknown> = {};
  let changed = false;
  for (const column of Object.keys(row)) {
    const match = column.match(/^(.*)_(en|cn)$/);
    if (!match) continue;
    const [, base, locale] = match;
    const counterpart = locale === 'en' ? `${base}_cn` : `${base}_en`;
    if (!row[counterpart] && row[column]) {
      updates[counterpart] = row[column];
      changed = true;
    }
  }
  return changed ? updates : null;
}

async function ensureRowBilingual(feed: FeedConfig, row: Record<string, unknown>) {
  const primaryValue = row[feed.key];
  if (!primaryValue) {
    return;
  }
  const updates = extractLocales(row);
  if (!updates) return;
  const { error } = await admin
    .from(feed.table)
    .update(updates)
    .eq(feed.key, primaryValue)
    .select()
    .maybeSingle();
  if (error) {
    console.error(`[Master Translator] Failed to update ${feed.table} row`, error.message);
    return;
  }
  updateHealth('master-translator', {
    table: feed.table,
    key: String(primaryValue),
    status: 'translated'
  });
}

async function reprocessFeed(feed: FeedConfig): Promise<boolean> {
  try {
    const { data, error } = await admin.from(feed.table).select('*');
    if (error) {
      console.warn(`[Master Translator] Unable to load ${feed.table}:`, error.message);
      return !error.message.toLowerCase().includes('could not find');
    }
    if (!data?.length) return false;
    for (const row of data) {
      await ensureRowBilingual(feed, row as Record<string, unknown>);
    }
    updateHealth('master-translator', {
      table: feed.table,
      status: 'scanned'
    });
    return true;
  } catch (err) {
    console.error(`[Master Translator] Error scanning ${feed.table}`, err);
    return false;
  }
}

async function startRealtime(activeFeeds: FeedConfig[]) {
  const channel = admin.channel('public:master-translator');
  realtimeChannel = channel;
  activeFeeds.forEach((feed) =>
    channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: feed.table
      },
      (payload) => {
        const row = payload.new ?? payload.old;
        if (!row) return;
        ensureRowBilingual(feed, row as Record<string, unknown>);
      }
    )
  );
  try {
    await channel.subscribe();
    console.log('[Master Translator] Watching feed tables...');
  } catch (err) {
    console.error('[Master Translator] Realtime subscribe failed', err);
  }
}

process.on('SIGINT', async () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
  }
  if (realtimeChannel) {
    await realtimeChannel.unsubscribe();
  }
  console.log('\n[Master Translator] Stopped.');
  process.exit(0);
});

async function main() {
  if (!feeds.length) {
    console.warn('[Master Translator] No feeds configured.');
    return;
  }
  const activeFeeds: FeedConfig[] = [];
  for (const feed of feeds) {
    if (await reprocessFeed(feed)) {
      activeFeeds.push(feed);
    }
  }
  pingHealth({ activeFeeds: activeFeeds.map((f) => f.table) });
  if (runOnce) {
    return;
  }
  const heartbeatMs = 5 * 60 * 1000;
  heartbeatInterval = setInterval(() => {
    pingHealth({ activeFeeds: activeFeeds.map((f) => f.table) });
  }, heartbeatMs);
  if (activeFeeds.length) {
    await startRealtime(activeFeeds);
  } else {
    console.warn('[Master Translator] No tables available for realtime watch.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
