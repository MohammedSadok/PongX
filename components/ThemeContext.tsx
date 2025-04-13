"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { THEMES } from "./game/constants"
import type { Theme } from "./game/types"

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (themeName: string) => void
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: THEMES[0],
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0])

  const setTheme = (themeName: string) => {
    const theme = THEMES.find((t) => t.name === themeName) || THEMES[0]
    setCurrentTheme(theme)
    localStorage.setItem("theme", themeName)
  }

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  return <ThemeContext.Provider value={{ currentTheme, setTheme }}>{children}</ThemeContext.Provider>
}
