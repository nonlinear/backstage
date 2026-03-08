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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCard } from "@/components/CheckCard"

const sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 71 },
  { value: "agents", label: "Agents", count: 8 },
]

interface Check {
  name: string
  title: string
  type: 'deterministic' | 'probabilistic'
  description: string
  diagram?: string
}

export default function ChecksPage() {
  const router = useRouter()
  const [section, setSection] = useState("checks")
  const [checks, setChecks] = useState<Check[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null)
  
  useEffect(() => {
    async function loadChecks() {
      try {
        const response = await fetch('/api/checks')
        const data = await response.json()
        setChecks(data.checks || [])
      } catch (error) {
        console.error('Failed to load checks:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadChecks()
  }, [])
  
  const handleSectionChange = (value: string) => {
    setSection(value)
    if (value === "projects") router.push("/projects")
    if (value === "agents") router.push("/agents")
  }
  
  const currentSection = sections.find(s => s.value === section)
  
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
                      {currentSection?.label}<sup className="text-muted-foreground font-normal">{checks.length}</sup>
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
              <Select value="type:all" onValueChange={(value) => {
                // Filter logic (scroll to first of type)
                if (value === "type:all") {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  return
                }
                if (value.startsWith("type:")) {
                  const typeName = value.replace("type:", "")
                  const firstCheckOfType = checks.find(c => c.type === typeName)
                  if (firstCheckOfType) {
                    const element = document.getElementById(firstCheckOfType.name)
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
                  }
                }
              }}>
                <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                  <SelectValue>
                    <span className="font-bold text-foreground">
                      All
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectItem value="type:all">All<sup className="text-muted-foreground">{checks.length}</sup></SelectItem>
                  <SelectItem value="type:probabilistic">Probabilistic<sup className="text-muted-foreground">{checks.filter(c => c.type === 'probabilistic').length}</sup></SelectItem>
                  <SelectItem value="type:deterministic">Deterministic<sup className="text-muted-foreground">{checks.filter(c => c.type === 'deterministic').length}</sup></SelectItem>
                </SelectContent>
              </Select>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <p className="text-muted-foreground" style={{ padding: 'var(--spacing-unit)' }}>Loading checks...</p>
        ) : (
          <div className="flex items-start h-full overflow-x-auto" style={{ gap: 'calc(var(--spacing-unit) / 2)', padding: 'calc(var(--spacing-unit) / 2)' }}>
            {checks.map((check) => (
              <CheckCard
                key={check.name}
                name={check.name}
                title={check.title}
                type={check.type}
                description={check.description}
                diagram={check.diagram}
                isExpanded={expandedCheck === check.name}
                onClick={() => setExpandedCheck(expandedCheck === check.name ? null : check.name)}
              />
            ))}
            
            {/* Spacer after last card */}
            <div style={{ width: 'var(--spacing-unit)', flexShrink: 0 }} />
          </div>
        )}
      </div>
    </div>
  );
}
