import { useCallback, useEffect, useRef } from "react";
import {
  LETTER_SPACING,
  NAVBAR_HEIGHT,
  PIXEL_MAP,
  SECTIONS,
  WORD_SPACING,
} from "./constants";
import type { Ball, NavItem, Paddle, Pixel } from "./types";
import { calculateWordWidth, normalizeBallVelocity } from "./utils";
import { useTheme } from "../ThemeContext";

interface GameControllerProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  canvasWidth: number;
  canvasHeight: number;
}

export function useGameController({
  activeSection,
  setActiveSection,
  canvasWidth,
  canvasHeight,
}: GameControllerProps) {
  // Always use ballCount for compatibility but ignore its value
  const { ballCount } = useTheme();
  const pixelsRef = useRef<Pixel[]>([]);
  const ballsRef = useRef<Ball[]>([]);
  const paddlesRef = useRef<Paddle[]>([]);
  const scaleRef = useRef(1);
  const navbarRef = useRef<NavItem[]>([]);
  const navbarHeightRef = useRef(NAVBAR_HEIGHT);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gameInitializedRef = useRef(false);
  const activeSectionRef = useRef(activeSection);
  const opacityRef = useRef(1.0);

  // Create audio context for sound effects
  const initializeAudio = useCallback(() => {
    audioRef.current = new Audio();
    audioRef.current.src =
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAB9AH0AfQB9";
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update active section ref when prop changes
  const updateActiveSection = useCallback(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Change section without scrolling
  const changeSection = useCallback(
    (id: string) => {
      // Only update if the section is different
      if (id !== activeSectionRef.current) {
        // Update active section state without re-initializing the game
        setActiveSection(id);
        activeSectionRef.current = id;
      }
    },
    [setActiveSection]
  );

  // Initialize game
  const initializeGame = useCallback(() => {
    // Only initialize once to prevent re-rendering
    if (gameInitializedRef.current) return;

    console.log(`Initializing game with 1 ball`); // Always 1 ball

    const scale = scaleRef.current;
    // Significantly increase pixel sizes for much larger text
    const LARGE_PIXEL_SIZE = 16 * scale;
    const SMALL_PIXEL_SIZE = 9 * scale;
    const navbarHeight = navbarHeightRef.current;

    pixelsRef.current = [];
    // Use the requested instruction text
    const words = ["HOLD THE BALL", "AND HIT THE NAVBAR TO NAVIGATE"];

    // Calculate widths and scale factor for proper text display
    const totalWidthLarge = calculateWordWidth(
      words[0],
      LARGE_PIXEL_SIZE,
      PIXEL_MAP,
      LETTER_SPACING
    );

    // Calculate small text width more carefully to ensure all letters fit
    const smallTextParts = words[1].split(" ");
    const totalWidthSmall = smallTextParts.reduce((width, word, index) => {
      return (
        width +
        calculateWordWidth(word, SMALL_PIXEL_SIZE, PIXEL_MAP, LETTER_SPACING) +
        (index > 0 ? WORD_SPACING * SMALL_PIXEL_SIZE : 0)
      );
    }, 0);

    // Use maximum width for scaling to ensure everything fits
    const totalWidth = Math.max(totalWidthLarge, totalWidthSmall);
    // Use a more aggressive scaling factor to make text as large as possible
    const scaleFactor = Math.min(0.85, (canvasWidth * 0.95) / totalWidth);

    // Calculate adjusted pixel sizes
    const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor;
    const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor;

    // Calculate text heights
    const largeTextHeight = 5 * adjustedLargePixelSize;
    const smallTextHeight = 5 * adjustedSmallPixelSize;
    // Increase space between lines for better readability
    const spaceBetweenLines = 10 * adjustedLargePixelSize; // Increased spacing
    const totalTextHeight =
      largeTextHeight + spaceBetweenLines + smallTextHeight;

    // Center text vertically
    let startY = (canvasHeight - totalTextHeight) / 2;

    // Debug logging to check text sizes
    console.log(
      `Large pixel size: ${adjustedLargePixelSize}, Small pixel size: ${adjustedSmallPixelSize}`
    );
    console.log(
      `Total width: ${totalWidth}, Canvas width: ${canvasWidth}, Scale factor: ${scaleFactor}`
    );

    // Process each word - ensure all letters are properly mapped
    words.forEach((word, wordIndex) => {
      const pixelSize =
        wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize;

      // Calculate word width for proper centering
      const wordWidth =
        wordIndex === 0
          ? calculateWordWidth(
              word,
              adjustedLargePixelSize,
              PIXEL_MAP,
              LETTER_SPACING
            )
          : smallTextParts.reduce((width, w, index) => {
              return (
                width +
                calculateWordWidth(
                  w,
                  adjustedSmallPixelSize,
                  PIXEL_MAP,
                  LETTER_SPACING
                ) +
                (index > 0 ? WORD_SPACING * adjustedSmallPixelSize : 0)
              );
            }, 0);

      // Center text horizontally
      let startX = (canvasWidth - wordWidth) / 2;

      // For multi-word lines
      if (wordIndex === 1) {
        const parts = word.split(" ");
        parts.forEach((subWord, subIndex) => {
          // Process each letter in the word
          subWord.split("").forEach((letter) => {
            // Explicitly define a fallback for missing letters
            let pixelMap =
              PIXEL_MAP[letter.toUpperCase() as keyof typeof PIXEL_MAP];

            // Debug missing letters
            if (!pixelMap) {
              console.warn(
                `Missing letter in PIXEL_MAP: ${letter.toUpperCase()}`
              );
              return;
            }

            // Create pixels for each point in the pixel map
            for (let i = 0; i < pixelMap.length; i++) {
              for (let j = 0; j < pixelMap[i].length; j++) {
                if (pixelMap[i][j]) {
                  const x = startX + j * pixelSize;
                  const y = startY + i * pixelSize;
                  pixelsRef.current.push({
                    x,
                    y,
                    size: pixelSize,
                    hit: false,
                  });
                }
              }
            }
            startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize;
          });
          // Add word spacing after each word except the last
          if (subIndex < parts.length - 1) {
            startX += WORD_SPACING * adjustedSmallPixelSize;
          }
        });
      } else {
        // For the first line
        word.split("").forEach((letter) => {
          // Explicitly define a fallback for missing letters
          let pixelMap =
            PIXEL_MAP[letter.toUpperCase() as keyof typeof PIXEL_MAP];

          // Debug missing letters
          if (!pixelMap) {
            console.warn(
              `Missing letter in PIXEL_MAP: ${letter.toUpperCase()}`
            );
            return;
          }

          for (let i = 0; i < pixelMap.length; i++) {
            for (let j = 0; j < pixelMap[i].length; j++) {
              if (pixelMap[i][j]) {
                const x = startX + j * pixelSize;
                const y = startY + i * pixelSize;
                pixelsRef.current.push({ x, y, size: pixelSize, hit: false });
              }
            }
          }
          startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize;
        });
      }

      // Move down for the second line
      startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0;
    });

    // Scale ball size to match the larger text
    const ballSize = adjustedLargePixelSize * 0.7;
    const baseSpeed = 7.5 * scale;

    // Initialize a single ball - always use just one
    ballsRef.current = [];

    // Create one ball regardless of ballCount value
    const ballStartX = canvasWidth * (0.3 + Math.random() * 0.4);
    const ballStartY = canvasHeight * (0.3 + Math.random() * 0.4);

    // Set initial direction at a random angle with some spread
    const angle = Math.random() * Math.PI * 2;
    const dx = Math.cos(angle) * baseSpeed;
    const dy = Math.sin(angle) * baseSpeed;

    ballsRef.current.push({
      x: ballStartX,
      y: ballStartY,
      dx: dx,
      dy: dy,
      radius: ballSize,
      targetX: ballStartX,
      targetY: ballStartY,
      velocity: 0,
      maxVelocity: 18 * scale,
      friction: 0.95,
      acceleration: 0.5 * scale,
      isActive: true,
      isUserControlled: false,
      trail: [],
      baseSpeed: baseSpeed,
    });

    console.log(`Initialized 1 ball`); // Always 1 ball

    const paddleWidth = adjustedLargePixelSize;
    const paddleLength = 10 * adjustedLargePixelSize;

    paddlesRef.current = [
      {
        x: 0,
        y: canvasHeight / 2 - paddleLength / 2,
        width: paddleWidth,
        height: paddleLength,
        targetY: canvasHeight / 2 - paddleLength / 2,
        isVertical: true,
      },
      {
        x: canvasWidth - paddleWidth,
        y: canvasHeight / 2 - paddleLength / 2,
        width: paddleWidth,
        height: paddleLength,
        targetY: canvasHeight / 2 - paddleLength / 2,
        isVertical: true,
      },
      {
        x: canvasWidth / 2 - paddleLength / 2,
        y: 0,
        width: paddleLength,
        height: paddleWidth,
        targetY: canvasWidth / 2 - paddleLength / 2,
        isVertical: false,
      },
      {
        x: canvasWidth / 2 - paddleLength / 2,
        y: canvasHeight - paddleWidth,
        width: paddleLength,
        height: paddleWidth,
        targetY: canvasWidth / 2 - paddleLength / 2,
        isVertical: false,
      },
    ];

    // Initialize navbar items
    const navItemWidth = canvasWidth / SECTIONS.length;

    navbarRef.current = SECTIONS.map((section, index) => ({
      id: section.id,
      label: section.label,
      x: index * navItemWidth,
      y: 0,
      width: navItemWidth,
      height: navbarHeight,
      isActive: section.id === activeSectionRef.current,
      shakeOffset: 0,
      shakeDirection: 1,
      scale: 1,
    }));

    // Mark as initialized
    gameInitializedRef.current = true;
  }, [canvasWidth, canvasHeight]);

  // Ball control functions
  const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    if (ballsRef.current.length === 0) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Make all balls follow the click point
    ballsRef.current.forEach((ball) => {
      ball.isUserControlled = true;
      ball.targetX = clientX;
      ball.targetY = Math.max(clientY, navbarHeightRef.current + ball.radius);
    });

    // Change cursor to grabbing
    document.body.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (ballsRef.current.length === 0) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Update all controlled balls
    ballsRef.current.forEach((ball) => {
      if (ball.isUserControlled) {
        ball.targetX = clientX;
        ball.targetY = Math.max(clientY, navbarHeightRef.current + ball.radius);
      }
    });

    // Check if any ball is being controlled - if yes, maintain grabbing cursor
    const anyBallControlled = ballsRef.current.some(
      (ball) => ball.isUserControlled
    );
    if (anyBallControlled) {
      document.body.style.cursor = "grabbing";
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (ballsRef.current.length === 0) return;

    // Release all controlled balls
    ballsRef.current.forEach((ball) => {
      if (ball.isUserControlled) {
        ball.isUserControlled = false;
        normalizeBallVelocity(ball);
      }
    });

    // Reset cursor
    document.body.style.cursor = "auto";
  }, []);

  // Reset game for viewport changes
  const resizeGame = useCallback(() => {
    scaleRef.current = Math.min(canvasWidth / 1000, canvasHeight / 1000);

    // Reset initialization flag to allow re-initialization after resize
    gameInitializedRef.current = false;
    initializeGame();
  }, [canvasWidth, canvasHeight, initializeGame]);

  return {
    pixelsRef,
    ballsRef,
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
  };
}
