#!/usr/bin/env node

/**
 * MVP Combined Starter
 *
 * Purpose:
 *  - Start MVP Vite dev server (UI) and MVP autopilot ecosystem together.
 *  - Used by 'npm start'.
 */

import { spawn } from 'child_process'
import path from 'path'

const processes = []

function startProcess(label, command, args) {
  console.log(\[mvp-start] ▶ Starting \...\)
  const proc = spawn(command, args, {
    cwd: path.resolve(process.cwd()),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  proc.on('exit', (code, signal) => {
    if (code !== null && code !== 0) {
      console.error(\[mvp-start] ✖ \ exited with code \\)
    } else if (signal) {
      console.warn(\[mvp-start] ⚠ \ was terminated by signal \\)
    } else {
      console.log(\[mvp-start] ✔ \ exited cleanly\)
    }
  })

  processes.push({ label, proc })
  return proc
}

function shutdown() {
  console.log('\n[mvp-start] ⏹ Shutting down MVP dev + autopilot...')
  for (const { label, proc } of processes) {
    if (!proc.killed) {
      console.log(\[mvp-start] ✧ Stopping \...\)
      proc.kill()
    }
  }
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

// Start Vite UI dev server
startProcess('MVP UI (Vite dev)', 'npm', ['run', 'dev'])

// Start autopilot ecosystem
startProcess('MVP Autopilot', 'npm', ['run', 'autopilot:start'])
