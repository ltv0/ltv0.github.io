import { clearCanvas, ctx, fnt, renderer, setCanvas, updateViewport, W, H } from './canvas'
import { TextSkyBackground } from './background'

const background = new TextSkyBackground(fnt('monospace', 18), 22)

function resizeCanvas(): void {
  const canvas = ctx?.canvas
  if (!canvas) return

  const width = Math.max(300, canvas.clientWidth)
  const height = Math.max(200, canvas.clientHeight)
  updateViewport(width, height)
  background.resize(width, height)
}

function onPointerMove(event: PointerEvent): void {
  const canvas = ctx?.canvas
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
    background.setPointer(x, y)
  } else {
    background.clearPointer()
  }
}

function onPointerLeave(): void {
  background.clearPointer()
}

function drawFrame(): void {
  if (!ctx) return

  clearCanvas('#08121c')
  background.update()
  background.draw(ctx)

  const title = 'Luke T. Vo Portfolio'
  const titleFont = fnt('monospace', 34, 'bold')
  const titleLineHeight = 40

  renderer.drawText(ctx, title, titleFont, titleLineHeight, W / 2, 36, {
    color: '#f6f2df',
    align: 'center',
  })

  renderer.drawHRule(ctx, '-', titleFont, titleLineHeight, 40, 84, W - 80, {
    color: '#7fd1ff',
  })
}

function loop(): void {
  drawFrame()
  requestAnimationFrame(loop)
}

function init(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')
  if (!canvas) {
    throw new Error('Canvas element not found. Add a <canvas> to the page.')
  }

  setCanvas(canvas)
  resizeCanvas()

  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerleave', onPointerLeave)

  const overlayLinks = document.querySelectorAll<HTMLAnchorElement>('.overlay-links a')
  overlayLinks.forEach((link) => {
    link.addEventListener('pointerenter', onPointerMove)
    link.addEventListener('pointermove', onPointerMove)
  })

  window.addEventListener('resize', resizeCanvas)
  requestAnimationFrame(loop)
}

window.addEventListener('DOMContentLoaded', init)
