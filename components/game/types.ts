export interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

export interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  targetX: number
  targetY: number
  velocity: number
  maxVelocity: number
  friction: number
  acceleration: number
  isActive: boolean
  isUserControlled: boolean
  trail: Array<{ x: number; y: number; alpha: number }>
  baseSpeed: number
}

export interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

export interface NavItem {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
  isActive: boolean
  shakeOffset: number
  shakeDirection: number
  scale: number
}

export interface Section {
  id: string
  label: string
}

export interface Theme {
  name: string
  ballColor: string
  activeBallColor: string
  navbarActive: string
  navbarBg: string
  textColor: string
  accentColor: string
}
