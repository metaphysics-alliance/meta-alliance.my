import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const locales = ['EN', 'CN']
  const paths = ['', 'about', 'services', 'contact']
  const now = new Date().toISOString()
  const urls: MetadataRoute.Sitemap = []
  for (const l of locales){
    for (const p of paths){
      urls.push({ url: `${base}/${l}${p ? `/${p}` : ''}`, lastModified: now, changeFrequency: 'weekly', priority: p ? 0.7 : 1 })
    }
  }
  return urls
}

