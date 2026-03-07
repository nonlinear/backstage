import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { getProjectEpics, getProjectChecks } from '@/lib/epics'
import { enrichProjectChecks } from '@/lib/checks'

const BACKSTAGE_ROOT = path.join(process.env.HOME || '', 'Documents/backstage/projects')

interface ProjectYaml {
  name: string
  description: string
  tier: string | number  // "flagship" | "experimental" | "backlog" or legacy number
  type: string
  checks?: string[]
}

export async function GET() {
  try {
    const projectDirs = fs.readdirSync(BACKSTAGE_ROOT, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    const projects = projectDirs.map(projectDir => {
      const projectYamlPath = path.join(BACKSTAGE_ROOT, projectDir, 'project.yml')
      
      let projectData: ProjectYaml = {
        name: projectDir,
        description: '',
        tier: 'experimental',  // default tier
        type: '',
        checks: []
      }
      
      // Read project.yml for metadata
      if (fs.existsSync(projectYamlPath)) {
        const yamlContent = fs.readFileSync(projectYamlPath, 'utf-8')
        const parsed = yaml.load(yamlContent) as ProjectYaml
        projectData = { ...projectData, ...parsed }
      }
      
      // Count epics using getProjectEpics (same as individual project pages)
      const epics = getProjectEpics(projectDir)
      const activeCount = epics.filter(e => e.status === 'active').length
      const backlogCount = epics.filter(e => e.status === 'backlog').length
      const publishedCount = epics.filter(e => e.status === 'published').length
      
      // Get enriched checks (same as individual project pages)
      const checkFilenames = getProjectChecks(projectDir)
      const checks = enrichProjectChecks(projectDir, checkFilenames)
      
      return {
        name: projectData.name,
        description: projectData.description,
        tier: projectData.tier,
        type: projectData.type,
        activeCount,
        backlogCount,
        publishedCount,
        checks
      }
    })
    
    // Sort by tier (flagship → experimental → backlog) then name
    const tierOrder: Record<string, number> = { flagship: 1, experimental: 2, backlog: 3 }
    projects.sort((a, b) => {
      const tierA = typeof a.tier === 'string' ? (tierOrder[a.tier] || 99) : a.tier
      const tierB = typeof b.tier === 'string' ? (tierOrder[b.tier] || 99) : b.tier
      if (tierA !== tierB) return tierA - tierB
      return a.name.localeCompare(b.name)
    })
    
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Failed to load projects:', error)
    return NextResponse.json({ error: 'Failed to load projects', projects: [] }, { status: 500 })
  }
}
