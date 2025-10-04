import { Suspense } from 'react'
import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  TrendingUp, 
  Brain, 
  Plus,
  BarChart3,
  Users,
  Star,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

async function DashboardContent() {
  const supabase = createServerClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect('/auth/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get feedback sources count
  const { count: sourcesCount } = await supabase
    .from('feedback_sources')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // Get feedback items count
  const { count: feedbackCount } = await supabase
    .from('feedback_items')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // Get recent feedback items
  const { data: recentFeedback } = await supabase
    .from('feedback_items')
    .select(`
      *,
      feedback_sources!inner(name)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // Get sentiment distribution
  const { data: sentimentData } = await supabase
    .from('feedback_items')
    .select('sentiment')
    .eq('user_id', user.id)
    .not('sentiment', 'is', null)

  const sentimentStats = sentimentData?.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Willkommen zurück, {profile?.full_name || user.email}!
            </h1>
            <p className="text-muted-foreground">
              Hier ist ein Überblick über Ihr Feedback-Management.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback-Quellen</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sourcesCount || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Aktive Quellen
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gesamt Feedback</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{feedbackCount || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Gesammelte Items
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Durchschnittsbewertung</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2</div>
                <p className="text-xs text-muted-foreground">
                  ⭐⭐⭐⭐⭐
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">KI-Analysen</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Erstellt diesen Monat
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Feedback */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Neuestes Feedback</CardTitle>
                      <CardDescription>
                        Ihre zuletzt gesammelten Feedback-Items
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/feedback">
                        Alle anzeigen
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentFeedback && recentFeedback.length > 0 ? (
                    <div className="space-y-4">
                      {recentFeedback.map((item) => (
                        <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium truncate">{item.title}</h4>
                              <Badge 
                                variant="outline" 
                                className={item.sentiment ? 
                                  item.sentiment === 'positive' ? 'border-green-200 text-green-700' :
                                  item.sentiment === 'negative' ? 'border-red-200 text-red-700' :
                                  'border-gray-200 text-gray-700' : ''
                                }
                              >
                                {item.sentiment || 'Neutral'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {item.content}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{item.feedback_sources?.name}</span>
                              <span>{new Date(item.created_at).toLocaleDateString('de-DE')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Noch kein Feedback</h3>
                      <p className="text-muted-foreground mb-4">
                        Fügen Sie Ihre ersten Feedback-Quellen hinzu, um loszulegen.
                      </p>
                      <Button asChild>
                        <Link href="/sources/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Erste Quelle hinzufügen
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Sentiment Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment-Verteilung</CardTitle>
                  <CardDescription>
                    Überblick über die Stimmung Ihres Feedbacks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {sentimentStats && Object.keys(sentimentStats).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(sentimentStats).map(([sentiment, count]) => (
                        <div key={sentiment} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              sentiment === 'positive' ? 'bg-green-500' :
                              sentiment === 'negative' ? 'bg-red-500' :
                              'bg-gray-500'
                            }`} />
                            <span className="text-sm capitalize">{sentiment}</span>
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Keine Sentiment-Daten verfügbar
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Schnellaktionen</CardTitle>
                  <CardDescription>
                    Häufig genutzte Funktionen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/sources/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Neue Quelle hinzufügen
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/ai-insights">
                      <Brain className="h-4 w-4 mr-2" />
                      KI-Analyse starten
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/analytics">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analytics anzeigen
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/export">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Daten exportieren
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Plan Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Ihr Plan</CardTitle>
                  <CardDescription>
                    Aktuelle Abonnement-Details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Plan</span>
                      <Badge variant="secondary">Pro</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Feedback-Items</span>
                      <span className="text-sm font-medium">
                        {feedbackCount || 0} / 1.000
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quellen</span>
                      <span className="text-sm font-medium">
                        {sourcesCount || 0} / Unbegrenzt
                      </span>
                    </div>
                    <Button className="w-full" variant="outline" size="sm">
                      Plan upgraden
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
