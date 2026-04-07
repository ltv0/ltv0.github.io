import { PretextRenderer } from './pretext-renderer'

export const renderer = new PretextRenderer()

export let ctx: CanvasRenderingContext2D | null = null
export let W = 0
export let H = 0

export function fnt(family = 'monospace', size = 16, weight: string | number = 'normal'): string {
  return `${weight} ${size}px ${family}`
}

export function sz(value: number): number {
  return value
}

export function setCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to acquire 2D canvas context')
  }

  ctx = context
  updateViewport(canvas.width, canvas.height)
}

export function updateViewport(width: number, height: number): void {
  W = width
  H = height
  if (ctx) {
    const dpr = Math.max(1, Math.min(4, Math.floor(window.devicePixelRatio || 1)))
    ctx.canvas.width = width * dpr
    ctx.canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
}

export function clearCanvas(color = '#000000'): void {
  if (!ctx) return
  ctx.save()
  ctx.fillStyle = color
  ctx.fillRect(0, 0, W, H)
  ctx.restore()
}
