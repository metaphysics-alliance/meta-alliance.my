#!/usr/bin/env node

/**
 * Agent Log Utility (Tools)
 *
 * Mirrors meta-alliance-mvp/scripts/agent-log.mjs so all agents in Tools
 * can append timestamped entries to CHANGELOG.md and their WORKBOOK.
 */

import fs from 'fs'
import path from 'path'

function nowIsoOffset() {
  const d = new Date()
  const tzOffsetMin = -d.getTimezoneOffset()
  const sign = tzOffsetMin >= 0 ? '+' : '-'
  const pad = (n) => String(Math.abs(n)).padStart(2, '0')
  const hours = pad(Math.floor(Math.abs(tzOffsetMin) / 60))
  const mins = pad(Math.abs(tzOffsetMin) % 60)
  return `${d.toISOString().split('.')[0]}${sign}${hours}:${mins}`
}

function getWorkbookForAgent(agentName) {
  const name = (agentName || '').toLowerCase().replace(/[_-]/g, ' ')
  if (name.includes('brain')) return 'BRAIN_WORKBOOK.md'
  if (name.includes('db admin')) return 'DB_ADMIN_WORKBOOK.md'
  if (name.includes('workflow')) return 'WORKFLOW_WORKBOOK.md'
  if (name.includes('qa')) return 'QA_WORKBOOK.md'
  if (name.includes('ui')) return 'UI_WORKBOOK.md'
  if (name.includes('contentor')) return 'CONTENTOR_WORKBOOK.md'
  if (name.includes('translator')) return 'TRANSLATOR_WORKBOOK.md'
  if (name.includes('architect')) return 'ARCHITECT_WORKBOOK.md'
  if (name.includes('codex')) return 'CODEX_WORKBOOK.md'
  if (name.includes('replica')) return 'REPLICA_WORKBOOK.md'
  if (name.includes('master')) return 'MASTER_WORKBOOK.md'
  if (name.includes('chartor')) return 'CHARTOR_WORKBOOK.md'
  return null
}

function appendToChangelog(agent, scope, summary) {
  const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md')
  if (!fs.existsSync(changelogPath)) {
    return
  }

  const timestamp = nowIsoOffset()
  const workIdSafe = summary
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'AGENT-UPDATE'

  const header = `### MA-${workIdSafe}-${timestamp}\n`
  const body =
    `**Agent Update (${scope || 'Tools'} - ${agent || 'Unknown'})**\n\n` +
    `- ${summary}\n\n` +
    `**Logged At:** ${timestamp}\n\n` +
    `---\n`

  const existing = fs.readFileSync(changelogPath, 'utf-8')
  const updated = `${existing.trim()}\n\n${header}${body}`
  fs.writeFileSync(changelogPath, updated, 'utf-8')
  console.log(`[agent-log] Appended entry to CHANGELOG.md for ${agent}`)
}

function appendToWorkbook(workbookFile, agent, scope, summary) {
  if (!workbookFile) return
  const workbookPath = path.resolve(process.cwd(), workbookFile)
  if (!fs.existsSync(workbookPath)) {
    console.warn(`[agent-log] Workbook not found for ${agent}: ${workbookFile}`)
    return
  }

  const timestamp = nowIsoOffset()
  const header = `\n---\n\n### ${agent} Log Entry - ${timestamp}\n`
  const body =
    `- **Scope**: ${scope || 'Tools'}\n` +
    `- **Summary**: ${summary}\n` +
    `- **Logged At**: ${timestamp}\n`

  const existing = fs.readFileSync(workbookPath, 'utf-8')
  const updated = `${existing.trim()}${header}${body}\n`
  fs.writeFileSync(workbookPath, updated, 'utf-8')
  console.log(`[agent-log] Appended entry to ${workbookFile}`)
}

function main() {
  const args = process.argv.slice(2)
  let agent = null
  let scope = null
  let summary = null
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--agent') agent = args[++i]
    else if (arg === '--scope') scope = args[++i]
    else if (arg === '--summary') summary = args[++i]
  }

  if (!agent || !summary) {
    console.error(
      '[agent-log] Missing required flags. Usage: node scripts/agent-log.mjs --agent "DB Admin" --scope "Tools" --summary "Did X"',
    )
    process.exit(1)
  }

  // Support multiple agents in a single call, comma-separated
  const agentList = String(agent)
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean)

  const agentLabel = agentList.join(', ')

  appendToChangelog(agentLabel, scope, summary)

  for (const name of agentList) {
    const workbookFile = getWorkbookForAgent(name)
    appendToWorkbook(workbookFile, name, scope, summary)
  }
}

main()
