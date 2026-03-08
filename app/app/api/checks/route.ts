import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

interface Check {
  name: string
  title: string
  type: 'deterministic' | 'probabilistic'
  description: string
  current?: boolean  // defaults to false if not specified
  diagram?: string
}

export async function GET() {
  const checksDir = path.join(process.cwd(), '..', 'checks')
  
  if (!fs.existsSync(checksDir)) {
    return NextResponse.json({ checks: [] })
  }
  
  try {
    const files = fs.readdirSync(checksDir)
    const checkFiles = files.filter(f => f.endsWith('.sh') || f.endsWith('.md'))
    
    const checks: Check[] = checkFiles
      .map(filename => {
        const checkPath = path.join(checksDir, filename)
        
        try {
          const content = fs.readFileSync(checkPath, 'utf-8')
          const nameWithoutExt = filename.replace(/\.(sh|md)$/, '')
          
          let frontmatter: any = {}
          let diagram: string | undefined
          
          if (filename.endsWith('.md')) {
            // YAML frontmatter
            const match = content.match(/^---\n([\s\S]*?)\n---/)
            if (match) {
              frontmatter = yaml.load(match[1]) || {}
            }
            
            // Extract mermaid diagram (right after frontmatter)
            const diagramMatch = content.match(/---\n\n```mermaid\n([\s\S]*?)\n```/)
            if (diagramMatch) {
              diagram = diagramMatch[1]
            }
          } else if (filename.endsWith('.sh')) {
            // Commented YAML frontmatter
            const match = content.match(/^#!\/bin\/bash\n# ---\n((?:# .*\n)*?)# ---/)
            if (match) {
              const yamlContent = match[1].replace(/^# /gm, '')
              frontmatter = yaml.load(yamlContent) || {}
            }
          }
          
          return {
            name: nameWithoutExt,
            title: frontmatter.title || nameWithoutExt,
            type: frontmatter.type || 'deterministic',
            description: frontmatter.description || '',
            current: frontmatter.current || false,
            diagram
          } as Check
        } catch (err) {
          console.error(`Error reading check ${filename}:`, err)
          return null
        }
      })
      .filter((check): check is Check => check !== null)
    
    return NextResponse.json({ checks })
  } catch (error) {
    console.error('Error loading checks:', error)
    return NextResponse.json({ checks: [] }, { status: 500 })
  }
}
