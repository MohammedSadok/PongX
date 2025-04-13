import type { Ball } from "./types";
import { normalizeBallVelocity, playCollisionSound } from "./utils";

interface BallProps {
  ctx: CanvasRenderingContext2D;
  ball: Ball;
  navbarHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  opacity: number;
}

export function drawBall({
  ctx,
  ball,
  opacity,
  theme,
}: {
  ctx: CanvasRenderingContext2D;
  ball: Ball;
  opacity: number;
  theme: { ballColor: string; activeBallColor: string };
}): void {
  // Draw trail
  ball.trail.forEach((point) => {
    // Use theme colors
    ctx.fillStyle = `rgba(${
      ball.isUserControlled
        ? hexToRgb(theme.activeBallColor)
        : hexToRgb(theme.ballColor)
    }, ${point.alpha * 0.5 * opacity})`;
    ctx.beginPath();
    ctx.arc(
      point.x,
      point.y,
      ball.radius * (0.5 + point.alpha * 0.5),
      0,
      Math.PI * 2
    );
    ctx.fill();
  });

  // Draw ball with theme color
  ctx.fillStyle = ball.isUserControlled
    ? theme.activeBallColor
    : theme.ballColor;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();

  // Add glow effect to ball
  ctx.shadowBlur = 15;
  ctx.shadowColor = ball.isUserControlled
    ? theme.activeBallColor
    : theme.ballColor;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function updateBallPhysics(
  ball: Ball,
  navbarHeight: number,
  canvasWidth: number,
  canvasHeight: number,
  audioRef: React.RefObject<HTMLAudioElement>
): void {
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
    if (ball.isUserControlled && ball.y - ball.radius < navbarHeight) {
      ball.y = navbarHeight + ball.radius;
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

    // Handle wall collision
    if (ball.y - ball.radius < navbarHeight && !ball.isUserControlled) {
      ball.y = navbarHeight + ball.radius;
      ball.dy = -ball.dy;

      // Normalize velocity after bounce
      normalizeBallVelocity(ball);
    }

    if (ball.y + ball.radius > canvasHeight) {
      ball.y = canvasHeight - ball.radius;
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

    if (ball.x + ball.radius > canvasWidth) {
      ball.x = canvasWidth - ball.radius;
      ball.dx = -ball.dx;

      // Normalize velocity after bounce
      if (!ball.isUserControlled) {
        normalizeBallVelocity(ball);
      }

      // Play sound
      playCollisionSound(audioRef);
    }
  }
}

// Helper function to convert hex to rgb
export function hexToRgb(hex: string) {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse the hex values
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}
