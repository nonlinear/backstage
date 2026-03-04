"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface ProjectCardProps {
  projectName: string
  projectDescription: string
}

export function ProjectCard({ projectName, projectDescription }: ProjectCardProps) {
  return (
    <Card className="w-full max-w-[300px] border-2 border-black sticky top-4 transition-all duration-300">
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
