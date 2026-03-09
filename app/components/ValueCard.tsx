"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MarkdownRenderer } from "./MarkdownRenderer"

interface ValueUsage {
  global: boolean
  projects: string[]
  squads: string[]
  agents: string[]
}

interface ValueCardProps {
  name: string
  title: string
  category: string
  type: 'deterministic' | 'probabilistic'
  description: string
  content?: string
  usage?: ValueUsage
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
  usage,
  isExpanded,
  onClick
}: ValueCardProps) {
  const [activeTab, setActiveTab] = useState<"used-in" | "notes">("used-in")
  
  return (
    <>
      <div id={name} className="scroll-mt-4" />
      <Card 
        className={`relative flex-shrink-0 transition-all duration-300 cursor-pointer hover:shadow-lg ${isExpanded ? 'w-[600px]' : 'w-[300px]'} h-full overflow-y-auto`}
        onClick={(e) => {
          // Don't collapse when clicking inside tabs
          if (!isExpanded || (e.target as HTMLElement).closest('.tabs-wrapper')) return
          onClick()
        }}
      >
        {/* Category badge top-left */}
        <Badge variant="secondary" className="absolute top-4 left-4 text-xs capitalize">
          {category}
        </Badge>
        
        {/* Type badge top-right */}
        <Badge variant="outline" className="absolute top-4 right-4 text-xs capitalize">
          {type}
        </Badge>
        
        <CardHeader className="pt-12" onClick={!isExpanded ? onClick : undefined}>
          <CardTitle className={isExpanded ? "text-2xl" : "text-base"}>{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="tabs-wrapper" onClick={(e) => e.stopPropagation()}>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "used-in" | "notes")} className="w-full">
              <TabsList className="justify-start pt-1">
                <TabsTrigger value="used-in">Used in</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="used-in" className="space-y-3 mt-4">
                {/* Global */}
                {usage?.global && (
                  <div>
                    <Badge variant="outline" className="text-xs">Global</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Applied to all agents</p>
                  </div>
                )}
                
                {/* Projects */}
                <div>
                  <p className="text-sm font-semibold mb-2">Projects:</p>
                  {usage?.projects && usage.projects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {usage.projects.map(proj => (
                        <Badge key={proj} variant="outline" className="text-xs">{proj}</Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs italic text-muted-foreground">None</Badge>
                  )}
                </div>
                
                {/* Squads */}
                <div>
                  <p className="text-sm font-semibold mb-2">Squads:</p>
                  {usage?.squads && usage.squads.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {usage.squads.map(squad => (
                        <Badge key={squad} variant="outline" className="text-xs">{squad}</Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs italic text-muted-foreground">None</Badge>
                  )}
                </div>
                
                {/* Agents */}
                <div>
                  <p className="text-sm font-semibold mb-2">Agents:</p>
                  {usage?.agents && usage.agents.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {usage.agents.map(agent => (
                        <Badge key={agent} variant="outline" className="text-xs">{agent}</Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs italic text-muted-foreground">None</Badge>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-4">
                {content ? (
                  <MarkdownRenderer content={content} stripFirstLine={false} />
                ) : (
                  <p className="text-xs text-muted-foreground italic">No content</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </>
  )
}
