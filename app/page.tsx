"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Brain,
  Filter,
  Sparkles,
  TrendingUp,
  Zap,
  Star,
  MessageSquare,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Feedbacker</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/dashboard">Log in</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm animate-scale-in">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Feedback Analysis</span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-in-up">
              Turn customer feedback into <RotatingText />
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              Stop drowning in feedback. Feedbacker uses AI to analyze, categorize, and surface the insights that matter
              most to your product.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base px-8 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all"
                asChild
              >
                <Link href="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all"
              >
                Watch Demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="border-y border-border/50 bg-muted/30 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
              Trusted by product teams at fast-growing startups
            </p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
              {["Acme Corp", "TechStart", "BuildFast", "GrowthLab"].map((company, i) => (
                <div
                  key={company}
                  className="flex items-center justify-center opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                >
                  <span className="text-lg font-bold text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="features" className="bg-background py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Everything you need to understand your customers
            </h2>
            <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for modern product teams
            </p>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedFeatureCard
              icon={<Brain className="h-6 w-6" />}
              title="AI-Powered Insights"
              description="Automatically identify trends, sentiment, and key themes across all your feedback sources."
              delay={0}
            />
            <AnimatedFeatureCard
              icon={<Filter className="h-6 w-6" />}
              title="Smart Filtering"
              description="Filter by source, sentiment, date range, and custom tags to find exactly what you need."
              delay={100}
            />
            <AnimatedFeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Real-Time Analytics"
              description="Track product health metrics and sentiment trends as they happen."
              delay={200}
            />
            <AnimatedFeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Instant Categorization"
              description="AI automatically tags and categorizes feedback so you don't have to."
              delay={300}
            />
            <AnimatedFeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Trend Detection"
              description="Spot emerging issues and opportunities before they become critical."
              delay={400}
            />
            <AnimatedFeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Actionable Recommendations"
              description="Get AI-generated suggestions on what to build next based on customer needs."
              delay={500}
            />
          </div>
        </div>
      </section>

      <section id="benefits" className="relative bg-gradient-to-b from-background via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="mb-8 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Save hours every week analyzing feedback
              </h2>
              <div className="space-y-6">
                <AnimatedBenefitItem
                  stat="10x faster"
                  description="Process and analyze feedback 10x faster than manual review"
                  delay={0}
                />
                <AnimatedBenefitItem
                  stat="95% accuracy"
                  description="AI-powered sentiment analysis with industry-leading accuracy"
                  delay={200}
                />
                <AnimatedBenefitItem
                  stat="Zero setup"
                  description="Connect your feedback sources and start analyzing in minutes"
                  delay={400}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
                    <div className="mb-2 text-3xl font-bold text-primary">1,247</div>
                    <div className="text-sm text-muted-foreground">Feedback items analyzed</div>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
                    <div className="mb-2 text-3xl font-bold text-primary">47</div>
                    <div className="text-sm text-muted-foreground">Key insights discovered</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
                    <div className="mb-2 text-3xl font-bold text-primary">92%</div>
                    <div className="text-sm text-muted-foreground">Positive sentiment</div>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
                    <div className="mb-2 text-3xl font-bold text-primary">5min</div>
                    <div className="text-sm text-muted-foreground">Average analysis time</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-background py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your team. All plans include a 14-day free trial.
            </p>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            <PricingCard
              name="Starter"
              price="$29"
              description="Perfect for small teams getting started"
              features={[
                "Up to 1,000 feedback items/month",
                "AI-powered insights",
                "Basic filtering & search",
                "Email support",
                "7-day data retention",
              ]}
              delay={0}
            />
            <PricingCard
              name="Pro"
              price="$99"
              description="For growing teams with more feedback"
              features={[
                "Up to 10,000 feedback items/month",
                "Advanced AI insights",
                "Custom tags & categories",
                "Priority support",
                "90-day data retention",
                "API access",
              ]}
              popular
              delay={200}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              description="For large teams with custom needs"
              features={[
                "Unlimited feedback items",
                "Custom AI models",
                "Advanced integrations",
                "Dedicated support",
                "Unlimited data retention",
                "SSO & advanced security",
              ]}
              delay={400}
            />
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-gradient-to-b from-background via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Loved by product teams everywhere
            </h2>
            <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about Feedbacker
            </p>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            <TestimonialCard
              quote="Feedbacker has completely transformed how we handle customer feedback. We've cut our analysis time by 80%."
              author="Sarah Chen"
              role="Product Manager at TechStart"
              delay={0}
            />
            <TestimonialCard
              quote="The AI insights are incredibly accurate. It's like having a data analyst working 24/7 on our feedback."
              author="Michael Rodriguez"
              role="CEO at BuildFast"
              delay={200}
            />
            <TestimonialCard
              quote="We discovered critical issues we would have missed without Feedbacker's trend detection. Absolute game-changer."
              author="Emily Watson"
              role="Head of Product at GrowthLab"
              delay={400}
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="relative mx-auto max-w-4xl rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm p-8 md:p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
              <div className="relative">
                <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                  Ready to understand your customers better?
                </h2>
                <p className="mb-8 text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join hundreds of product teams using Feedbacker to build better products.
                </p>
                <Button
                  size="lg"
                  className="text-base px-8 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all"
                  asChild
                >
                  <Link href="/dashboard">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="border-t border-border/50 bg-muted/30 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">Feedbacker</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered feedback analysis for modern product teams.</p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground transition-colors">
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
          <div className="mt-8 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
            © 2025 Feedbacker. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}

function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}

function AnimatedFeatureCard({
  icon,
  title,
  description,
  delay,
}: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 hover:border-primary/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function AnimatedBenefitItem({ stat, description, delay }: { stat: string; description: string; delay: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary group-hover:to-primary/80 transition-all">
        <TrendingUp className="h-6 w-6 text-primary" />
      </div>
      <div>
        <div className="mb-1 text-3xl font-bold text-gradient">{stat}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
      </div>
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  role,
  delay,
}: { quote: string; author: string; role: string; delay: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-700 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-foreground">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="text-sm font-semibold">{author}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
  delay,
}: {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  delay: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl border bg-card/50 backdrop-blur-sm p-8 transition-all duration-700 hover:shadow-xl hover:scale-105 ${
        popular ? "border-primary shadow-lg shadow-primary/20" : "border-border/50 hover:shadow-primary/10"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground">/month</span>}
        </div>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${popular ? "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40" : ""}`}
        variant={popular ? "default" : "outline"}
        asChild
      >
        <Link href="/dashboard">{price === "Custom" ? "Contact Sales" : "Start Free Trial"}</Link>
      </Button>
    </div>
  )
}

function RotatingText() {
  const texts = [
    "actionable insights",
    "growth opportunities",
    "product decisions",
    "customer understanding",
    "strategic priorities",
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`text-gradient inline-block transition-all duration-500 ${
        isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {texts[currentIndex]}
    </span>
  )
}


