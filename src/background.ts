import { renderer } from './canvas'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-\\/|<>.'
const HOVER_RADIUS = 60
const REPULSION_STRENGTH = 2
const DAMPING = 0.86

export class TextSkyBackground {
  private charWidth = 0
  private cols = 0
  private rows = 0
  private grid: string[][] = []
  private offsets: { dx: number; dy: number }[][] = []
  private width = 0
  private height = 0
  private mouseX = 0
  private mouseY = 0
  private hasPointer = false
  private frame = 0

  constructor(public font = '16px monospace', public lineHeight = 20) {}

  resize(width: number, height: number): void {
    this.width = width
    this.height = height
    this.charWidth = Math.max(6, renderer.measureWidth('M', this.font))
    this.cols = Math.max(1, Math.ceil(width / this.charWidth))
    this.rows = Math.max(1, Math.ceil(height / this.lineHeight))
    this.grid = Array.from({ length: this.rows }, () => this.createRow())
    this.offsets = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({ dx: 0, dy: 0 })),
    )
  }

  setPointer(x: number, y: number): void {
    this.mouseX = x
    this.mouseY = y
    this.hasPointer = true
  }

  clearPointer(): void {
    this.hasPointer = false
  }

  update(): void {
    this.frame += 1
    if (this.grid.length === 0) return

    const mutateCount = Math.max(1, Math.floor((this.cols * this.rows) / 120))
    for (let i = 0; i < mutateCount; i++) {
      const rowIndex = Math.floor(Math.random() * this.rows)
      const colIndex = Math.floor(Math.random() * this.cols)
      this.grid[rowIndex][colIndex] = this.randomGlyph()
    }

    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      for (let colIndex = 0; colIndex < this.cols; colIndex++) {
        const offset = this.offsets[rowIndex][colIndex]
        if (this.hasPointer) {
          const charX = colIndex * this.charWidth + this.charWidth / 2
          const charY = rowIndex * this.lineHeight + this.lineHeight / 2
          const dx = charX - this.mouseX
          const dy = charY - this.mouseY
          const dist = Math.hypot(dx, dy)

          if (dist < HOVER_RADIUS && dist > 0) {
            const power = (1 - dist / HOVER_RADIUS) * REPULSION_STRENGTH
            offset.dx += (dx / dist) * power
            offset.dy += (dy / dist) * power
          }
        }

        offset.dx *= DAMPING
        offset.dy *= DAMPING
      }
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.save()
    context.font = this.font
    context.textBaseline = 'top'

    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      for (let colIndex = 0; colIndex < this.cols; colIndex++) {
        const char = this.grid[rowIndex][colIndex]
        const offset = this.offsets[rowIndex][colIndex]
        const x = colIndex * this.charWidth + offset.dx
        const y = rowIndex * this.lineHeight + offset.dy
        const alpha = this.getAlphaForCell(x, y)

        context.fillStyle = `rgba(130, 190, 255, ${alpha})`
        context.fillText(char, x, y)
      }
    }

    context.restore()
  }

  private getAlphaForCell(x: number, y: number): number {
    if (!this.hasPointer) return 0.08
    const dx = x - this.mouseX
    const dy = y - this.mouseY
    const dist = Math.hypot(dx, dy)
    return Math.max(0.04, Math.min(0.18, 0.08 + (HOVER_RADIUS - dist) / HOVER_RADIUS * 0.1))
  }

  private createRow(): string[] {
    return Array.from({ length: this.cols }, () => this.randomGlyph())
  }

  private randomGlyph(): string {
    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
  }
}
