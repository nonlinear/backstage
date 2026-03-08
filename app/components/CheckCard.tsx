"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CheckCardProps {
  name: string
  title: string
  type: 'deterministic' | 'probabilistic'
  description: string
  diagram?: string
  isExpanded: boolean
  onClick: () => void
}

function MermaidDiagram({ diagram, id }: { diagram: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (containerRef.current && diagram) {
      mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
      mermaid.render(`mermaid-${id}`, diagram).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      })
    }
  }, [diagram, id])
  
  return <div ref={containerRef} className="mermaid-container" />
}

export function CheckCard({
  name,
  title,
  type,
  description,
  diagram,
  isExpanded,
  onClick
}: CheckCardProps) {
  return (
    <>
      <div id={name} className="scroll-mt-4" />
      <Card 
        className={`relative flex-shrink-0 transition-all duration-300 cursor-pointer hover:shadow-lg ${isExpanded ? 'w-[600px]' : 'w-[300px]'} h-full overflow-y-auto`}
        onClick={onClick}
      >
        {/* Type badge top-right */}
        <Badge variant="outline" className="absolute top-4 right-4 text-xs capitalize">
          {type}
        </Badge>
        
        <CardHeader>
          <CardTitle className={isExpanded ? "text-2xl" : "text-base"}>{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        
        {diagram && (
          <CardContent>
            <MermaidDiagram diagram={diagram} id={name} />
          </CardContent>
        )}
      </Card>
    </>
  )
}
