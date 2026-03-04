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
                      {currentSection?.label}<sup className="text-muted-foreground font-normal">{checks.length || currentSection?.count}</sup>
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
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-8">
        {loading ? (
          <div className="text-muted-foreground">Loading checks...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ gridAutoRows: 'max-content' }}>
            {checks.map((check) => (
              <Card key={check.name} className="h-fit">
                <CardHeader>
                  <CardTitle>{check.title}</CardTitle>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {check.type}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">{check.description}</CardDescription>
                </CardHeader>
                {check.diagram && (
                  <CardContent>
                    <MermaidDiagram diagram={check.diagram} id={check.name} />
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
