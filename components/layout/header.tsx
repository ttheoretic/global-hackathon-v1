'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Settings, 
  LogOut, 
  User,
  Bell,
  Menu,
  X
} from 'lucide-react'
import { createClientSupabase } from '@/lib/supabase'
import { User as UserType } from '@supabase/auth-helpers-nextjs'

interface HeaderProps {
  user: UserType | null
}

export function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClientSupabase()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Feedbacker</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            href="/sources" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Quellen
          </Link>
          <Link 
            href="/analytics" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Analytics
          </Link>
          <Link 
            href="/ai-insights" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            AI Insights
          </Link>
        </nav>

        {/* Right side - User menu */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Pro
              </Badge>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Anmelden</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Registrieren</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            <Link 
              href="/dashboard" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/sources" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quellen
            </Link>
            <Link 
              href="/analytics" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link 
              href="/ai-insights" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Insights
            </Link>
            {user && (
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    <Badge variant="secondary" className="text-xs">Pro</Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
