import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

// POST /api/debug/insert - Direkt Daten einfügen
export async function POST(request: NextRequest) {
  try {
    const userId = uuidv4()
    const sourceId = uuidv4()

    // 1. Feedback-Quelle einfügen
    const { data: sourceData, error: sourceError } = await supabaseAdmin
      .from('feedback_sources')
      .insert({
        id: sourceId,
        user_id: userId,
        name: 'Test Source',
        type: 'app_store',
        url: 'https://test.com',
        is_active: true
      })
      .select()

    // 2. Feedback-Eintrag einfügen
    const { data: feedbackData, error: feedbackError } = await supabaseAdmin
      .from('feedback_items')
      .insert({
        id: uuidv4(),
        user_id: userId,
        source_id: sourceId,
        title: 'Test Feedback',
        content: 'This is a test feedback entry',
        rating: 5,
        sentiment: 'positive',
        category: 'test',
        tags: ['test'],
        source_created_at: new Date().toISOString()
      })
      .select()

    return NextResponse.json({
      source: {
        data: sourceData,
        error: sourceError
      },
      feedback: {
        data: feedbackData,
        error: feedbackError
      }
    })
  } catch (error) {
    console.error('Debug Insert API Error:', error)
    return NextResponse.json(
      { error: 'Failed to insert debug data' },
      { status: 500 }
    )
  }
}
