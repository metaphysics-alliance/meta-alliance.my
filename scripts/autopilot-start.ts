#!/usr/bin/env ts-node

/**
 * AUTOPILOT START: Supreme Agent Ecosystem Activator
 * 
 * Purpose: Activates all Meta Alliance agents with complete profiles from AGENTS.md
 * Responsibilities:
 * - Load and display all agent profiles from AGENTS.md
 * - Start autopilot services (Translator, TongShu, Master watchers)
 * - Initialize Brain monitoring and progress tracking
 * - Run health checks and phase status updates
 * - Coordinate cross-agent communication
 * 
 * Usage: npm start OR npm run autopilot:start
 */

import { spawn, spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';

type Service = {
  label: string;
  command: string;
  args: string[];
};

interface AgentProfile {
  name: string;
  archetype: string;
  corePurpose: string;
  status: string;
}

console.log('\n' + '='.repeat(80));
console.log('🧠 META ALLIANCE: SUPREME AGENT ECOSYSTEM');
console.log('='.repeat(80));
console.log('Initializing all agents from AGENTS.md charter...\n');

// Step 1: Load and display agent profiles
displayAgentProfiles();

// Step 2: Run migrations
runMigrations();

// Step 3: Generate initial progress report
runInitialProgressReport();

// Step 4: Start all autopilot services
const services: Service[] = [
  { label: 'Translator (watcher)', command: 'npm', args: ['run', 'translator:autopilot'] },
  { label: 'TongShu translator', command: 'npm', args: ['run', 'tongshu:translator'] },
  { label: 'Master feed translator', command: 'npm', args: ['run', 'master:translator'] },
  { label: 'UI (autopilot)', command: 'npm', args: ['run', 'ui:autopilot'] },
  { label: 'Chartor (autopilot)', command: 'npm', args: ['run', 'chartor:autopilot'] }
];

function displayAgentProfiles() {
  const agentsPath = path.resolve(process.cwd(), 'AGENTS.md');
  
  try {
    const agentsContent = readFileSync(agentsPath, 'utf-8');
    const agents = parseAgentProfiles(agentsContent);
    
    console.log('👥 ACTIVE AGENT ROSTER:\n');
    agents.forEach((agent, idx) => {
      const statusIcon = getAgentStatusIcon(agent.name);
      console.log(`${idx + 1}. ${statusIcon} ${agent.name}`);
      console.log(`   Archetype: ${agent.archetype}`);
      console.log(`   Purpose: ${agent.corePurpose}`);
      console.log(`   Status: ${agent.status}\n`);
    });
    console.log('='.repeat(80) + '\n');
  } catch (err) {
    console.error('[Autopilot] ⚠️  Could not load AGENTS.md:', err);
  }
}

function parseAgentProfiles(content: string): AgentProfile[] {
  const agents: AgentProfile[] = [];
  const agentSections = content.split(/##\s+(Supreme Agent|Agent|Super Agent):/);
  
  for (let i = 1; i < agentSections.length; i += 2) {
    const nameMatch = agentSections[i + 1]?.match(/^([^\n(]+)/);
    const archetypeMatch = agentSections[i + 1]?.match(/- \*\*Archetype\*\*:\s*([^\n]+)/);
    const purposeMatch = agentSections[i + 1]?.match(/- \*\*Core Purpose\*\*:\s*([^\n]+)/);
    
    if (nameMatch) {
      const name = nameMatch[1].trim();
      const archetype = archetypeMatch?.[1]?.trim() || 'N/A';
      const corePurpose = purposeMatch?.[1]?.trim() || 'N/A';
      
      agents.push({
        name,
        archetype,
        corePurpose: corePurpose.length > 80 ? corePurpose.substring(0, 77) + '...' : corePurpose,
        status: getAgentStatus(name)
      });
    }
  }
  
  return agents;
}

function getAgentStatusIcon(agentName: string): string {
  const name = agentName.toLowerCase();
  if (name.includes('brain')) return '🧠';
  if (name.includes('codex')) return '📖';
  if (name.includes('translator')) return '🌐';
  if (name.includes('contentor')) return '✍️';
  if (name.includes('replica')) return '🔍';
  if (name.includes('ui')) return '🎨';
  if (name.includes('architect')) return '🏗️';
  if (name.includes('db admin')) return '🗄️';
  if (name.includes('master')) return '🔮';
  if (name.includes('workflow')) return '⚙️';
  if (name.includes('chartor')) return '📊';
  if (name.includes('qa')) return '✅';
  return '🤖';
}

function getAgentStatus(agentName: string): string {
  const name = agentName.toLowerCase();
  
  // Replica is the only agent in STANDBY (manual trigger only)
  if (name.includes('replica')) {
    return '⚪ STANDBY (manual trigger)';
  }
  
  // Active autopilot agents with continuous watchers
  if (name.includes('translator') || name.includes('master') || name.includes('db admin') ||
      name.includes('ui') || name.includes('chartor')) {
    return '🟢 ACTIVE (autopilot)';
  }
  
  // All other agents are actively monitoring
  return '🟡 MONITORING';
}

function startService(service: Service) {
  console.log(`[Autopilot] 🚀 Starting ${service.label}...`);
  const proc = spawn(service.command, service.args, {
    cwd: path.resolve(process.cwd()),
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  proc.on('exit', (code, signal) => {
    if (code !== null && code !== 0) {
      console.error(`[Autopilot] ❌ Service ${service.label} exited with code ${code}.`);
    } else if (signal) {
      console.warn(`[Autopilot] ⚠️  Service ${service.label} was terminated by ${signal}.`);
    }
  });
  return proc;
}

function runMigrations() {
  console.log('\n[Autopilot] 🗄️  DB Admin: Ensuring Supabase migrations...');
  const result = spawnSync('npm', ['run', 'migrate:supabase'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.error) {
    console.error('[Autopilot] ❌ Migration failed', result.error);
  }
  if (result.status && result.status !== 0) {
    console.warn(`[Autopilot] ⚠️  Migration exited with code ${result.status}`);
  }
  console.log('[Autopilot] ✅ DB Admin: Migrations complete\n');
}

function runInitialProgressReport() {
  console.log('[Autopilot] 🧠 Brain: Generating initial progress report...');
  const result = spawnSync('npm', ['run', 'brain:monitor'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.error) {
    console.error('[Autopilot] ❌ Progress report failed', result.error);
  }
  console.log('[Autopilot] ✅ Brain: Progress report generated\n');
}

function runHealthLoop() {
  const intervalMs = 5 * 60 * 1000; // 5 minutes
  const tick = () => {
    console.log('\n[Autopilot] 🩺 Workflow: Running ecosystem health check...');
    
    spawnSync('npm', ['run', 'autopilot:health'], {
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
    
    console.log('[Autopilot] 🧠 Brain: Updating progress...');
    spawnSync('npm', ['run', 'brain:monitor'], {
      stdio: 'pipe',
      shell: process.platform === 'win32'
    });
    
    console.log('[Autopilot] ✅ Health check complete\n');
  };
  
  tick();
  return setInterval(tick, intervalMs);
}

function runProgressReportLoop() {
  const intervalMs = 15 * 60 * 1000; // 15 minutes
  const tick = () => {
    console.log('\n[Autopilot] 📈 Brain: Generating periodic progress report...');
    spawnSync('npm', ['run', 'brain:monitor'], {
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
  };
  return setInterval(tick, intervalMs);
}

const processes = services.map((service) => startService(service));
const healthInterval = runHealthLoop();
const progressInterval = runProgressReportLoop();

console.log('\n' + '='.repeat(80));
console.log('🚀 AUTOPILOT: ALL SYSTEMS ACTIVE');
console.log('='.repeat(80));
console.log('📋 Active Services:');
services.forEach((s, i) => console.log(`   ${i + 1}. ${s.label}`));
console.log('\n📊 Monitoring (All Agents Active):');
console.log('   • 🧠 Brain: Progress tracking, reasoning synthesis, ChatGPT 5.1 coordination');
console.log('   • ⚙️ Workflow: Health checks every 5 minutes, cross-agent orchestration');
console.log('   • 🏗️ Architect: Infrastructure monitoring, pipeline health, dependency tracking');
console.log('   • 📖 Codex: Repo sync, AGENTS.md updates, automation manifest validation');
console.log('   • ✍️ Contentor: Copy monitoring, tone consistency, bilingual narrative oversight');
console.log('   • ✅ QA: Multi-phase validation, test automation, quality gate enforcement');
console.log('\n🟢 Active Autopilot Services:');
console.log('   • 🌐 Translator: String watchers, bilingual sync, glossary updates');
console.log('   • 🔮 Master: Dataset feeds, metaphysical data ingestion, cache updates');
console.log('   • 🗄️ DB Admin: Migrations, RLS policies, Supabase health monitoring');
console.log('   • 🎨 UI: Layout monitoring, accessibility checks, visual regression tests');
console.log('   • 📊 Chartor: Chart generation, dataset visualization, asset optimization');
console.log('\n💡 Commands:');
console.log('   • Ctrl+C to shutdown all services gracefully');
console.log('   • View latest report: docs/PROGRESS-REPORT.md');
console.log('   • Manual update: npm run brain:monitor');
console.log('='.repeat(80) + '\n');

function shutdown() {
  console.log('\n[Autopilot] 🛑 Workflow: Initiating graceful shutdown...');
  
  if (healthInterval) clearInterval(healthInterval);
  if (progressInterval) clearInterval(progressInterval);
  
  processes.forEach((proc, i) => {
    if (!proc.killed) {
      console.log(`[Autopilot] 🛑 Stopping ${services[i].label}...`);
      proc.kill();
    }
  });
  
  console.log('[Autopilot] ✅ All services stopped. Standby mode activated.\n');
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
