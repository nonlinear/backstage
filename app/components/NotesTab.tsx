"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface NotesTabProps {
  entityType: 'epic' | 'agent'  // for API endpoint
  entityId: string  // project/epic or agent id
  epicId?: string  // only for epics (project/epic combo)
}

interface NoteFile {
  filename: string
  path: string
}

export function NotesTab({ entityType, entityId, epicId }: NotesTabProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [notes, setNotes] = useState<NoteFile[]>([])
  const [selectedNote, setSelectedNote] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  
  // Construct API endpoint based on entity type
  const apiEndpoint = entityType === 'epic' 
    ? `/api/projects/${entityId}/epics/${epicId}/notes`
    : `/api/agents/${entityId}/notes`
  
  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch(apiEndpoint)
        const data = await response.json()
        setNotes(data.notes || [])
        
        // Check URL hash for initial note
        const hash = window.location.hash.replace('#notes/', '')
        if (hash && data.notes?.find((n: NoteFile) => n.filename === hash)) {
          setSelectedNote(hash)
          loadNoteContent(hash)
        } else if (data.notes?.length > 0) {
          // Default to first note
          setSelectedNote(data.notes[0].filename)
          loadNoteContent(data.notes[0].filename)
        }
      } catch (error) {
        console.error('Failed to load notes:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadNotes()
  }, [apiEndpoint])
  
  async function loadNoteContent(filename: string) {
    try {
      const response = await fetch(`${apiEndpoint}/${filename}`)
      const data = await response.json()
      setContent(data.content || '')
    } catch (error) {
      console.error('Failed to load note content:', error)
      setContent('Failed to load note.')
    }
  }
  
  function handleNoteChange(filename: string) {
    setSelectedNote(filename)
    loadNoteContent(filename)
    
    // Update URL hash (permalink)
    window.history.replaceState(null, '', `#notes/${filename}`)
  }
  
  if (loading) {
    return <p className="text-muted-foreground">Loading notes...</p>
  }
  
  if (notes.length === 0) {
    return <p className="text-muted-foreground">No notes found.</p>
  }
  
  return (
    <div className="space-y-4">
      {/* Note selector dropdown */}
      <Select value={selectedNote} onValueChange={handleNoteChange}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select a note" />
        </SelectTrigger>
        <SelectContent>
          {notes.map((note) => (
            <SelectItem key={note.filename} value={note.filename}>
              {note.filename}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Note content (markdown) */}
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-md">
          {content}
        </pre>
      </div>
    </div>
  )
}
