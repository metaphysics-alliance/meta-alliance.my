import { spawnSync } from 'child_process';

const steps: Array<{ label: string; command: string; args: string[] }> = [
  { label: 'TongShu cache', command: 'npm', args: ['run', 'tongshu:cache'] },
  { label: 'TongShu translator check', command: 'npm', args: ['run', 'tongshu:translator:check'] },
  { label: 'Master translator check', command: 'npm', args: ['run', 'master:translator', '--', '--once'] },
  { label: 'Dictionary translator', command: 'npm', args: ['run', 'translator:autopilot:check'] },
  { label: 'Autopilot health', command: 'npm', args: ['run', 'autopilot:health'] }
];

for (const step of steps) {
  console.log(`\n[Autopilot Check] ${step.label}`);
  const result = spawnSync(step.command, step.args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.error) {
    console.error(`[Autopilot Check] ${step.label} failed`, result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`[Autopilot Check] ${step.label} exited with code ${result.status}`);
    process.exit(result.status || 1);
  }
}
