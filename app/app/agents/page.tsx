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
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 71 },
  { value: "agents", label: "Agents", count: 3 },
]

interface AgentData {
  id: string
  name: string
  type: string  // squad: main, engineering, marketing, operations
  description: string
  checks: any[]
}

export default function AgentsPage() {
  const router = useRouter()
  const [section, setSection] = useState("agents")
  const [agents, setAgents] = useState<AgentData[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadAgents() {
      try {
        const response = await fetch('/api/agents')
        const data = await response.json()
        setAgents(data.agents || [])
      } catch (error) {
        console.error('Failed to load agents:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadAgents()
  }, [])
  
  const handleSectionChange = (value: string) => {
    setSection(value)
    if (value === "projects") router.push("/projects")
    if (value === "checks") router.push("/checks")
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
                      {currentSection?.label}<sup className="text-muted-foreground font-normal">{agents.length}</sup>
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
      
      {/* Horizontal scrollable content */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden" style={{ padding: 'var(--spacing-unit)' }}>
        {loading ? (
          <p className="text-muted-foreground">Loading agents...</p>
        ) : (
          <div className="flex gap-4 h-full items-start">
            {agents.map((agent) => (
              <Card 
                key={agent.id} 
                id={agent.id}
                className="flex-none w-80 p-6 cursor-pointer hover:bg-accent transition-colors relative"
                onClick={() => router.push(`/agents/${agent.id}`)}
              >
                {/* Squad badge (top-right) */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 right-4 capitalize"
                >
                  {agent.type}
                </Badge>
                
                <div className="space-y-4 pr-24">
                  <h2 className="text-2xl font-bold">{agent.name}</h2>
                  <p className="text-muted-foreground">{agent.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
