"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
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

const sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 71 },
  { value: "agents", label: "Agents", count: 8 },
]

interface ProjectData {
  name: string
  description: string
  tier: number
  type: string
  activeCount: number
  backlogCount: number
  publishedCount: number
  checks: any[]
}

export default function AllProjectsPage() {
  const router = useRouter()
  const [section, setSection] = useState("projects")
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data.projects || [])
      } catch (error) {
        console.error('Failed to load projects:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProjects()
  }, [])
  
  const handleSectionChange = (value: string) => {
    setSection(value)
    if (value === "checks") router.push("/checks")
    if (value === "agents") router.push("/agents")
  }
  
  const currentSection = sections.find(s => s.value === section)
  
  // Build project selector items (same structure as individual project pages)
  const projectItems = projects.map(p => ({
    value: p.name.toLowerCase(),
    label: p.name,
    epicCount: p.activeCount + p.backlogCount + p.publishedCount
  }))
  
  const totalEpics = projectItems.reduce((sum, p) => sum + p.epicCount, 0)
  
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed breadcrumb header with icon */}
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
                      {currentSection?.label}<sup className="text-muted-foreground font-normal">{projects.length}</sup>
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
            <span className="text-muted-foreground">/</span>
            <BreadcrumbItem>
              <Select value="all" onValueChange={(value) => {
                if (value === "all") return
                router.push(`/projects/${value}`)
              }}>
                <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                  <SelectValue>
                    <span className="font-bold text-foreground">
                      All<sup className="text-muted-foreground font-normal">{totalEpics}</sup>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectItem value="all">All<sup className="text-muted-foreground">{totalEpics}</sup></SelectItem>
                  <SelectSeparator />
                  {projectItems.map((proj) => (
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
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              projectName={project.name}
              projectDescription={project.description}
              projectTier={project.tier}
              projectType={project.type}
              activeCount={project.activeCount}
              backlogCount={project.backlogCount}
              publishedCount={project.publishedCount}
              checks={project.checks}
            />
          ))}
          
          {/* Spacer after last card */}
          <div style={{ width: 'var(--spacing-unit)', flexShrink: 0 }} />
        </div>
      </div>
    </div>
  );
}
