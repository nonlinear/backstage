import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

interface ValueUsage {
  global: boolean
  projects: string[]
  squads: string[]
  agents: string[]
}

interface Value {
  name: string
  title: string
  category: string
  type: 'deterministic' | 'probabilistic'
  description: string
  active: boolean
  content?: string
  usage?: ValueUsage
}

function detectValueUsage(valueName: string): ValueUsage {
  const usage: ValueUsage = {
    global: false,
    projects: [],
    squads: [],
    agents: []
  }
  
  const backstageRoot = path.join(process.cwd(), '..')
  
  // Check global (organization.yaml)
  try {
    const backstageYaml = path.join(backstageRoot, 'organization.yaml')
    console.log('[detectValueUsage] Checking organization.yaml:', backstageYaml, 'Exists:', fs.existsSync(backstageYaml))
    if (fs.existsSync(backstageYaml)) {
      const content = fs.readFileSync(backstageYaml, 'utf-8')
      const data: any = yaml.load(content)
      console.log('[detectValueUsage] YAML loaded, keys:', Object.keys(data || {}).slice(0, 10))
      console.log('[detectValueUsage] data.values exists?', !!data.values, 'type:', typeof data.values, 'isArray:', Array.isArray(data.values))
      if (data.values) console.log('[detectValueUsage] data.values content:', data.values)
      if (data.values && Array.isArray(data.values) && data.values.includes(valueName)) {
        console.log('[detectValueUsage] Found', valueName, 'in global values!')
        usage.global = true
      }
    }
  } catch (err) {
    console.error('Error reading organization.yaml:', err)
  }
  
  // Check squads (now in agents/<squad>/squad.yaml)
  try {
    const agentsDir = path.join(backstageRoot, 'agents')
    if (fs.existsSync(agentsDir)) {
      const squads = fs.readdirSync(agentsDir).filter(f => 
        fs.statSync(path.join(agentsDir, f)).isDirectory()
      )
      
      for (const squad of squads) {
        const squadYaml = path.join(agentsDir, squad, 'squad.yaml')
        if (fs.existsSync(squadYaml)) {
          const content = fs.readFileSync(squadYaml, 'utf-8')
          const data: any = yaml.load(content)
          if (data.values && Array.isArray(data.values) && data.values.includes(valueName)) {
            usage.squads.push(squad)
          }
        }
      }
    }
  } catch (err) {
    console.error('Error reading squads:', err)
  }
  
  // Check agents
  try {
    const agentsDir = path.join(backstageRoot, 'agents')
    if (fs.existsSync(agentsDir)) {
      const squads = fs.readdirSync(agentsDir).filter(f => 
        fs.statSync(path.join(agentsDir, f)).isDirectory()
      )
      
      for (const squad of squads) {
        const squadDir = path.join(agentsDir, squad)
        const agents = fs.readdirSync(squadDir).filter(f => 
          fs.statSync(path.join(squadDir, f)).isDirectory()
        )
        
        for (const agent of agents) {
          const agentYaml = path.join(squadDir, agent, 'agent.yaml')
          if (fs.existsSync(agentYaml)) {
            const content = fs.readFileSync(agentYaml, 'utf-8')
            const data: any = yaml.load(content)
            if (data.values && Array.isArray(data.values) && data.values.includes(valueName)) {
              usage.agents.push(`${squad}/${agent}`)
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('Error reading agents:', err)
  }
  
  // Check projects
  try {
    const projectsDir = path.join(backstageRoot, 'projects')
    if (fs.existsSync(projectsDir)) {
      const projects = fs.readdirSync(projectsDir).filter(f => 
        fs.statSync(path.join(projectsDir, f)).isDirectory()
      )
      
      for (const project of projects) {
        const projectYaml = path.join(projectsDir, project, 'project.yaml')
        if (fs.existsSync(projectYaml)) {
          const content = fs.readFileSync(projectYaml, 'utf-8')
          const data: any = yaml.load(content)
          if (data.values && Array.isArray(data.values) && data.values.includes(valueName)) {
            usage.projects.push(project)
          }
        }
      }
    }
  } catch (err) {
    console.error('Error reading projects:', err)
  }
  
  return usage
}

export async function GET() {
  console.log('[VALUES API] Starting - timestamp:', new Date().toISOString())
  const valuesDir = path.join(process.cwd(), '..', 'values')
  console.log('[VALUES API] valuesDir:', valuesDir, 'exists:', fs.existsSync(valuesDir))
  
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
          
          // Detect usage
          const usage = detectValueUsage(nameWithoutExt)
          
          return {
            name: nameWithoutExt,
            title: frontmatter.name || nameWithoutExt,
            category: frontmatter.category || 'principle',
            type: frontmatter.type || 'probabilistic',
            description: frontmatter.description || '',
            active: frontmatter.active !== false,
            content: bodyContent,
            usage
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
