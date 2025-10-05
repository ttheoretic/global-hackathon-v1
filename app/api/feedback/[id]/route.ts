import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/feedback/[id] - Einzelnen Feedback-Eintrag abrufen
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('feedback_items')
      .select(`
        *,
        feedback_sources (
          id,
          name,
          type
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching feedback item:', error)
      return NextResponse.json(
        { error: 'Feedback item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/feedback/[id] - Feedback-Eintrag aktualisieren
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      content,
      rating,
      sentiment,
      category,
      tags,
      metadata
    } = body

    const { data, error } = await supabaseAdmin
      .from('feedback_items')
      .update({
        title,
        content,
        rating,
        sentiment,
        category,
        tags,
        metadata,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
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
      console.error('Error updating feedback item:', error)
      return NextResponse.json(
        { error: 'Failed to update feedback item' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/feedback/[id] - Feedback-Eintrag löschen
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('feedback_items')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting feedback item:', error)
      return NextResponse.json(
        { error: 'Failed to delete feedback item' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Feedback item deleted successfully' })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
