import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BACKSTAGE_ROOT = path.join(process.env.HOME || '', 'Documents/backstage')
const PROJECTS_DIR = path.join(BACKSTAGE_ROOT, 'projects')

interface ProjectFrontmatter {
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
    
    const projects = projectDirs.map(projectName => {
      const metaPath = path.join(PROJECTS_DIR, projectName, 'META.md')
      const roadmapPath = path.join(PROJECTS_DIR, projectName, 'ROADMAP.md')
      
      let frontmatter: ProjectFrontmatter = {
        name: projectName,
        description: '',
        tier: 0,
        type: '',
        checks: []
      }
      
      // Read META.md for project metadata
      if (fs.existsSync(metaPath)) {
        const metaContent = fs.readFileSync(metaPath, 'utf-8')
        const { data } = matter(metaContent)
        frontmatter = { ...frontmatter, ...data }
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
        name: frontmatter.name,
        description: frontmatter.description,
        tier: frontmatter.tier,
        type: frontmatter.type,
        activeCount,
        backlogCount,
        publishedCount,
        checks: frontmatter.checks || []
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
