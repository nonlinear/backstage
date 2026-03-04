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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

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
    if (value === "projects") router.push("/projects/all")
    if (value === "agents") router.push("/agents")
  }
  
  const currentSection = sections.find(s => s.value === section)
  
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
                    {currentSection?.label}<sup>{checks.length || currentSection?.count}</sup>
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
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {loading ? (
        <div className="mt-8 text-muted-foreground">Loading checks...</div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {checks.map((check) => (
            <Card key={check.name}>
              <CardHeader>
                <CardTitle>{check.title}</CardTitle>
                <CardDescription>{check.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
