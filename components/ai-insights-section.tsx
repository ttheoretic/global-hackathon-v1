"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Lightbulb, AlertCircle, CheckCircle2 } from "lucide-react"

const insights = [
  {
    id: 1,
    title: "Login Authentication Issues",
    summary:
      "Multiple users reporting difficulties with OAuth login, particularly Google Sign-In. Issues appear to be intermittent and affecting approximately 15% of login attempts.",
    sentiment: "negative",
    severity: "high",
    feedbackCount: 47,
    actions: [
      { type: "quick-fix", text: "Add retry mechanism for OAuth flow" },
      { type: "improvement", text: "Implement fallback email/password option" },
      { type: "communication", text: "Post status update on known issues page" },
    ],
    examples: [
      { platform: "Twitter", text: "Can't log in with Google anymore. Been trying for 2 days...", date: "2 hours ago" },
      { platform: "Reddit", text: "OAuth keeps timing out. Anyone else having this issue?", date: "5 hours ago" },
    ],
  },
  {
    id: 2,
    title: "Performance Improvements Appreciated",
    summary:
      "Users are noticing and praising recent performance optimizations. Load times have decreased significantly, leading to positive sentiment across platforms.",
    sentiment: "positive",
    severity: "low",
    feedbackCount: 89,
    actions: [
      { type: "communication", text: "Share technical blog post about optimizations" },
      { type: "improvement", text: "Continue monitoring performance metrics" },
    ],
    examples: [
      { platform: "App Store", text: "The app is so much faster now! Great update.", date: "1 day ago" },
      { platform: "Discord", text: "Loading times are incredible after the latest update", date: "1 day ago" },
    ],
  },
  {
    id: 3,
    title: "Dark Mode UI Inconsistencies",
    summary:
      "Several users have identified UI elements that don't properly adapt to dark mode, particularly in the settings panel and notification center.",
    sentiment: "neutral",
    severity: "medium",
    feedbackCount: 31,
    actions: [
      { type: "quick-fix", text: "Audit and fix dark mode color variables" },
      { type: "improvement", text: "Add automated dark mode testing" },
    ],
    examples: [
      { platform: "YouTube", text: "Some text is barely visible in dark mode", date: "3 hours ago" },
      { platform: "Reddit", text: "Settings page needs dark mode polish", date: "6 hours ago" },
    ],
  },
]

export function AiInsightsSection() {
  const [expandedInsights, setExpandedInsights] = useState<number[]>([])

  const toggleInsight = (id: number) => {
    setExpandedInsights((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI Insights</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Automatically clustered feedback with actionable recommendations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="shadow-sm border-border/50 hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <CardTitle className="text-lg leading-tight">{insight.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant={
                        insight.sentiment === "positive"
                          ? "default"
                          : insight.sentiment === "negative"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {insight.sentiment}
                    </Badge>
                    <Badge variant={insight.severity === "high" ? "destructive" : "secondary"} className="text-xs">
                      {insight.severity} priority
                    </Badge>
                    <span className="text-xs text-muted-foreground">{insight.feedbackCount} feedback items</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">{insight.summary}</CardDescription>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recommended Actions</p>
                <div className="space-y-2">
                  {insight.actions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      {action.type === "quick-fix" && (
                        <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      )}
                      {action.type === "improvement" && (
                        <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      )}
                      {action.type === "communication" && (
                        <Lightbulb className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="leading-relaxed">{action.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {expandedInsights.includes(insight.id) && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Example Feedback</p>
                  <div className="space-y-3">
                    {insight.examples.map((example, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {example.platform}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{example.date}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{example.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button variant="ghost" size="sm" onClick={() => toggleInsight(insight.id)} className="w-full">
                {expandedInsights.includes(insight.id) ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Show example feedback
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
