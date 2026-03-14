import { getProjectEpics, getProjectBranch, getProjectChecks, getAllProjectsEpicCounts } from "@/lib/epics"
import { enrichProjectChecks } from "@/lib/checks"
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
  const checkFilenames = getProjectChecks(project)
  const checks = enrichProjectChecks(project, checkFilenames)
  const allProjectsEpicCounts = getAllProjectsEpicCounts()
  
  // Calculate epic counts by status
  const activeCount = epics.filter(e => e.status === 'active').length
  const backlogCount = epics.filter(e => e.status === 'backlog').length
  const publishedCount = epics.filter(e => e.status === 'published').length
  
  // Load project metadata
  const projectPath = path.join(process.env.HOME!, 'Backstage/projects', project, 'project.yml')
  let projectType = 'undefined'
  let projectName = project
  let projectDescription = ''
  let projectTier = 'experimental'
  
  try {
    const content = fs.readFileSync(projectPath, 'utf-8')
    const metadata = yaml.load(content) as any
    projectType = metadata.type || 'undefined'
    projectName = metadata.name || project
    projectDescription = metadata.description || ''
    projectTier = metadata.tier || 'experimental'
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
      allProjectsEpicCounts={allProjectsEpicCounts}
      epics={epics} 
    />
  )
}
