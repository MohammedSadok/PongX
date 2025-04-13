"use client";

import { useCallback, useEffect, useRef, memo } from "react";
import {
  BACKGROUND_COLOR,
  COLOR,
  HIT_COLOR,
  LETTER_SPACING,
  NAVBAR_HEIGHT,
  PIXEL_MAP,
  SECTIONS,
  WORD_SPACING,
} from "./constants";
import type { Ball, NavItem, Paddle, Pixel } from "./types";
import {
  calculateWordWidth,
  normalizeBallVelocity,
  playCollisionSound,
} from "./utils";
import { useTheme } from "../ThemeContext";

interface GameCanvasProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// Use memo to prevent re-rendering when parent component re-renders
export const GameCanvas = memo(
  function GameCanvas({ activeSection, setActiveSection }: GameCanvasProps) {
    const { currentTheme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelsRef = useRef<Pixel[]>([]);
    const ballRef = useRef<Ball>({
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      radius: 0,
      targetX: 0,
      targetY: 0,
      velocity: 0,
      maxVelocity: 15,
      friction: 0.95,
      acceleration: 0.5,
      isActive: true,
      isUserControlled: false,
      trail: [],
      baseSpeed: 5,
    });
    const paddlesRef = useRef<Paddle[]>([]);
    const scaleRef = useRef(1);
    const navbarRef = useRef<NavItem[]>([]);
    const navbarHeightRef = useRef(NAVBAR_HEIGHT);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const gameInitializedRef = useRef(false);
    // Store the active section in a ref to prevent re-renders
    const activeSectionRef = useRef(activeSection);
    // Track user interaction for opacity control
    const isInteractingRef = useRef(false);
    const opacityRef = useRef(1.0); // Always full opacity
    const lastInteractionTimeRef = useRef(0);

    // Create audio context for sound effects
    useEffect(() => {
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

    // Update active section ref when prop changes (without re-rendering)
    useEffect(() => {
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

      const canvas = canvasRef.current;
      if (!canvas) return;

      const scale = scaleRef.current;
      const LARGE_PIXEL_SIZE = 8 * scale;
      const SMALL_PIXEL_SIZE = 4 * scale;
      const navbarHeight = navbarHeightRef.current;

      pixelsRef.current = [];
      const words = ["PROMPTING", "IS ALL YOU NEED"];

      const totalWidthLarge = calculateWordWidth(
        words[0],
        LARGE_PIXEL_SIZE,
        PIXEL_MAP,
        LETTER_SPACING
      );
      const totalWidthSmall = words[1]
        .split(" ")
        .reduce((width, word, index) => {
          return (
            width +
            calculateWordWidth(
              word,
              SMALL_PIXEL_SIZE,
              PIXEL_MAP,
              LETTER_SPACING
            ) +
            (index > 0 ? WORD_SPACING * SMALL_PIXEL_SIZE : 0)
          );
        }, 0);
      const totalWidth = Math.max(totalWidthLarge, totalWidthSmall);
      const scaleFactor = (canvas.width * 0.8) / totalWidth;

      const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor;
      const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor;

      const largeTextHeight = 5 * adjustedLargePixelSize;
      const smallTextHeight = 5 * adjustedSmallPixelSize;
      const spaceBetweenLines = 5 * adjustedLargePixelSize;
      const totalTextHeight =
        largeTextHeight + spaceBetweenLines + smallTextHeight;

      let startY = (canvas.height - totalTextHeight) / 2;

      words.forEach((word, wordIndex) => {
        const pixelSize =
          wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize;
        const totalWidth =
          wordIndex === 0
            ? calculateWordWidth(
                word,
                adjustedLargePixelSize,
                PIXEL_MAP,
                LETTER_SPACING
              )
            : words[1].split(" ").reduce((width, w, index) => {
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

        let startX = (canvas.width - totalWidth) / 2;

        if (wordIndex === 1) {
          word.split(" ").forEach((subWord) => {
            subWord.split("").forEach((letter) => {
              const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP];
              if (!pixelMap) return;

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
            startX += WORD_SPACING * adjustedSmallPixelSize;
          });
        } else {
          word.split("").forEach((letter) => {
            const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP];
            if (!pixelMap) return;

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
        startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0;
      });

      // Initialize ball position near the center
      const ballStartX = canvas.width * 0.5;
      const ballStartY = canvas.height * 0.5;
      const baseSpeed = 7.5 * scale; // Faster ball

      // Set initial direction at a random angle
      const angle = Math.random() * Math.PI * 2;
      const dx = Math.cos(angle) * baseSpeed;
      const dy = Math.sin(angle) * baseSpeed;

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: dx,
        dy: dy,
        radius: adjustedLargePixelSize * 0.6, // Smaller ball
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
      };

      const paddleWidth = adjustedLargePixelSize;
      const paddleLength = 10 * adjustedLargePixelSize;

      paddlesRef.current = [
        {
          x: 0,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width - paddleWidth,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: 0,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - paddleWidth,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
      ];

      // Initialize navbar items
      const navItemWidth = canvas.width / SECTIONS.length;

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
    }, []);

    // Update game state
    const updateGame = useCallback(() => {
      const ball = ballRef.current;
      const paddles = paddlesRef.current;
      const navbar = navbarRef.current;

      // Always keep full opacity
      opacityRef.current = 1.0;

      // Update ball physics
      if (ball.isActive) {
        if (ball.isUserControlled) {
          // User-controlled movement (when clicking)
          // Calculate direction vector
          const dx = ball.targetX - ball.x;
          const dy = ball.targetY - ball.y;

          // Calculate distance
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 1) {
            // Normalize direction vector
            const nx = dx / distance;
            const ny = dy / distance;

            // Apply acceleration
            ball.dx += nx * ball.acceleration;
            ball.dy += ny * ball.acceleration;

            // Apply max velocity
            const currentVelocity = Math.sqrt(
              ball.dx * ball.dx + ball.dy * ball.dy
            );
            if (currentVelocity > ball.maxVelocity) {
              const scale = ball.maxVelocity / currentVelocity;
              ball.dx *= scale;
              ball.dy *= scale;
            }
          }

          // Apply friction
          ball.dx *= ball.friction;
          ball.dy *= ball.friction;
        } else {
          // Ensure constant speed for Pong-like movement
          normalizeBallVelocity(ball);
        }

        // Update position
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Prevent ball from going above navbar when user-controlled
        if (
          ball.isUserControlled &&
          ball.y - ball.radius < navbarHeightRef.current
        ) {
          ball.y = navbarHeightRef.current + ball.radius;
        }

        // Add to trail
        ball.trail.push({
          x: ball.x,
          y: ball.y,
          alpha: 1,
        });

        // Limit trail length
        if (ball.trail.length > 10) {
          ball.trail.shift();
        }

        // Update trail alpha
        ball.trail.forEach((point, index) => {
          point.alpha = index / ball.trail.length;
        });

        // Check for navbar collisions - ONLY when ball is user-controlled (being held)
        navbar.forEach((item) => {
          // Check if ball is within the horizontal bounds of the navbar item
          if (ball.x > item.x && ball.x < item.x + item.width) {
            // Check if ball is touching or within the navbar item vertically
            const ballTopEdge = ball.y - ball.radius;
            if (ballTopEdge <= item.height) {
              // Only activate if it's not already active AND the ball is being held
              if (!item.isActive && ball.isUserControlled) {
                // Update navbar items without re-initializing
                navbar.forEach((navItem) => {
                  navItem.isActive = navItem.id === item.id;
                });

                // Enhanced animation effects
                item.shakeOffset = 15;
                item.shakeDirection = Math.random() > 0.5 ? 1 : -1;
                item.scale = 1.2; // Add scale effect

                // Create a flash effect on the ball
                ball.trail = [];
                for (let i = 0; i < 15; i++) {
                  ball.trail.push({
                    x: ball.x,
                    y: ball.y,
                    alpha: 1 - i / 15,
                  });
                }

                // Change section without scrolling
                changeSection(item.id);

                // Play sound
                playCollisionSound(audioRef);
              }
            }
          }
        });

        // Handle wall collision
        if (
          ball.y - ball.radius < navbarHeightRef.current &&
          !ball.isUserControlled
        ) {
          ball.y = navbarHeightRef.current + ball.radius;
          ball.dy = -ball.dy;

          // Normalize velocity after bounce
          normalizeBallVelocity(ball);
        }

        if (ball.y + ball.radius > canvasRef.current?.height || 0) {
          ball.y = (canvasRef.current?.height || 0) - ball.radius;
          ball.dy = -ball.dy;

          // Normalize velocity after bounce
          if (!ball.isUserControlled) {
            normalizeBallVelocity(ball);
          }

          // Play sound
          playCollisionSound(audioRef);
        }

        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.dx = -ball.dx;

          // Normalize velocity after bounce
          if (!ball.isUserControlled) {
            normalizeBallVelocity(ball);
          }

          // Play sound
          playCollisionSound(audioRef);
        }

        if (ball.x + ball.radius > canvasRef.current?.width || 0) {
          ball.x = (canvasRef.current?.width || 0) - ball.radius;
          ball.dx = -ball.dx;

          // Normalize velocity after bounce
          if (!ball.isUserControlled) {
            normalizeBallVelocity(ball);
          }

          // Play sound
          playCollisionSound(audioRef);
        }
      }

      // Update navbar animation effects
      navbar.forEach((item) => {
        // Update shake effect
        if (item.shakeOffset > 0) {
          item.shakeOffset *= 0.8;
          if (item.shakeOffset < 0.5) {
            item.shakeOffset = 0;
          }
        }

        // Update scale effect
        if (item.scale > 1) {
          item.scale = 1 + (item.scale - 1) * 0.9;
          if (item.scale < 1.01) {
            item.scale = 1;
          }
        }
      });

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx;
            playCollisionSound(audioRef);

            // Normalize velocity after bounce
            if (!ball.isUserControlled) {
              normalizeBallVelocity(ball);
            }
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy;
            playCollisionSound(audioRef);

            // Normalize velocity after bounce
            if (!ball.isUserControlled) {
              normalizeBallVelocity(ball);
            }
          }
        }
      });

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2;
          paddle.targetY = Math.max(
            0,
            Math.min(
              (canvasRef.current?.height || 0) - paddle.height,
              paddle.targetY
            )
          );
          paddle.y += (paddle.targetY - paddle.y) * 0.1;
        } else {
          paddle.targetY = ball.x - paddle.width / 2;
          paddle.targetY = Math.max(
            0,
            Math.min(
              (canvasRef.current?.width || 0) - paddle.width,
              paddle.targetY
            )
          );
          paddle.x += (paddle.targetY - paddle.x) * 0.1;
        }
      });

      // Only check pixel collisions if we're on the home section
      if (activeSectionRef.current === "welcome") {
        pixelsRef.current.forEach((pixel) => {
          if (
            !pixel.hit &&
            ball.x + ball.radius > pixel.x &&
            ball.x - ball.radius < pixel.x + pixel.size &&
            ball.y + ball.radius > pixel.y &&
            ball.y - ball.radius < pixel.y + pixel.size
          ) {
            pixel.hit = true;
            const centerX = pixel.x + pixel.size / 2;
            const centerY = pixel.y + pixel.size / 2;
            if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
              ball.dx = -ball.dx;
            } else {
              ball.dy = -ball.dy;
            }

            // Play sound
            playCollisionSound(audioRef);

            // Normalize velocity after bounce
            if (!ball.isUserControlled) {
              normalizeBallVelocity(ball);
            }
          }
        });
      }
    }, [changeSection]);

    // Draw game on canvas
    const drawGame = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      // Apply global opacity
      ctx.globalAlpha = opacityRef.current;

      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw trail
      ballRef.current.trail.forEach((point, index) => {
        // Use theme colors
        ctx.fillStyle = `rgba(${
          ballRef.current.isUserControlled
            ? hexToRgb(currentTheme.activeBallColor)
            : hexToRgb(currentTheme.ballColor)
        }, ${point.alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(
          point.x,
          point.y,
          ballRef.current.radius * (0.5 + point.alpha * 0.5),
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Only draw pixels if we're on the home section
      if (activeSectionRef.current === "welcome") {
        pixelsRef.current.forEach((pixel) => {
          ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR;
          ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        });
      }

      // Draw ball with theme color
      const ball = ballRef.current;
      ctx.fillStyle = ball.isUserControlled
        ? currentTheme.activeBallColor
        : currentTheme.ballColor;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Add glow effect to ball
      ctx.shadowBlur = 15;
      ctx.shadowColor = ball.isUserControlled
        ? currentTheme.activeBallColor
        : currentTheme.ballColor;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw paddles with theme color
      ctx.fillStyle = currentTheme.ballColor;
      paddlesRef.current.forEach((paddle) => {
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
      });

      // Draw navbar - always at full opacity
      ctx.globalAlpha = 1.0;
      navbarRef.current.forEach((item) => {
        // Save context for scale transformation
        ctx.save();

        // Set transform origin to center of navbar item
        const centerX = item.x + item.width / 2;
        const centerY = item.y + item.height / 2;

        // Apply scale transformation
        ctx.translate(centerX, centerY);
        ctx.scale(item.scale, item.scale);
        ctx.translate(-centerX, -centerY);

        // Draw background with theme colors
        ctx.fillStyle = item.isActive
          ? currentTheme.navbarActive
          : currentTheme.navbarBg;
        ctx.fillRect(
          item.x + item.shakeOffset * item.shakeDirection,
          item.y,
          item.width,
          item.height
        );

        // Draw text
        ctx.fillStyle = currentTheme.textColor;
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          item.label.toUpperCase(),
          item.x + item.width / 2 + item.shakeOffset * item.shakeDirection,
          item.y + item.height / 2
        );

        // Draw bottom border for active item
        if (item.isActive) {
          ctx.fillStyle = currentTheme.activeBallColor;
          ctx.fillRect(
            item.x + item.shakeOffset * item.shakeDirection,
            item.y + item.height - 3,
            item.width,
            3
          );
        }

        // Restore context
        ctx.restore();
      });

      // Reset global alpha
      ctx.globalAlpha = 1.0;
    }, [currentTheme]);

    // Helper function to convert hex to rgb
    const hexToRgb = (hex: string) => {
      // Remove # if present
      hex = hex.replace("#", "");

      // Parse the hex values
      const r = Number.parseInt(hex.substring(0, 2), 16);
      const g = Number.parseInt(hex.substring(2, 4), 16);
      const b = Number.parseInt(hex.substring(4, 6), 16);

      return `${r}, ${g}, ${b}`;
    };

    // Game loop
    const gameLoop = useCallback(() => {
      updateGame();
      drawGame();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [updateGame, drawGame]);

    // Resize canvas
    const resizeCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000);

      // Reset initialization flag to allow re-initialization after resize
      gameInitializedRef.current = false;
      initializeGame();
    }, [initializeGame]);

    // Mouse/touch event handlers
    const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
      const ball = ballRef.current;
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      ball.isUserControlled = true;
      ball.targetX = clientX;
      // Ensure the ball doesn't go above navbar
      ball.targetY = Math.max(clientY, navbarHeightRef.current + ball.radius);

      // Keep the ball control logic but don't change opacity
      // isInteractingRef.current = true
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
      const ball = ballRef.current;
      if (!ball.isUserControlled) return;

      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      ball.targetX = clientX;
      // Ensure the ball doesn't go above navbar
      ball.targetY = Math.max(clientY, navbarHeightRef.current + ball.radius);

      // Keep the ball control logic but don't change opacity
      // isInteractingRef.current = true
    }, []);

    const handleMouseUp = useCallback(() => {
      const ball = ballRef.current;
      ball.isUserControlled = false;

      // Ensure the ball has a proper velocity when released
      normalizeBallVelocity(ball);

      // Keep the ball control logic but don't change opacity
      // isInteractingRef.current = false
    }, []);

    // Initialize game on mount
    useEffect(() => {
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
