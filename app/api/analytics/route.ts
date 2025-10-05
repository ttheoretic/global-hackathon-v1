import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/analytics - KPI-Daten und Analytics abrufen
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // Tage
    const days = parseInt(period)

    // Demo: Alle Daten verwenden (kein user_id-Filter)
    // In der echten App würde hier die user_id aus der Auth-Session kommen

    // Berechne Zeitraum
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // 1. Gesamtzahl der Feedback-Einträge
    const { count: totalFeedback, error: totalError } = await supabaseAdmin
      .from('feedback_items')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString())

    if (totalError) {
      console.error('Error counting total feedback:', totalError)
    }

    // 2. Sentiment-Verteilung
    const { data: sentimentData, error: sentimentError } = await supabaseAdmin
      .from('feedback_items')
      .select('sentiment')
      .gte('created_at', startDate.toISOString())

    if (sentimentError) {
      console.error('Error fetching sentiment data:', sentimentError)
    }

    // 3. Durchschnittsbewertung
    const { data: ratingData, error: ratingError } = await supabaseAdmin
      .from('feedback_items')
      .select('rating')
      .gte('created_at', startDate.toISOString())
      .not('rating', 'is', null)

    if (ratingError) {
      console.error('Error fetching rating data:', ratingError)
    }

    // 4. Feedback nach Quellen
    const { data: sourcesData, error: sourcesError } = await supabaseAdmin
      .from('feedback_items')
      .select(`
        feedback_sources (
          name,
          type
        )
      `)
      .gte('created_at', startDate.toISOString())

    if (sourcesError) {
      console.error('Error fetching sources data:', sourcesError)
    }

    // 5. Tägliche Trends (letzte 7 Tage)
    const trendDays = Math.min(days, 7)
    const trendStartDate = new Date()
    trendStartDate.setDate(trendStartDate.getDate() - trendDays)

    const { data: trendData, error: trendError } = await supabaseAdmin
      .from('feedback_items')
      .select('created_at, sentiment')
      .gte('created_at', trendStartDate.toISOString())
      .order('created_at', { ascending: true })

    if (trendError) {
      console.error('Error fetching trend data:', trendError)
    }

    // Daten verarbeiten
    const sentimentCounts = { positive: 0, negative: 0, neutral: 0 }
    sentimentData?.forEach(item => {
      if (item.sentiment && sentimentCounts.hasOwnProperty(item.sentiment)) {
        sentimentCounts[item.sentiment as keyof typeof sentimentCounts]++
      }
    })

    const averageRating = ratingData?.length 
      ? ratingData.reduce((sum, item) => sum + (item.rating || 0), 0) / ratingData.length
      : 0

    const sourcesCount = {}
    sourcesData?.forEach(item => {
      const sourceName = item.feedback_sources?.name || 'Unknown'
      sourcesCount[sourceName] = (sourcesCount[sourceName] || 0) + 1
    })

    // Tägliche Trends verarbeiten
    const dailyTrends = []
    for (let i = 0; i < trendDays; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (trendDays - 1 - i))
      const dateStr = date.toISOString().split('T')[0]
      
      const dayData = trendData?.filter(item => 
        item.created_at.startsWith(dateStr)
      ) || []
      
      dailyTrends.push({
        date: dateStr,
        total: dayData.length,
        positive: dayData.filter(item => item.sentiment === 'positive').length,
        negative: dayData.filter(item => item.sentiment === 'negative').length,
        neutral: dayData.filter(item => item.sentiment === 'neutral').length
      })
    }

    const analytics = {
      period: `${days} days`,
      totalFeedback: totalFeedback || 0,
      sentiment: {
        positive: sentimentCounts.positive,
        negative: sentimentCounts.negative,
        neutral: sentimentCounts.neutral,
        total: sentimentCounts.positive + sentimentCounts.negative + sentimentCounts.neutral
      },
      averageRating: Math.round(averageRating * 10) / 10,
      topSources: Object.entries(sourcesCount)
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .slice(0, 5)
        .map(([name, count]) => ({ name, count })),
      dailyTrends
    }

    return NextResponse.json({ data: analytics })
  } catch (error) {
    console.error('Analytics API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
