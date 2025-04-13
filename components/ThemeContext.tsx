"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { THEMES } from "./game/constants";

type Theme = (typeof THEMES)[0];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
  ballCount: number;
  setBallCount: (count: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: THEMES[0],
  setTheme: () => {},
  ballCount: 3,
  setBallCount: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [ballCount, setBallCount] = useState<number>(3);

  const setTheme = (themeName: string) => {
    const theme = THEMES.find((t) => t.name === themeName);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  // Ensure ball count is always within valid range
  const handleSetBallCount = (count: number) => {
    const validCount = Math.max(1, Math.min(5, count));
    console.log(`ThemeContext: Setting ball count to ${validCount}`);
    setBallCount(validCount);
  };

  // Debug state changes
  useEffect(() => {
    console.log(`Theme changed to: ${currentTheme.name}`);
  }, [currentTheme]);

  useEffect(() => {
    console.log(`Ball count in context is now: ${ballCount}`);
  }, [ballCount]);

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
}
