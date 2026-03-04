import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const BACKSTAGE_ROOT = path.join(process.env.HOME || '', 'Documents/backstage')
const PROJECTS_DIR = path.join(BACKSTAGE_ROOT, 'projects')

interface ProjectYaml {
  name: string
  description: string
  tier: number
  type: string
  checks?: string[]
}

export async function GET() {
  try {
    const projectDirs = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    const projects = projectDirs.map(projectDir => {
      const projectYamlPath = path.join(PROJECTS_DIR, projectDir, 'project.yml')
      const roadmapPath = path.join(PROJECTS_DIR, projectDir, 'ROADMAP.md')
      
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
      
      // Count epics from ROADMAP.md
      let activeCount = 0
      let backlogCount = 0
      let publishedCount = 0
      
      if (fs.existsSync(roadmapPath)) {
        const roadmapContent = fs.readFileSync(roadmapPath, 'utf-8')
        const lines = roadmapContent.split('\n')
        
        let currentSection = ''
        
        for (const line of lines) {
          if (line.startsWith('## 🎯 Active')) {
            currentSection = 'active'
          } else if (line.startsWith('## 📋 Backlog')) {
            currentSection = 'backlog'
          } else if (line.startsWith('## ✅ Published')) {
            currentSection = 'published'
          } else if (line.match(/^- \[v\d+\.\d+\.\d+\]/)) {
            // Count epic entries
            if (currentSection === 'active') activeCount++
            if (currentSection === 'backlog') backlogCount++
            if (currentSection === 'published') publishedCount++
          }
        }
      }
      
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
