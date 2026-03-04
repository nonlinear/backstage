import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const agentsDir = path.join(process.env.HOME!, 'Documents/agents')
    
    if (!fs.existsSync(agentsDir)) {
      return NextResponse.json({ agents: [] })
    }
    
    const folders = fs.readdirSync(agentsDir)
      .filter(name => {
        const fullPath = path.join(agentsDir, name)
        return fs.statSync(fullPath).isDirectory()
      })
    
    const agents = folders.map(name => {
      const readmePath = path.join(agentsDir, name, 'README.md')
      let description = `${name} agent`
      let role = 'Agent'
      let created = ''
      
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf-8')
        
        // Extract role from **Role:** line
        const roleMatch = content.match(/\*\*Role:\*\*\s*(.+)/i)
        if (roleMatch) {
          role = roleMatch[1].trim()
        }
        
        // Extract created date
        const createdMatch = content.match(/\*\*Created:\*\*\s*(.+)/i)
        if (createdMatch) {
          created = createdMatch[1].trim()
        }
        
        // Extract first paragraph after Purpose heading as description
        const purposeMatch = content.match(/##\s*Purpose\s*\n\n(.+?)(?:\n\n|\n---)/s)
        if (purposeMatch) {
          description = purposeMatch[1].trim().replace(/\n/g, ' ')
        }
      }
      
      return {
        name,
        role,
        description,
        created
      }
    })
    
    return NextResponse.json({ agents })
  } catch (error) {
    console.error('Error loading agents:', error)
    return NextResponse.json({ error: 'Failed to load agents' }, { status: 500 })
  }
}
