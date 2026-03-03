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

// Canonical status order from epics.yaml
const epicStatuses = [
  { value: "all", label: "All", count: 19 },
  { value: "active", label: "Active", count: 1 },
  { value: "backlog", label: "Backlog", count: 17 },
  { value: "published", label: "Published", count: 1 },
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
  epics 
}: ProjectPageClientProps) {
  const router = useRouter()
  
  const [section, setSection] = useState("projects")
  const [project, setProject] = useState(projectSlug)
  const [epicStatus, setEpicStatus] = useState("all")
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
  
  const handleEpicStatusChange = (value: string) => {
    setEpicStatus(value)
    router.push(`/projects/${project}/${value}`)
  }
  
  const handleEpicTabChange = (version: string, tab: "tasks" | "notes") => {
    // When Notes tab clicked, set this epic as active
    // When Tasks tab clicked, clear active epic
    setActiveEpicVersion(tab === "notes" ? version : null)
  }
  
  const currentProject = projects.find(p => p.value === projectSlug)
  const currentSection = sections.find(s => s.value === section)
  const currentEpicStatus = epicStatuses.find(e => e.value === epicStatus)
  const totalEpics = projects.reduce((sum, p) => sum + p.epicCount, 0)
  
  // Filter epics by status
  const filteredEpics = epicStatus === "all" 
    ? epics 
    : epics.filter(epic => epic.status === epicStatus)
  
  // Sort epics by status order (active → backlog → published), then by semver DESC
  const statusOrder = { active: 1, backlog: 2, published: 3 }
  const sortedEpics = [...filteredEpics].sort((a, b) => {
    // First: sort by status
    const statusDiff = (statusOrder[a.status as keyof typeof statusOrder] || 99) - 
                       (statusOrder[b.status as keyof typeof statusOrder] || 99)
    if (statusDiff !== 0) return statusDiff
    
    // Then: sort by semver DESC (already sorted by lib/epics.ts)
    return 0
  })
  
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed breadcrumb */}
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
                      {currentProject?.label}<sup className="text-muted-foreground font-normal">{currentProject?.epicCount ?? 0}</sup>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">
                    All<sup className="text-muted-foreground">{totalEpics}</sup>
                  </SelectItem>
                  <SelectSeparator />
                  {projects.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}<sup className="text-muted-foreground">{item.epicCount}</sup>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <Select value={epicStatus} onValueChange={handleEpicStatusChange}>
                <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                  <SelectValue>
                    <span className="font-bold text-foreground">
                      {currentEpicStatus?.label}<sup className="text-muted-foreground font-normal">{currentEpicStatus?.count}</sup>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  {epicStatuses.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}<sup className="text-muted-foreground">{item.count}</sup>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Horizontal scroll content */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full items-start" style={{ 
          gap: 'var(--spacing-unit)', 
          padding: 'var(--spacing-unit)',
          paddingRight: 'var(--spacing-unit)'
        }}>
          {/* Project info card */}
          <ProjectCard 
            type={projectType}
            name={projectName}
            description={projectDescription}
            tier={projectTier}
            branch={projectBranch}
            checks={projectChecks}
            epicCount={projectEpicCount}
          />
          
          {/* Epic cards - sorted by status then semver */}
          {sortedEpics.map((epic) => (
            <EpicCard 
              key={epic.version}
              version={epic.version}
              name={epic.name}
              description={epic.description}
              status={epic.status}
              goal={epic.goal} 
              tasks={epic.tasks} 
              notesCount={epic.notesCount} 
              notesList={epic.notesList}
              activeTab={activeEpicVersion === epic.version ? "notes" : "tasks"}
              onTabChange={(tab) => handleEpicTabChange(epic.version, tab)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
