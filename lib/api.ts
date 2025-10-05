// API-Hook für Dashboard-Daten
export interface FeedbackItem {
  id: string
  user_id: string
  source_id: string
  title: string
  content: string
  rating: number
  sentiment: 'positive' | 'negative' | 'neutral'
  category: string
  tags: string[]
  metadata: any
  created_at: string
  updated_at: string
  source_created_at: string
  feedback_sources: {
    id: string
    name: string
    type: string
  }
}

export interface AnalyticsData {
  period: string
  totalFeedback: number
  sentiment: {
    positive: number
    negative: number
    neutral: number
    total: number
  }
  averageRating: number
  topSources: Array<{
    name: string
    count: number
  }>
  dailyTrends: Array<{
    date: string
    total: number
    positive: number
    negative: number
    neutral: number
  }>
}

export interface InsightsData {
  insights: Array<{
    id: string
    type: string
    title: string
    description: string
    confidence: number
    impact: string
    category: string
    tags: string[]
    created_at: string
  }>
  recommendations: Array<{
    id: string
    priority: string
    title: string
    description: string
    effort: string
    impact: string
    category: string
  }>
  summary: {
    totalFeedback: number
    period: string
    keyFindings: string[]
    sentiment: {
      positive: number
      negative: number
      neutral: number
    }
  }
}

// API-Funktionen
export async function fetchFeedback(params?: {
  limit?: number
  offset?: number
  source_id?: string
  sentiment?: string
  category?: string
}): Promise<{ data: FeedbackItem[]; count: number }> {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())
  if (params?.source_id) searchParams.set('source_id', params.source_id)
  if (params?.sentiment) searchParams.set('sentiment', params.sentiment)
  if (params?.category) searchParams.set('category', params.category)

  const response = await fetch(`/api/feedback?${searchParams}`)
  if (!response.ok) {
    throw new Error('Failed to fetch feedback')
  }
  return response.json()
}

export async function fetchAnalytics(period?: string): Promise<{ data: AnalyticsData }> {
  const searchParams = new URLSearchParams()
  if (period) searchParams.set('period', period)

  const response = await fetch(`/api/analytics?${searchParams}`)
  if (!response.ok) {
    throw new Error('Failed to fetch analytics')
  }
  return response.json()
}

export async function fetchInsights(): Promise<{ data: InsightsData }> {
  const response = await fetch('/api/insights')
  if (!response.ok) {
    throw new Error('Failed to fetch insights')
  }
  return response.json()
}
