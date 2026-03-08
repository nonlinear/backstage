"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarkdownRenderer } from "./MarkdownRenderer"

interface ValueCardProps {
  name: string
  title: string
  category: string
  type: 'deterministic' | 'probabilistic'
  description: string
  content?: string
  isExpanded: boolean
  onClick: () => void
}

export function ValueCard({
  name,
  title,
  category,
  type,
  description,
  content,
  isExpanded,
  onClick
}: ValueCardProps) {
  return (
    <>
      <div id={name} className="scroll-mt-4" />
      <Card 
        className={`relative flex-shrink-0 transition-all duration-300 cursor-pointer hover:shadow-lg ${isExpanded ? 'w-[600px]' : 'w-[300px]'} h-full overflow-y-auto`}
        onClick={onClick}
      >
        {/* Category badge top-left */}
        <Badge variant="secondary" className="absolute top-4 left-4 text-xs capitalize">
          {category}
        </Badge>
        
        {/* Type badge top-right */}
        <Badge variant="outline" className="absolute top-4 right-4 text-xs capitalize">
          {type}
        </Badge>
        
        <CardHeader className="pt-12">
          <CardTitle className={isExpanded ? "text-2xl" : "text-base"}>{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        
        {isExpanded && content && (
          <CardContent>
            <MarkdownRenderer content={content} stripFirstLine={false} />
          </CardContent>
        )}
      </Card>
    </>
  )
}
