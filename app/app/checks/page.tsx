"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import mermaid from 'mermaid'
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

function MermaidDiagram({ diagram, id }: { diagram: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (containerRef.current && diagram) {
      mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
      mermaid.render(`mermaid-${id}`, diagram).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      })
    }
  }, [diagram, id])
  
  return <div ref={containerRef} className="mermaid-container" />
}

export default function ChecksPage() {
  const router = useRouter()
  const [section, setSection] = useState("checks")
  const [checks, setChecks] = useState<Check[]>([])
  const [loading, setLoading] = useState(true)
  
  // Separate active and inactive checks
  const activeChecks = checks.filter(c => c.active !== false)
  const inactiveChecks = checks.filter(c => c.active === false)
  
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
                  <SelectItem value="type:all">All</SelectItem>
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
          <>
            {/* Active checks - horizontal scroll, 600px */}
            {activeChecks.length > 0 && (
              <div className="overflow-x-auto overflow-y-hidden border-b">
                <div className="flex h-full items-start" style={{ gap: 'calc(var(--spacing-unit) / 2)', padding: 'var(--spacing-unit)' }}>
                  {activeChecks.map((check) => (
                    <>
                      <div key={`anchor-${check.name}`} id={check.name} className="scroll-mt-4" />
                      <Card key={check.name} className="flex-none w-[600px] relative" style={{ padding: 'var(--spacing-unit)' }}>
                        {/* Type badge top-right */}
                        <Badge variant="outline" className="absolute top-4 right-4 text-xs capitalize">
                          {check.type}
                        </Badge>
                        
                        <div className="space-y-4 pr-32">
                          <h2 className="text-2xl font-bold">{check.title}</h2>
                          <p className="text-muted-foreground">{check.description}</p>
                          
                          {check.diagram && (
                            <div className="mt-4">
                              <MermaidDiagram diagram={check.diagram} id={check.name} />
                            </div>
                          )}
                        </div>
                      </Card>
                    </>
                  ))}
                  
                  {/* Spacer after last card */}
                  <div style={{ width: 'var(--spacing-unit)', flexShrink: 0 }} />
                </div>
              </div>
            )}
            
            {/* Inactive checks - sticky grid, 300px */}
            {inactiveChecks.length > 0 && (
              <div style={{ padding: 'var(--spacing-unit)' }}>
                <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Inactive Checks</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {inactiveChecks.map((check) => (
                    <Card key={check.name} className="w-[300px]">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">{check.title}</CardTitle>
                          <Badge variant="outline" className="text-xs capitalize ml-2">
                            {check.type}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">{check.description}</CardDescription>
                      </CardHeader>
                      {check.diagram && (
                        <CardContent>
                          <MermaidDiagram diagram={check.diagram} id={check.name} />
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
