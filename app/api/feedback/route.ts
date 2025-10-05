import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/feedback - Alle Feedback-Einträge abrufen
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const source_id = searchParams.get('source_id')
    const sentiment = searchParams.get('sentiment')
    const category = searchParams.get('category')

    let query = supabaseAdmin
      .from('feedback_items')
      .select(`
        *,
        feedback_sources (
          id,
          name,
          type
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter anwenden
    if (source_id) {
      query = query.eq('source_id', source_id)
    }
    if (sentiment) {
      query = query.eq('sentiment', sentiment)
    }
    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    // Für Demo-Zwecke: Alle Daten zurückgeben (ohne user_id-Filter)
    // In der echten App würde hier nach user_id gefiltert werden

    if (error) {
      console.error('Error fetching feedback:', error)
      return NextResponse.json(
        { error: 'Failed to fetch feedback' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data, count: data?.length || 0 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/feedback - Neuen Feedback-Eintrag erstellen
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      source_id,
      title,
      content,
      rating,
      sentiment,
      category,
      tags,
      metadata,
      source_created_at
    } = body

    // Validation
    if (!source_id || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: source_id, title, content' },
        { status: 400 }
      )
    }

    // Für Demo-Zwecke verwenden wir eine feste user_id
    // In der echten App würde diese aus der Auth-Session kommen
    const demo_user_id = 'demo-user-id'

    const { data, error } = await supabaseAdmin
      .from('feedback_items')
      .insert({
        user_id: demo_user_id,
        source_id,
        title,
        content,
        rating,
        sentiment,
        category,
        tags,
        metadata,
        source_created_at: source_created_at || new Date().toISOString()
      })
      .select(`
        *,
        feedback_sources (
          id,
          name,
          type
        )
      `)
      .single()

    if (error) {
      console.error('Error creating feedback:', error)
      return NextResponse.json(
        { error: 'Failed to create feedback' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
