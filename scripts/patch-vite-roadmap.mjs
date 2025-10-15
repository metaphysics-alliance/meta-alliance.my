import fs from 'node:fs'
import path from 'node:path'

const file = path.join(process.cwd(), 'src', 'pages', 'AboutPage.jsx')
const before = fs.readFileSync(file, 'utf8')
let after = before
after = after.replace("'/images/roadmap-cn.svg'", "'/images/roadmap-cn.png'")
after = after.replace("'/images/roadmap-en.svg'", "'/images/roadmap-en.png'")
if (after !== before){
  fs.writeFileSync(file, after)
  console.log('Updated Vite About roadmap to PNG')
} else {
  console.log('No changes applied (strings not found)')
}

