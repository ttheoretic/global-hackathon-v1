"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, Search } from "lucide-react"

const suggestedQueries = [
  "What are the top login issues in the last 30 days?",
  "Show me all critical feedback from Reddit",
  "What features are users requesting most?",
]

export function AiSearchBox() {
  const [query, setQuery] = useState("")

  return (
    <Card className="p-6 shadow-sm border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Ask AI Anything</h3>
            <p className="text-sm text-muted-foreground">Get instant insights from your feedback data</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g., What are users saying about performance?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-11"
            />
          </div>
          <Button className="h-11 px-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Ask
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setQuery(suggestion)}
              className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}
