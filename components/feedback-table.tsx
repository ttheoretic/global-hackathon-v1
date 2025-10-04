"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ExternalLink, Download } from "lucide-react"

const feedbackData = [
  {
    id: 1,
    platform: "Twitter",
    sentiment: "negative",
    content: "Login with Google is broken. Please fix this ASAP!",
    date: "2 hours ago",
    critical: true,
  },
  {
    id: 2,
    platform: "Reddit",
    sentiment: "positive",
    content: "The new update is amazing! App feels so much faster now.",
    date: "5 hours ago",
    critical: false,
  },
  {
    id: 3,
    platform: "App Store",
    sentiment: "neutral",
    content: "Good app but dark mode needs some work in the settings.",
    date: "1 day ago",
    critical: false,
  },
  {
    id: 4,
    platform: "YouTube",
    sentiment: "negative",
    content: "Can't see text in dark mode. White text on white background.",
    date: "1 day ago",
    critical: true,
  },
  {
    id: 5,
    platform: "Discord",
    sentiment: "positive",
    content: "Love the performance improvements! Keep it up!",
    date: "2 days ago",
    critical: false,
  },
]

export function FeedbackTable() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Latest Feedback</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Recent user feedback from all platforms</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[120px]">Platform</TableHead>
                <TableHead className="w-[120px]">Sentiment</TableHead>
                <TableHead>Content</TableHead>
                <TableHead className="w-[140px]">Date</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackData.map((feedback) => (
                <TableRow key={feedback.id} className={feedback.critical ? "bg-destructive/5" : ""}>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {feedback.platform}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        feedback.sentiment === "positive"
                          ? "default"
                          : feedback.sentiment === "negative"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {feedback.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-2 text-sm leading-relaxed">{feedback.content}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{feedback.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
