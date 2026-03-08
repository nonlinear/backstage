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
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 67 },
  { value: "agents", label: "Agents", count: 8 },
  { value: "values", label: "Values", count: 20 },
  { value: "connections", label: "Connections", count: 0 },
];

const OLD_sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 71 },
  { value: "agents", label: "Agents", count: 3 },
]

interface AgentData {
  id: string
  squad: string  // main, engineering, marketing, operations
  name: string
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
  
  // Group agents by squad
  const agentsBySquad = agents.reduce((acc, agent) => {
    if (!acc[agent.squad]) acc[agent.squad] = []
    acc[agent.squad].push(agent)
    return acc
  }, {} as Record<string, AgentData[]>)
  
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
            <span className="text-muted-foreground">/</span>
            <BreadcrumbItem>
              <Select value="squad:all" onValueChange={(value) => {
                if (value === "squad:all") {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  return
                }
                if (value.startsWith("squad:")) {
                  const squadName = value.replace("squad:", "")
                  const firstAgentOfSquad = agents.find(a => a.squad === squadName)
                  if (firstAgentOfSquad) {
                    const element = document.getElementById(firstAgentOfSquad.id)
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
                  }
                  return
                }
                // Navigate to specific agent
                router.push(`/agents/${value}`)
              }}>
                <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                  <SelectValue>
                    <span className="font-bold text-foreground">
                      All
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                  <SelectSeparator />
                  <SelectItem value="squad:all">All<sup className="text-muted-foreground">{agents.length}</sup></SelectItem>
                  <SelectItem value="squad:main">Main<sup className="text-muted-foreground">{agentsBySquad['main']?.length || 0}</sup></SelectItem>
                  <SelectItem value="squad:research">Research<sup className="text-muted-foreground">{agentsBySquad['research']?.length || 0}</sup></SelectItem>
                  <SelectItem value="squad:engineering">Engineering<sup className="text-muted-foreground">{agentsBySquad['engineering']?.length || 0}</sup></SelectItem>
                  <SelectItem value="squad:marketing">Marketing<sup className="text-muted-foreground">{agentsBySquad['marketing']?.length || 0}</sup></SelectItem>
                </SelectContent>
              </Select>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Horizontal scrollable content */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        {loading ? (
          <p className="text-muted-foreground" style={{ padding: 'var(--spacing-unit)' }}>Loading agents...</p>
        ) : (
          <div className="flex h-full items-start" style={{ gap: 'calc(var(--spacing-unit) / 2)', padding: 'var(--spacing-unit)' }}>
            {agents.map((agent) => (
              <>
                <div key={`anchor-${agent.id}`} id={agent.id} className="scroll-mt-4" />
                <Card 
                  key={agent.id}
                  className="flex-none w-80 cursor-pointer hover:bg-accent transition-colors relative"
                  style={{ padding: 'var(--spacing-unit)' }}
                  onClick={() => router.push(`/agents/${agent.squad}/${agent.id}`)}
                >
                  {/* Squad badge (top-right) */}
                  <Badge 
                    variant="outline" 
                    className="absolute top-4 right-4 capitalize"
                  >
                    {agent.squad}
                  </Badge>
                  
                  <div className="space-y-4 pr-24">
                    <h2 className="text-2xl font-bold">{agent.name}</h2>
                    <p className="text-muted-foreground">{agent.description}</p>
                  </div>
                </Card>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
