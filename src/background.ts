import { renderer } from './canvas'

type Offset = { dx: number; dy: number }
type HoverVector = { dx: number; dy: number; dist: number }

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-\\/|<>.'
const HOVER_RADIUS = 60
const CURSOR_REPULSION_STRENGTH = 6
const LINK_REPULSION_STRENGTH = 4
const DAMPING = 0.86

export class TextSkyBackground {
  private charWidth = 0
  private cols = 0
  private rows = 0
  private grid: string[][] = []
  private offsets: Offset[][] = []
  private width = 0
  private height = 0
  private mouseX = 0
  private mouseY = 0
  private hasPointer = false
  private pointerFrozen = false
  private hoverRect: DOMRect | null = null
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
    this.pointerFrozen = false
  }

  clearPointer(preservePointer = false): void {
    this.hasPointer = false
    this.pointerFrozen = preservePointer
  }

  setHoverRect(rect: DOMRect | null): void {
    this.hoverRect = rect
  }

  update(): void {
    this.frame += 1
    if (this.grid.length === 0) return

    this.mutateGlyphs()
    this.updateOffsets()
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

        context.fillStyle = '#6fe7fc'
        context.globalAlpha = this.getAlphaForCell(x, y)
        context.fillText(char, x, y)
      }
    }

    context.restore()
  }

  private getAlphaForCell(x: number, y: number): number {
    if (!this.isHoverActive()) return 0.08

    const { dist } = this.getHoverVector(x, y)
    const alpha = 0.08 + ((HOVER_RADIUS - dist) / HOVER_RADIUS) * 0.1
    return Math.max(0.08, Math.min(0.18, alpha))
  }

  private isHoverActive(): boolean {
    return this.hasPointer || this.pointerFrozen || this.hoverRect !== null
  }

  private mutateGlyphs(): void {
    const mutateCount = Math.max(1, Math.floor((this.cols * this.rows) / 120))
    for (let i = 0; i < mutateCount; i++) {
      const rowIndex = Math.floor(Math.random() * this.rows)
      const colIndex = Math.floor(Math.random() * this.cols)
      this.grid[rowIndex][colIndex] = this.randomGlyph()
    }
  }

  private updateOffsets(): void {
    const hoverActive = this.isHoverActive()

    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      for (let colIndex = 0; colIndex < this.cols; colIndex++) {
        const offset = this.offsets[rowIndex][colIndex]
        if (!hoverActive) {
          offset.dx *= DAMPING
          offset.dy *= DAMPING
          continue
        }

        const charX = colIndex * this.charWidth + this.charWidth / 2
        const charY = rowIndex * this.lineHeight + this.lineHeight / 2
        const hover = this.getHoverVector(charX, charY)

        if (hover.dist < HOVER_RADIUS) {
          const strength = this.hoverRect ? LINK_REPULSION_STRENGTH : CURSOR_REPULSION_STRENGTH
          const power = ((HOVER_RADIUS - hover.dist) / HOVER_RADIUS) * strength
          offset.dx += (hover.dx / hover.dist) * power
          offset.dy += (hover.dy / hover.dist) * power
        }

        offset.dx *= DAMPING
        offset.dy *= DAMPING
      }
    }
  }

  private getHoverVector(x: number, y: number): HoverVector {
    if (this.hoverRect !== null) {
      const nearestX = Math.min(Math.max(x, this.hoverRect.left), this.hoverRect.right)
      const nearestY = Math.min(Math.max(y, this.hoverRect.top), this.hoverRect.bottom)
      let dx = x - nearestX
      let dy = y - nearestY
      let dist = Math.hypot(dx, dy)

      if (dist === 0) {
        const centerX = (this.hoverRect.left + this.hoverRect.right) / 2
        const centerY = (this.hoverRect.top + this.hoverRect.bottom) / 2
        dx = x - centerX
        dy = y - centerY
        dist = Math.hypot(dx, dy) || 1
      }

      return this.normalizeHoverVector({ dx, dy, dist })
    }

    const dx = x - this.mouseX
    const dy = y - this.mouseY
    return this.normalizeHoverVector({ dx, dy, dist: Math.hypot(dx, dy) })
  }

  private normalizeHoverVector(vector: HoverVector): HoverVector {
    if (vector.dist === 0) {
      return { dx: 1, dy: 0, dist: 1 }
    }

    return vector
  }

  private createRow(): string[] {
    return Array.from({ length: this.cols }, () => this.randomGlyph())
  }

  private randomGlyph(): string {
    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
  }
}
