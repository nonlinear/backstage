"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface ProjectCardProps {
  projectName: string
  projectDescription: string
  isCurrent?: boolean
  onClick?: () => void
}

export function ProjectCard({ projectName, projectDescription, isCurrent = false, onClick }: ProjectCardProps) {
  return (
    <Card 
      className={`card ${isCurrent ? 'current' : ''} w-full max-w-[300px] transition-all duration-300`}
      onClick={onClick}
    >
      <CardHeader>
        <h2 className="text-2xl font-semibold mb-2">{projectName}</h2>
        <p className="text-sm text-muted-foreground">{projectDescription}</p>
      </CardHeader>
      
      <CardContent>
        {/* Content placeholder */}
      </CardContent>
    </Card>
  )
}
