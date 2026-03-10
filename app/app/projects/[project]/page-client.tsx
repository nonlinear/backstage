"use client"

import { useState, useEffect, useRef } from 'react'
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
import type { Check } from "@/lib/checks"

const sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 71 },
  { value: "agents", label: "Agents", count: 8 },
]

interface ProjectPageClientProps {
  projectSlug: string
  projectType: string
  projectName: string
  projectDescription: string
  projectTier: string | number  // "flagship" | "experimental" | "backlog" | number (legacy)
  projectBranch: string
  projectChecks: Check[]
  projectEpicCount: number
  activeCount: number
  backlogCount: number
  doneCount: number
  allProjectsEpicCounts: Record<string, number>
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
  doneCount,
  allProjectsEpicCounts,
  epics 
}: ProjectPageClientProps) {
  const router = useRouter()
  
  const projects = [
    { value: "agregore", label: "Agregore", epicCount: allProjectsEpicCounts["agregore"] || 0 },
    { value: "backstage", label: "Backstage", epicCount: allProjectsEpicCounts["backstage"] || 0 },
    { value: "better", label: "Better", epicCount: allProjectsEpicCounts["better"] || 0 },
    { value: "billable-hours", label: "Billable Hours", epicCount: allProjectsEpicCounts["billable-hours"] || 0 },
    { value: "discrepancy", label: "Discrepancy", epicCount: allProjectsEpicCounts["discrepancy"] || 0 },
    { value: "fitness", label: "Fitness", epicCount: allProjectsEpicCounts["fitness"] || 0 },
    { value: "i-ching", label: "I Ching", epicCount: allProjectsEpicCounts["i-ching"] || 0 },
    { value: "librarian", label: "Librarian", epicCount: allProjectsEpicCounts["librarian"] || 0 },
    { value: "memory", label: "Memory", epicCount: allProjectsEpicCounts["memory"] || 0 },
    { value: "nonlinear", label: "Nonlinear", epicCount: allProjectsEpicCounts["nonlinear"] || 0 },
    { value: "personal", label: "Personal", epicCount: allProjectsEpicCounts["personal"] || 0 },
    { value: "skills", label: "Skills", epicCount: allProjectsEpicCounts["skills"] || 0 },
    { value: "studio", label: "Studio", epicCount: allProjectsEpicCounts["studio"] || 0 },
    { value: "template", label: "Template", epicCount: allProjectsEpicCounts["template"] || 0 },
  ]
  
  const [section, setSection] = useState("projects")
  const [project, setProject] = useState(projectSlug)
  const [activeEpicVersion, setActiveEpicVersion] = useState<string | null>(null)
  const [selectedNoteByEpic, setSelectedNoteByEpic] = useState<Record<string, string>>({})
  const hasInitialized = useRef(false)
  
  // Read hash on mount to open Notes tab automatically (client-side only, run once)
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true
    
    const hash = window.location.hash.slice(1) // Remove #
    const params = new URLSearchParams(window.location.search)
    const noteParam = params.get('note')
    
    if (hash && epics.some(e => e.version === hash)) {
      setActiveEpicVersion(hash)
      if (noteParam) {
        setSelectedNoteByEpic({ [hash]: noteParam })
      }
      
      // Scroll to epic after state update
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
      }, 100)
    }
  }, [epics])
  
  const handleSectionChange = (value: string) => {
    setSection(value)
    if (value === "checks") router.push("/checks")
    if (value === "agents") router.push("/agents")
  }
  
  const handleProjectChange = (value: string) => {
    setProject(value)
    if (value === "all") {
      router.push("/projects")
    } else {
      router.push(`/projects/${value}`)
    }
  }
  
  const handleEpicTabChange = (version: string, tab: "tasks" | "notes") => {
    setActiveEpicVersion(tab === "notes" ? version : null)
    
    // Update URL hash when Notes tab opened
    if (tab === "notes") {
      const selectedNote = selectedNoteByEpic[version]
      if (selectedNote && selectedNote !== "index") {
        window.history.replaceState(null, '', `?note=${selectedNote}#${version}`)
      } else {
        window.location.hash = version
      }
    } else {
      // Clear hash when returning to Tasks
      window.history.replaceState(null, '', window.location.pathname)
    }
  }
  
  const handleNoteChange = (version: string, noteSlug: string) => {
    setSelectedNoteByEpic(prev => ({ ...prev, [version]: noteSlug }))
    
    // Update URL
    if (noteSlug === "index") {
      window.history.replaceState(null, '', `#${version}`)
    } else {
      window.history.replaceState(null, '', `?note=${noteSlug}#${version}`)
    }
  }
  
  const currentProject = projects.find(p => p.value === projectSlug)
  const currentSection = sections.find(s => s.value === section)
  const totalEpics = projects.reduce((sum, p) => sum + p.epicCount, 0)
  
  // Sort epics by status order (active → backlog → done), then by semver ASC
  const statusOrder = { active: 1, backlog: 2, done: 3 }
  const sortedEpics = [...epics].sort((a, b) => {
    const statusDiff = (statusOrder[a.status as keyof typeof statusOrder] || 99) - 
                       (statusOrder[b.status as keyof typeof statusOrder] || 99)
    if (statusDiff !== 0) return statusDiff
    
    // Within same status, sort by version (semver ascending)
    const versionA = a.version.replace(/^v/, '')
    const versionB = b.version.replace(/^v/, '')
    return versionA.localeCompare(versionB, undefined, { numeric: true, sensitivity: 'base' })
  })
  
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed breadcrumb (2 levels only) */}
      <div className="flex items-center gap-6 border-b bg-background header-with-icon" style={{ padding: 'var(--spacing-unit)' }}>
        <h1 className="text-2xl font-bold">Backstage</h1>
        <span className="text-muted-foreground">/</span>
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
                <SelectContent position="popper" align="start">
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
                <SelectContent position="popper" align="start">
                  <SelectItem value="all">All<sup className="text-muted-foreground">{totalEpics}</sup></SelectItem>
                  <SelectItem value="tier:flagship">Flagship<sup className="text-muted-foreground">3</sup></SelectItem>
                  <SelectItem value="tier:experimental">Experimental<sup className="text-muted-foreground">7</sup></SelectItem>
                  <SelectItem value="tier:backlog">Backlog<sup className="text-muted-foreground">3</sup></SelectItem>
                  <SelectItem value="tier:template">Template<sup className="text-muted-foreground">1</sup></SelectItem>
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
      <div className="flex-1 overflow-x-auto">
        <div className="flex items-start h-full" style={{ gap: 'calc(var(--spacing-unit) / 2)', padding: 'var(--spacing-unit)' }}>
          {/* Project card */}
          <ProjectCard 
            projectName={projectName} 
            projectDescription={projectDescription}
            projectTier={projectTier}
            projectType={projectType}
            activeCount={activeCount}
            backlogCount={backlogCount}
            doneCount={doneCount}
            checks={projectChecks}
          />
          
          {/* Epic cards */}
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
              isActiveEpic={activeEpicVersion === epic.version}
              selectedNote={selectedNoteByEpic[epic.version]}
              onTabChange={(tab) => handleEpicTabChange(epic.version, tab)}
              onNoteChange={(noteSlug) => handleNoteChange(epic.version, noteSlug)}
            />
          ))}
          
          {/* Spacer after last card */}
          <div style={{ width: 'var(--spacing-unit)', flexShrink: 0 }} />
        </div>
      </div>
    </div>
  )
}
