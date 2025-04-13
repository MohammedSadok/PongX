"use client"

import { useState } from "react"
import { THEMES } from "./game/constants"
import { useTheme } from "./ThemeContext"

export function ThemePalette() {
  const { currentTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
        style={{ backgroundColor: currentTheme.accentColor }}
        aria-label="Change theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-black bg-opacity-80 p-4 rounded-lg shadow-xl flex flex-col gap-3 transition-all">
          <p className="text-white text-sm mb-2 font-semibold">Choose Theme</p>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setTheme(theme.name)
                  setIsOpen(false)
                }}
                className={`w-10 h-10 rounded-full transition-transform transform hover:scale-110 ${
                  currentTheme.name === theme.name ? "ring-2 ring-white" : ""
                }`}
                style={{ backgroundColor: theme.activeBallColor }}
                aria-label={`${theme.name} theme`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
