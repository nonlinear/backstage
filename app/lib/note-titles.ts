import fs from 'fs'
import path from 'path'

export function getNoteTitles(epicPath: string): { slug: string; title: string; content: string }[] {
  const notesPath = epicPath
  
  if (!fs.existsSync(notesPath)) {
    return []
  }

  const files = fs.readdirSync(notesPath)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => {
      // index.md always first
      if (a === 'index.md') return -1
      if (b === 'index.md') return 1
      return a.localeCompare(b)
    })

  return files.map(filename => {
    const filePath = path.join(notesPath, filename)
    const content = fs.readFileSync(filePath, 'utf-8')
    const firstLine = content.split('\n')[0]
    
    // Extract # TITLE from first line
    const title = firstLine.startsWith('# ') 
      ? firstLine.slice(2).trim() 
      : filename.replace('.md', '') // Fallback to filename if no # TITLE
    
    const slug = filename.replace('.md', '')
    
    return { slug, title, content }
  })
}
