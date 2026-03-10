import { NextResponse } from 'next/server'
import { getAllAgents, getAgentsCountBySquad } from '@/lib/agents'

export async function GET() {
  try {
    const agents = getAllAgents()
    const countsBySquad = getAgentsCountBySquad()
    
    return NextResponse.json({
      agents,
      countsBySquad,
      total: agents.length
    })
  } catch (error) {
    console.error('Error in /api/agents:', error)
    return NextResponse.json(
      { error: 'Failed to load agents' },
      { status: 500 }
    )
  }
}
