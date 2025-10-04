"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, MessageSquare, AlertTriangle, Sparkles } from "lucide-react"

const kpis = [
  {
    title: "Total Feedback",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Overall Sentiment",
    value: "72%",
    subtitle: "Positive",
    change: "+5.2%",
    trend: "up",
    icon: Sparkles,
  },
  {
    title: "Critical Alerts",
    value: "23",
    subtitle: "Needs attention",
    change: "-8.3%",
    trend: "down",
    icon: AlertTriangle,
  },
  {
    title: "Trending Topics",
    value: "3",
    subtitle: "Login issues, Performance, UI/UX",
    icon: TrendingUp,
  },
]

export function KpiCards() {
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
