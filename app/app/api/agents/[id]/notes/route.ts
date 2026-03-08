import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const agentDir = path.join(process.env.HOME!, 'Backstage/agents', params.id)
    
    if (!fs.existsSync(agentDir)) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }
    
    // Scan for .md files (exclude agent.yml)
    const files = fs.readdirSync(agentDir)
      .filter(name => name.endsWith('.md'))
      .map(filename => ({
        filename,
        path: path.join(agentDir, filename)
      }))
    
    return NextResponse.json({ notes: files })
  } catch (error) {
    console.error('Error loading agent notes:', error)
    return NextResponse.json({ error: 'Failed to load notes' }, { status: 500 })
  }
}
