import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export async function GET() {
  try {
    const agentsDir = path.join(process.env.HOME!, 'Backstage/agents')
    
    if (!fs.existsSync(agentsDir)) {
      return NextResponse.json({ agents: [] })
    }
    
    const folders = fs.readdirSync(agentsDir)
      .filter(name => {
        const fullPath = path.join(agentsDir, name)
        return fs.statSync(fullPath).isDirectory()
      })
    
    const agents = folders.map(id => {
      const agentYmlPath = path.join(agentsDir, id, 'agent.yml')
      
      if (!fs.existsSync(agentYmlPath)) {
        return null
      }
      
      const content = fs.readFileSync(agentYmlPath, 'utf-8')
      const data = yaml.load(content) as any
      
      return {
        id,  // folder name
        name: data.name || id,
        type: data.type || 'main',
        description: data.description || '',
        checks: data.checks || []
      }
    }).filter(Boolean)
    
    return NextResponse.json({ agents })
  } catch (error) {
    console.error('Error loading agents:', error)
    return NextResponse.json({ error: 'Failed to load agents' }, { status: 500 })
  }
}
