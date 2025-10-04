// scripts/inject-vip-i18n.mjs
import fs from 'node:fs'

const filePath = process.argv[2] || 'src/i18n.jsx'
const src = fs.readFileSync(filePath, 'utf8')

function findBlockIndex(code, propName){
  const rx = new RegExp(`\\b${propName}\\s*:\\s*{`)
  const m = rx.exec(code)
  if (!m) return null
  const startObj = m.index + m[0].length - 1 // position at '{'
  let i = startObj, level = 0
  for (; i < code.length; i++){
    const ch = code[i]
    if (ch === '{') level++
    else if (ch === '}'){
      level--
      if (level === 0){
        return { startProp: m.index, startBrace: startObj, endBrace: i }
      }
    }
  }
  return null
}

function hasVip(blockStr){
  return /\bvip\s*:/m.test(blockStr)
}

function insertBeforeBrace(code, braceIndex, insertion){
  // Find if we need a comma before insertion
  let j = braceIndex - 1
  while (j >= 0 && /\s/.test(code[j])) j--
  const needsComma = j >= 0 && code[j] !== '{' && code[j] !== ','
  const prefix = code.slice(0, braceIndex)
  const suffix = code.slice(braceIndex)
  return prefix + (needsComma ? ',\n' : '\n') + insertion + '\n' + suffix
}

const vipEN = `  vip: {
    section_title: 'VIP Holistic Destiny Analysis Service',
    cta: 'Learn More',
    tiers: {
      lite_title: 'Essential Destiny Blueprint',
      pro_title: 'Advanced Destiny Blueprint',
      supreme_title: 'Supreme Destiny Blueprint',
      lite_points: [
        '100+ page destiny report',
        'Talents & potentials, destined industries, earning models',
        '10-year Luck Pillars (Da Yun) analysis',
        'Life numbers (numerology) analysis',
        'Practical remediation advice'
      ],
      pro_points: [
        '200+ page destiny report',
        'Talents & potentials, destined industries, earning models',
        '10-year Luck Pillars (Da Yun) analysis',
        'Life numbers (numerology) analysis',
        'Practical remediation advice',
        'Numeric field analysis',
        'Name auspiciousness analysis'
      ],
      supreme_points: [
        '300+ page destiny report',
        'Talents & potentials, destined industries, earning models',
        '10-year Luck Pillars (Da Yun) analysis',
        'Life numbers (numerology) analysis',
        'Practical remediation advice',
        'Numeric field analysis & change recommendations',
        'Name auspiciousness analysis & change recommendations',
        'Feng Shui evaluation (residential only)'
      ]
    }
  }`

const vipCN = `  vip: {
    section_title: 'VIP 全息命理分析服务',
    cta: '了解更多',
    tiers: {
      lite_title: '命运蓝图·启程版',
      pro_title: '天机剖象·进阶版',
      supreme_title: '乾坤至尊·全息版',
      lite_points: [
        '一百页以上命理报告',
        '天赋潜能，命定行业，赚钱模式',
        '十年大运分析',
        '生命数字分析',
        '改运建议'
      ],
      pro_points: [
        '二百页以上命理报告',
        '天赋潜能，命定行业，赚钱模式',
        '十年大运分析',
        '生命数字分析',
        '改运建议',
        '数字磁场分析',
        '姓名吉凶分析'
      ],
      supreme_points: [
        '三百页以上命理报告',
        '天赋潜能，命定行业，赚钱模式',
        '十年大运分析',
        '生命数字分析',
        '改运建议',
        '数字磁场分析与更换建议',
        '姓名吉凶分析与更换建议',
        '风水评估 (只限于居家评估)'
      ]
    }
  }`

const dictStart = /const\s+dict\s*=\s*{/.exec(src)
if (!dictStart){
  console.error('Could not locate "const dict = {" in', filePath)
  process.exit(1)
}

// Inject EN
const enBlock = findBlockIndex(src, 'EN')
if (!enBlock){
  console.error('Could not locate "EN: { ... }" block in', filePath)
  process.exit(1)
}
let out = src
const enStr = out.slice(enBlock.startBrace, enBlock.endBrace+1)
if (!hasVip(enStr)){
  // Recalculate brace index if string changed
  const enBlock2 = findBlockIndex(out, 'EN')
  out = insertBeforeBrace(out, enBlock2.endBrace, vipEN)
}

// Inject CN
const cnBlock = findBlockIndex(out, 'CN')
if (!cnBlock){
  console.error('Could not locate "CN: { ... }" block in', filePath)
  process.exit(1)
}
const cnStr = out.slice(cnBlock.startBrace, cnBlock.endBrace+1)
if (!hasVip(cnStr)){
  const cnBlock2 = findBlockIndex(out, 'CN')
  out = insertBeforeBrace(out, cnBlock2.endBrace, vipCN)
}

// Backup and write
const backup = filePath + '.bak.vip.' + Date.now()
fs.writeFileSync(backup, src, 'utf8')
fs.writeFileSync(filePath, out, 'utf8')
console.log('VIP i18n injected ✅  (backup at ' + backup + ')')
