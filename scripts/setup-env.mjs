#!/usr/bin/env node
/**
 * Interactive helper to generate .env.local from .env.local.example
 * without committing secrets to git.
 */

import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { createInterface } from 'readline/promises'
import { stdin as input, stdout as output } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')
const repoRoot = resolve(__dirname, '..')

const EXAMPLE_FILE = resolve(repoRoot, '.env.local.example')
const TARGET_FILE = resolve(repoRoot, '.env.local')

function parseEnv(content) {
  const map = {}
  content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const idx = line.indexOf('=')
      if (idx === -1) return
      const key = line.slice(0, idx).trim()
      const value = line.slice(idx + 1).trim()
      map[key] = value
    })
  return map
}

async function main() {
  if (!existsSync(EXAMPLE_FILE)) {
    console.error('Missing .env.local.example. Please restore it before running this script.')
    process.exit(1)
  }

  const exampleContent = await readFile(EXAMPLE_FILE, 'utf8')
  const exampleLines = exampleContent.split(/\r?\n/)
  const existing = existsSync(TARGET_FILE)
    ? parseEnv(await readFile(TARGET_FILE, 'utf8'))
    : {}

  console.log('This helper will write .env.local based on .env.local.example.\n')
  if (Object.keys(existing).length) {
    console.log('Existing .env.local found — values shown in brackets will be reused if left blank.\n')
  }

  const rl = createInterface({ input, output })
  const outputLines = []

  for (const rawLine of exampleLines) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) {
      outputLines.push(rawLine)
      continue
    }

    const idx = rawLine.indexOf('=')
    if (idx === -1) {
      outputLines.push(rawLine)
      continue
    }

    const key = rawLine.slice(0, idx).trim()
    const templateValue = rawLine.slice(idx + 1).trim()
    const defaultValue =
      existing[key] ??
      process.env[key] ??
      (templateValue.startsWith('${') ? '' : templateValue.replace(/^your-[^=]+$/, ''))

    const question =
      defaultValue && defaultValue.length
        ? `${key} [${defaultValue}]: `
        : `${key}: `

    let value = (await rl.question(question)).trim()
    if (!value) value = defaultValue ?? ''

    outputLines.push(`${key}=${value}`)
  }

  await rl.close()
  await writeFile(TARGET_FILE, outputLines.join('\n'), 'utf8')
  console.log(`\nWrote ${TARGET_FILE}. Remember this file stays local and is ignored by git.`)
}

main().catch((err) => {
  console.error('Failed to setup .env.local:', err)
  process.exit(1)
})
