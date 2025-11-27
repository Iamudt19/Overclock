"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageToggle } from "@/components/language-toggle"
import { useAuth } from "@/lib/auth-context"
import { usePathname } from "next/navigation"

export function AppHeader() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (pathname === "/login" || pathname === "/signup") {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass backdrop-blur-2xl">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">FF</span>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            FlowFunds
          </span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />

          {user && (
            <Link href="/settings" className="transition-transform hover:scale-105 active:scale-95">
              <Avatar className="h-9 w-9 border-2 border-primary/50 shadow-lg shadow-primary/20">
                <AvatarImage
                  src={user.profilePicture || "/placeholder.svg?height=40&width=40&query=user-profile"}
                  alt={user.username}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
