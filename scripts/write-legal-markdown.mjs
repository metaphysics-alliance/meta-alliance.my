#!/usr/bin/env node

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { dictionary } from '../shared/i18n/dictionary.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

const LOCALE_CONFIG = {
  EN: {
    summaryHeading: 'Summary',
    contactHeading: 'Contact Our Support Team',
    contactLabels: {
      name: 'Team',
      email: 'Email',
      phone: 'Phone',
      hours: 'Response Window',
      address: 'Address',
    },
    noteLabel: 'Note',
    lastUpdatedLabel: 'Last Updated',
    legalLabel: 'Legal basis',
    labelSeparator: ':',
    noteSeparator: ':',
    bulletSeparator: ':',
  },
  CN: {
    summaryHeading: '摘要',
    contactHeading: '联系支持团队',
    contactLabels: {
      name: '团队',
      email: '电子邮箱',
      phone: '联系电话',
      hours: '回应时间',
      address: '通信地址',
    },
    noteLabel: '备注',
    lastUpdatedLabel: '最后更新',
    legalLabel: '法律依据',
    labelSeparator: '：',
    noteSeparator: '：',
    bulletSeparator: '：',
  },
}

function toPlain(text = '') {
  if (!text) return ''
  return text
    .replace(/<br\s*\/?\>/gi, '\n')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function joinLabel(label, separator) {
  return `${label}${separator}`
}

function formatSummary(summary = [], locale) {
  if (!Array.isArray(summary) || !summary.length) return ''
  const { summaryHeading, bulletSeparator } = LOCALE_CONFIG[locale]
  const lines = [`## ${summaryHeading}`]
  summary.forEach((item) => {
    const title = toPlain(item?.title)
    const description = toPlain(item?.description)
    if (title && description) {
      lines.push(`- **${joinLabel(title, bulletSeparator)}** ${description}`)
    } else if (description) {
      lines.push(`- ${description}`)
    } else if (title) {
      lines.push(`- **${title}**`)
    }
  })
  lines.push('')
  return lines.join('\n')
}

function formatItems(items = [], locale) {
  if (!Array.isArray(items) || !items.length) return ''
  const { bulletSeparator, legalLabel } = LOCALE_CONFIG[locale]
  const lines = []
  items.forEach((item) => {
    const title = toPlain(item?.title)
    const description = toPlain(item?.description)
    if (title && description) {
      lines.push(`- **${joinLabel(title, bulletSeparator)}** ${description}`)
    } else if (description) {
      lines.push(`- ${description}`)
    } else if (title) {
      lines.push(`- **${title}**`)
    }
    if (Array.isArray(item?.bullets)) {
      item.bullets.forEach((bullet) => {
        const content = toPlain(bullet)
        if (content) {
          lines.push(`  - ${content}`)
        }
      })
    }
    if (item?.legal) {
      lines.push(`  - ${joinLabel(legalLabel, bulletSeparator)} ${toPlain(item.legal)}`)
    }
  })
  lines.push('')
  return lines.join('\n')
}

function formatColumns(columns = [], locale) {
  if (!Array.isArray(columns) || !columns.length) return ''
  const lines = []
  columns.forEach((column) => {
    const title = toPlain(column?.title)
    if (title) {
      lines.push(`### ${title}`)
    }
    if (Array.isArray(column?.points)) {
      column.points.forEach((point) => {
        const content = toPlain(point)
        if (content) {
          lines.push(`- ${content}`)
        }
      })
    }
    lines.push('')
  })
  return lines.join('\n')
}

function formatSection(section, locale) {
  if (!section) return ''
  const { noteLabel, noteSeparator } = LOCALE_CONFIG[locale]
  const parts = []
  const heading = toPlain(section?.heading)
  if (heading) {
    parts.push(`## ${heading}\n`)
  }
  const intro = toPlain(section?.intro)
  if (intro) {
    parts.push(`${intro}\n`)
  }
  parts.push(formatItems(section?.items, locale))
  parts.push(formatColumns(section?.columns, locale))
  if (Array.isArray(section?.bullets)) {
    section.bullets.forEach((bullet) => {
      const content = toPlain(bullet)
      if (content) {
        parts.push(`- ${content}`)
      }
    })
    parts.push('')
  }
  const note = toPlain(section?.note)
  if (note) {
    parts.push(`**${joinLabel(noteLabel, noteSeparator)}** ${note}\n`)
  }
  return parts.join('\n')
}

function formatContact(contact, locale) {
  if (!contact) return ''
  const { contactHeading, contactLabels, bulletSeparator } = LOCALE_CONFIG[locale]
  const lines = [`## ${contactHeading}`, '']
  if (contact.name) {
    lines.push(`- **${joinLabel(contactLabels.name, bulletSeparator)}** ${toPlain(contact.name)}`)
  }
  if (contact.email) {
    lines.push(`- **${joinLabel(contactLabels.email, bulletSeparator)}** ${toPlain(contact.email)}`)
  }
  if (contact.phone) {
    lines.push(`- **${joinLabel(contactLabels.phone, bulletSeparator)}** ${toPlain(contact.phone)}`)
  }
  if (contact.hours) {
    lines.push(`- **${joinLabel(contactLabels.hours, bulletSeparator)}** ${toPlain(contact.hours)}`)
  }
  if (contact.address) {
    const addr = toPlain(contact.address).replace(/\n/g, ', ')
    lines.push(`- **${joinLabel(contactLabels.address, bulletSeparator)}** ${addr}`)
  }
  lines.push('')
  return lines.join('\n')
}

function buildMarkdown(policy, locale) {
  if (!policy) return ''
  const { lastUpdatedLabel, labelSeparator } = LOCALE_CONFIG[locale]
  const lines = [`# ${toPlain(policy.title)}`]
  if (policy.last_updated) {
    lines.push(`**${joinLabel(lastUpdatedLabel, labelSeparator)}** ${toPlain(policy.last_updated)}`, '')
  }
  if (policy.intro) {
    lines.push(`${toPlain(policy.intro)}\n`)
  }
  lines.push(formatSummary(policy.summary, locale))
  if (Array.isArray(policy.sections)) {
    policy.sections.forEach((section) => {
      lines.push(formatSection(section, locale))
    })
  }
  if (Array.isArray(policy.paragraphs)) {
    policy.paragraphs.forEach((paragraph) => {
      const content = toPlain(paragraph)
      if (content) {
        lines.push(`${content}\n`)
      }
    })
  }
  lines.push(formatContact(policy.contact, locale))
  return lines.filter(Boolean).join('\n').replace(/\n{3,}/g, '\n\n')
}

const POLICIES = [
  {
    locale: 'EN',
    key: 'terms',
    output: join(ROOT, 'terms-of-service.md'),
  },
  {
    locale: 'EN',
    key: 'privacy',
    output: join(ROOT, 'privacy-policy.md'),
  },
  {
    locale: 'EN',
    key: 'cookies',
    output: join(ROOT, 'cookies-policy.md'),
  },
  {
    locale: 'CN',
    key: 'terms',
    output: join(ROOT, 'terms-of-service-cn.md'),
  },
  {
    locale: 'CN',
    key: 'privacy',
    output: join(ROOT, 'privacy-policy-cn.md'),
  },
  {
    locale: 'CN',
    key: 'cookies',
    output: join(ROOT, 'cookies-policy-cn.md'),
  },
]

POLICIES.forEach(({ locale, key, output }) => {
  const policy = dictionary?.[locale]?.legal?.[key]
  if (!policy) {
    console.warn(`[legal-md] Skipped ${locale}/${key} (no policy data found)`)
    return
  }
  const markdown = buildMarkdown(policy, locale)
  writeFileSync(output, `${markdown.trim()}\n`, 'utf8')
  console.log(`[legal-md] Wrote ${output.replace(ROOT + '/', '')}`)
})
