import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface Connection {
  name: string
  title: string
  description: string
  content?: string
}

export async function GET() {
  const connectionsDir = path.join(process.cwd(), '..', 'connections')
  
  if (!fs.existsSync(connectionsDir)) {
    return NextResponse.json({ connections: [] })
  }
  
  try {
    const files = fs.readdirSync(connectionsDir)
    const connectionFiles = files.filter(f => f.endsWith('.md'))
    
    const connections: Connection[] = connectionFiles
      .map(filename => {
        const connectionPath = path.join(connectionsDir, filename)
        
        try {
          const content = fs.readFileSync(connectionPath, 'utf-8')
          const nameWithoutExt = filename.replace(/\.md$/, '')
          
          // Extract first paragraph as description (first non-empty line after title)
          const lines = content.split('\n')
          let description = ''
          let foundTitle = false
          
          for (const line of lines) {
            if (line.startsWith('#')) {
              foundTitle = true
              continue
            }
            if (foundTitle && line.trim()) {
              description = line.trim()
              break
            }
          }
          
          // Title = filename (cleaned)
          const title = nameWithoutExt
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
          
          return {
            name: nameWithoutExt,
            title,
            description: description || 'Connection documentation',
            content
          } as Connection
        } catch (err) {
          console.error(`Error reading connection ${filename}:`, err)
          return null
        }
      })
      .filter((connection): connection is Connection => connection !== null)
    
    return NextResponse.json({ connections })
  } catch (error) {
    console.error('Error loading connections:', error)
    return NextResponse.json({ connections: [] }, { status: 500 })
  }
}
