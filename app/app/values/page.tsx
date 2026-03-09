"use client"

import { useState, useEffect } from 'react'
import { SectionBreadcrumb } from "@/components/SectionBreadcrumb"
import { ValueCard } from "@/components/ValueCard"

interface ValueUsage {
  global: boolean
  projects: string[]
  squads: string[]
  agents: string[]
}

interface Value {
  name: string
  title: string
  category: string
  type: 'deterministic' | 'probabilistic'
  description: string
  content?: string
  usage?: ValueUsage
}

export default function ValuesPage() {
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
  
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed breadcrumb */}
      <div className="flex items-center gap-6 border-b bg-background header-with-icon" style={{ padding: 'var(--spacing-unit)' }}>
        <h1 className="text-2xl font-bold">Backstage</h1>
        <span className="text-muted-foreground">/</span>
        <SectionBreadcrumb currentSection="values" />
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
                usage={value.usage}
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
