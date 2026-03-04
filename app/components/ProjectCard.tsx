"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface ProjectCardProps {
  projectName: string
  projectDescription: string
  projectTier: number
  projectType: string
  activeCount: number
  backlogCount: number
  publishedCount: number
}

export function ProjectCard({ 
  projectName, 
  projectDescription, 
  projectTier, 
  projectType, 
  activeCount, 
  backlogCount, 
  publishedCount 
}: ProjectCardProps) {
  const totalEpics = activeCount + backlogCount + publishedCount
  
  return (
    <Card className="flex-shrink-0 w-[300px] h-full overflow-y-auto">
      <CardHeader>
        <h2 className="text-2xl font-semibold mb-2">{projectName}</h2>
        <p className="text-sm text-muted-foreground mb-3">{projectDescription}</p>
        
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Tier:</span> {projectTier}</p>
          <p><span className="font-medium">Type:</span> {projectType}</p>
          <p><span className="font-medium">Epics:</span> {totalEpics} total — {activeCount} active, {publishedCount} completed, {backlogCount} backlog</p>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Content placeholder */}
      </CardContent>
    </Card>
  )
}
