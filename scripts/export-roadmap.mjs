import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const inDir = path.join(root, 'public', 'images')
const tasks = [
  { in: 'roadmap-en.svg', out: 'roadmap-en.png' },
  { in: 'roadmap-cn.svg', out: 'roadmap-cn.png' },
]

async function run(){
  for (const t of tasks){
    const inPath = path.join(inDir, t.in)
    const outPath = path.join(inDir, t.out)
    if (!fs.existsSync(inPath)){
      console.warn(`[roadmap] missing: ${t.in} — skip`)
      continue
    }
    try{
      const svg = fs.readFileSync(inPath)
      // Render to a large PNG suitable for hi‑dpi displays; keeps aspect ratio
      await sharp(svg).png({ quality: 92 }).resize({ width: 1920 }).toFile(outPath)
      console.log(`[roadmap] exported ${t.out}`)
    }catch(err){
      console.error(`[roadmap] failed to export ${t.out}:`, err?.message || err)
      process.exitCode = 1
    }
  }
}

run()

