import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { id: string, filename: string } }
) {
  try {
    const notePath = path.join(
      process.env.HOME!,
      'Backstage/agents',
      params.id,
      params.filename
    )
    
    if (!fs.existsSync(notePath)) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }
    
    const content = fs.readFileSync(notePath, 'utf-8')
    
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error loading note content:', error)
    return NextResponse.json({ error: 'Failed to load note' }, { status: 500 })
  }
}
