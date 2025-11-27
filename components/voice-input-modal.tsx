"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Languages } from "lucide-react"

interface VoiceInputModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VoiceInputModal({ open, onOpenChange }: VoiceInputModalProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [language, setLanguage] = useState<"en" | "hi">("en")

  useEffect(() => {
    if (isListening) {
      // Simulate voice recognition
      const timer = setTimeout(() => {
        setTranscript(language === "en" ? "Added 500 rupees expense for groceries" : "पांच सौ रुपये किराने का खर्च जोड़ें")
        setIsListening(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isListening, language])

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTranscript("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/20 backdrop-blur-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Mic className="h-6 w-6 text-primary" />
            Voice Assistant
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {language === "en" ? "Speak to add expenses or income" : "खर्च या आय जोड़ने के लिए बोलें"}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Language Toggle */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="glass border-white/20 gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === "en" ? "Switch to Hindi" : "Switch to English"}
            </Button>
          </div>

          {/* Microphone Button */}
          <div className="flex justify-center">
            <button
              onClick={toggleListening}
              className={`h-32 w-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-gradient-to-br from-sunset-pink to-accent animate-pulse scale-110"
                  : "glass border-4 border-primary/30 hover:scale-105"
              }`}
            >
              {isListening ? <MicOff className="h-12 w-12 text-white" /> : <Mic className="h-12 w-12 text-primary" />}
            </button>
          </div>

          {/* Status Text */}
          <div className="text-center space-y-2">
            {isListening ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-sunset-pink animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-sunset-pink animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-sunset-pink animate-bounce [animation-delay:0.4s]" />
                </div>
                <p className="text-sm font-medium text-primary">{language === "en" ? "Listening..." : "सुन रहे हैं..."}</p>
              </>
            ) : transcript ? (
              <div className="glass border-white/20 p-4 rounded-xl">
                <p className="text-sm">{transcript}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Tap the microphone to start" : "शुरू करने के लिए माइक्रोफोन टैप करें"}
              </p>
            )}
          </div>

          {/* Example Commands */}
          <div className="glass border-white/20 p-4 rounded-xl space-y-2">
            <p className="text-xs font-medium text-primary">
              {language === "en" ? "Example Commands:" : "उदाहरण कमांड:"}
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {language === "en" ? (
                <>
                  <li>• "Add 500 rupees for groceries"</li>
                  <li>• "Income 5000 from freelance"</li>
                  <li>• "Show my spending today"</li>
                </>
              ) : (
                <>
                  <li>• "किराने के लिए 500 रुपये जोड़ें"</li>
                  <li>• "फ्रीलांस से 5000 आय"</li>
                  <li>• "आज का खर्च दिखाएं"</li>
                </>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          {transcript && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 glass border-white/20 bg-transparent"
                onClick={() => setTranscript("")}
              >
                Try Again
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-primary to-secondary" onClick={() => onOpenChange(false)}>
                Confirm
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
