import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/debug - Debug-Informationen
export async function GET(request: NextRequest) {
  try {
    // Alle Tabellen abfragen
    const [sources, feedback] = await Promise.all([
      supabaseAdmin.from('feedback_sources').select('*'),
      supabaseAdmin.from('feedback_items').select('*')
    ])

    return NextResponse.json({
      sources: {
        data: sources.data,
        error: sources.error,
        count: sources.data?.length || 0
      },
      feedback: {
        data: feedback.data,
        error: feedback.error,
        count: feedback.data?.length || 0
      }
    })
  } catch (error) {
    console.error('Debug API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch debug info' },
      { status: 500 }
    )
  }
}
