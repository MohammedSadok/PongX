import type React from "react"
import type { Ball } from "./types"

/**
 * Normalizes ball velocity to maintain constant speed
 */
export const normalizeBallVelocity = (ball: Ball): void => {
  if (!ball.isUserControlled) {
    const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy)
    if (speed !== 0) {
      const scale = ball.baseSpeed / speed
      ball.dx *= scale
      ball.dy *= scale
    } else {
      // If speed is 0, give it a random direction
      const angle = Math.random() * Math.PI * 2
      ball.dx = Math.cos(angle) * ball.baseSpeed
      ball.dy = Math.sin(angle) * ball.baseSpeed
    }
  }
}

/**
 * Plays a simple collision sound
 */
export const playCollisionSound = (audioRef: React.RefObject<HTMLAudioElement>): void => {
  if (audioRef.current) {
    audioRef.current.currentTime = 0
    audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
  }
}

/**
 * Calculates the width of a word based on the pixel map
 */
export const calculateWordWidth = (
  word: string,
  pixelSize: number,
  pixelMap: Record<string, number[][]>,
  letterSpacing: number,
): number => {
  return (
    word.split("").reduce((width, letter) => {
      const letterWidth = pixelMap[letter as keyof typeof pixelMap]?.[0]?.length ?? 0
      return width + letterWidth * pixelSize + letterSpacing * pixelSize
    }, 0) -
    letterSpacing * pixelSize
  )
}
