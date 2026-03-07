"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Check } from "@/lib/checks"
import { useRouter } from "next/navigation"

interface ProjectCardProps {
  projectName: string
  projectDescription: string
  projectTier: string | number  // "flagship" | "experimental" | "backlog" | number (legacy)
  projectType: string
  activeCount: number
  backlogCount: number
  publishedCount: number
  checks: Check[]
  showViewEpicsButton?: boolean
}

export function ProjectCard({ 
  projectName, 
  projectDescription, 
  projectTier, 
  projectType, 
  activeCount, 
  backlogCount, 
  publishedCount,
  checks,
  showViewEpicsButton = false
}: ProjectCardProps) {
  const router = useRouter()
  const totalEpics = activeCount + backlogCount + publishedCount
  
  return (
    <Card className="flex-shrink-0 w-[300px] h-full flex flex-col relative">
      {/* Tier badge top-right (absolute, same as EpicCard) */}
      <Badge variant="outline" className="absolute top-4 right-4 text-xs capitalize">
        {typeof projectTier === 'string' ? projectTier : `tier-${projectTier}`}
      </Badge>
      
      <CardHeader>
        <h2 className="text-2xl font-semibold mb-2">{projectName}</h2>
        <p className="text-sm text-muted-foreground mb-3">{projectDescription}</p>
        
        <div className="space-y-1 text-sm text-muted-foreground">
          <p><span className="font-medium">Type:</span> {projectType}</p>
          <p><span className="font-medium">Epics:</span> {totalEpics} total — {activeCount} active, {publishedCount} completed, {backlogCount} backlog</p>
        </div>
        
        {checks.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {checks.map((check) => (
              <Popover key={check.name}>
                <PopoverTrigger asChild>
                  <Badge variant="outline" className="cursor-pointer">
                    {check.name}
                  </Badge>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{check.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {check.type}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {check.description}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        )}
      </CardHeader>
      
      {/* Elastic spacer */}
      <div className="flex-1" />
      
      {showViewEpicsButton && (
        <CardContent className="pt-0">
          <Button 
            variant="outline" 
            className="w-full cursor-pointer"
            onClick={() => router.push(`/projects/${projectName.toLowerCase()}`)}
          >
            View epics
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
