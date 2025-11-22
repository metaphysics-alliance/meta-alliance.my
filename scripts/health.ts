import fs from 'fs';
import path from 'path';

const HEALTH_DIR = path.resolve(process.cwd(), 'scripts/health');

export function ensureHealthDir() {
  if (!fs.existsSync(HEALTH_DIR)) {
    fs.mkdirSync(HEALTH_DIR, { recursive: true });
  }
}

export function updateHealth(name: string, meta: Record<string, unknown> = {}) {
  ensureHealthDir();
  const file = path.join(HEALTH_DIR, `${name}.json`);
  fs.writeFileSync(
    file,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        name,
        ...meta
      },
      null,
      2
    )
  );
}

export type HealthRecord = ReturnType<typeof updateHealth>;

export function readHealth(name: string): HealthRecord | null {
  try {
    const file = path.join(HEALTH_DIR, `${name}.json`);
    if (!fs.existsSync(file)) return null;
    const content = fs.readFileSync(file, 'utf-8');
    return JSON.parse(content) as HealthRecord;
  } catch {
    return null;
  }
}
