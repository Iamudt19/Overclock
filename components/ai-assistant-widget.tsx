"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, Mic } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIAssistantWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI money assistant. Ask me anything about managing your finances! 💰",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your spending pattern, you can save ₹500 more this month by reducing food expenses by 10%.",
        "Great question! I recommend setting aside 30% of your income for savings and 20% for flexible spending.",
        "You're doing well! Your savings rate is above average. Keep up the good work!",
        "I noticed you spend more on weekends. Try planning meals ahead to reduce food costs.",
      ]
      const aiMessage: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Card className="glass border-white/20 p-6 space-y-4 max-h-[500px] flex flex-col">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white animate-pulse" />
        </div>
        <div>
          <h3 className="font-semibold">AI Assistant</h3>
          <p className="text-xs text-muted-foreground">AI सहायक • Smart money advice</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 min-h-[200px]">
        <AnimatePresence>
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "glass border border-white/20"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="glass border border-white/20 px-4 py-2 rounded-2xl">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
          className="glass border-white/20"
        />
        <Button size="icon" variant="outline" className="glass border-white/20 bg-transparent">
          <Mic className="h-4 w-4" />
        </Button>
        <Button size="icon" onClick={handleSend} className="bg-gradient-to-r from-primary to-secondary">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
