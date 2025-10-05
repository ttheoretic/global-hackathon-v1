import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/debug/tables - Alle Tabellen abfragen
export async function GET(request: NextRequest) {
  try {
    const [profiles, sources, feedback, analyses, subscriptions] = await Promise.all([
      supabaseAdmin.from('profiles').select('*'),
      supabaseAdmin.from('feedback_sources').select('*'),
      supabaseAdmin.from('feedback_items').select('*'),
      supabaseAdmin.from('ai_analyses').select('*'),
      supabaseAdmin.from('subscriptions').select('*')
    ])

    return NextResponse.json({
      profiles: {
        data: profiles.data,
        error: profiles.error,
        count: profiles.data?.length || 0
      },
      sources: {
        data: sources.data,
        error: sources.error,
        count: sources.data?.length || 0
      },
      feedback: {
        data: feedback.data,
        error: feedback.error,
        count: feedback.data?.length || 0
      },
      analyses: {
        data: analyses.data,
        error: analyses.error,
        count: analyses.data?.length || 0
      },
      subscriptions: {
        data: subscriptions.data,
        error: subscriptions.error,
        count: subscriptions.data?.length || 0
      }
    })
  } catch (error) {
    console.error('Debug Tables API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch table data' },
      { status: 500 }
    )
  }
}
