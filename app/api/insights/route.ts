import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/insights - KI-Insights und Analysen abrufen
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type') || 'insights'

    // Demo user_id - in der echten App aus Auth-Session
    const demo_user_id = 'demo-user-id'

    // Mock KI-Insights für Demo-Zwecke
    // In der echten App würde hier eine KI-API aufgerufen werden
    const mockInsights = {
      insights: [
        {
          id: 'insight-1',
          type: 'trend',
          title: 'Mobile Performance Feedback steigt',
          description: '47% mehr Feedback zu Ladezeiten in den letzten 7 Tagen',
          confidence: 0.89,
          impact: 'high',
          category: 'performance',
          tags: ['mobile', 'performance', 'loading'],
          created_at: new Date().toISOString()
        },
        {
          id: 'insight-2',
          type: 'sentiment',
          title: 'Positive Stimmung bei neuen Features',
          description: '92% positive Bewertungen für die neue Suchfunktion',
          confidence: 0.94,
          impact: 'medium',
          category: 'feature',
          tags: ['search', 'feature', 'positive'],
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'insight-3',
          type: 'actionable',
          title: 'Benutzer wünschen Dark Mode',
          description: '23 Erwähnungen von Dark Mode in den letzten 30 Tagen',
          confidence: 0.76,
          impact: 'medium',
          category: 'ui',
          tags: ['dark-mode', 'ui', 'feature-request'],
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      recommendations: [
        {
          id: 'rec-1',
          priority: 'high',
          title: 'Mobile Ladezeiten optimieren',
          description: 'Implementiere Lazy Loading für Bilder und komprimiere Assets',
          effort: 'medium',
          impact: 'high',
          category: 'performance'
        },
        {
          id: 'rec-2',
          priority: 'medium',
          title: 'Dark Mode implementieren',
          description: 'Füge Dark Mode als Benutzereinstellung hinzu',
          effort: 'high',
          impact: 'medium',
          category: 'feature'
        },
        {
          id: 'rec-3',
          priority: 'low',
          title: 'Suchfunktion erweitern',
          description: 'Füge Filter und Sortierung zur Suche hinzu',
          effort: 'medium',
          impact: 'medium',
          category: 'feature'
        }
      ],
      summary: {
        totalFeedback: 1247,
        period: '30 days',
        keyFindings: [
          'Mobile Performance ist Hauptthema',
          'Neue Features werden gut angenommen',
          'Dark Mode wird häufig gewünscht'
        ],
        sentiment: {
          positive: 68,
          negative: 15,
          neutral: 17
        }
      }
    }

    // Versuche echte KI-Analysen aus der Datenbank zu laden
    const { data: aiAnalyses, error } = await supabaseAdmin
      .from('ai_analyses')
      .select('*')
      .eq('user_id', demo_user_id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching AI analyses:', error)
      // Fallback zu Mock-Daten
      return NextResponse.json({ 
        data: mockInsights,
        source: 'mock'
      })
    }

    // Kombiniere echte und Mock-Daten
    const realInsights = aiAnalyses?.map(analysis => ({
      id: analysis.id,
      type: analysis.analysis_type,
      title: analysis.result.title || 'KI-Analyse',
      description: analysis.result.description || 'Automatisch generierte Analyse',
      confidence: analysis.result.confidence || 0.8,
      impact: analysis.result.impact || 'medium',
      category: analysis.result.category || 'general',
      tags: analysis.result.tags || [],
      created_at: analysis.created_at
    })) || []

    const combinedInsights = {
      ...mockInsights,
      insights: [...realInsights, ...mockInsights.insights].slice(0, limit)
    }

    return NextResponse.json({ 
      data: combinedInsights,
      source: aiAnalyses?.length ? 'mixed' : 'mock'
    })
  } catch (error) {
    console.error('Insights API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    )
  }
}

// POST /api/insights - Neue KI-Analyse erstellen
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { feedback_items, analysis_type, result } = body

    // Validation
    if (!feedback_items || !analysis_type || !result) {
      return NextResponse.json(
        { error: 'Missing required fields: feedback_items, analysis_type, result' },
        { status: 400 }
      )
    }

    // Demo user_id - in der echten App aus Auth-Session
    const demo_user_id = 'demo-user-id'

    const { data, error } = await supabaseAdmin
      .from('ai_analyses')
      .insert({
        user_id: demo_user_id,
        feedback_items,
        analysis_type,
        result
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating AI analysis:', error)
      return NextResponse.json(
        { error: 'Failed to create AI analysis' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Insights API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
