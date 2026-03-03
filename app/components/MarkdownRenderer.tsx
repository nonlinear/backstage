"use client"

import { useEffect, useRef } from 'react'
import { marked } from 'marked'
import mermaid from 'mermaid'

interface MarkdownRendererProps {
  content: string
  stripFirstLine?: boolean
}

export function MarkdownRenderer({ content, stripFirstLine = false }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    })
    
    async function renderContent() {
      if (!containerRef.current) return
      
      // Strip first line if needed (remove # TITLE)
      let processedContent = content
      if (stripFirstLine) {
        const lines = content.split('\n')
        processedContent = lines.slice(1).join('\n')
      }
      
      // Convert markdown to HTML
      const html = await marked(processedContent)
      containerRef.current.innerHTML = html
      
      // Render mermaid diagrams
      const mermaidElements = containerRef.current.querySelectorAll('code.language-mermaid')
      mermaidElements.forEach(async (element, index) => {
        const code = element.textContent || ''
        const id = `mermaid-${Date.now()}-${index}`
        try {
          const { svg } = await mermaid.render(id, code)
          const wrapper = document.createElement('div')
          wrapper.innerHTML = svg
          wrapper.className = 'mermaid-diagram'
          element.parentElement?.replaceWith(wrapper)
        } catch (error) {
          console.error('Mermaid rendering error:', error)
        }
      })
    }
    
    renderContent()
  }, [content, stripFirstLine])
  
  return (
    <div 
      ref={containerRef} 
      className="prose prose-sm max-w-none dark:prose-invert"
    />
  )
}
