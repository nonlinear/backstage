import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { getProjectEpics } from '@/lib/epics'

const BACKSTAGE_ROOT = path.join(process.env.HOME || '', 'Documents/backstage/projects')

interface ProjectYaml {
  name: string
  description: string
  tier: number
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
        tier: 0,
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
      
      return {
        name: projectData.name,
        description: projectData.description,
        tier: projectData.tier,
        type: projectData.type,
        activeCount,
        backlogCount,
        publishedCount,
        checks: projectData.checks || []
      }
    })
    
    // Sort by tier (ascending) then name
    projects.sort((a, b) => {
      if (a.tier !== b.tier) return a.tier - b.tier
      return a.name.localeCompare(b.name)
    })
    
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Failed to load projects:', error)
    return NextResponse.json({ error: 'Failed to load projects', projects: [] }, { status: 500 })
  }
}
