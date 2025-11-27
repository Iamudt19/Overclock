"use client"

import { BottomNav } from "@/components/bottom-nav"
import { LanguageToggle } from "@/components/language-toggle"
import { Card } from "@/components/ui/card"
import { Sparkles, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion } from "framer-motion"
import { AuthWrapper } from "@/components/auth-wrapper"
import { useLanguage } from "@/lib/language-context"

const weeklyData = [
  { day: "Mon", income: 2400, expense: 1200 },
  { day: "Tue", income: 1800, expense: 1500 },
  { day: "Wed", income: 3200, expense: 1800 },
  { day: "Thu", income: 2100, expense: 1300 },
  { day: "Fri", income: 4200, expense: 2200 },
  { day: "Sat", income: 1900, expense: 900 },
  { day: "Sun", income: 2800, expense: 1100 },
]

const monthlyTrend = [
  { month: "Jan", amount: 18500 },
  { month: "Feb", amount: 21200 },
  { month: "Mar", amount: 19800 },
  { month: "Apr", amount: 24300 },
  { month: "May", amount: 26700 },
  { month: "Jun", amount: 24580 },
]

const categoryData = [
  { name: "Groceries", value: 35, color: "#ec4899" },
  { name: "Food", value: 20, color: "#8b5cf6" },
  { name: "Transport", value: 15, color: "#14b8a6" },
  { name: "Bills", value: 20, color: "#f59e0b" },
  { name: "Other", value: 10, color: "#6366f1" },
]

const radialData = [
  { name: "Savings", value: 68, fill: "#14b8a6" },
  { name: "Expenses", value: 82, fill: "#ec4899" },
  { name: "Goals", value: 55, fill: "#8b5cf6" },
]

export default function AnalyticsPage() {
  const { t } = useLanguage()

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-24">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-white/10 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{t("Analytics", "विश्लेषण")}</h1>
                <p className="text-[10px] text-muted-foreground">{t("Financial Insights", "वित्तीय जानकारी")}</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="glass border-white/20 p-4 space-y-2 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{t("Net Income", "शुद्ध आय")}</span>
                    <TrendingUp className="h-3 w-3 text-teal" />
                  </div>
                  <p className="text-2xl font-bold text-teal">₹18,240</p>
                  <p className="text-[10px] text-muted-foreground">{t("This month", "इस महीने")}</p>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="glass border-white/20 p-4 space-y-2 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sunset-pink/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{t("Total Spent", "कुल खर्च")}</span>
                    <TrendingDown className="h-3 w-3 text-sunset-pink" />
                  </div>
                  <p className="text-2xl font-bold text-sunset-pink">₹8,115</p>
                  <p className="text-[10px] text-muted-foreground">{t("This month", "इस महीने")}</p>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="glass border-white/20 p-4 space-y-2 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{t("Avg Daily", "औसत दैनिक")}</span>
                    <Calendar className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-primary">₹270</p>
                  <p className="text-[10px] text-muted-foreground">{t("Spending", "खर्च")}</p>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="glass border-white/20 p-4 space-y-2 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{t("Savings Rate", "बचत दर")}</span>
                    <DollarSign className="h-3 w-3 text-accent" />
                  </div>
                  <p className="text-2xl font-bold text-accent">56%</p>
                  <p className="text-[10px] text-muted-foreground">{t("Of income", "आय का")}</p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Weekly Income vs Expense */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="glass border-white/20 p-6 space-y-4">
              <div>
                <h3 className="font-semibold">{t("Weekly Overview", "साप्ताहिक अवलोकन")}</h3>
                <p className="text-xs text-muted-foreground">{t("Income vs Expenses", "आय बनाम खर्च")}</p>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="currentColor" className="text-muted-foreground" fontSize={12} />
                    <YAxis stroke="currentColor" className="text-muted-foreground" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      fill="url(#incomeGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expense"
                      stroke="#ec4899"
                      strokeWidth={2}
                      fill="url(#expenseGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="glass border-white/20 p-6 space-y-4">
              <div>
                <h3 className="font-semibold">{t("Balance Trend", "शेष प्रवृत्ति")}</h3>
                <p className="text-xs text-muted-foreground">{t("Last 6 months", "पिछले 6 महीने")}</p>
              </div>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" fontSize={12} />
                    <YAxis stroke="currentColor" className="text-muted-foreground" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="url(#lineGradient)"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Category Distribution & Radial Progress */}
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
              <Card className="glass border-white/20 p-6 space-y-4">
                <div>
                  <h3 className="font-semibold">{t("Spending Distribution", "खर्च वितरण")}</h3>
                  <p className="text-xs text-muted-foreground">{t("By category", "श्रेणी के अनुसार")}</p>
                </div>
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "8px",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-xs">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="glass border-white/20 p-6 space-y-4">
                <div>
                  <h3 className="font-semibold">{t("Financial Health", "वित्तीय स्वास्थ्य")}</h3>
                  <p className="text-xs text-muted-foreground">{t("Performance metrics", "प्रदर्शन मेट्रिक्स")}</p>
                </div>
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="20%"
                      outerRadius="90%"
                      data={radialData}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {radialData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                        <span className="text-xs">{item.name}</span>
                      </div>
                      <span className="text-xs font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* AI Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Card className="glass border-white/20 p-6 space-y-4 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                <h3 className="font-semibold">{t("AI Insights", "AI जानकारी")}</h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: "💡",
                    title: t("Smart Saving Opportunity", "स्मार्ट बचत अवसर"),
                    desc: t(
                      "You spend 35% on groceries. Consider bulk buying to save ₹500/month.",
                      "थोक में खरीदारी करके ₹500/माह बचाएं",
                    ),
                  },
                  {
                    icon: "📈",
                    title: t("Income Pattern Detected", "आय पैटर्न पाया गया"),
                    desc: t(
                      "Your income peaks on Fridays. Plan major expenses accordingly.",
                      "शुक्रवार को आय अधिक होती है",
                    ),
                  },
                  {
                    icon: "🎯",
                    title: t("Goal Achievement", "लक्ष्य उपलब्धि"),
                    desc: t("At current rate, you'll reach your phone goal in 6 weeks!", "6 हफ्तों में लक्ष्य हासिल होगा"),
                  },
                ].map((insight, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl glass border border-white/20">
                    <div className="h-10 w-10 rounded-full glass flex items-center justify-center text-xl flex-shrink-0">
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{insight.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{insight.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </main>

        <BottomNav />
      </div>
    </AuthWrapper>
  )
}
