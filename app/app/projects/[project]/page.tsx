import { getProjectEpics, getProjectBranch, getProjectChecks } from "@/lib/epics"
import { ProjectPageClient } from "./page-client"
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ project: string }> 
}) {
  const { project } = await params
  const epics = getProjectEpics(project)
  const branch = getProjectBranch(project)
  const checks = getProjectChecks(project)
  
  // Calculate epic counts by status
  const activeCount = epics.filter(e => e.status === 'active').length
  const backlogCount = epics.filter(e => e.status === 'backlog').length
  const publishedCount = epics.filter(e => e.status === 'published').length
  
  // Load project metadata
  const projectPath = path.join(process.env.HOME!, 'Documents/backstage/projects', project, 'project.yml')
  let projectType = 'undefined'
  let projectName = project
  let projectDescription = ''
  let projectTier = 1
  
  try {
    const content = fs.readFileSync(projectPath, 'utf-8')
    const metadata = yaml.load(content) as any
    projectType = metadata.type || 'undefined'
    projectName = metadata.name || project
    projectDescription = metadata.description || ''
    projectTier = metadata.tier || 1
  } catch (err) {
    console.error(`Error reading ${projectPath}:`, err)
  }
  
  return (
    <ProjectPageClient 
      projectSlug={project}
      projectType={projectType}
      projectName={projectName}
      projectDescription={projectDescription}
      projectTier={projectTier}
      projectBranch={branch}
      projectChecks={checks}
      projectEpicCount={epics.length}
      activeCount={activeCount}
      backlogCount={backlogCount}
      publishedCount={publishedCount}
      epics={epics} 
    />
  )
}
