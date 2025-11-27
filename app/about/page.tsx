"use client"

import { BottomNav } from "@/components/bottom-nav"
import { LanguageToggle } from "@/components/language-toggle"
import { AIAssistantWidget } from "@/components/ai-assistant-widget"
import { Card } from "@/components/ui/card"
import { Info, Shield, Zap, Globe, Sparkles, TrendingUp, Target, MessageSquare, Lock, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import { AuthWrapper } from "@/components/auth-wrapper"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Budgeting",
    titleHi: "AI बजटिंग",
    desc: "Smart suggestions based on your income patterns and spending habits",
    color: "from-primary to-secondary",
  },
  {
    icon: MessageSquare,
    title: "Voice Input",
    titleHi: "आवाज इनपुट",
    desc: "Add expenses using voice commands in Hindi or English",
    color: "from-sunset-pink to-accent",
  },
  {
    icon: Target,
    title: "Gamified Savings",
    titleHi: "गेमिफाइड बचत",
    desc: "Earn badges, points, and achievements for consistent saving",
    color: "from-teal to-secondary",
  },
  {
    icon: TrendingUp,
    title: "Real-time Insights",
    titleHi: "रियल-टाइम जानकारी",
    desc: "Live spending meters and predictive alerts for smarter decisions",
    color: "from-accent to-gold-accent",
  },
  {
    icon: Globe,
    title: "Multilingual",
    titleHi: "बहुभाषी",
    desc: "Full support for Hindi and English with seamless toggling",
    color: "from-primary to-accent",
  },
  {
    icon: Smartphone,
    title: "SMS Parsing",
    titleHi: "SMS पार्सिंग",
    desc: "Automatically log expenses from bank transaction messages",
    color: "from-sunset-pink to-primary",
  },
]

const team = [
  { name: "AI Engine", role: "Smart Budgeting", icon: "🤖" },
  { name: "Security", role: "Data Protection", icon: "🔒" },
  { name: "Design", role: "User Experience", icon: "🎨" },
]

export default function AboutPage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5 pb-24">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-white/10 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Info className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">About</h1>
                <p className="text-[10px] text-muted-foreground">जानकारी • Learn More</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass border-white/20 p-8 text-center relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative z-10 space-y-4">
                <div className="inline-flex h-20 w-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent items-center justify-center animate-float">
                  <Zap className="h-10 w-10 text-white" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    FlowFunds India
                  </h2>
                  <p className="text-lg font-medium text-muted-foreground mt-2">Your money, your flow</p>
                  <p className="text-lg font-medium text-muted-foreground">आपका पैसा, आपका प्रवाह</p>
                </div>

                <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  FlowFunds India is designed for people with irregular or variable income. Whether you earn daily,
                  weekly, or monthly wages, our AI-powered platform helps you manage money effectively with intuitive
                  tools, gamified savings, and culturally relevant features.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground px-1">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="glass border-white/20 p-5 hover:scale-[1.02] transition-transform">
                      <div className="flex gap-4">
                        <div
                          className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{feature.title}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{feature.titleHi}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Security & Privacy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="glass border-white/20 p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal to-secondary flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    Security & Privacy First
                    <Lock className="h-4 w-4 text-teal" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your financial data is sacred. All SMS parsing and banking data stays encrypted on your device or in
                    secure cloud storage. We never share your information with third parties. Your privacy is our
                    promise.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["End-to-End Encryption", "Local Storage", "No Third-Party Sharing", "GDPR Compliant"].map(
                      (badge) => (
                        <span key={badge} className="text-xs px-3 py-1 rounded-full glass border border-white/20">
                          {badge}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Assistant Demo */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <AIAssistantWidget />
          </motion.div>

          {/* Mission */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="glass border-white/20 p-6 space-y-4">
              <h3 className="font-semibold text-lg">Our Mission</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe everyone deserves access to powerful financial tools, regardless of their income pattern.
                FlowFunds India is built specifically for India's diverse workforce - from daily wage earners to
                freelancers, from gig workers to small business owners.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                हमारा मिशन है हर भारतीय को वित्तीय स्वतंत्रता की ओर ले जाना। चाहे आप रोज़ काम करते हों या महीने में, हम आपकी मदद करते
                हैं।
              </p>
            </Card>
          </motion.div>

          {/* Team */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Card className="glass border-white/20 p-6 space-y-4">
              <h3 className="font-semibold">Powered By</h3>
              <div className="grid grid-cols-3 gap-4">
                {team.map((member, i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="h-16 w-16 rounded-xl glass border border-white/20 flex items-center justify-center text-3xl mx-auto">
                      {member.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Version & Credits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center space-y-2 py-4"
          >
            <p className="text-xs text-muted-foreground">Version 1.0.0 • Made with ❤️ for India</p>
            <p className="text-xs text-muted-foreground">© 2025 FlowFunds India. All rights reserved.</p>
          </motion.div>
        </main>

        <BottomNav />
      </div>
    </AuthWrapper>
  )
}
