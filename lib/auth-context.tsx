"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  username: string
  email: string
  phone: string
  createdAt: string
  profilePicture?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  signup: (username: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfilePicture: (imageUrl: string) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("flowfunds_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const storedUsers = localStorage.getItem("flowfunds_users")
    const users = storedUsers ? JSON.parse(storedUsers) : {}

    if (users[username] && users[username].password === password) {
      const userData = {
        username: users[username].username,
        email: users[username].email,
        phone: users[username].phone,
        createdAt: users[username].createdAt,
        profilePicture: users[username].profilePicture,
      }
      setUser(userData)
      localStorage.setItem("flowfunds_user", JSON.stringify(userData))
      return true
    }

    return false
  }

  const signup = async (username: string, email: string, phone: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const storedUsers = localStorage.getItem("flowfunds_users")
    const users = storedUsers ? JSON.parse(storedUsers) : {}

    if (users[username]) {
      return false
    }

    const userData = {
      username,
      email,
      phone,
      password,
      createdAt: new Date().toISOString(),
    }

    users[username] = userData
    localStorage.setItem("flowfunds_users", JSON.stringify(users))

    const publicUserData = {
      username,
      email,
      phone,
      createdAt: userData.createdAt,
    }
    setUser(publicUserData)
    localStorage.setItem("flowfunds_user", JSON.stringify(publicUserData))

    return true
  }

  const updateProfilePicture = (imageUrl: string) => {
    if (!user) return

    const updatedUser = { ...user, profilePicture: imageUrl }
    setUser(updatedUser)
    localStorage.setItem("flowfunds_user", JSON.stringify(updatedUser))

    const storedUsers = localStorage.getItem("flowfunds_users")
    const users = storedUsers ? JSON.parse(storedUsers) : {}
    if (users[user.username]) {
      users[user.username].profilePicture = imageUrl
      localStorage.setItem("flowfunds_users", JSON.stringify(users))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("flowfunds_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfilePicture, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
