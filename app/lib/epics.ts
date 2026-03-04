import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { getNoteTitles } from './note-titles'

const BACKSTAGE_ROOT = path.join(process.env.HOME!, 'Documents/backstage/projects')

export interface Task {
  text: string
  checked: boolean
}

export interface Epic {
  notesList: { slug: string; title: string; content: string }[]
  version: string
  name: string
  description: string
  status: string
  goal?: string
  tasks: Task[]
  notesCount: number
}

/**
 * Parse semver version string to comparable array
 */
function parseSemver(version: string): number[] {
  const match = version.match(/v?(\d+)\.(\d+)\.(\d+)/)
  if (!match) return [0, 0, 0]
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
}

/**
 * Compare two semver versions
 */
function compareSemver(a: string, b: string): number {
  const [aMajor, aMinor, aPatch] = parseSemver(a)
  const [bMajor, bMinor, bPatch] = parseSemver(b)
  
  if (aMajor !== bMajor) return bMajor - aMajor
  if (aMinor !== bMinor) return bMinor - aMinor
  return bPatch - aPatch
}

/**
 * Count markdown files in epic folder (excluding index.md, epic.yaml)
 */
function countNotes(epicPath: string): number {
  try {
    const files = fs.readdirSync(epicPath)
    return files.filter(f => 
      f.endsWith('.md') && 
      f !== 'index.md' && 
      f !== 'epic.yaml'
    ).length
  } catch {
    return 0
  }
}

/**
 * Parse tasks from epic.yaml or index.md
 */
function parseTasks(epicPath: string): Task[] {
  // Try epic.yaml first
  const epicYamlPath = path.join(epicPath, 'epic.yaml')
  if (fs.existsSync(epicYamlPath)) {
    try {
      const content = fs.readFileSync(epicYamlPath, 'utf-8')
      const cleanContent = content.replace(/^---\n?/gm, '').replace(/\n?---$/gm, '')
      const data = yaml.load(cleanContent) as any
      
      if (Array.isArray(data.tasks)) {
        return data.tasks.map((t: any) => {
          if (typeof t === 'string') {
            return { text: t, checked: false }
          }
          return {
            text: t.text || t.name || String(t),
            checked: t.checked === true
          }
        })
      }
    } catch {}
  }
  
  // Try index.md frontmatter
  const indexMdPath = path.join(epicPath, 'index.md')
  if (fs.existsSync(indexMdPath)) {
    try {
      const content = fs.readFileSync(indexMdPath, 'utf-8')
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
      
      if (frontmatterMatch) {
        const frontmatter = yaml.load(frontmatterMatch[1]) as any
        if (Array.isArray(frontmatter.tasks)) {
          return frontmatter.tasks.map((t: any) => {
            if (typeof t === 'string') {
              return { text: t, checked: false }
            }
            return {
              text: t.text || t.name || String(t),
              checked: t.checked === true
            }
          })
        }
      }
    } catch {}
  }
  
  return []
}

/**
 * Get all epics for a project
 */
export function getProjectEpics(projectSlug: string): Epic[] {
  const epicsDir = path.join(BACKSTAGE_ROOT, projectSlug, 'epics')
  
  if (!fs.existsSync(epicsDir)) {
    return []
  }
  
  const epicDirs = fs.readdirSync(epicsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
  const epics: Epic[] = []
  
  for (const epicDir of epicDirs) {
    const epicPath = path.join(epicsDir, epicDir)
    const tasks = parseTasks(epicPath)
    const notesCount = countNotes(epicPath)
    const notesList = getNoteTitles(epicPath)
    
    // Always use epic.yaml (ignore index.md frontmatter)
    const epicYamlPath = path.join(epicPath, 'epic.yaml')
    if (fs.existsSync(epicYamlPath)) {
      try {
        const content = fs.readFileSync(epicYamlPath, 'utf-8')
        const cleanContent = content.replace(/^---\n?/gm, '').replace(/\n?---$/gm, '')
        const epicData = yaml.load(cleanContent) as any
        epics.push({
          version: epicDir, // Always use folder name
          name: epicData.name || epicDir,
          description: epicData.description || '',
          status: epicData.status || 'backlog',
          goal: epicData.goal || '',
          tasks,
          notesCount,
          notesList,
        })
      } catch (err) {
        console.error(`Error reading ${epicYamlPath}:`, err)
      }
    }
  }
  
  // Sort by semver (descending)
  return epics.sort((a, b) => compareSemver(a.version, b.version))
}

/**
 * Get epic counts by status for a project
 */
export function getEpicCounts(projectSlug: string): Record<string, number> {
  const epics = getProjectEpics(projectSlug)
  const counts: Record<string, number> = {
    all: epics.length,
    backlog: 0,
    active: 0,
    published: 0,
  }
  
  for (const epic of epics) {
    if (epic.status in counts) {
      counts[epic.status]++
    }
  }
  
  return counts
}

/**
 * Get all epic counts across all projects
 */
export function getAllEpicCounts(): number {
  const projects = fs.readdirSync(BACKSTAGE_ROOT, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
  let total = 0
  for (const project of projects) {
    total += getProjectEpics(project).length
  }
  
  return total
}

/**
 * Get total epic count for a specific project
 */
export function getTotalEpicCount(projectSlug: string): number {
  return getProjectEpics(projectSlug).length
}

/**
 * Get current git branch for a project
 */
export function getProjectBranch(projectSlug: string): string {
  const projectPath = path.join(BACKSTAGE_ROOT, projectSlug)
  
  try {
    const { execSync } = require('child_process')
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { 
      cwd: projectPath,
      encoding: 'utf-8' 
    }).trim()
    return branch
  } catch (err) {
    return 'main'
  }
}

/**
 * Get checks list for a project
 */
export function getProjectChecks(projectSlug: string): string[] {
  const checksPath = path.join(BACKSTAGE_ROOT, projectSlug, 'checks.yaml')
  
  try {
    const content = fs.readFileSync(checksPath, 'utf-8')
    const cleanContent = content.replace(/^---\n?/gm, '').replace(/\n?---$/gm, '')
    const data = yaml.load(cleanContent) as any
    return data?.checks || []
  } catch (err) {
    return []
  }
}

/**
 * Get list of markdown files in epic folder
 */
// getNotes() removed - now using getNoteTitles() from note-titles.ts
// getNoteContent() removed - content now included in getNoteTitles() response
