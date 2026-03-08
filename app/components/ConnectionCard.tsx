"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { MarkdownRenderer } from "./MarkdownRenderer"

interface ConnectionCardProps {
  name: string
  title: string
  description: string
  content?: string
  isExpanded: boolean
  onClick: () => void
}

export function ConnectionCard({
  name,
  title,
  description,
  content,
  isExpanded,
  onClick
}: ConnectionCardProps) {
  return (
    <>
      <div id={name} className="scroll-mt-4" />
      <Card 
        className={`relative flex-shrink-0 transition-all duration-300 cursor-pointer hover:shadow-lg ${isExpanded ? 'w-[600px]' : 'w-[300px]'} h-full overflow-y-auto`}
        onClick={onClick}
      >
        <CardHeader>
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
