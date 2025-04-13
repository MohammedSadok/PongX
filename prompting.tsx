"use client";

import { useCallback, useRef, useState } from "react";
import { GameCanvas } from "./components/game/GameCanvas";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { HomeSection } from "./components/sections/HomeSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { WelcomeSection } from "./components/sections/WelcomeSection";
import { ThemeProvider } from "./components/ThemeContext";
import { ThemePalette } from "./components/ThemePalette";

export function PromptingIsAllYouNeed() {
  const [activeSection, setActiveSection] = useState("home");
  // Use a ref to track section changes without re-rendering the GameCanvas
  const activeSectionRef = useRef("home");

  // Use useCallback to prevent re-creation of the setActiveSection function
  const handleSectionChange = useCallback((section: string) => {
    // Update the ref without causing re-renders
    activeSectionRef.current = section;
    // Update state for the section content only
    setActiveSection(section);
  }, []);

  // Render the active section content
  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "welcome":
        return <WelcomeSection />;
      case "projects":
        return <ProjectsSection />;
      case "about":
        return <AboutSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <ThemeProvider>
      {/* Theme palette in bottom right */}
      <ThemePalette />

      {/* Game canvas with ball and navigation - using ref to prevent re-renders */}
      <GameCanvas
        activeSection={activeSectionRef.current}
        setActiveSection={handleSectionChange}
      />

      {/* Single container for all sections - content changes based on active section */}
      <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-full h-full max-w-7xl px-4 py-20 overflow-auto pointer-events-auto">
          {renderActiveSection()}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default PromptingIsAllYouNeed;
