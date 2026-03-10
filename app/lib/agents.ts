import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const AGENTS_ROOT = path.join(process.env.HOME!, 'Backstage/agents')

/**
 * Get list of all squads
 */
export function getSquads(): string[] {
  try {
    return fs.readdirSync(AGENTS_ROOT)
      .filter(name => {
        const stat = fs.statSync(path.join(AGENTS_ROOT, name))
        return stat.isDirectory()
      })
  } catch (err) {
    return []
  }
}

export interface Agent {
  id: string
  name: string
  squad: string
  goal: string
  togetherness?: string
  values?: string[]
  skills?: string[]
  tools?: string[]
  responsibilities?: string[]
  workflows?: {
    name: string
    schedule?: string
    trigger?: string
    steps: string[]
  }[]
  success_criteria?: string[]
}

/**
 * Get all agents for a specific squad
 */
export function getAgentsBySquad(squadSlug: string): Agent[] {
  const squadPath = path.join(AGENTS_ROOT, squadSlug)
  if (!fs.existsSync(squadPath)) return []
  
  const agents: Agent[] = []
  
  try {
    const agentDirs = fs.readdirSync(squadPath)
      .filter(name => {
        const stat = fs.statSync(path.join(squadPath, name))
        return stat.isDirectory()
      })
    
    for (const agentDir of agentDirs) {
      const agentYamlPath = path.join(squadPath, agentDir, 'agent.yaml')
      if (fs.existsSync(agentYamlPath)) {
        const raw = fs.readFileSync(agentYamlPath, 'utf-8')
        const data = yaml.load(raw) as any
        
        agents.push({
          id: data.id || agentDir,
          name: data.name || agentDir,
          squad: squadSlug,
          goal: data.goal || '',
          togetherness: data.togetherness,
          values: data.values || [],
          skills: data.skills || [],
          tools: data.tools || [],
          responsibilities: data.responsibilities || [],
          workflows: data.workflows || [],
          success_criteria: data.success_criteria || []
        })
      }
    }
  } catch (err) {
    console.error(`Error reading agents for squad ${squadSlug}:`, err)
  }
  
  return agents
}

/**
 * Get all agents across all squads
 */
export function getAllAgents(): Agent[] {
  const squads = getSquads()
  const allAgents: Agent[] = []
  
  for (const squad of squads) {
    const agents = getAgentsBySquad(squad)
    allAgents.push(...agents)
  }
  
  return allAgents
}

/**
 * Get agents count per squad
 */
export function getAgentsCountBySquad(): Record<string, number> {
  const squads = getSquads()
  const counts: Record<string, number> = {}
  
  for (const squad of squads) {
    counts[squad] = getAgentsBySquad(squad).length
  }
  
  return counts
}

/**
 * Get single agent by squad and id
 */
export function getAgent(squadSlug: string, agentId: string): Agent | null {
  const agentYamlPath = path.join(AGENTS_ROOT, squadSlug, agentId, 'agent.yaml')
  
  if (!fs.existsSync(agentYamlPath)) return null
  
  try {
    const raw = fs.readFileSync(agentYamlPath, 'utf-8')
    const data = yaml.load(raw) as any
    
    return {
      id: data.id || agentId,
      name: data.name || agentId,
      squad: squadSlug,
      goal: data.goal || '',
      togetherness: data.togetherness,
      values: data.values || [],
      skills: data.skills || [],
      tools: data.tools || [],
      responsibilities: data.responsibilities || [],
      workflows: data.workflows || [],
      success_criteria: data.success_criteria || []
    }
  } catch (err) {
    console.error(`Error reading agent ${squadSlug}/${agentId}:`, err)
    return null
  }
}
