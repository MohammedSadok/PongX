"use client";

import { useTheme } from "./ThemeContext";
import { useState, useEffect } from "react";

export function BallCountDebug() {
  const { ballCount, setBallCount } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [localCount, setLocalCount] = useState(ballCount);

  useEffect(() => {
    setLocalCount(ballCount);
  }, [ballCount]);

  if (!isVisible) {
    return (
      <button
        className="fixed top-4 right-4 bg-red-500 text-white px-2 py-1 rounded z-50 opacity-50 hover:opacity-100"
        onClick={() => setIsVisible(true)}
      >
        Debug
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-90 p-3 rounded z-50 text-white shadow-lg">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Ball Count Debug</h3>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setIsVisible(false)}
        >
          Close
        </button>
      </div>

      <div className="mb-2">
        <span className="mr-2">Current count: {ballCount}</span>
        <span className="text-xs text-gray-400">(from ThemeContext)</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <button
          className="bg-red-800 hover:bg-red-700 px-2 py-1 rounded"
          onClick={() => {
            const newCount = Math.max(1, ballCount - 1);
            console.log(`Debug: decreasing to ${newCount}`);
            setBallCount(newCount);
          }}
        >
          -1
        </button>

        <input
          type="number"
          min="1"
          max="5"
          value={localCount}
          onChange={(e) => setLocalCount(Number(e.target.value))}
          className="bg-gray-800 text-white w-12 px-2 py-1 text-center rounded"
        />

        <button
          className="bg-green-800 hover:bg-green-700 px-2 py-1 rounded"
          onClick={() => {
            const newCount = Math.min(5, ballCount + 1);
            console.log(`Debug: increasing to ${newCount}`);
            setBallCount(newCount);
          }}
        >
          +1
        </button>

        <button
          className="bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded ml-2"
          onClick={() => {
            console.log(`Debug: setting to ${localCount}`);
            setBallCount(localCount);
          }}
        >
          Set
        </button>
      </div>

      <div className="flex justify-between">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded ${
              ballCount === num ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => {
              console.log(`Debug: direct set to ${num}`);
              setBallCount(num);
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
