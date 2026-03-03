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

export default function AllProjectsPage() {
  const router = useRouter()
  const [section, setSection] = useState("projects")
  const [project, setProject] = useState("all")
  
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
  
  const currentSection = sections.find(s => s.value === section)
  const totalEpics = projects.reduce((sum, p) => sum + p.epicCount, 0)
  
  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center gap-6">
        <h4 className="text-xl font-semibold">Backstage</h4>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Select value={section} onValueChange={handleSectionChange}>
                <SelectTrigger className="justify-start">
                  <SelectValue>
                    {currentSection?.label}<sup>{currentSection?.count}</sup>
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Select value={project} onValueChange={handleProjectChange}>
                <SelectTrigger className="justify-start">
                  <SelectValue>
                    All<sup>{totalEpics}</sup>
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
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold">All Projects</h2>
        <p className="text-gray-600 mt-2">{totalEpics} total epics across {projects.length} projects</p>
      </div>
    </div>
  );
}
