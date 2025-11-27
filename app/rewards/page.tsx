"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { LanguageToggle } from "@/components/language-toggle"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Trophy, Star, Flame, Zap, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { AuthWrapper } from "@/components/auth-wrapper"

const badges = [
  { id: 1, name: "First Save", nameHi: "पहली बचत", icon: "🎯", earned: true, color: "from-teal to-secondary" },
  {
    id: 2,
    name: "7 Day Streak",
    nameHi: "7 दिन की धारा",
    icon: "🔥",
    earned: true,
    color: "from-sunset-pink to-accent",
  },
  { id: 3, name: "Budget Master", nameHi: "बजट मास्टर", icon: "💰", earned: true, color: "from-primary to-secondary" },
  {
    id: 4,
    name: "Goal Achiever",
    nameHi: "लक्ष्य प्राप्तकर्ता",
    icon: "⭐",
    earned: false,
    color: "from-accent to-gold-accent",
  },
  { id: 5, name: "Savings Pro", nameHi: "बचत प्रो", icon: "💎", earned: false, color: "from-primary to-accent" },
  { id: 6, name: "Money Guru", nameHi: "मनी गुरु", icon: "👑", earned: false, color: "from-gold-accent to-accent" },
]

const challenges = [
  { title: "Save ₹1000 this week", titleHi: "इस हफ्ते ₹1000 बचाएं", progress: 75, reward: 50, icon: "💰" },
  { title: "No eating out for 3 days", titleHi: "3 दिन बाहर खाना नहीं", progress: 66, reward: 30, icon: "🍽️" },
  { title: "Track all expenses today", titleHi: "आज सभी खर्च ट्रैक करें", progress: 100, reward: 20, icon: "✅" },
]

export default function RewardsPage() {
  const [points, setPoints] = useState(850)
  const [level, setLevel] = useState(5)
  const nextLevelPoints = 1000
  const levelProgress = (points / nextLevelPoints) * 100

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gold-accent/5 via-background to-primary/5 pb-24">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-white/10 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold-accent to-accent flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Rewards</h1>
                <p className="text-[10px] text-muted-foreground">पुरस्कार • Earn & Achieve</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Points & Level */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Card className="glass border-white/20 p-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-accent/10 blur-3xl animate-pulse" />
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl animate-pulse" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Level</p>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-gold-accent to-accent bg-clip-text text-transparent">
                      Level {level}
                    </h2>
                  </div>
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gold-accent to-accent flex items-center justify-center animate-float">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{points} Points</span>
                    <span className="text-muted-foreground">{nextLevelPoints} Points</span>
                  </div>
                  <Progress value={levelProgress} className="h-3" />
                  <p className="text-xs text-center text-muted-foreground">
                    {nextLevelPoints - points} points to next level!
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <div className="flex-1 text-center p-3 rounded-xl glass border border-white/20">
                    <p className="text-2xl font-bold text-gold-accent">{points}</p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                  <div className="flex-1 text-center p-3 rounded-xl glass border border-white/20">
                    <p className="text-2xl font-bold text-sunset-pink">14</p>
                    <p className="text-xs text-muted-foreground">Days Streak</p>
                  </div>
                  <div className="flex-1 text-center p-3 rounded-xl glass border border-white/20">
                    <p className="text-2xl font-bold text-teal">6</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Active Challenges */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-muted-foreground">Active Challenges</h3>
              <Flame className="h-4 w-4 text-sunset-pink animate-pulse" />
            </div>

            <div className="space-y-3">
              {challenges.map((challenge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass border-white/20 p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-xl glass flex items-center justify-center text-2xl flex-shrink-0">
                        {challenge.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium">{challenge.title}</p>
                            <p className="text-xs text-muted-foreground">{challenge.titleHi}</p>
                          </div>
                          <div className="flex items-center gap-1 text-gold-accent">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs font-bold">+{challenge.reward}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress value={challenge.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">{challenge.progress}% Complete</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Badges Collection */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground px-1">Badge Collection</h3>
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                >
                  <Card
                    className={`glass border-white/20 p-4 text-center space-y-2 ${
                      badge.earned ? "hover:scale-105 cursor-pointer" : "opacity-50 grayscale"
                    } transition-all`}
                  >
                    <div
                      className={`h-16 w-16 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-3xl mx-auto ${
                        badge.earned && "animate-float"
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{badge.name}</p>
                      <p className="text-[10px] text-muted-foreground">{badge.nameHi}</p>
                    </div>
                    {badge.earned && (
                      <div className="flex items-center justify-center gap-1 text-gold-accent">
                        <Award className="h-3 w-3" />
                        <span className="text-[10px] font-bold">Earned</span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboard Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="glass border-white/20 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Weekly Leaderboard
                </h3>
                <span className="text-xs text-muted-foreground">Your Rank: #8</span>
              </div>

              <div className="space-y-2">
                {[
                  { rank: 1, name: "Priya S.", points: 1250, icon: "🥇" },
                  { rank: 2, name: "Rahul M.", points: 1180, icon: "🥈" },
                  { rank: 3, name: "Amit K.", points: 1050, icon: "🥉" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl glass border border-white/20">
                    <span className="text-2xl">{user.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.points} points</p>
                    </div>
                    <Zap className="h-4 w-4 text-gold-accent" />
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-secondary">View Full Leaderboard</Button>
            </Card>
          </motion.div>
        </main>

        <BottomNav />
      </div>
    </AuthWrapper>
  )
}
