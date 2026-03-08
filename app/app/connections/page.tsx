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
import { ConnectionCard } from "@/components/ConnectionCard"

const sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 67 },
  { value: "agents", label: "Agents", count: 8 },
  { value: "values", label: "Values", count: 20 },
  { value: "connections", label: "Connections", count: 0 },
]

interface Connection {
  name: string
  title: string
  description: string
  content?: string
}

export default function ConnectionsPage() {
  const router = useRouter()
  const [section, setSection] = useState("connections")
  const [connections, setConnections] = useState<Connection[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedConnection, setExpandedConnection] = useState<string | null>(null)
  
  useEffect(() => {
    async function loadConnections() {
      try {
        const response = await fetch('/api/connections')
        const data = await response.json()
        setConnections(data.connections || [])
      } catch (error) {
        console.error('Failed to load connections:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadConnections()
  }, [])
  
  const handleSectionChange = (value: string) => {
    setSection(value)
    if (value === "projects") router.push("/projects")
    if (value === "checks") router.push("/checks")
    if (value === "agents") router.push("/agents")
    if (value === "values") router.push("/values")
  }
  
  const currentSection = sections.find(s => s.value === section)
  
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed breadcrumb */}
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
                      {currentSection?.label}<sup className="text-muted-foreground font-normal">{connections.length}</sup>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  {sections.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}<sup className="text-muted-foreground">{item.value === 'connections' ? connections.length : item.count}</sup>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </BreadcrumbItem>
            <span className="text-muted-foreground">/</span>
            <BreadcrumbItem>
              <Select value="all">
                <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                  <SelectValue>
                    <span className="font-bold text-foreground">All</span>
                  </SelectValue>
                </SelectTrigger>
              </Select>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Horizontal scroll */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <p className="text-muted-foreground" style={{ padding: 'var(--spacing-unit)' }}>Loading connections...</p>
        ) : (
          <div className="flex items-start h-full overflow-x-auto" style={{ gap: 'calc(var(--spacing-unit) / 2)', padding: 'calc(var(--spacing-unit) / 2)' }}>
            {connections.map((connection) => (
              <ConnectionCard
                key={connection.name}
                name={connection.name}
                title={connection.title}
                description={connection.description}
                content={connection.content}
                isExpanded={expandedConnection === connection.name}
                onClick={() => setExpandedConnection(expandedConnection === connection.name ? null : connection.name)}
              />
            ))}
            
            {/* Spacer after last card */}
            <div style={{ width: 'var(--spacing-unit)', flexShrink: 0 }} />
          </div>
        )}
      </div>
    </div>
  )
}
