import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Feedbacker - KI-gestützte Nutzerfeedback-Analyse',
  description: 'Sammeln, analysieren und verstehen Sie Nutzerfeedback aus verschiedenen Quellen mit Hilfe von künstlicher Intelligenz.',
  keywords: ['feedback', 'analytics', 'KI', 'AI', 'nutzerfeedback', 'startup'],
  authors: [{ name: 'Feedbacker Team' }],
  openGraph: {
    title: 'Feedbacker - KI-gestützte Nutzerfeedback-Analyse',
    description: 'Sammeln, analysieren und verstehen Sie Nutzerfeedback aus verschiedenen Quellen mit Hilfe von künstlicher Intelligenz.',
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feedbacker - KI-gestützte Nutzerfeedback-Analyse',
    description: 'Sammeln, analysieren und verstehen Sie Nutzerfeedback aus verschiedenen Quellen mit Hilfe von künstlicher Intelligenz.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
