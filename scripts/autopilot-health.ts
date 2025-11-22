import path from 'path';
import { readHealth } from './health.ts';

type ServiceHealth = {
  name: string;
  label: string;
  maxAgeMinutes: number;
};

const SERVICES: ServiceHealth[] = [
  { name: 'translator', label: 'Translator strings', maxAgeMinutes: 15 },
  { name: 'tongshu-translator', label: 'TongShu translator', maxAgeMinutes: 30 },
  { name: 'master-translator', label: 'Master feed translator', maxAgeMinutes: 30 },
  { name: 'tongshu-cache', label: 'TongShu cache', maxAgeMinutes: 180 }
];

function formatTimestamp(ts: string) {
  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) return 'invalid';
  return date.toISOString();
}

let failed = false;

SERVICES.forEach((service) => {
  const record = readHealth(service.name);
  if (!record) {
    failed = true;
    console.warn(`[Health] Missing heartbeat for ${service.label} (${service.name}).`);
    return;
  }

  const ageMinutes = (Date.now() - Date.parse(record.timestamp)) / 1000 / 60;
  const status = ageMinutes > service.maxAgeMinutes ? 'STALE' : 'OK';
  if (status === 'STALE') {
    failed = true;
  }
  console.log(
    `[Health] ${service.label}: ${status} (last ping ${formatTimestamp(record.timestamp)}, ${ageMinutes.toFixed(
      1
    )} min ago)`
  );
});

if (failed) {
  process.exit(1);
}
