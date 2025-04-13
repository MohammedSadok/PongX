import { COLOR, HIT_COLOR } from "./constants";
import type { Ball, Pixel } from "./types";
import { playCollisionSound } from "./utils";

interface PixelsProps {
  ctx: CanvasRenderingContext2D;
  pixels: Pixel[];
  ball: Ball;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export function drawPixels(
  ctx: CanvasRenderingContext2D,
  pixels: Pixel[]
): void {
  pixels.forEach((pixel) => {
    ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR;
    ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
  });
}

export function checkPixelCollisions(
  pixels: Pixel[],
  ball: Ball,
  audioRef: React.RefObject<HTMLAudioElement>
): void {
  pixels.forEach((pixel) => {
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
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
        if (speed !== 0) {
          const scale = ball.baseSpeed / speed;
          ball.dx *= scale;
          ball.dy *= scale;
        }
      }
    }
  });
}
