import fs from 'node:fs'
import path from 'node:path'

function patchVite(){
  const file = path.join(process.cwd(), 'src', 'pages', 'ContactPage.jsx')
  if(!fs.existsSync(file)) return
  let s = fs.readFileSync(file, 'utf8')
  const before = s
  const findUl = `<h3 className="text-lg font-semibold text-white">{lang === 'CN' ? '????' : 'Live Chat & Social'}</h3>\n            <ul className="mt-2 space-y-2 text-sm text-white/75">`
  const replUl = `<h3 className="text-lg font-semibold text-white">{lang === 'CN' ? '????' : 'Live Chat & Social'}</h3>\n            <ul className=\"mt-2 space-y-2 text-sm text-white/75\">`
  s = s.replace(findUl, replUl)
  s = s.replace(
    /<li><a href={`https:\/\/wa\.me\/${\s*whatsapp\.replace\(\/\[^\\d\]\/g, ''\)\s*}`}[^>]+>WhatsApp<\/a><\/li>/,
    `<li><a href={\`https://wa.me/${whatsapp.replace(/[^\\d]/g, '')}\`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaWhatsapp className="text-green-500" /> WhatsApp</a></li>`
  )
  s = s.replace(
    /<li><a href="https:\/\/instagram\.com"[^>]+>Instagram<\/a><\/li>/,
    `<li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaInstagram className="text-pink-500" /> Instagram</a></li>`
  )
  s = s.replace(
    /<li><a href="https:\/\/facebook\.com"[^>]+>Facebook<\/a><\/li>/,
    `<li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaFacebook className="text-blue-500" /> Facebook</a></li>`
  )
  s = s.replace(
    /<li><a className="underline hover:text-white" href={`mailto:\$\{emailSales\}`}>\{lang === 'CN' \? '[^']*' : 'Email'\}<\/a><\/li>/,
    `<li><a className="flex items-center gap-2 underline hover:text-white" href={\`mailto:${emailSales}\`}><FiMail className="text-white/80" /> {lang === 'CN' ? '邮件' : 'Email'}</a></li>`
  )
  s = s.replace(
    /<li><Link className="underline hover:text-white" to="\/resources">\{lang === 'CN' \? '[^']*' : 'Resources'\}<\/Link><\/li>/,
    `<li><Link className="flex items-center gap-2 underline hover:text-white" to="/resources"><FiBook className="text-white/80" /> {lang === 'CN' ? '资源' : 'Resources'}</Link></li>`
  )
  if(s !== before){ fs.writeFileSync(file, s) ; console.log('Patched Vite Contact icons') }
}

function patchNext(){
  const file = path.join(process.cwd(), 'app', '[locale]', 'contact', 'page.tsx')
  if(!fs.existsSync(file)) return
  let s = fs.readFileSync(file, 'utf8')
  const before = s
  // add imports if missing
  if(!s.includes("react-icons/fa")){
    s = s.replace(
      "import Link from 'next/link'",
      "import Link from 'next/link'\nimport { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'\nimport { FiMail, FiBook } from 'react-icons/fi'"
    )
  }
  // Live Chat list
  s = s.replace(
    /<ul className="mt-2 space-y-2 text-sm text-white\/75">[\s\S]*?<\/ul>/,
    `<ul className="mt-2 space-y-2 text-sm text-white/75">\n              <li>\n                <a href={\`https://wa.me/${whatsapp.replace(/[^\\d]/g, '')}\`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaWhatsapp className="text-green-500" /> WhatsApp</a>\n              </li>\n              <li>\n                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaInstagram className="text-pink-500" /> Instagram</a>\n              </li>\n              <li>\n                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-white"><FaFacebook className="text-blue-500" /> Facebook</a>\n              </li>\n            </ul>`
  )
  // Fallbacks list
  s = s.replace(
    /<h3 className=\"text-lg font-semibold text-white\">\{locale === 'CN' \? '[^']*' : 'Fallbacks'\}<\/h3>[\s\S]*?<ul className=\"mt-2 space-y-2 text-sm text-white\/75\">[\s\S]*?<\/ul>/,
    `<h3 className="text-lg font-semibold text-white">{locale === 'CN' ? '备用方式' : 'Fallbacks'}</h3>\n            <ul className="mt-2 space-y-2 text-sm text-white/75">\n              <li><a className="flex items-center gap-2 underline hover:text-white" href={\`mailto:${emailSales}\`}><FiMail className="text-white/80" /> {locale === 'CN' ? '邮件' : 'Email'}</a></li>\n              <li><a className="flex items-center gap-2 underline hover:text-white" href={\`https://wa.me/${whatsapp.replace(/[^\\d]/g, '')}\`} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-green-500" /> WhatsApp</a></li>\n              <li><Link className="flex items-center gap-2 underline hover:text-white" href={localise('/resources')}><FiBook className="text-white/80" /> {locale === 'CN' ? '资源' : 'Resources'}</Link></li>\n            </ul>`
  )
  if(s !== before){ fs.writeFileSync(file, s); console.log('Patched Next Contact icons') }
}

patchVite()
patchNext()

