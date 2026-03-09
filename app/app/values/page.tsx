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
import { ValueCard } from "@/components/ValueCard"

const sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 67 },
  { value: "agents", label: "Agents", count: 8 },
  { value: "values", label: "Values", count: 20 },
  { value: "connections", label: "Connections", count: 0 },
];

const OLD_sections = [
  { value: "projects", label: "Projects", count: 14 },
  { value: "checks", label: "Checks", count: 67 },
  { value: "agents", label: "Agents", count: 8 },
  { value: "values", label: "Values", count: 20 },
]

interface Value {
  name: string
  title: string
  category: string
  type: 'deterministic' | 'probabilistic'
  description: string
  content?: string
}

export default function ValuesPage() {
  const router = useRouter()
  const [section, setSection] = useState("values")
  const [values, setValues] = useState<Value[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedValue, setExpandedValue] = useState<string | null>(null)
  
  useEffect(() => {
    async function loadValues() {
      try {
        const response = await fetch('/api/values')
        const data = await response.json()
        setValues(data.values || [])
      } catch (error) {
        console.error('Failed to load values:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadValues()
  }, [])
  
  // Handle hash on mount (permalink)
  useEffect(() => {
    const hash = window.location.hash.slice(1) // Remove '#'
    if (hash && values.length > 0) {
      setExpandedValue(hash)
      // Scroll to target after render
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [values])
  
  const handleValueClick = (valueName: string) => {
    const newExpanded = expandedValue === valueName ? null : valueName
    setExpandedValue(newExpanded)
    
    // Update URL hash for permalink
    if (newExpanded) {
      window.history.pushState(null, '', `#${valueName}`)
    } else {
      window.history.pushState(null, '', window.location.pathname)
    }
  }
  
  const handleSectionChange = (value: string) => {
    setSection(value)
    if (value === "projects") router.push("/projects")
    if (value === "checks") router.push("/checks")
    if (value === "agents") router.push("/agents")
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
          <p className="text-muted-foreground" style={{ padding: 'var(--spacing-unit)' }}>Loading values...</p>
        ) : (
          <div className="flex items-start h-full overflow-x-auto" style={{ gap: 'calc(var(--spacing-unit) / 2)', padding: 'calc(var(--spacing-unit) / 2)' }}>
            {values.map((value) => (
              <ValueCard
                key={value.name}
                name={value.name}
                title={value.title}
                category={value.category}
                type={value.type}
                description={value.description}
                content={value.content}
                isExpanded={expandedValue === value.name}
                onClick={() => handleValueClick(value.name)}
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
