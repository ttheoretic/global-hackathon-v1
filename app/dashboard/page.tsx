"use client"

import { useState } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { Dashboard } from "@/components/dashboard"

export default function DashboardPage() {
  const [isOnboarded, setIsOnboarded] = useState(false)

  return (
    <main className="min-h-screen">
      {!isOnboarded ? <OnboardingFlow onComplete={() => setIsOnboarded(true)} /> : <Dashboard />}
    </main>
  )
}
