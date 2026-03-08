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
  tier: string
  type: string
  activeCount: number
  backlogCount: number
  publishedCount: number
  checks: any[]
}

export default async function TierProjectsPage(props: { params: Promise<{ tier: string }> }) {
  const params = await props.params
  const router = useRouter()
  const [section, setSection] = useState("projects")
  const [allProjects, setAllProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        
        // Sort by tier: flagship → experimental → backlog → template
        const tierOrder = { flagship: 1, experimental: 2, backlog: 3, template: 4 }
        const sorted = (data.projects || []).sort((a: ProjectData, b: ProjectData) => {
          const tierA = tierOrder[a.tier as keyof typeof tierOrder] || 99
          const tierB = tierOrder[b.tier as keyof typeof tierOrder] || 99
          return tierA - tierB
        })
        
        setAllProjects(sorted)
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
  
  // Filter projects by tier
  const projects = allProjects.filter(p => p.tier === params.tier)
  
  const currentSection = sections.find(s => s.value === section)
  
  // Build project selector items
  const projectItems = allProjects.map(p => ({
    value: p.name.toLowerCase(),
    label: p.name,
    epicCount: p.activeCount + p.backlogCount + p.publishedCount
  }))
  
  const totalEpics = projects.reduce((sum, p) => sum + p.activeCount + p.backlogCount + p.publishedCount, 0)
  
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed breadcrumb header */}
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
                      {currentSection?.label}<sup className="text-muted-foreground font-normal">{allProjects.length}</sup>
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
              <Select value={`tier:${params.tier}`} onValueChange={(value) => {
                if (value === "tier:all") {
                  router.push("/projects")
                  return
                }
                if (value.startsWith("tier:")) {
                  const tierName = value.replace("tier:", "")
                  router.push(`/projects/${tierName}`)
                  return
                }
                // Navigate to specific project
                router.push(`/projects/${value}`)
              }}>
                <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                  <SelectValue>
                    <span className="font-bold text-foreground capitalize">
                      {params.tier}<sup className="text-muted-foreground font-normal">{totalEpics}</sup>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  {projectItems.map((proj) => (
                    <SelectItem key={proj.value} value={proj.value}>
                      {proj.label}<sup className="text-muted-foreground">{proj.epicCount}</sup>
                    </SelectItem>
                  ))}
                  <SelectSeparator />
                  <SelectItem value="tier:all">All</SelectItem>
                  <SelectItem value="tier:flagship">Flagship<sup className="text-muted-foreground">{allProjects.filter(p => p.tier === 'flagship').length}</sup></SelectItem>
                  <SelectItem value="tier:experimental">Experimental<sup className="text-muted-foreground">{allProjects.filter(p => p.tier === 'experimental').length}</sup></SelectItem>
                  <SelectItem value="tier:backlog">Backlog<sup className="text-muted-foreground">{allProjects.filter(p => p.tier === 'backlog').length}</sup></SelectItem>
                  <SelectItem value="tier:template">Template<sup className="text-muted-foreground">{allProjects.filter(p => p.tier === 'template').length}</sup></SelectItem>
                </SelectContent>
              </Select>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Horizontal card scroll */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex items-start h-full" style={{ gap: 'calc(var(--spacing-unit) / 2)', padding: 'var(--spacing-unit)' }}>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground">No projects in {params.tier} tier.</p>
          ) : (
            <>
              {projects.map((project) => (
                <>
                  <div key={`anchor-${project.name}`} id={project.name.toLowerCase()} className="scroll-mt-4" />
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
                    showViewEpicsButton={true}
                  />
                </>
              ))}
              
              {/* Spacer after last card */}
              <div style={{ width: 'var(--spacing-unit)', flexShrink: 0 }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
