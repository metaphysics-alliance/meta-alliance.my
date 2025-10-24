import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const locales = ['EN', 'CN']
  const now = new Date().toISOString()
  const paths = [
    '',
    'about',
    'contact',
    'services',
    // Academy
    'academy',
    'academy/beginner',
    'academy/intermediate',
    'academy/professional',
    // Case studies
    'case-studies',
    'case-studies/academy',
    'case-studies/feng-shui',
    'case-studies/metaphysics',
    // Legal
    'legal/privacy',
    'legal/terms',
    'legal/refund',
    'legal/disclaimer',
    // Resources
    'resources',
    'resources/free-bazi',
    'resources/free-qimen',
    'resources/free-ziwei',
    // Shop
    'shop',
    'shop/amulets',
    'shop/crystals',
    'shop/feng-shui-ornaments',
    // Services — advanced & core
    'services/advanced/taiyi',
    'services/advanced/huangji',
    'services/advanced/liuren',
    'services/bazi',
    'services/ziwei',
    'services/qimen',
    'services/name-number',
    'services/vip/lite',
    'services/vip/pro',
    'services/vip/supreme',
    // Services — feng shui
    'services/fengshui/consultation/home-large',
    'services/fengshui/consultation/home-small',
    'services/fengshui/consultation/office-large',
    'services/fengshui/consultation/office-small',
    'services/fengshui/layout/hiddenwind',
    'services/fengshui/layout/sanyuan',
    'services/fengshui/layout/xuankong',
    'oracle/celestial-numbers',
    'oracle/taiyi-numbers',
    'oracle/six-ren',
  ]
  const urls: MetadataRoute.Sitemap = []
  for (const l of locales){
    for (const p of paths){
      urls.push({
        url: `${base}/${l}${p ? `/${p}` : ''}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: p ? 0.7 : 1,
      })
    }
  }
  return urls
}
