"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { THEMES } from "./game/constants";

type Theme = (typeof THEMES)[0];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
  customColors: {
    ballColor: string;
    activeBallColor: string;
    accentColor: string;
  };
  setCustomColors: (colors: {
    ballColor: string;
    activeBallColor: string;
    accentColor: string;
  }) => void;
  // Keep ballCount in the interface but with fixed value of 1
  ballCount: number;
  setBallCount: (count: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: THEMES[0],
  setTheme: () => {},
  ballCount: 1,
  setBallCount: () => {},
  customColors: {
    ballColor: "#FFFFFF",
    activeBallColor: "#00ff99",
    accentColor: "#00ff99",
  },
  setCustomColors: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  // Always use 1 ball
  const [ballCount] = useState<number>(1);
  const [customColors, setCustomColors] = useState({
    ballColor: "#FFFFFF",
    activeBallColor: "#00ff99",
    accentColor: "#00ff99",
  });

  const setTheme = (themeName: string) => {
    if (themeName === "custom") {
      // Create a custom theme using the custom colors
      const customTheme: Theme = {
        name: "custom",
        ballColor: customColors.ballColor,
        activeBallColor: customColors.activeBallColor,
        navbarActive: `rgba(${hexToRgb(customColors.activeBallColor)}, 0.3)`,
        navbarBg: "rgba(0, 0, 0, 0.5)",
        textColor: "#FFFFFF",
        accentColor: customColors.accentColor,
      };
      setCurrentTheme(customTheme);
    } else {
      const theme = THEMES.find((t) => t.name === themeName);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  };

  // Convert hex to RGB for rgba usage
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : "255, 255, 255";
  };

  // No-op function for setBallCount, always keeps value at 1
  const setBallCount = () => {
    // Do nothing - we always want 1 ball
    console.log("setBallCount called but ignored - always using 1 ball");
  };

  // Debug state changes
  useEffect(() => {
    console.log(`Theme changed to: ${currentTheme.name}`);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        ballCount,
        setBallCount,
        customColors,
        setCustomColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
