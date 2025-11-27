"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

const PUBLIC_ROUTES = ["/login", "/signup"]

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

      // Redirect to login if not authenticated and trying to access protected route
      if (!user && !isPublicRoute) {
        router.push("/login")
      }

      // Redirect to home if authenticated and trying to access login/signup
      if (user && isPublicRoute) {
        router.push("/")
      }
    }
  }, [user, isLoading, pathname, router])

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-teal-800 flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-teal-400 rounded-3xl mb-4 shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <TrendingUp className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">FlowFunds India</h2>
          <motion.div
            className="w-48 h-1 bg-white/20 rounded-full overflow-hidden mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // Don't render protected content if not authenticated
  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return null
  }

  // Don't render login/signup if already authenticated
  if (user && PUBLIC_ROUTES.includes(pathname)) {
    return null
  }

  return <>{children}</>
}
