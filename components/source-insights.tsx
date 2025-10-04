"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

const sourceData = [
  {
    platform: "Twitter",
    icon: "𝕏",
    feedbackCount: 847,
    sentiment: 68,
    signalToNoise: 72,
    trend: "up",
    change: "+12%",
  },
  {
    platform: "Reddit",
    icon: "🔴",
    feedbackCount: 623,
    sentiment: 75,
    signalToNoise: 85,
    trend: "up",
    change: "+8%",
  },
  {
    platform: "YouTube",
    icon: "▶️",
    feedbackCount: 512,
    sentiment: 71,
    signalToNoise: 68,
    trend: "down",
    change: "-3%",
  },
  {
    platform: "App Store",
    icon: "🍎",
    feedbackCount: 489,
    sentiment: 79,
    signalToNoise: 91,
    trend: "up",
    change: "+15%",
  },
  {
    platform: "Discord",
    icon: "💬",
    feedbackCount: 376,
    sentiment: 82,
    signalToNoise: 88,
    trend: "up",
    change: "+5%",
  },
]

export function SourceInsights() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Source Insights</h2>
        <p className="text-sm text-muted-foreground mt-1">Performance metrics by platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {sourceData.map((source, index) => (
          <Card key={index} className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{source.icon}</span>
                <div className="flex items-center gap-1 text-xs">
                  {source.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={source.trend === "up" ? "text-green-600" : "text-red-600"}>{source.change}</span>
                </div>
              </div>
              <CardTitle className="text-base">{source.platform}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Feedback Count</p>
                <p className="text-xl font-semibold">{source.feedbackCount.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Avg Sentiment</span>
                    <span className="font-medium">{source.sentiment}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${source.sentiment}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Signal/Noise</span>
                    <span className="font-medium">{source.signalToNoise}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-chart-2 rounded-full transition-all"
                      style={{ width: `${source.signalToNoise}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
