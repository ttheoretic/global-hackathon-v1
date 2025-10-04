import type React from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, Brain, Filter, Sparkles, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">Feedbacker</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Feedback Analysis</span>
          </div>
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Turn customer feedback into <span className="text-primary">actionable insights</span>
          </h1>
          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            Stop drowning in feedback. Feedbacker uses AI to analyze, categorize, and surface the insights that matter
            most to your product.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/dashboard">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Watch Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            Trusted by product teams at fast-growing startups
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
            {["Acme Corp", "TechStart", "BuildFast", "GrowthLab"].map((company) => (
              <div key={company} className="flex items-center justify-center">
                <span className="text-lg font-semibold text-muted-foreground/60">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 md:py-32">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Everything you need to understand your customers
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Powerful features designed for modern product teams
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="AI-Powered Insights"
            description="Automatically identify trends, sentiment, and key themes across all your feedback sources."
          />
          <FeatureCard
            icon={<Filter className="h-6 w-6" />}
            title="Smart Filtering"
            description="Filter by source, sentiment, date range, and custom tags to find exactly what you need."
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Real-Time Analytics"
            description="Track product health metrics and sentiment trends as they happen."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Instant Categorization"
            description="AI automatically tags and categorizes feedback so you don't have to."
          />
          <FeatureCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Trend Detection"
            description="Spot emerging issues and opportunities before they become critical."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Actionable Recommendations"
            description="Get AI-generated suggestions on what to build next based on customer needs."
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="border-y border-border bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Save hours every week analyzing feedback
              </h2>
              <div className="space-y-6">
                <BenefitItem
                  stat="10x faster"
                  description="Process and analyze feedback 10x faster than manual review"
                />
                <BenefitItem
                  stat="95% accuracy"
                  description="AI-powered sentiment analysis with industry-leading accuracy"
                />
                <BenefitItem
                  stat="Zero setup"
                  description="Connect your feedback sources and start analyzing in minutes"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">AI Analysis</div>
                        <div className="text-xs text-muted-foreground">Processing feedback...</div>
                      </div>
                    </div>
                    <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
                      <div className="text-xs font-medium text-muted-foreground">Top Insight</div>
                      <div className="text-sm">Users want faster load times on mobile devices</div>
                      <div className="flex items-center gap-2 text-xs text-primary">
                        <TrendingUp className="h-3 w-3" />
                        <span>Mentioned 47 times this week</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-3/4 rounded-full bg-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground">Analyzing 1,247 feedback items</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Ready to understand your customers better?
          </h2>
          <p className="mb-8 text-pretty text-lg text-muted-foreground">
            Join hundreds of product teams using Feedbacker to build better products.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">Feedbacker</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered feedback analysis for modern product teams.</p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2025 Feedbacker. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function BenefitItem({ stat, description }: { stat: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <TrendingUp className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="mb-1 text-2xl font-bold">{stat}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </div>
  )
}

