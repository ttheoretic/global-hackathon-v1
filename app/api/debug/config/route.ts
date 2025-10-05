import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

// GET /api/debug/config - Supabase-Konfiguration prüfen
export async function GET(request: NextRequest) {
  try {
    // Teste einfache Abfrage
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Teste Insert
    const testId = uuidv4()
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: testId,
        email: 'test@test.com',
        full_name: 'Test User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()

    // Lösche Test-Daten
    if (insertData) {
      await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', testId)
    }

    return NextResponse.json({
      config: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      test: {
        select: { data, error },
        insert: { data: insertData, error: insertError }
      }
    })
  } catch (error) {
    console.error('Debug Config API Error:', error)
    return NextResponse.json(
      { error: 'Failed to test config', details: error },
      { status: 500 }
    )
  }
}
