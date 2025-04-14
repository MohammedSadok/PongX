"use client";

import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { THEMES } from "./game/constants";

interface ColorPickerProps {
  onClose: () => void;
}

export function ColorPicker({ onClose }: ColorPickerProps) {
  const { currentTheme, customColors, setCustomColors, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");
  const [localColors, setLocalColors] = useState({
    ballColor: customColors.ballColor,
    activeBallColor: customColors.activeBallColor,
    accentColor: customColors.accentColor,
  });

  const handleColorChange = (
    colorType: "ballColor" | "activeBallColor" | "accentColor",
    value: string
  ) => {
    setLocalColors((prev) => ({
      ...prev,
      [colorType]: value,
    }));
  };

  const handleSave = () => {
    setCustomColors(localColors);
    setTheme("custom");
    onClose();
  };

  const presetColors = [
    "#FFFFFF", // White
    "#00FF99", // Default accent
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#FFD166", // Yellow
    "#118AB2", // Blue
    "#9B5DE5", // Purple
    "#FF9F1C", // Orange
  ];

  return (
    <div className="absolute bottom-16 right-0 bg-black bg-opacity-90 p-4 rounded-lg shadow-xl w-72 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Theme Selection</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "preset"
              ? "bg-gray-700 text-white"
              : "bg-gray-900 text-gray-400"
          } rounded-l`}
          onClick={() => setActiveTab("preset")}
        >
          Preset Themes
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "custom"
              ? "bg-gray-700 text-white"
              : "bg-gray-900 text-gray-400"
          } rounded-r`}
          onClick={() => setActiveTab("custom")}
        >
          Custom Colors
        </button>
      </div>

      {/* Preset Themes */}
      {activeTab === "preset" && (
        <div className="mb-4">
          <p className="text-white text-sm mb-3">Select a theme:</p>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map((theme) => (
              <div
                key={theme.name}
                onClick={() => setTheme(theme.name)}
                className={`cursor-pointer p-2 rounded transition-all ${
                  currentTheme.name === theme.name
                    ? "ring-2 ring-white"
                    : "hover:bg-gray-800"
                }`}
              >
                <div className="flex justify-center mb-2">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ backgroundColor: theme.activeBallColor }}
                  />
                </div>
                <p className="text-center text-white text-xs capitalize">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Colors */}
      {activeTab === "custom" && (
        <>
          {/* Ball Color */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Ball Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={localColors.ballColor}
                onChange={(e) => handleColorChange("ballColor", e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localColors.ballColor}
                onChange={(e) => handleColorChange("ballColor", e.target.value)}
                className="flex-1 bg-gray-800 text-white px-2 py-1 rounded"
              />
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {presetColors.map((color) => (
                <button
                  key={`ball-${color}`}
                  className="w-6 h-6 rounded-full border border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange("ballColor", color)}
                  aria-label={`Set ball color to ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Active Ball Color */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Active Ball Color
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={localColors.activeBallColor}
                onChange={(e) =>
                  handleColorChange("activeBallColor", e.target.value)
                }
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localColors.activeBallColor}
                onChange={(e) =>
                  handleColorChange("activeBallColor", e.target.value)
                }
                className="flex-1 bg-gray-800 text-white px-2 py-1 rounded"
              />
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {presetColors.map((color) => (
                <button
                  key={`active-${color}`}
                  className="w-6 h-6 rounded-full border border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange("activeBallColor", color)}
                  aria-label={`Set active ball color to ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Accent Color (UI)
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={localColors.accentColor}
                onChange={(e) =>
                  handleColorChange("accentColor", e.target.value)
                }
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localColors.accentColor}
                onChange={(e) =>
                  handleColorChange("accentColor", e.target.value)
                }
                className="flex-1 bg-gray-800 text-white px-2 py-1 rounded"
              />
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {presetColors.map((color) => (
                <button
                  key={`accent-${color}`}
                  className="w-6 h-6 rounded-full border border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange("accentColor", color)}
                  aria-label={`Set accent color to ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-4 p-3 rounded bg-gray-900 flex items-center justify-center gap-2">
            <div className="text-xs text-gray-400">Preview:</div>
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: localColors.ballColor }}
            ></div>
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: localColors.activeBallColor }}
            ></div>
            <div
              className="w-6 h-6 rounded"
              style={{ backgroundColor: localColors.accentColor }}
            ></div>
          </div>

          {/* Apply custom theme button */}
          <button
            onClick={handleSave}
            className="w-full py-2 rounded text-black font-medium"
            style={{ backgroundColor: localColors.accentColor }}
          >
            Apply Custom Theme
          </button>
        </>
      )}

      {/* Close button in footer */}
      <button
        onClick={onClose}
        className="mt-4 w-full py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
      >
        Close
      </button>
    </div>
  );
}
