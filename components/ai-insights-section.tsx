"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Lightbulb, AlertCircle, CheckCircle2 } from "lucide-react"
import { fetchInsights, InsightsData } from "@/lib/api"

export function AiInsightsSection() {
  const [insights, setInsights] = useState<InsightsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    async function loadInsights() {
      try {
        const response = await fetchInsights()
        setInsights(response.data)
      } catch (error) {
        console.error('Failed to load insights:', error)
      } finally {
        setLoading(false)
      }
    }

    loadInsights()
  }, [])

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

  if (loading) {
    return (
      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-muted animate-pulse rounded" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!insights) {
    return <div>Failed to load AI insights</div>
  }

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              AI Insights
            </CardTitle>
            <CardDescription>
              Intelligent analysis of your feedback data with actionable recommendations
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {insights.insights.length} Insights
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.insights.map((insight, index) => (
            <div
              key={insight.id}
              className="border border-border/50 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{insight.title}</h3>
                    <Badge
                      variant={
                        insight.impact === "high"
                          ? "destructive"
                          : insight.impact === "medium"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {insight.impact} impact
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(insight.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                  {insight.tags && insight.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {insight.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCard(index)}
                  className="ml-2"
                >
                  {expandedCards.has(index) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {expandedCards.has(index) && (
                <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">Recommendations</span>
                  </div>
                  <div className="grid gap-2">
                    {insights.recommendations
                      .filter(rec => rec.category === insight.category)
                      .slice(0, 2)
                      .map((rec, recIndex) => (
                        <div key={recIndex} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{rec.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {rec.effort} effort
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {rec.impact} impact
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <h3 className="font-semibold text-sm mb-3">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{insights.summary.totalFeedback}</div>
              <div className="text-xs text-muted-foreground">Total Feedback</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{insights.summary.sentiment.positive}%</div>
              <div className="text-xs text-muted-foreground">Positive Sentiment</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">{insights.summary.keyFindings.length}</div>
              <div className="text-xs text-muted-foreground">Key Findings</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}