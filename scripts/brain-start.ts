#!/usr/bin/env ts-node

/**
 * BRAIN AGENT: Supreme Command Center
 * 
 * Purpose: Unified command center that activates all autopilot services + monitoring
 * Responsibilities:
 * - Start all autopilot services (translators, watchers)
 * - Initialize Brain monitoring system
 * - Run initial progress report
 * - Monitor health of all services
 * - Coordinate agent ecosystem
 * 
 * Usage: npm run brain:start
 */

import { spawn, spawnSync } from 'child_process';
import path from 'path';

type Service = {
  label: string;
  command: string;
  args: string[];
};

console.log('\n' + '='.repeat(70));
console.log('🧠 BRAIN AGENT: SUPREME COMMAND CENTER');
console.log('='.repeat(70));
console.log('Initializing Meta Alliance Agent Ecosystem...\n');

// Step 1: Run migrations
runMigrations();

// Step 2: Generate initial progress report
runInitialProgressReport();

// Step 3: Start all autopilot services
const services: Service[] = [
  { label: 'Translator (watcher)', command: 'npm', args: ['run', 'translator:autopilot'] },
  { label: 'TongShu translator', command: 'npm', args: ['run', 'tongshu:translator'] },
  { label: 'Master feed translator', command: 'npm', args: ['run', 'master:translator'] }
];

function startService(service: Service) {
  console.log(`[Brain] 🚀 Starting ${service.label}...`);
  const proc = spawn(service.command, service.args, {
    cwd: path.resolve(process.cwd()),
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  proc.on('exit', (code, signal) => {
    if (code !== null && code !== 0) {
      console.error(`[Brain] ❌ Service ${service.label} exited with code ${code}.`);
    } else if (signal) {
      console.warn(`[Brain] ⚠️  Service ${service.label} was terminated by ${signal}.`);
    }
  });
  return proc;
}

function runMigrations() {
  console.log('[Brain] 📦 Ensuring Supabase migrations...');
  const result = spawnSync('npm', ['run', 'migrate:supabase'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.error) {
    console.error('[Brain] ❌ Migration failed', result.error);
  }
  if (result.status && result.status !== 0) {
    console.warn(`[Brain] ⚠️  Migration exited with code ${result.status}`);
  }
  console.log('[Brain] ✅ Migrations complete\n');
}

function runInitialProgressReport() {
  console.log('[Brain] 📊 Generating initial progress report...');
  const result = spawnSync('npm', ['run', 'brain:monitor'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.error) {
    console.error('[Brain] ❌ Progress report failed', result.error);
  }
  console.log('\n[Brain] ✅ Progress report generated\n');
}

function runHealthLoop() {
  const intervalMs = 5 * 60 * 1000; // 5 minutes
  const tick = () => {
    console.log('\n[Brain] 🩺 Running ecosystem health check...');
    
    // Run autopilot health check
    spawnSync('npm', ['run', 'autopilot:health'], {
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
    
    // Run Brain monitoring update
    console.log('[Brain] 📊 Updating progress report...');
    spawnSync('npm', ['run', 'brain:monitor'], {
      stdio: 'pipe', // Suppress output to reduce noise
      shell: process.platform === 'win32'
    });
    
    console.log('[Brain] ✅ Health check complete\n');
  };
  
  // Run initial health check
  tick();
  
  // Schedule periodic checks
  return setInterval(tick, intervalMs);
}

function runProgressReportLoop() {
  const intervalMs = 15 * 60 * 1000; // 15 minutes
  const tick = () => {
    console.log('\n[Brain] 📈 Generating periodic progress report...');
    spawnSync('npm', ['run', 'brain:monitor'], {
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
  };
  return setInterval(tick, intervalMs);
}

// Start all services
const processes = services.map((service) => startService(service));
const healthInterval = runHealthLoop();
const progressInterval = runProgressReportLoop();

console.log('\n' + '='.repeat(70));
console.log('🧠 BRAIN AGENT: ECOSYSTEM ACTIVE');
console.log('='.repeat(70));
console.log('📋 Active Services:');
services.forEach((s, i) => console.log(`   ${i + 1}. ${s.label}`));
console.log('\n📊 Monitoring:');
console.log('   • Health checks every 5 minutes');
console.log('   • Progress reports every 15 minutes');
console.log('   • Real-time agent coordination');
console.log('\n💡 Commands:');
console.log('   • Ctrl+C to shutdown all services gracefully');
console.log('   • View latest report: docs/PROGRESS-REPORT.md');
console.log('='.repeat(70) + '\n');

function shutdown() {
  console.log('\n[Brain] 🛑 Initiating graceful shutdown...');
  
  if (healthInterval) clearInterval(healthInterval);
  if (progressInterval) clearInterval(progressInterval);
  
  processes.forEach((proc, i) => {
    if (!proc.killed) {
      console.log(`[Brain] 🛑 Stopping ${services[i].label}...`);
      proc.kill();
    }
  });
  
  console.log('[Brain] ✅ All services stopped. Goodbye!\n');
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
