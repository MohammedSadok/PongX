import type { Ball, Paddle } from "./types";
import { playCollisionSound } from "./utils";

interface PaddlesProps {
  ctx: CanvasRenderingContext2D;
  paddles: Paddle[];
  ball: Ball;
  audioRef: React.RefObject<HTMLAudioElement>;
  canvasWidth: number;
  canvasHeight: number;
}

export function drawPaddles(
  ctx: CanvasRenderingContext2D,
  paddles: Paddle[],
  color: string
): void {
  ctx.fillStyle = color;
  paddles.forEach((paddle) => {
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  });
}

export function updatePaddles(
  paddles: Paddle[],
  ball: Ball,
  canvasWidth: number,
  canvasHeight: number
): void {
  paddles.forEach((paddle) => {
    if (paddle.isVertical) {
      paddle.targetY = ball.y - paddle.height / 2;
      paddle.targetY = Math.max(
        0,
        Math.min(canvasHeight - paddle.height, paddle.targetY)
      );
      paddle.y += (paddle.targetY - paddle.y) * 0.1;
    } else {
      paddle.targetY = ball.x - paddle.width / 2;
      paddle.targetY = Math.max(
        0,
        Math.min(canvasWidth - paddle.width, paddle.targetY)
      );
      paddle.x += (paddle.targetY - paddle.x) * 0.1;
    }
  });
}

export function checkPaddleCollisions(
  paddles: Paddle[],
  ball: Ball,
  audioRef: React.RefObject<HTMLAudioElement>
): void {
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
          const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
          if (speed !== 0) {
            const scale = ball.baseSpeed / speed;
            ball.dx *= scale;
            ball.dy *= scale;
          }
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
          const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
          if (speed !== 0) {
            const scale = ball.baseSpeed / speed;
            ball.dx *= scale;
            ball.dy *= scale;
          }
        }
      }
    }
  });
}
