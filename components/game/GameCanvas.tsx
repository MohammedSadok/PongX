"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";
import { drawBall, updateBallPhysics } from "./Ball";
import { BACKGROUND_COLOR } from "./constants";
import { useGameController } from "./GameController";
import { checkNavbarCollisions, drawNavbar, updateNavbar } from "./Navbar";
import { checkPaddleCollisions, drawPaddles, updatePaddles } from "./Paddles";
import { checkPixelCollisions, drawPixels } from "./Pixels";

interface GameCanvasProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// Use memo to prevent re-rendering when parent component re-renders
export const GameCanvas = memo(
  function GameCanvas({ activeSection, setActiveSection }: GameCanvasProps) {
    const { currentTheme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Get window dimensions for canvas - safely handle window object
    const getCanvasDimensions = useCallback(() => {
      if (typeof window === "undefined") {
        // Default dimensions when running on server
        return { width: 1024, height: 768 };
      }
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }, []);

    // Get initial dimensions only client-side
    const [initialDimensions, setInitialDimensions] = useState({
      width: 1024,
      height: 768,
    });

    // Set actual window dimensions after mounting
    useEffect(() => {
      setInitialDimensions(getCanvasDimensions());
    }, [getCanvasDimensions]);

    // Initialize game controller
    const {
      pixelsRef,
      ballRef,
      paddlesRef,
      navbarRef,
      navbarHeightRef,
      audioRef,
      activeSectionRef,
      opacityRef,
      initializeAudio,
      updateActiveSection,
      changeSection,
      initializeGame,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      resizeGame,
    } = useGameController({
      activeSection,
      setActiveSection,
      canvasWidth: initialDimensions.width,
      canvasHeight: initialDimensions.height,
    });

    // Update game state
    const updateGame = useCallback(() => {
      const ball = ballRef.current;
      const paddles = paddlesRef.current;
      const navbar = navbarRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Always keep full opacity
      opacityRef.current = 1.0;

      // Update ball physics
      updateBallPhysics(
        ball,
        navbarHeightRef.current,
        canvas.width,
        canvas.height,
        audioRef
      );

      // Update navbar animation effects
      updateNavbar(navbar);

      // Check for navbar collisions
      checkNavbarCollisions(navbar, ball, audioRef, changeSection);

      // Check paddle collisions and update paddles
      checkPaddleCollisions(paddles, ball, audioRef);
      updatePaddles(paddles, ball, canvas.width, canvas.height);

      // Only check pixel collisions if we're on the home section
      if (activeSectionRef.current === "welcome") {
        checkPixelCollisions(pixelsRef.current, ball, audioRef);
      }
    }, [changeSection]);

    // Draw game on canvas
    const drawGame = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      // Apply global opacity
      ctx.globalAlpha = opacityRef.current;

      // Clear canvas with background color
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ball and trail
      drawBall({
        ctx,
        ball: ballRef.current,
        opacity: opacityRef.current,
        theme: {
          ballColor: currentTheme.ballColor,
          activeBallColor: currentTheme.activeBallColor,
        },
      });

      // Only draw pixels if we're on the home section
      if (activeSectionRef.current === "welcome") {
        drawPixels(ctx, pixelsRef.current);
      }

      // Draw paddles
      drawPaddles(ctx, paddlesRef.current, currentTheme.ballColor);

      // Draw navbar
      drawNavbar(ctx, navbarRef.current, {
        navbarActive: currentTheme.navbarActive,
        navbarBg: currentTheme.navbarBg,
        textColor: currentTheme.textColor,
        activeBallColor: currentTheme.activeBallColor,
      });
    }, [currentTheme]);

    // Resize canvas
    const resizeCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      resizeGame();
    }, [resizeGame]);

    // Game loop
    const gameLoop = useCallback(() => {
      updateGame();
      drawGame();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [updateGame, drawGame]);

    // Update active section ref when prop changes (without re-rendering)
    useEffect(() => {
      updateActiveSection();
    }, [activeSection, updateActiveSection]);

    // Initialize game on mount
    useEffect(() => {
      const audioCleanup = initializeAudio();
      resizeCanvas();

      // Add event listeners
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchstart", handleMouseDown);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);

      // Start game loop
      gameLoop();

      // Cleanup on unmount
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        audioCleanup();
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchstart", handleMouseDown);
        window.removeEventListener("touchmove", handleMouseMove);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }, [
      resizeCanvas,
      gameLoop,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      initializeAudio,
    ]);

    // Update navbar when active section changes - using refs to avoid re-renders
    useEffect(() => {
      if (navbarRef.current.length > 0) {
        navbarRef.current.forEach((item) => {
          item.isActive = item.id === activeSectionRef.current;
        });
      }
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-10"
        aria-label="Prompting Is All You Need: Interactive navbar with physics ball"
      />
    );
  },
  () => true
); // Force the component to never re-render by always returning true from the comparison function
