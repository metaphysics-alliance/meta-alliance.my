import { spawn, ChildProcess } from 'child_process';
import path from 'path';

interface AgentConfig {
    name: string;
    script: string;
    color: string;
}

const agents: AgentConfig[] = [
    { name: '🧠 Brain', script: 'scripts/brain-monitor.ts', color: '\x1b[35m' }, // Magenta
    { name: '🛡️ DB Admin', script: 'scripts/db-admin-autopilot.ts', color: '\x1b[34m' }, // Blue
    { name: '📋 Workflow', script: 'scripts/workflow-autopilot.ts', color: '\x1b[36m' }, // Cyan
    { name: '🎨 UI', script: 'scripts/ui-autopilot.ts', color: '\x1b[32m' }, // Green
    { name: '🖌️ Designer', script: 'scripts/designer-autopilot.ts', color: '\x1b[33m' }, // Yellow
    { name: '🧪 QA', script: 'scripts/qa-autopilot.ts', color: '\x1b[31m' }, // Red
];

const processes: ChildProcess[] = [];

console.log('\x1b[1m\x1b[32m🚀 STARTING META ALLIANCE MVP SWARM 🚀\x1b[0m');
console.log('==================================================');

agents.forEach(agent => {
    console.log(`${agent.color}[Swarm] Spawning ${agent.name} Agent...\x1b[0m`);

    // Use ts-node to run the scripts
    const child = spawn('npx', ['ts-node', agent.script], {
        cwd: process.cwd(),
        env: { ...process.env, FORCE_COLOR: '1' }, // Force color output
        shell: true,
        stdio: ['ignore', 'pipe', 'pipe']
    });

    processes.push(child);

    child.stdout?.on('data', (data) => {
        const lines = data.toString().split('\n');
        lines.forEach((line: string) => {
            if (line.trim()) {
                console.log(`${agent.color}[${agent.name}] ${line}\x1b[0m`);
            }
        });
    });

    child.stderr?.on('data', (data) => {
        const lines = data.toString().split('\n');
        lines.forEach((line: string) => {
            if (line.trim()) {
                console.error(`${agent.color}[${agent.name} ERROR] ${line}\x1b[0m`);
            }
        });
    });

    child.on('close', (code) => {
        console.log(`${agent.color}[${agent.name}] Process exited with code ${code}\x1b[0m`);
    });
});

console.log('==================================================');
console.log('🤖 MVP Agents Active and Watching for Tickets');
console.log('Press Ctrl+C to stop the swarm.');

// Handle shutdown
process.on('SIGINT', () => {
    console.log('\n\x1b[31m🛑 Stopping Swarm...\x1b[0m');
    processes.forEach(p => p.kill());
    process.exit();
});
