#!/usr/bin/env ts-node

/**
 * MASTER AUTOPILOT
 *
 * Supreme Agent: Master (Grand Metaphysics Guru)
 *
 * Responsibilities:
 * - Keep TongShu cache warm (tongshu_snapshots)
 * - Run master feed translator (BaZi / ZiWei / QiMen records)
 * - Emit health heartbeats under scripts/health/master-autopilot.json
 *
 * Usage: npm run master:autopilot
 */

import { config } from 'dotenv'
import { spawn, spawnSync, ChildProcess } from 'child_process'
import path from 'path'
import { updateHealth } from './health.ts'

config({ path: '.env.local' })
config()

type Service = {
  label: string
  command: string
  args: string[]
}

function startService(service: Service): ChildProcess {
  console.log(`[Master Autopilot] 🔁 Starting ${service.label}...`)
  const proc = spawn(service.command, service.args, {
    cwd: path.resolve(process.cwd()),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  proc.on('exit', (code, signal) => {
    console.log(
      `[Master Autopilot] ⚠️ Service ${service.label} exited (code=${code}, signal=${signal})`,
    )
  })
  return proc
}

function runTongshuCacheOnce() {
  console.log('[Master Autopilot] 📅 Caching today’s TongShu snapshot...')
  const result = spawnSync('npm', ['run', 'tongshu:cache'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  if (result.error) {
    console.error('[Master Autopilot] ❌ TongShu cache run failed:', result.error)
  } else {
    console.log('[Master Autopilot] ✅ TongShu cache completed (see scripts/health/tongshu-cache.json)')
  }
}

async function main() {
  console.log('\n' + '═'.repeat(72))
  console.log('🧙 MASTER AUTOPILOT – METAPHYSICS DATA ORCHESTRATOR')
  console.log('═'.repeat(72) + '\n')

  // One-time TongShu cache on startup
  runTongshuCacheOnce()

  // Start long-running Master-related services
  const services: Service[] = [
    {
      label: 'TongShu translator (realtime)',
      command: 'npm',
      args: ['run', 'tongshu:translator'],
    },
    {
      label: 'Master feed translator (BaZi/ZiWei/QiMen)',
      command: 'npm',
      args: ['run', 'master:translator'],
    },
  ]

  const processes: ChildProcess[] = services.map((s) => startService(s))

  // Heartbeat: update master-autopilot health every 5 minutes
  const heartbeatMs = 5 * 60 * 1000
  const heartbeat = () => {
    updateHealth('master-autopilot', {
      status: 'running',
      services: services.map((s) => s.label),
      pids: processes.map((p) => p.pid),
    })
    console.log('[Master Autopilot] 💓 Heartbeat written to scripts/health/master-autopilot.json')
  }

  heartbeat()
  const hbInterval = setInterval(heartbeat, heartbeatMs)

  function shutdown() {
    console.log('\n[Master Autopilot] 📴 Shutting down Master services...')
    clearInterval(hbInterval)
    processes.forEach((proc, idx) => {
      if (!proc.killed) {
        console.log(`[Master Autopilot] 🛑 Stopping ${services[idx].label}...`)
        proc.kill()
      }
    })
    updateHealth('master-autopilot', {
      status: 'stopped',
      stoppedAt: new Date().toISOString(),
    })
    console.log('[Master Autopilot] ✅ All Master services stopped.\n')
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

main().catch((err) => {
  console.error('[Master Autopilot] Fatal error:', err)
  process.exit(1)
})

