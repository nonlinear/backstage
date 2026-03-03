"use client"

import { useState } from "react"
import { MarkdownRenderer } from "./MarkdownRenderer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import type { Task } from "@/lib/epics"

interface EpicCardProps {
  version: string
  name: string
  description?: string
  status: string
  goal?: string
  tasks?: Task[]
  notesCount?: number
  notesList?: { slug: string; title: string; content: string }[]
  activeTab: "tasks" | "notes"
  onTabChange: (tab: "tasks" | "notes") => void
}

function formatName(name: string): string {
  // Convert slug to readable title: "backstage-gui" → "Backstage Gui"
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function EpicCard({ 
  version, 
  name, 
  description = "", 
  status,
  goal = "",
  tasks = [],
  notesCount = 0,
  notesList = [],
  activeTab,
  onTabChange
}: EpicCardProps) {
  const formattedName = formatName(name)
  const completedTasks = tasks.filter(t => t.checked).length
  const [selectedNote, setSelectedNote] = useState(notesList[0]?.slug || "")
  
  // Find selected note content
  const noteContent = notesList.find(n => n.slug === selectedNote)?.content || ""
  
  // Expand to 500px when Notes tab is active
  const cardWidth = activeTab === "notes" ? "min-w-[500px] max-w-[500px]" : "min-w-[300px] max-w-[300px]"
  
  return (
    <Card id={version} className={`${cardWidth} flex-shrink-0 transition-all duration-300`}>
      <CardHeader>
        {/* Status badge top-right */}
        <div className="flex justify-end mb-1">
          <Badge variant="outline" className="text-xs capitalize">
            {status}
          </Badge>
        </div>
        
        {/* Title with version superscript */}
        <h3 className="text-xl font-bold mb-2">
          {formattedName}<sup className="text-muted-foreground text-sm ml-1">{version}</sup>
        </h3>
        
        {/* Goal */}
        {goal && (
          <p className="text-sm text-muted-foreground mb-3">
            {goal}
          </p>
        )}
      </CardHeader>
      
      <CardContent>
        {/* Tabs: Tasks and Notes */}
        <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as "tasks" | "notes")} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="tasks">
              Tasks<sup className="ml-1">{completedTasks} of {tasks.length}</sup>
            </TabsTrigger>
            <TabsTrigger value="notes">
              Notes<sup className="ml-1">{notesCount}</sup>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks" className="space-y-2">
            {tasks.length > 0 ? (
              tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Checkbox 
                    checked={task.checked}
                    disabled
                    className="mt-0.5"
                  />
                  <label className="text-sm leading-tight">
                    {task.text}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground italic">No tasks</p>
            )}
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-3 overflow-y-auto max-h-[60vh]">
            {notesList.length > 0 ? (
              <>
                <Select value={selectedNote} onValueChange={setSelectedNote}>
                  <SelectTrigger className="w-full justify-start border-0 shadow-none p-0 focus:ring-0 hover:bg-transparent">
                    <SelectValue>
                      <span className="font-bold text-foreground">
                        {notesList.find(n => n.slug === selectedNote)?.title || selectedNote}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {notesList.map((note) => (
                      <SelectItem key={note.slug} value={note.slug}>
                        {note.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Markdown content (strip first line # TITLE) */}
                <div className="mt-4">
                  <MarkdownRenderer content={noteContent} stripFirstLine={true} />
                </div>
              </>
            ) : (
              <p className="text-xs text-muted-foreground italic">No notes</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
