"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Search, Calendar, Filter } from "lucide-react"

interface FilterToolbarProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function FilterToolbar({ filters, onFiltersChange }: FilterToolbarProps) {
  return (
    <Card className="p-4 shadow-sm border-border/50">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Product Selector */}
          <Select value={filters.product} onValueChange={(value) => onFiltersChange({ ...filters, product: value })}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="My Awesome App">My Awesome App</SelectItem>
              <SelectItem value="Product 2">Product 2</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range */}
          <Select
            value={filters.dateRange}
            onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value })}
          >
            <SelectTrigger className="h-10">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          {/* Platform Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="h-10">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              <SelectItem value="twitter">X (Twitter)</SelectItem>
              <SelectItem value="reddit">Reddit</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={filters.sort} onValueChange={(value) => onFiltersChange({ ...filters, sort: value })}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most recent</SelectItem>
              <SelectItem value="critical">Most critical</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="relative lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            value={filters.keyword}
            onChange={(e) => onFiltersChange({ ...filters, keyword: e.target.value })}
            className="pl-9 h-10"
          />
        </div>
      </div>
    </Card>
  )
}
