"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ProfileIconSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectIcon: (icon: string) => void
  currentIcon?: string
}

const profileIcons = [
  { id: 1, icon: "👨", color: "from-blue-500 to-blue-600" },
  { id: 2, icon: "👩", color: "from-pink-500 to-pink-600" },
  { id: 3, icon: "🧑", color: "from-purple-500 to-purple-600" },
  { id: 4, icon: "👨‍💼", color: "from-teal to-teal/80" },
  { id: 5, icon: "👩‍💼", color: "from-secondary to-secondary/80" },
  { id: 6, icon: "👨‍🎓", color: "from-accent to-accent/80" },
  { id: 7, icon: "👩‍🎓", color: "from-gold-accent to-gold-accent/80" },
  { id: 8, icon: "🧑‍💻", color: "from-teal to-secondary" },
  { id: 9, icon: "👨‍🔧", color: "from-blue-600 to-teal" },
  { id: 10, icon: "👩‍🔧", color: "from-pink-600 to-accent" },
  { id: 11, icon: "👨‍🍳", color: "from-orange-500 to-red-500" },
  { id: 12, icon: "👩‍🍳", color: "from-yellow-500 to-orange-500" },
  { id: 13, icon: "🧑‍⚕️", color: "from-green-500 to-teal" },
  { id: 14, icon: "👨‍🏫", color: "from-indigo-500 to-purple-500" },
  { id: 15, icon: "👩‍🏫", color: "from-pink-500 to-purple-500" },
  { id: 16, icon: "🧑‍🎨", color: "from-accent to-pink-500" },
  { id: 17, icon: "👨‍🚀", color: "from-blue-600 to-purple-600" },
  { id: 18, icon: "👩‍🚀", color: "from-pink-600 to-purple-600" },
  { id: 19, icon: "🧑‍🌾", color: "from-green-600 to-teal" },
  { id: 20, icon: "👨‍🎤", color: "from-gold-accent to-accent" },
  { id: 21, icon: "👩‍🎤", color: "from-pink-500 to-gold-accent" },
  { id: 22, icon: "🧑‍🚒", color: "from-red-500 to-orange-500" },
  { id: 23, icon: "🦸", color: "from-teal to-secondary" },
  { id: 24, icon: "🦸‍♀️", color: "from-accent to-gold-accent" },
]

export function ProfileIconSelector({ open, onOpenChange, onSelectIcon, currentIcon }: ProfileIconSelectorProps) {
  const [selectedIcon, setSelectedIcon] = useState(currentIcon || profileIcons[0].icon)

  const handleSelect = (icon: string) => {
    setSelectedIcon(icon)
    onSelectIcon(icon)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/20 backdrop-blur-2xl max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose Profile Icon</DialogTitle>
          <p className="text-sm text-muted-foreground">Select an avatar that represents you</p>
        </DialogHeader>

        <div className="grid grid-cols-6 gap-3 py-4">
          {profileIcons.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.icon)}
              className={cn(
                "aspect-square rounded-xl bg-gradient-to-br flex items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95",
                item.color,
                selectedIcon === item.icon && "ring-4 ring-teal ring-offset-2 ring-offset-background scale-105",
              )}
            >
              {item.icon}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            className="glass border-white/20 bg-transparent"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
