import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

// POST /api/demo/setup - Demo-Daten erstellen
export async function POST(request: NextRequest) {
  try {
    const demo_user_id = uuidv4()

    // 0. Demo-Profil erstellen
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: demo_user_id,
        email: 'demo@feedbacker.com',
        full_name: 'Demo User',
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (profileError) {
      console.error('Error creating demo profile:', profileError)
    }

    // 1. Demo Feedback-Quellen erstellen
    const source1Id = uuidv4()
    const source2Id = uuidv4()
    const source3Id = uuidv4()

    const demoSources = [
      {
        id: source1Id,
        user_id: demo_user_id,
        name: 'App Store Reviews',
        type: 'app_store' as const,
        url: 'https://apps.apple.com/app/feedbacker',
        is_active: true
      },
      {
        id: source2Id,
        user_id: demo_user_id,
        name: 'Twitter/X',
        type: 'social_media' as const,
        url: 'https://twitter.com/feedbacker',
        is_active: true
      },
      {
        id: source3Id,
        user_id: demo_user_id,
        name: 'Reddit',
        type: 'social_media' as const,
        url: 'https://reddit.com/r/feedbacker',
        is_active: true
      }
    ]

    // Feedback-Quellen einfügen
    const { error: sourcesError } = await supabaseAdmin
      .from('feedback_sources')
      .upsert(demoSources, { onConflict: 'id' })

    if (sourcesError) {
      console.error('Error creating demo sources:', sourcesError)
    }

    // 2. Demo Feedback-Einträge erstellen
    const demoFeedback = [
      {
        id: uuidv4(),
        user_id: demo_user_id,
        source_id: source1Id,
        title: 'Great app, but loading is slow',
        content: 'Love the interface and features, but the app takes too long to load on my phone. Please optimize the performance.',
        rating: 4,
        sentiment: 'positive' as const,
        category: 'performance',
        tags: ['mobile', 'performance', 'loading'],
        source_created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        user_id: demo_user_id,
        source_id: source2Id,
        title: 'Need dark mode!',
        content: 'This app is amazing but please add dark mode. My eyes hurt at night 😅',
        rating: 5,
        sentiment: 'positive' as const,
        category: 'feature',
        tags: ['dark-mode', 'ui', 'feature-request'],
        source_created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        user_id: demo_user_id,
        source_id: source3Id,
        title: 'Search function is confusing',
        content: 'The search feature is not intuitive. I can\'t find what I\'m looking for easily.',
        rating: 2,
        sentiment: 'negative' as const,
        category: 'usability',
        tags: ['search', 'usability', 'confusing'],
        source_created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        user_id: demo_user_id,
        source_id: source1Id,
        title: 'Perfect for my team',
        content: 'We\'ve been using this for 3 months now and it\'s transformed how we handle customer feedback. Highly recommended!',
        rating: 5,
        sentiment: 'positive' as const,
        category: 'general',
        tags: ['team', 'recommendation', 'transformation'],
        source_created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        user_id: demo_user_id,
        source_id: source2Id,
        title: 'Bug: App crashes on startup',
        content: 'The app crashes every time I try to open it on my iPhone 12. This is frustrating.',
        rating: 1,
        sentiment: 'negative' as const,
        category: 'bug',
        tags: ['crash', 'bug', 'iphone'],
        source_created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        user_id: demo_user_id,
        source_id: source3Id,
        title: 'New feature request',
        content: 'Would love to see integration with Slack. That would make our workflow much smoother.',
        rating: 4,
        sentiment: 'positive' as const,
        category: 'integration',
        tags: ['slack', 'integration', 'workflow'],
        source_created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        user_id: demo_user_id,
        source_id: source1Id,
        title: 'Good value for money',
        content: 'The pricing is reasonable and the features are worth it. Could use some UI improvements though.',
        rating: 4,
        sentiment: 'positive' as const,
        category: 'pricing',
        tags: ['pricing', 'value', 'ui'],
        source_created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        user_id: demo_user_id,
        source_id: source2Id,
        title: 'Customer support is excellent',
        content: 'Had an issue yesterday and the support team resolved it within hours. Great service!',
        rating: 5,
        sentiment: 'positive' as const,
        category: 'support',
        tags: ['support', 'service', 'quick-response'],
        source_created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    // Feedback-Einträge einfügen
    const { error: feedbackError } = await supabaseAdmin
      .from('feedback_items')
      .upsert(demoFeedback, { onConflict: 'id' })

    if (feedbackError) {
      console.error('Error creating demo feedback:', feedbackError)
    }

    return NextResponse.json({ 
      message: 'Demo data created successfully',
      sources: demoSources.length,
      feedback: demoFeedback.length
    })
  } catch (error) {
    console.error('Demo setup API Error:', error)
    return NextResponse.json(
      { error: 'Failed to create demo data' },
      { status: 500 }
    )
  }
}
