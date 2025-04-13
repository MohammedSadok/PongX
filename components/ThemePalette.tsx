"use client";

import { useState } from "react";
import { THEMES } from "./game/constants";
import { useTheme } from "./ThemeContext";

export function ThemePalette() {
  const { currentTheme, setTheme, ballCount, setBallCount } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Simplified direct handlers
  const decreaseBalls = () => {
    if (ballCount > 1) {
      // Force the count to be exactly one less than current count
      const newCount = Math.max(1, ballCount - 1);
      console.log(
        `DECREASE: Setting ball count to ${newCount} (from ${ballCount})`
      );
      // Direct state update with the exact number
      setBallCount(newCount);
    }
  };

  const increaseBalls = () => {
    if (ballCount < 5) {
      // Force the count to be exactly one more than current count
      const newCount = Math.min(5, ballCount + 1);
      console.log(
        `INCREASE: Setting ball count to ${newCount} (from ${ballCount})`
      );
      // Direct state update with the exact number
      setBallCount(newCount);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 cursor-pointer"
        style={{ backgroundColor: currentTheme.accentColor }}
        aria-label="Game controls"
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
        <div className="absolute bottom-16 right-0 bg-black bg-opacity-80 p-4 rounded-lg shadow-xl flex flex-col gap-4 transition-all w-64">
          {/* Theme Controls */}
          <div>
            <p className="text-white text-sm mb-2 font-semibold">
              Choose Theme
            </p>
            <div className="grid grid-cols-3 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => {
                    setTheme(theme.name);
                  }}
                  className={`w-10 h-10 rounded-full transition-transform transform hover:scale-110 cursor-pointer ${
                    currentTheme.name === theme.name ? "ring-2 ring-white" : ""
                  }`}
                  style={{ backgroundColor: theme.activeBallColor }}
                  aria-label={`${theme.name} theme`}
                  title={`${theme.name} theme`}
                />
              ))}
            </div>
          </div>

          {/* Ball Count Controls */}
          <div>
            <p className="text-white text-sm mb-2 font-semibold">
              Ball Count: {ballCount}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseBalls}
                className={`${
                  ballCount <= 1
                    ? "bg-gray-800 text-gray-600"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                } w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors`}
                aria-label="Decrease ball count"
                disabled={ballCount <= 1}
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
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>

              <div className="flex-1 bg-gray-700 h-2 rounded-full">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${(ballCount / 5) * 100}%`,
                    backgroundColor: currentTheme.activeBallColor,
                  }}
                ></div>
              </div>

              <button
                onClick={increaseBalls}
                className={`${
                  ballCount >= 5
                    ? "bg-gray-800 text-gray-600"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                } w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors`}
                aria-label="Increase ball count"
                disabled={ballCount >= 5}
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
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Direct Ball Count Selection */}
          <div>
            <p className="text-white text-sm mb-2 font-semibold">
              Set Ball Count Directly
            </p>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => setBallCount(count)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                    ballCount === count
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                  aria-label={`Set to ${count} balls`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
