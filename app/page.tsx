"use client"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { LanguageToggle } from "@/components/language-toggle"
import { IncomeModal } from "@/components/income-modal"
import { VoiceInputModal } from "@/components/voice-input-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown, Shield, Zap, Plus, Mic } from "lucide-react"
import { AuthWrapper } from "@/components/auth-wrapper"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [incomeModalOpen, setIncomeModalOpen] = useState(false)
  const [voiceModalOpen, setVoiceModalOpen] = useState(false)
  const [balance, setBalance] = useState(24580)
  const [previousBalance, setPreviousBalance] = useState(24580)
  const [gainLoss, setGainLoss] = useState(0)

  const { user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (user?.username) {
      const savedBalance = localStorage.getItem(`balance_${user.username}`)
      const savedPreviousBalance = localStorage.getItem(`previous_balance_${user.username}`)

      if (savedBalance) {
        const currentBalance = Number.parseFloat(savedBalance)
        setBalance(currentBalance)

        if (savedPreviousBalance) {
          const prevBalance = Number.parseFloat(savedPreviousBalance)
          setPreviousBalance(prevBalance)
          const difference = currentBalance - prevBalance
          setGainLoss(difference)
        }
      }
    }
  }, [user])

  const handleIncomeAdded = (amount: number) => {
    const currentBalance = balance
    const newBalance = balance + amount

    setBalance(newBalance)

    setGainLoss(amount)

    if (user?.username) {
      localStorage.setItem(`balance_${user.username}`, newBalance.toString())
      localStorage.setItem(`previous_balance_${user.username}`, currentBalance.toString())
    }
  }

  const gainLossPercentage =
    previousBalance !== 0 ? (((balance - previousBalance) / previousBalance) * 100).toFixed(1) : 0

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-deep-purple/5 via-background to-teal/5 pb-24">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-white/10 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-float">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  FlowFunds India
                </h1>
                <p className="text-[10px] text-muted-foreground">
                  {user
                    ? `${t("Welcome back", "वापस स्वागत है")}, ${user.username}`
                    : t("Your money, your flow", "आपका पैसा, आपका प्रवाह")}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Quick Balance Card */}
          <Card className="relative overflow-hidden glass border-white/20 p-6">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("Current Balance", "वर्तमान शेष")}</span>
                <Shield className="h-4 w-4 text-accent animate-pulse-slow" />
              </div>

              <div className="space-y-1">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  ₹{balance.toLocaleString("en-IN")}
                </h2>
                <div className={`flex items-center gap-2 ${gainLoss >= 0 ? "text-teal" : "text-sunset-pink"}`}>
                  {gainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {gainLoss >= 0 ? "+" : ""}₹{Math.abs(gainLoss).toLocaleString("en-IN")} ({gainLoss >= 0 ? "+" : ""}
                    {gainLossPercentage}%)
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {gainLoss >= 0 ? t("Gain", "लाभ") : t("Loss", "हानि")}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2"
                  onClick={() => setIncomeModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  {t("Add Income", "आय जोड़ें")}
                </Button>
                <Button
                  variant="outline"
                  className="glass border-white/20 gap-2 bg-transparent"
                  onClick={() => setVoiceModalOpen(true)}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="glass border-white/20 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("Today's Spending", "आज का खर्च")}</span>
                <Zap className="h-3 w-3 text-sunset-pink" />
              </div>
              <p className="text-2xl font-bold text-sunset-pink">₹850</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-sunset-pink to-accent rounded-full animate-pulse" />
              </div>
            </Card>

            <Card className="glass border-white/20 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("Savings Goal", "बचत लक्ष्य")}</span>
                <TrendingUp className="h-3 w-3 text-teal" />
              </div>
              <p className="text-2xl font-bold text-teal">68%</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-teal to-secondary rounded-full" />
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground px-1">{t("Quick Actions", "त्वरित क्रियाएं")}</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card
                onClick={() => router.push("/expenses")}
                className="glass border-white/20 p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-sunset-pink/20 to-sunset-pink/10 active:scale-95"
              >
                <div className="text-3xl mb-2">💸</div>
                <p className="text-sm font-medium">{t("Track Expense", "खर्च ट्रैक करें")}</p>
              </Card>

              <Card
                onClick={() => router.push("/savings")}
                className="glass border-white/20 p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-teal/20 to-teal/10 active:scale-95"
              >
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm font-medium">{t("Set Goal", "लक्ष्य सेट करें")}</p>
              </Card>

              <Card
                onClick={() => setVoiceModalOpen(true)}
                className="glass border-white/20 p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-primary/20 to-primary/10 active:scale-95"
              >
                <div className="text-3xl mb-2">✨</div>
                <p className="text-sm font-medium">{t("AI Assistant", "AI सहायक")}</p>
              </Card>

              <Card
                onClick={() => router.push("/analytics")}
                className="glass border-white/20 p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-accent/20 to-accent/10 active:scale-95"
              >
                <div className="text-3xl mb-2">📊</div>
                <p className="text-sm font-medium">{t("View Reports", "रिपोर्ट देखें")}</p>
              </Card>
            </div>
          </div>

          {/* Recent Transactions Preview */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground px-1">
              {t("Recent Activity", "हाल की गतिविधि")}
            </h3>
            <Card className="glass border-white/20 divide-y divide-border/50">
              {[
                { desc: t("Grocery Shopping", "किराना"), amount: "-₹420", time: t("2h ago", "2 घंटे पहले"), icon: "🛒" },
                {
                  desc: t("Freelance Payment", "फ्रीलांस"),
                  amount: "+₹5,000",
                  time: t("5h ago", "5 घंटे पहले"),
                  icon: "💰",
                },
                {
                  desc: t("Mobile Recharge", "मोबाइल रिचार्ज"),
                  amount: "-₹299",
                  time: t("1d ago", "1 दिन पहले"),
                  icon: "📱",
                },
              ].map((txn, i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl glass flex items-center justify-center text-xl">
                      {txn.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{txn.desc}</p>
                      <p className="text-xs text-muted-foreground">{txn.time}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${txn.amount.startsWith("+") ? "text-teal" : "text-sunset-pink"}`}>
                    {txn.amount}
                  </p>
                </div>
              ))}
            </Card>
          </div>
        </main>

        <BottomNav />

        <IncomeModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} onIncomeAdded={handleIncomeAdded} />
        <VoiceInputModal open={voiceModalOpen} onOpenChange={setVoiceModalOpen} />
      </div>
    </AuthWrapper>
  )
}
