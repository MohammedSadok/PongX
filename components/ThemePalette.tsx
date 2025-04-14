"use client";

import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { ColorPicker } from "./ColorPicker";

export function ThemePalette() {
  const { currentTheme } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-20">
      <button
        onClick={() => setShowColorPicker(true)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 cursor-pointer"
        style={{ backgroundColor: currentTheme.accentColor }}
        aria-label="Theme controls"
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

      {showColorPicker && (
        <ColorPicker onClose={() => setShowColorPicker(false)} />
      )}
    </div>
  );
}
