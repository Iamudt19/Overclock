"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomNav } from "@/components/bottom-nav"
import { Sparkles, Send, Lightbulb, TrendingUp, PiggyBank, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

function AIAdvisorContent() {
  const { t } = useLanguage()
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const [inputValue, setInputValue] = useState("")

  const quickQuestions = [
    {
      icon: PiggyBank,
      text: t("How much should I save monthly?", "मुझे हर महीने कितनी बचत करनी चाहिए?"),
      question: "I earn an irregular income. How much should I try to save each month?",
    },
    {
      icon: TrendingUp,
      text: t("Best way to track expenses?", "खर्चों को ट्रैक करने का सबसे अच्छा तरीका?"),
      question: "What is the best way to track my daily expenses?",
    },
    {
      icon: AlertCircle,
      text: t("Build emergency fund?", "आपातकालीन फंड कैसे बनाएं?"),
      question: "How do I build an emergency fund with irregular income?",
    },
    {
      icon: Lightbulb,
      text: t("Budget tips for gig workers?", "गिग वर्कर्स के लिए बजट टिप्स?"),
      question: "What are some budgeting tips for gig economy workers in India?",
    },
  ]

  const handleSend = () => {
    if (!inputValue.trim()) return
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const handleQuickQuestion = (question: string) => {
    sendMessage({ text: question })
  }

  return (
    <>
      <div className="min-h-screen pb-24 pt-6 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("AI Money Advisor", "AI मनी एडवाइजर")}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {t(
                "Get personalized financial advice powered by AI. Ask me anything about budgeting, saving, or managing money!",
                "AI द्वारा संचालित व्यक्तिगत वित्तीय सलाह प्राप्त करें। बजट, बचत या पैसे के प्रबंधन के बारे में मुझसे कुछ भी पूछें!",
              )}
            </p>
          </motion.div>

          {/* Quick Questions */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {quickQuestions.map((item, index) => {
                const Icon = item.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="glass border-white/20 bg-transparent h-auto p-4 justify-start text-left hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 active:scale-95"
                    onClick={() => handleQuickQuestion(item.question)}
                  >
                    <Icon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </Button>
                )
              })}
            </motion.div>
          )}

          {/* Messages */}
          <Card className="glass border-white/20 p-4 min-h-[400px] max-h-[500px] overflow-y-auto space-y-4">
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[350px] space-y-4"
                >
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Sparkles className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-semibold text-lg">
                      {t("Hi! I'm your AI Money Advisor", "नमस्ते! मैं आपका AI मनी एडवाइजर हूं")}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      {t(
                        "I'm here to help you make smarter financial decisions. Choose a question above or type your own!",
                        "मैं आपको बेहतर वित्तीय निर्णय लेने में मदद करने के लिए यहां हूं। ऊपर एक प्रश्न चुनें या अपना स्वयं का लिखें!",
                      )}
                    </p>
                  </div>
                </motion.div>
              )}

              {messages.map((message, i) => (
                <motion.div
                  key={message.id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-primary to-secondary text-white"
                        : "glass border border-white/20"
                    }`}
                  >
                    {message.parts.map((part, partIndex) => {
                      if (part.type === "text") {
                        return (
                          <p key={partIndex} className="text-sm leading-relaxed whitespace-pre-wrap">
                            {part.text}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {status === "in_progress" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="glass border border-white/20 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}
          </Card>

          {/* Input */}
          <Card className="glass border-white/20 p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("Ask me anything about budgeting...", "बजट के बारे में मुझसे कुछ भी पूछें...")}
                className="glass border-white/20 bg-transparent flex-1"
                disabled={status === "in_progress"}
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                disabled={status === "in_progress" || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              {t(
                "AI-powered advice • Always verify important financial decisions",
                "AI द्वारा संचालित सलाह • महत्वपूर्ण वित्तीय निर्णयों को हमेशा सत्यापित करें",
              )}
            </p>
          </Card>
        </div>
      </div>
      <BottomNav />
    </>
  )
}

export default function AIAdvisorPage() {
  return (
    <AuthWrapper>
      <AIAdvisorContent />
    </AuthWrapper>
  )
}
