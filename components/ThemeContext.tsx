"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { THEMES } from "./game/constants";
import type { Theme } from "./game/types";

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
  ballCount: number;
  setBallCount: (count: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: THEMES[0],
  setTheme: () => {},
  ballCount: 1,
  setBallCount: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [ballCount, setBallCount] = useState<number>(1);

  const setTheme = (themeName: string) => {
    const theme = THEMES.find((t) => t.name === themeName) || THEMES[0];
    setCurrentTheme(theme);
    localStorage.setItem("theme", themeName);
  };

  // Fixed ball count handler with more direct approach
  const handleSetBallCount = (count: number) => {
    // Ensure we're working with numbers
    const newCount = Number(count);

    // Guard against NaN
    if (isNaN(newCount)) {
      console.error("Invalid ball count value:", count);
      return;
    }

    // Clamp the value between 1 and 5
    const validCount = Math.max(1, Math.min(5, newCount));

    console.log(`ThemeContext: Setting ball count to ${validCount}`);

    // Update state directly
    setBallCount(validCount);

    // Save to localStorage
    try {
      localStorage.setItem("ballCount", validCount.toString());
    } catch (e) {
      console.error("Failed to save ball count to localStorage:", e);
    }
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }

      const savedBallCount = localStorage.getItem("ballCount");
      if (savedBallCount) {
        const parsedCount = parseInt(savedBallCount, 10);
        if (!isNaN(parsedCount) && parsedCount >= 1 && parsedCount <= 5) {
          setBallCount(parsedCount);
          console.log(`Loaded ball count from storage: ${parsedCount}`);
        }
      }
    } catch (e) {
      console.error("Error loading settings from localStorage:", e);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        ballCount,
        setBallCount: handleSetBallCount,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
