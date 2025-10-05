"use client"

import { useState } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { Dashboard } from "@/components/dashboard"

export default function DashboardPage() {
  // Skip onboarding for demo and show dashboard directly
  return (
    <main className="min-h-screen">
      <Dashboard />
    </main>
  )
}
