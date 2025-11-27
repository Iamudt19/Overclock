"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileIconSelector } from "@/components/profile-icon-selector"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"
import { useRouter } from "next/navigation"
import {
  Settings,
  User,
  LogOut,
  FileText,
  MessageSquare,
  Shield,
  Check,
  AlertCircle,
  Bell,
  Smartphone,
  Lock,
  Globe,
  Moon,
  Sun,
  Camera,
  Smile,
} from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <SettingsContent />
    </AuthWrapper>
  )
}

function SettingsContent() {
  const { user, logout, updateProfilePicture } = useAuth()
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "terms">("profile")
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [biometricsEnabled, setBiometricsEnabled] = useState(false)
  const [iconSelectorOpen, setIconSelectorOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const t = (en: string, hi: string) => (language === "en" ? en : hi)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        updateProfilePicture(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIconSelect = (icon: string) => {
    updateProfilePicture(icon)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 pb-24 pt-20">
      <header className="sticky top-16 z-40 glass border-b border-white/10 backdrop-blur-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Avatar className="h-16 w-16 ring-4 ring-primary/20 transition-all group-hover:ring-primary/40">
                  {user?.profilePicture && user.profilePicture.length < 10 ? (
                    <div className="h-full w-full flex items-center justify-center text-4xl bg-gradient-to-br from-primary via-secondary to-accent">
                      {user.profilePicture}
                    </div>
                  ) : (
                    <>
                      <AvatarImage
                        src={user?.profilePicture || "/placeholder.svg?height=64&width=64&query=user-profile"}
                        alt={user?.username}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-xl">
                        {user?.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                >
                  <Camera className="h-3 w-3" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold">{user?.username}</h2>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t("Settings", "सेटिंग्स")}</h1>
              <p className="text-[10px] text-muted-foreground">{t("Preferences", "प्राथमिकताएं")}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <div className="flex gap-2 mb-6 p-1 glass rounded-xl border border-white/20">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="h-4 w-4 inline mr-2" />
            {t("Profile", "प्रोफ़ाइल")}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === "settings"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Settings className="h-4 w-4 inline mr-2" />
            {t("Settings", "सेटिंग्स")}
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === "terms"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            {t("Terms", "नियम")}
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === "profile" && (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="glass border-white/20 p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      {user?.profilePicture && user.profilePicture.length < 10 ? (
                        <div className="h-full w-full flex items-center justify-center text-5xl bg-gradient-to-br from-primary via-secondary to-accent">
                          {user.profilePicture}
                        </div>
                      ) : (
                        <>
                          <AvatarImage
                            src={user?.profilePicture || "/placeholder.svg?height=80&width=80&query=user-profile"}
                            alt={user?.username}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold">
                            {user?.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl">{user?.username}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t("Member since", "सदस्य बने")} {new Date(user?.createdAt || "").toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 rounded-xl glass border border-white/20 space-y-3">
                    <p className="text-sm font-medium">{t("Profile Picture Options", "प्रोफ़ाइल चित्र विकल्प")}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setIconSelectorOpen(true)}
                        variant="outline"
                        size="sm"
                        className="flex-1 glass border-white/20"
                      >
                        <Smile className="h-4 w-4 mr-2" />
                        {t("Choose Avatar", "अवतार चुनें")}
                      </Button>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="flex-1 glass border-white/20"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        {t("Upload Photo", "फोटो अपलोड करें")}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl glass border border-white/20">
                      <p className="text-xs text-muted-foreground mb-1">{t("Email Address", "ईमेल पता")}</p>
                      <p className="text-sm font-medium">{user?.email}</p>
                    </div>

                    <div className="p-4 rounded-xl glass border border-white/20">
                      <p className="text-xs text-muted-foreground mb-1">{t("Phone Number", "फोन नंबर")}</p>
                      <p className="text-sm font-medium">{user?.phone}</p>
                    </div>

                    <div className="p-4 rounded-xl glass border border-white/20">
                      <p className="text-xs text-muted-foreground mb-1">{t("Username", "उपयोगकर्ता नाम")}</p>
                      <p className="text-sm font-medium">{user?.username}</p>
                    </div>

                    <div className="p-4 rounded-xl glass border border-white/20">
                      <p className="text-xs text-muted-foreground mb-1">{t("Account Status", "खाता स्थिति")}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <p className="text-sm font-medium text-green-500">{t("Active", "सक्रिय")}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full bg-destructive/90 hover:bg-destructive text-white"
                >
                  <LogOut className="h-4 w-4" />
                  {t("Sign Out", "साइन आउट")}
                </Button>
              </motion.div>
            </>
          )}

          {activeTab === "settings" && (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="glass border-white/20 divide-y divide-border/50">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{t("Language", "भाषा")}</p>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "English" : "हिंदी"}</p>
                      </div>
                    </div>
                    <Button onClick={toggleLanguage} variant="outline" size="sm">
                      {language === "en" ? "हिंदी" : "English"}
                    </Button>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {theme === "light" ? (
                        <Sun className="h-5 w-5 text-accent" />
                      ) : (
                        <Moon className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{t("Theme", "थीम")}</p>
                        <p className="text-xs text-muted-foreground">
                          {theme === "light" ? t("Light Mode", "लाइट मोड") : t("Dark Mode", "डार्क मोड")}
                        </p>
                      </div>
                    </div>
                    <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass border-white/20 p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{t("Auto SMS Parsing", "ऑटो SMS पार्सिंग")}</h3>
                          <p className="text-xs text-muted-foreground">
                            {t("Automatically log expenses from transaction SMS", "SMS से खर्च स्वचालित रूप से जोड़ें")}
                          </p>
                        </div>
                        <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                      </div>

                      {!smsEnabled && (
                        <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20 mt-3">
                          <AlertCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground">
                            {t(
                              "Enable to automatically track expenses from bank SMS. All data stays encrypted on your device.",
                              "बैंक SMS से खर्च ट्रैक करने के लिए सक्षम करें। सभी डेटा आपके डिवाइस पर एन्क्रिप्टेड रहता है।",
                            )}
                          </p>
                        </div>
                      )}

                      {smsEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-3 mt-4"
                        >
                          <div className="flex items-center gap-2 text-teal">
                            <Check className="h-4 w-4" />
                            <span className="text-sm font-medium">{t("SMS Parsing Enabled", "SMS पार्सिंग सक्षम")}</span>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-medium">{t("Supported Banks:", "समर्थित बैंक:")}</p>
                            <div className="grid grid-cols-2 gap-2">
                              {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak", "PNB", "Paytm", "PhonePe"].map(
                                (bank) => (
                                  <div
                                    key={bank}
                                    className="flex items-center gap-2 p-2 rounded-lg glass border border-white/20"
                                  >
                                    <div className="h-2 w-2 rounded-full bg-teal" />
                                    <span className="text-xs">{bank}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="p-4 rounded-xl glass border border-white/20 space-y-2">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-teal" />
                              <p className="text-xs font-medium">{t("Privacy Protection", "गोपनीयता सुरक्षा")}</p>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                              <li>
                                {t(
                                  "• All SMS data processed locally on your device",
                                  "• सभी SMS डेटा आपके डिवाइस पर प्रोसेस होता है",
                                )}
                              </li>
                              <li>{t("• No SMS content sent to servers", "• कोई SMS सर्वर पर नहीं भेजा जाता")}</li>
                              <li>{t("• Only transaction amounts are extracted", "• केवल लेनदेन राशि निकाली जाती है")}</li>
                              <li>
                                {t("• Encrypted storage with device security", "• डिवाइस सुरक्षा के साथ एन्क्रिप्टेड स्टोरेज")}
                              </li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="glass border-white/20 divide-y divide-border/50">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-sunset-pink" />
                      <div>
                        <p className="text-sm font-medium">{t("Push Notifications", "पुश नोटिफिकेशन")}</p>
                        <p className="text-xs text-muted-foreground">
                          {t("Budget alerts & reminders", "बजेट अलर्ट और रिमाइंडर")}
                        </p>
                      </div>
                    </div>
                    <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{t("Biometric Lock", "बायोमेट्रिक लॉक")}</p>
                        <p className="text-xs text-muted-foreground">
                          {t("Fingerprint/Face ID security", "फिंगरप्रिंट/फेस ID सुरक्षा")}
                        </p>
                      </div>
                    </div>
                    <Switch checked={biometricsEnabled} onCheckedChange={setBiometricsEnabled} />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium">{t("Data Privacy", "डेटा गोपनीयता")}</p>
                        <p className="text-xs text-muted-foreground">
                          {t("End-to-end encryption", "एंड-टू-एंड एन्क्रिप्शन")}
                        </p>
                      </div>
                    </div>
                    <Shield className="h-5 w-5 text-teal" />
                  </div>
                </Card>
              </motion.div>
            </>
          )}

          {activeTab === "terms" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="glass border-white/20 p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">Terms and Conditions</h3>
                    <p className="text-xs text-muted-foreground">Last updated: January 2025</p>
                  </div>
                </div>

                <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h4>
                    <p>
                      By accessing and using FlowFunds India, you accept and agree to be bound by the terms and
                      provisions of this agreement. If you do not agree to these terms, please do not use our services.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">2. Use of Services</h4>
                    <p>
                      FlowFunds India provides personal finance management tools designed for Indian users with
                      irregular income. You agree to use our services only for lawful purposes and in accordance with
                      these terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">3. Privacy and Data Security</h4>
                    <p>
                      We take your privacy seriously. All sensitive financial data, including SMS content, is processed
                      locally on your device. We employ industry-standard encryption to protect your information. We
                      never sell or share your personal data with third parties without your explicit consent.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">4. SMS Parsing Feature</h4>
                    <p>
                      The SMS parsing feature is designed to help you automatically track expenses from bank transaction
                      messages. This feature requires permission to read SMS on your device. All SMS data is processed
                      locally and never transmitted to our servers. You can disable this feature at any time in the app
                      settings.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">5. Financial Advice Disclaimer</h4>
                    <p>
                      FlowFunds India provides tools and insights to help manage your personal finances. However, the
                      app does not provide professional financial, investment, or tax advice. AI-powered suggestions are
                      for informational purposes only. Always consult with qualified financial professionals for
                      personalized advice.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">6. User Responsibilities</h4>
                    <p>
                      You are responsible for maintaining the confidentiality of your account credentials. You agree to
                      notify us immediately of any unauthorized use of your account. You are responsible for all
                      activities that occur under your account.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">7. Intellectual Property</h4>
                    <p>
                      All content, features, and functionality of FlowFunds India are owned by us and are protected by
                      international copyright, trademark, and other intellectual property laws. You may not reproduce,
                      distribute, or create derivative works without our express written permission.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">8. Limitation of Liability</h4>
                    <p>
                      FlowFunds India is provided "as is" without warranties of any kind. We shall not be liable for any
                      indirect, incidental, special, consequential, or punitive damages resulting from your use or
                      inability to use the service. Our total liability shall not exceed the amount paid by you, if any,
                      for accessing the service.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">9. Changes to Terms</h4>
                    <p>
                      We reserve the right to modify these terms at any time. We will notify users of any material
                      changes via the app or email. Your continued use of FlowFunds India after such modifications
                      constitutes your acceptance of the updated terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">10. Governing Law</h4>
                    <p>
                      These terms shall be governed by and construed in accordance with the laws of India. Any disputes
                      arising from these terms or your use of FlowFunds India shall be subject to the exclusive
                      jurisdiction of the courts in Mumbai, India.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-foreground mb-2">11. Contact Information</h4>
                    <p>
                      If you have any questions about these Terms and Conditions, please contact us at
                      support@flowfundsindia.com or write to us at FlowFunds India, Mumbai, Maharashtra, India.
                    </p>
                  </section>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-center text-muted-foreground">
                    By using FlowFunds India, you acknowledge that you have read, understood, and agree to be bound by
                    these Terms and Conditions.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      <BottomNav />
      <ProfileIconSelector
        open={iconSelectorOpen}
        onOpenChange={setIconSelectorOpen}
        onSelectIcon={handleIconSelect}
        currentIcon={user?.profilePicture}
      />
    </div>
  )
}
