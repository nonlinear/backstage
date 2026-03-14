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
import type { Task, TaskGroup, TaskItem } from "@/lib/epics"

interface EpicCardProps {
  version: string
  name: string
  description?: string
  status: string
  goal?: string
  tasks?: TaskItem[]
  notesCount?: number
  notesList?: { slug: string; title: string; content: string }[]
  activeTab: "tasks" | "notes"
  isCurrentEpic: boolean
  selectedNote?: string
  onTabChange: (tab: "tasks" | "notes") => void
  onNoteChange?: (noteSlug: string) => void
  onCardClick?: () => void
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
  isCurrentEpic,
  selectedNote: externalSelectedNote,
  onTabChange,
  onNoteChange,
  onCardClick
}: EpicCardProps) {
  // Count completed tasks (flat + grouped)
  const completedTasks = tasks.reduce((count, item) => {
    if ('group' in item) {
      return count + item.items.filter(t => t.checked).length
    }
    return count + (item.checked ? 1 : 0)
  }, 0)
  
  // Count total tasks
  const totalTasks = tasks.reduce((count, item) => {
    if ('group' in item) {
      return count + item.items.length
    }
    return count + 1
  }, 0)
  
  const [localSelectedNote, setLocalSelectedNote] = useState(notesList[0]?.slug || "")
  
  // Use external or local state
  const selectedNote = externalSelectedNote !== undefined ? externalSelectedNote : localSelectedNote
  
  // Handle note selection
  const handleNoteSelect = (slug: string) => {
    if (onNoteChange) {
      onNoteChange(slug)
    } else {
      setLocalSelectedNote(slug)
    }
  }
  
  // Find selected note content
  const noteContent = notesList.find(n => n.slug === selectedNote)?.content || ""
  
  return (
    <>
      <div id={version} className="scroll-mt-4" />
      <Card 
        onClick={onCardClick}
        className={`relative flex-shrink-0 transition-all duration-300 cursor-pointer w-[300px] ${status === 'done' ? 'done' : ''} ${status === 'active' ? 'active' : ''} ${status === 'archive' ? 'archive' : ''} ${(status === 'done' || status === 'archive') && !isCurrentEpic ? 'opacity-50' : 'opacity-100'} h-full overflow-y-auto`}
      >
      {/* Status badge top-right (absolute) */}
      <Badge variant="outline" className="absolute top-4 right-4 text-xs capitalize">
        {status}
      </Badge>
      
      <CardHeader>
        
        {/* Title with version superscript */}
        <h3 className="text-xl font-bold mb-2">
          {name}<sup className="text-muted-foreground text-sm ml-1">{version}</sup>
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
          <TabsList className="justify-start pt-1">
            <TabsTrigger value="tasks">
              Tasks<sup className="ml-0.5">{completedTasks} of {totalTasks}</sup>
            </TabsTrigger>
            <TabsTrigger value="notes">
              Notes<sup className="ml-0.5">{notesCount}</sup>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks" className="space-y-2">{tasks.length > 0 ? (
              tasks.map((item, idx) => {
                // Task group
                if ('group' in item && 'items' in item) {
                  const taskGroup = item as { group: string; items: Array<{ text: string; checked: boolean }> }
                  return (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground mt-2">
                        {taskGroup.group}
                      </h4>
                      {taskGroup.items.map((task, taskIdx) => {
                        const taskText = typeof task === 'object' && task !== null && 'text' in task 
                          ? String(task.text) 
                          : String(task)
                        return (
                          <div key={taskIdx} className="flex items-start gap-2 ml-4">
                            <Checkbox 
                              checked={typeof task === 'object' && 'checked' in task ? task.checked : false}
                              disabled
                              className="mt-0.5"
                            />
                            <label className="text-sm leading-tight">
                              <MarkdownRenderer content={taskText} />
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  )
                }
                // Flat task
                if ('text' in item && 'checked' in item) {
                  const flatTask = item as { text: string; checked: boolean }
                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <Checkbox 
                        checked={flatTask.checked}
                        disabled
                        className="mt-0.5"
                      />
                      <label className="text-sm leading-tight">
                        <MarkdownRenderer content={flatTask.text} />
                      </label>
                    </div>
                  )
                }
                // Fallback (should never happen)
                return null
              })
            ) : (
              <p className="text-xs text-muted-foreground italic">No tasks</p>
            )}
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-3">{notesList.length > 0 ? (
              <>
                <Select value={selectedNote} onValueChange={handleNoteSelect}>
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
    </>
  )
}
