import type { Ball, NavItem } from "./types";
import { playCollisionSound } from "./utils";

interface NavbarProps {
  ctx: CanvasRenderingContext2D;
  navbar: NavItem[];
  ball: Ball;
  theme: {
    navbarActive: string;
    navbarBg: string;
    textColor: string;
    activeBallColor: string;
  };
  audioRef: React.RefObject<HTMLAudioElement>;
  changeSection: (id: string) => void;
}

export function drawNavbar(
  ctx: CanvasRenderingContext2D,
  navbar: NavItem[],
  theme: {
    navbarActive: string;
    navbarBg: string;
    textColor: string;
    activeBallColor: string;
  }
): void {
  // Always at full opacity
  ctx.globalAlpha = 1.0;
  navbar.forEach((item) => {
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
    ctx.fillStyle = item.isActive ? theme.navbarActive : theme.navbarBg;
    ctx.fillRect(
      item.x + item.shakeOffset * item.shakeDirection,
      item.y,
      item.width,
      item.height
    );

    // Draw text
    ctx.fillStyle = theme.textColor;
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
      ctx.fillStyle = theme.activeBallColor;
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
}

export function updateNavbar(navbar: NavItem[]): void {
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
}

export function checkNavbarCollisions(
  navbar: NavItem[],
  ball: Ball,
  audioRef: React.RefObject<HTMLAudioElement>,
  changeSection: (id: string) => void
): void {
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
}
