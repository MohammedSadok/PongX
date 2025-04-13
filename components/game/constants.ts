// Colors
export const COLOR = "#FFFFFF"
export const HIT_COLOR = "#333333"
export const BACKGROUND_COLOR = "#000000"
export const BALL_COLOR = "#FFFFFF"
export const ACTIVE_BALL_COLOR = "#00ff99"
export const PADDLE_COLOR = "#FFFFFF"
export const NAVBAR_BG = "rgba(0, 0, 0, 0.5)"
export const NAVBAR_ACTIVE = "rgba(0, 255, 153, 0.3)"

// Spacing
export const LETTER_SPACING = 1
export const WORD_SPACING = 3

// Game settings
export const NAVBAR_HEIGHT = 60

// Sections - Updated Order
export const SECTIONS = [
  { id: "welcome", label: "Welcome" }, // Changed order
  { id: "home", label: "Home" },      // Changed order
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

// Themes
export const THEMES = [
  {
    name: "default",
    ballColor: "#FFFFFF",
    activeBallColor: "#00ff99",
    navbarActive: "rgba(0, 255, 153, 0.3)",
    navbarBg: "rgba(0, 0, 0, 0.5)",
    textColor: "#FFFFFF",
    accentColor: "#00ff99",
  },
  {
    name: "blue",
    ballColor: "#64B5F6",
    activeBallColor: "#2196F3",
    navbarActive: "rgba(33, 150, 243, 0.3)",
    navbarBg: "rgba(0, 0, 0, 0.5)",
    textColor: "#E3F2FD",
    accentColor: "#2196F3",
  },
  {
    name: "purple",
    ballColor: "#CE93D8",
    activeBallColor: "#9C27B0",
    navbarActive: "rgba(156, 39, 176, 0.3)",
    navbarBg: "rgba(0, 0, 0, 0.5)",
    textColor: "#F3E5F5",
    accentColor: "#9C27B0",
  },
  {
    name: "orange",
    ballColor: "#FFB74D",
    activeBallColor: "#FF9800",
    navbarActive: "rgba(255, 152, 0, 0.3)",
    navbarBg: "rgba(0, 0, 0, 0.5)",
    textColor: "#FFF3E0",
    accentColor: "#FF9800",
  },
  {
    name: "red",
    ballColor: "#E57373",
    activeBallColor: "#F44336",
    navbarActive: "rgba(244, 67, 54, 0.3)",
    navbarBg: "rgba(0, 0, 0, 0.5)",
    textColor: "#FFEBEE",
    accentColor: "#F44336",
  },
]

// Pixel map for text rendering
export const PIXEL_MAP = {
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  O: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  G: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
}
