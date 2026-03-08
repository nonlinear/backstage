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
    
    const agents: any[] = []
    
    // Scan squad folders (main, engineering, marketing, operations)
    const squadFolders = fs.readdirSync(agentsDir)
      .filter(name => {
        const fullPath = path.join(agentsDir, name)
        return fs.statSync(fullPath).isDirectory()
      })
    
    for (const squad of squadFolders) {
      const squadPath = path.join(agentsDir, squad)
      
      // Scan agents within squad
      const agentFolders = fs.readdirSync(squadPath)
        .filter(name => {
          const fullPath = path.join(squadPath, name)
          // Skip checks.yaml (not an agent)
          return fs.statSync(fullPath).isDirectory()
        })
      
      for (const agentId of agentFolders) {
        const agentYmlPath = path.join(squadPath, agentId, 'agent.yml')
        
        if (!fs.existsSync(agentYmlPath)) {
          continue
        }
        
        const content = fs.readFileSync(agentYmlPath, 'utf-8')
        const data = yaml.load(content) as any
        
        agents.push({
          id: agentId,
          squad: squad,  // from folder (main, engineering, etc.)
          name: data.name || agentId,
          description: data.description || '',
          checks: data.checks || [],
          values: data.values || []
        })
      }
    }
    
    return NextResponse.json({ agents })
  } catch (error) {
    console.error('Error loading agents:', error)
    return NextResponse.json({ error: 'Failed to load agents' }, { status: 500 })
  }
}
