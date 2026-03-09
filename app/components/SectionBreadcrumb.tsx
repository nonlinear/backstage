"use client"

import { useRouter, usePathname } from 'next/navigation'
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

const sections = [
  { value: "projects", label: "Projects", path: "/projects", count: 14 },
  { value: "checks", label: "Checks", path: "/checks", count: 67 },
  { value: "agents", label: "Agents", path: "/agents", count: 8 },
  { value: "values", label: "Values", path: "/values", count: 20 },
  { value: "connections", label: "Connections", path: "/connections", count: 0 },
];

interface SectionBreadcrumbProps {
  currentSection: string
  showSubsection?: boolean
  subsectionLabel?: string
  subsectionCount?: number
}

export function SectionBreadcrumb({ 
  currentSection, 
  showSubsection = false,
  subsectionLabel,
  subsectionCount
}: SectionBreadcrumbProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleSectionChange = (value: string) => {
    const section = sections.find(s => s.value === value)
    if (section && section.path !== pathname) {
      router.push(section.path)
    }
  }
  
  const current = sections.find(s => s.value === currentSection)
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Select value={currentSection} onValueChange={handleSectionChange}>
            <SelectTrigger className="justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
              <SelectValue>
                <span className="font-bold text-foreground">
                  {current?.label}<sup className="text-muted-foreground font-normal">{current?.count}</sup>
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
        
        {showSubsection && (
          <>
            <span className="text-muted-foreground">/</span>
            <BreadcrumbItem>
              <span className="font-bold text-foreground">
                {subsectionLabel}
                {subsectionCount !== undefined && (
                  <sup className="text-muted-foreground font-normal">{subsectionCount}</sup>
                )}
              </span>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
