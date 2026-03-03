"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectCard } from "@/components/ProjectCard"
import { EpicCard } from "@/components/EpicCard"
import { Card } from "@/components/ui/card"
import type { Epic } from "@/lib/epics"

const sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 71 },
  { value: "agents", label: "Agents", count: 8 },
]

const projects = [
  { value: "agregore", label: "Agregore", epicCount: 0 },
  { value: "backstage", label: "Backstage", epicCount: 19 },
  { value: "better", label: "Better", epicCount: 0 },
  { value: "billable-hours", label: "Billable Hours", epicCount: 0 },
  { value: "discrepancy", label: "Discrepancy", epicCount: 0 },
  { value: "fitness", label: "Fitness", epicCount: 0 },
  { value: "i-ching", label: "I Ching", epicCount: 0 },
  { value: "librarian", label: "Librarian", epicCount: 0 },
  { value: "memory", label: "Memory", epicCount: 0 },
  { value: "nonlinear", label: "Nonlinear", epicCount: 0 },
  { value: "personal", label: "Personal", epicCount: 0 },
  { value: "skills", label: "Skills", epicCount: 0 },
  { value: "studio", label: "Studio", epicCount: 0 },
  { value: "template", label: "Template", epicCount: 1 },
]

interface ProjectPageClientProps {
  projectSlug: string
  projectType: string
  projectName: string
  projectDescription: string
  projectTier: number
  projectBranch: string
  projectChecks: string[]
  projectEpicCount: number
  activeCount: number
  backlogCount: number
  publishedCount: number
  epics: Epic[]
}

export function ProjectPageClient({ 
  projectSlug, 
  projectType,
  projectName,
  projectDescription,
  projectTier,
  projectBranch,
  projectChecks,
  projectEpicCount,
  activeCount,
  backlogCount,
  publishedCount,
  epics 
}: ProjectPageClientProps) {
  const router = useRouter()
  
  const [section, setSection] = useState("projects")
  const [project, setProject] = useState(projectSlug)
  const [activeEpicVersion, setActiveEpicVersion] = useState<string | null>(null)
  
  const handleSectionChange = (value: string) => {
    setSection(value)
    if (value === "checks") router.push("/checks")
    if (value === "agents") router.push("/agents")
  }
  
  const handleProjectChange = (value: string) => {
    setProject(value)
    if (value === "all") {
      router.push("/projects/all")
    } else {
      router.push(`/projects/${value}`)
    }
  }
  
  const handleEpicTabChange = (version: string, tab: "tasks" | "notes") => {
    setActiveEpicVersion(tab === "notes" ? version : null)
    
    // Update URL hash when Notes tab opened
    if (tab === "notes") {
      window.location.hash = version
    } else {
      // Clear hash when returning to Tasks
      window.history.replaceState(null, '', window.location.pathname)
    }
  }
  
  const currentProject = projects.find(p => p.value === projectSlug)
  const currentSection = sections.find(s => s.value === section)
  const totalEpics = projects.reduce((sum, p) => sum + p.epicCount, 0)
  
  // Sort epics by status order (active → backlog → published), then by semver DESC
  const statusOrder = { active: 1, backlog: 2, published: 3 }
  const sortedEpics = [...epics].sort((a, b) => {
    const statusDiff = (statusOrder[a.status as keyof typeof statusOrder] || 99) - 
                       (statusOrder[b.status as keyof typeof statusOrder] || 99)
    if (statusDiff !== 0) return statusDiff
    return 0
  })
  
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed breadcrumb (2 levels only) */}
      <div className="flex items-center gap-6 border-b bg-background header-with-icon" style={{ padding: 'var(--spacing-unit)' }}>
        <h1 className="text-2xl font-bold">Backstage</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Select value={section} onValueChange={handleSectionChange}>
                <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                  <SelectValue>
                    <span className="font-bold text-foreground">
                      {currentSection?.label}<sup className="text-muted-foreground font-normal">{currentSection?.count}</sup>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  {sections.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}<sup className="text-muted-foreground">{item.count}</sup>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <Select value={project} onValueChange={handleProjectChange}>
                <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                  <SelectValue>
                    <span className="font-bold text-foreground">
                      {project === "all" ? "All" : currentProject?.label}<sup className="text-muted-foreground font-normal">{project === "all" ? totalEpics : currentProject?.epicCount}</sup>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">All<sup className="text-muted-foreground">{totalEpics}</sup></SelectItem>
                  <SelectSeparator />
                  {projects.map((proj) => (
                    <SelectItem key={proj.value} value={proj.value}>
                      {proj.label}<sup className="text-muted-foreground">{proj.epicCount}</sup>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Horizontal card scroll */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <div className="flex items-start" style={{ gap: 'var(--spacing-unit)', padding: 'var(--spacing-unit)' }}>
          {/* Blank card placeholder */}
          <Card className="w-full max-w-[300px]">
            lorem ipsum
          </Card>
          
          {/* Epic cards */}
          {sortedEpics.map((epic) => (
            <div key={epic.version} className="flex-shrink-0">
              <div className="snap-start" />
              <EpicCard
                version={epic.version}
                name={epic.name}
                description={epic.description}
                status={epic.status}
                goal={epic.goal}
                tasks={epic.tasks}
                notesCount={epic.notesCount}
                notesList={epic.notesList}
                activeTab={activeEpicVersion === epic.version ? "notes" : "tasks"}
                isActiveEpic={activeEpicVersion === epic.version}
                onTabChange={(tab) => handleEpicTabChange(epic.version, tab)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
