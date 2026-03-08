import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

interface Value {
  name: string
  title: string
  category: string
  type: 'deterministic' | 'probabilistic'
  description: string
  active: boolean
  content?: string
}

export async function GET() {
  const valuesDir = path.join(process.cwd(), '..', 'values')
  
  if (!fs.existsSync(valuesDir)) {
    return NextResponse.json({ values: [] })
  }
  
  try {
    const files = fs.readdirSync(valuesDir)
    const valueFiles = files.filter(f => f.endsWith('.md'))
    
    const values: Value[] = valueFiles
      .map(filename => {
        const valuePath = path.join(valuesDir, filename)
        
        try {
          const content = fs.readFileSync(valuePath, 'utf-8')
          const nameWithoutExt = filename.replace(/\.md$/, '')
          
          let frontmatter: any = {}
          let bodyContent = content
          
          // YAML frontmatter
          const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
          if (match) {
            frontmatter = yaml.load(match[1]) || {}
            bodyContent = match[2]
          }
          
          return {
            name: nameWithoutExt,
            title: frontmatter.name || nameWithoutExt,
            category: frontmatter.category || 'principle',
            type: frontmatter.type || 'probabilistic',
            description: frontmatter.description || '',
            active: frontmatter.active !== false,
            content: bodyContent
          } as Value
        } catch (err) {
          console.error(`Error reading value ${filename}:`, err)
          return null
        }
      })
      .filter((value): value is Value => value !== null)
    
    return NextResponse.json({ values })
  } catch (error) {
    console.error('Error loading values:', error)
    return NextResponse.json({ values: [] }, { status: 500 })
  }
}
