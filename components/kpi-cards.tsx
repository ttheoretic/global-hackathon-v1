"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, MessageSquare, AlertTriangle, Sparkles } from "lucide-react"
import { fetchAnalytics, AnalyticsData } from "@/lib/api"

export function KpiCards() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const response = await fetchAnalytics()
        setAnalytics(response.data)
      } catch (error) {
        console.error('Failed to load analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!analytics) {
    return <div>Failed to load analytics data</div>
  }

  const positivePercentage = analytics.sentiment.total > 0 
    ? Math.round((analytics.sentiment.positive / analytics.sentiment.total) * 100)
    : 0

  const kpis = [
    {
      title: "Total Feedback",
      value: analytics.totalFeedback.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: MessageSquare,
    },
    {
      title: "Overall Sentiment",
      value: `${positivePercentage}%`,
      subtitle: "Positive",
      change: "+5.2%",
      trend: "up",
      icon: Sparkles,
    },
    {
      title: "Critical Alerts",
      value: analytics.sentiment.negative.toString(),
      subtitle: "Needs attention",
      change: "-8.3%",
      trend: "down",
      icon: AlertTriangle,
    },
    {
      title: "Top Sources",
      value: analytics.topSources.length.toString(),
      subtitle: analytics.topSources.map(s => s.name).join(", "),
      icon: TrendingUp,
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl font-semibold">{kpi.value}</div>
              {kpi.subtitle && <p className="text-xs text-muted-foreground line-clamp-1">{kpi.subtitle}</p>}
              {kpi.change && (
                <div className="flex items-center gap-1 text-xs">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-600" />
                  )}
                  <span className={kpi.trend === "up" ? "text-green-600" : "text-green-600"}>{kpi.change}</span>
                  <span className="text-muted-foreground">vs last period</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
