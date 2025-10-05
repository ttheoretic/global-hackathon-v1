"use client"

import { useState } from "react"
import { FilterToolbar } from "@/components/filter-toolbar"
import { KpiCards } from "@/components/kpi-cards"
import { AiInsightsSection } from "@/components/ai-insights-section"
import { FeedbackTable } from "@/components/feedback-table"
import { SourceInsights } from "@/components/source-insights"
import { AiSearchBox } from "@/components/ai-search-box"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Dashboard() {
  const [filters, setFilters] = useState({
    product: "My Awesome App",
    dateRange: "30",
    platforms: ["twitter", "reddit", "youtube"],
    keyword: "",
    sort: "recent",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Feedbacker</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Settings
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="space-y-8">
          {/* AI Search Box */}
          <AiSearchBox />

          {/* Filter Toolbar */}
          <FilterToolbar filters={filters} onFiltersChange={setFilters} />

          {/* KPI Cards */}
          <KpiCards />

          {/* AI Insights */}
          <AiInsightsSection />

          {/* Source Insights */}
          <SourceInsights />

          {/* Feedback Table */}
          <FeedbackTable />
        </div>
      </div>
    </div>
  )
}

function Button({ children, variant = "default", size = "default", ...props }: any) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${
        variant === "ghost" ? "hover:bg-muted" : "bg-primary text-primary-foreground hover:bg-primary/90"
      } ${size === "sm" ? "h-9 px-3 text-sm" : "h-10 px-4"}`}
      {...props}
    >
      {children}
    </button>
  )
}
