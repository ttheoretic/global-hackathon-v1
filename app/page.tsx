import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  BarChart3, 
  Brain, 
  Zap, 
  Shield, 
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Globe
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={null} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              🚀 Jetzt verfügbar - Beta Version
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Nutzerfeedback mit{' '}
              <span className="text-primary">KI verstehen</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Sammeln Sie Feedback aus verschiedenen Quellen, analysieren Sie es mit künstlicher Intelligenz 
              und erhalten Sie wertvolle Einblicke für Ihr Startup.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Kostenlos starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#demo">
                  Demo ansehen
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Feedback-Quellen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Genauigkeit der KI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10x</div>
                <div className="text-muted-foreground">Schnellere Analyse</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Alles was Sie für Feedback-Management brauchen
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Von der Sammlung bis zur Analyse - Feedbacker macht es einfach, 
                wertvolle Erkenntnisse aus Nutzerfeedback zu gewinnen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Multi-Channel Sammlung</CardTitle>
                  <CardDescription>
                    Sammeln Sie Feedback aus App Stores, Social Media, 
                    Umfragen und mehr an einem Ort.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Brain className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>KI-Analyse</CardTitle>
                  <CardDescription>
                    Automatische Sentiment-Analyse, Kategorisierung 
                    und intelligente Zusammenfassungen.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Detaillierte Analytics</CardTitle>
                  <CardDescription>
                    Umfassende Dashboards und Berichte für 
                    datengetriebene Entscheidungen.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Echtzeit-Updates</CardTitle>
                  <CardDescription>
                    Erhalten Sie sofortige Benachrichtigungen über 
                    neue Feedback und wichtige Trends.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Sicher & DSGVO-konform</CardTitle>
                  <CardDescription>
                    Ihre Daten sind sicher und wir halten uns 
                    an alle Datenschutzbestimmungen.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Team-Kollaboration</CardTitle>
                  <CardDescription>
                    Teilen Sie Erkenntnisse mit Ihrem Team und 
                    arbeiten Sie gemeinsam an Verbesserungen.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Vertraut von innovativen Startups
              </h2>
              <p className="text-xl text-muted-foreground">
                Sehen Sie, wie andere Gründer Feedbacker nutzen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Feedbacker hat uns geholfen, die wichtigsten 
                    Kundenprobleme zu identifizieren. Die KI-Analyse 
                    ist unglaublich präzise."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Sarah M.</p>
                      <p className="text-sm text-muted-foreground">CEO, TechStart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Die Integration mit verschiedenen Plattformen 
                    war nahtlos. Jetzt haben wir alle Feedback-Daten 
                    zentral verfügbar."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Marcus L.</p>
                      <p className="text-sm text-muted-foreground">Founder, InnovApp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Die Analytics-Dashboards sind fantastisch. 
                    Wir können jetzt datengetriebene Entscheidungen 
                    treffen."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Anna K.</p>
                      <p className="text-sm text-muted-foreground">CTO, DataFlow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Einfache, transparente Preise
              </h2>
              <p className="text-xl text-muted-foreground">
                Starten Sie kostenlos und upgraden Sie, wenn Sie wachsen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Kostenlos</CardTitle>
                  <CardDescription>Perfekt für den Start</CardDescription>
                  <div className="text-3xl font-bold">€0<span className="text-lg font-normal">/Monat</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Bis zu 100 Feedback-Items</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">2 Feedback-Quellen</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Basis Analytics</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Kostenlos starten
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Beliebt
                </Badge>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>Für wachsende Startups</CardDescription>
                  <div className="text-3xl font-bold">€29<span className="text-lg font-normal">/Monat</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Bis zu 1.000 Feedback-Items</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Unbegrenzte Quellen</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">KI-Insights & Analytics</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">E-Mail Support</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    Pro starten
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Für große Teams</CardDescription>
                  <div className="text-3xl font-bold">€99<span className="text-lg font-normal">/Monat</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Unbegrenzte Feedback-Items</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Alle Features</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Team-Kollaboration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Priority Support</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Kontakt aufnehmen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bereit, Ihr Feedback zu revolutionieren?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Starten Sie noch heute und entdecken Sie, wie KI Ihnen hilft, 
              bessere Produkte zu entwickeln.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/signup">
                  Kostenlos registrieren
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/demo">
                  Demo buchen
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
