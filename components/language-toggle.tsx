"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="glass border-white/20 gap-2 bg-transparent">
      <Languages className="h-4 w-4" />
      <span className="font-medium">{language === "en" ? "हिंदी" : "English"}</span>
    </Button>
  )
}
