"use client";

import { useTheme } from "./ThemeContext";

export function FixedBallCountButton() {
  const { ballCount, setBallCount } = useTheme();

  const setExactCount = (count: number) => {
    console.log(`Setting exact count: ${count}`);
    setBallCount(count);
  };

  return (
    <div className="fixed top-4 left-4 z-30 bg-black bg-opacity-70 p-2 rounded">
      <div className="text-white mb-1">Ball count: {ballCount}</div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((count) => (
          <button
            key={count}
            onClick={() => setExactCount(count)}
            className={`w-8 h-8 rounded ${
              ballCount === count ? "bg-blue-500" : "bg-gray-700"
            } text-white`}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}
