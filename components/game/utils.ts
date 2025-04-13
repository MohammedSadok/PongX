import type React from "react";
import type { Ball } from "./types";

/**
 * Normalizes ball velocity to maintain constant speed
 */
export function normalizeBallVelocity(ball: Ball): void {
  const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

  // Only normalize if the ball has some velocity and isn't being controlled
  if (speed > 0 && !ball.isUserControlled) {
    // Use the ball's base speed
    const desiredSpeed = ball.baseSpeed;

    // Scale the velocity components
    ball.dx = (ball.dx / speed) * desiredSpeed;
    ball.dy = (ball.dy / speed) * desiredSpeed;
  }

  // For user-controlled, just ensure a minimum speed when released
  if (ball.isUserControlled === false && speed < ball.baseSpeed * 0.5) {
    // Add a small random velocity if ball is too slow
    const angle = Math.random() * Math.PI * 2;
    ball.dx = Math.cos(angle) * ball.baseSpeed;
    ball.dy = Math.sin(angle) * ball.baseSpeed;
  }
}

/**
 * Plays a simple collision sound
 */
export function playCollisionSound(
  audioRef: React.RefObject<HTMLAudioElement>
): void {
  if (audioRef.current) {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch((error) => {
      // Ignore errors from browsers that block autoplay
      console.log("Audio play prevented:", error);
    });
  }
}

/**
 * Calculates the width of a word based on the pixel map
 */
export function calculateWordWidth(
  word: string,
  pixelSize: number,
  pixelMap: Record<string, number[][]>,
  letterSpacing: number
): number {
  let width = 0;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i].toUpperCase();
    const map = pixelMap[letter as keyof typeof pixelMap];
    if (map && map[0]) {
      width += map[0].length * pixelSize;
      if (i < word.length - 1) {
        width += letterSpacing * pixelSize;
      }
    }
  }
  return width;
}
