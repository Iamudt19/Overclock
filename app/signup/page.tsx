"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Lock, User, Mail, Phone, TrendingUp, Shield, Check } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!username || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    if (!/^\w+@\w+\.\w+/.test(email)) {
      setError("Please enter a valid email")
      setIsLoading(false)
      return
    }

    if (!/^\d{10}$/.test(phone.replace(/[-()\s]/g, ""))) {
      setError("Please enter a valid 10-digit phone number")
      setIsLoading(false)
      return
    }

    const success = await signup(username, email, phone, password)

    if (success) {
      router.push("/")
    } else {
      setError("Username already exists. Please choose another.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-teal-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and branding */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-teal-400 rounded-3xl mb-4 shadow-2xl">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 text-balance">Join FlowFunds</h1>
          <p className="text-teal-200 text-pretty">Start your journey to financial freedom</p>
        </motion.div>

        {/* Signup card */}
        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl max-h-[calc(100vh-200px)] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/70">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus:ring-2 focus:ring-teal-400"
                  placeholder="Choose a username"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus:ring-2 focus:ring-teal-400"
                  placeholder="your.email@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus:ring-2 focus:ring-teal-400"
                  placeholder="10-digit mobile number"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus:ring-2 focus:ring-teal-400"
                  placeholder="At least 6 characters"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus:ring-2 focus:ring-teal-400"
                  placeholder="Re-enter your password"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-xs leading-relaxed">
                  By signing up, you agree to our Terms of Service and Privacy Policy. Your data is encrypted and stored
                  securely on your device.
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 hover:opacity-90 text-white font-semibold rounded-xl shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  Creating Account...
                </motion.div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Already have an account?
              <Link href="/login" className="ml-2 text-teal-300 hover:text-teal-200 font-semibold">
                Login
              </Link>
            </p>
          </div>

          {/* Security features */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="space-y-2 text-white/60 text-xs">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Secure local data storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>No data sharing with third parties</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="text-center text-white/50 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your privacy is our priority
        </motion.p>
      </motion.div>
    </div>
  )
}
