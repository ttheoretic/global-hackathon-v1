"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

const platforms = [
  { id: "twitter", label: "X (Twitter)", icon: "𝕏" },
  { id: "reddit", label: "Reddit", icon: "🔴" },
  { id: "youtube", label: "YouTube", icon: "▶️" },
  { id: "appstore", label: "App Store", icon: "🍎" },
  { id: "discord", label: "Discord", icon: "💬" },
]

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [productName, setProductName] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [dateRange, setDateRange] = useState("30")

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const handleSubmit = () => {
    if (productName && selectedPlatforms.length > 0) {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl shadow-lg border-border/50">
        <CardHeader className="space-y-3 pb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-semibold">Welcome to Feedbacker</CardTitle>
              <CardDescription className="text-base mt-1">
                {"Let's set up your first product to start analyzing feedback"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="product-name" className="text-sm font-medium">
              Product Name
            </Label>
            <Input
              id="product-name"
              placeholder="e.g., My Awesome App"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Select Platforms to Monitor</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <label
                    htmlFor={platform.id}
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer flex-1"
                  >
                    <span className="text-lg">{platform.icon}</span>
                    {platform.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="date-range" className="text-sm font-medium">
              Initial Date Range
            </Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="date-range" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!productName || selectedPlatforms.length === 0}
            className="w-full h-11 text-base font-medium"
            size="lg"
          >
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
