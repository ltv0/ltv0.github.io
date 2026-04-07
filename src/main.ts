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

function getCanvasRelativePoint(canvas: HTMLCanvasElement, clientX: number, clientY: number): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  }
}

function getCanvasRelativeRect(canvas: HTMLCanvasElement, domRect: DOMRect): DOMRect {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  return new DOMRect(
    (domRect.left - rect.left) * scaleX,
    (domRect.top - rect.top) * scaleY,
    domRect.width * scaleX,
    domRect.height * scaleY,
  )
}

function onPointerMove(event: PointerEvent): void {
  const canvas = ctx?.canvas
  if (!canvas) return

  const { x, y } = getCanvasRelativePoint(canvas, event.clientX, event.clientY)
  if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
    background.setPointer(x, y)
  } else {
    background.clearPointer()
  }
}

function onPointerLeave(): void {
  background.clearPointer()
  background.setHoverRect(null)
}

function updateHoverRectFromLink(link: HTMLAnchorElement | null): void {
  const canvas = ctx?.canvas
  if (!canvas || !link) {
    background.setHoverRect(null)
    return
  }

  const linkRect = link.getBoundingClientRect()
  background.setHoverRect(getCanvasRelativeRect(canvas, linkRect))
}

function onLinkPointerMove(event: PointerEvent): void {
  const canvas = ctx?.canvas
  if (!canvas) return

  const { x, y } = getCanvasRelativePoint(canvas, event.clientX, event.clientY)
  if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
    background.setPointer(x, y)
  }
  updateHoverRectFromLink(event.currentTarget as HTMLAnchorElement)
}

function onLinkPointerLeave(): void {
  background.setHoverRect(null)
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
    link.addEventListener('pointerenter', onLinkPointerMove)
    link.addEventListener('pointermove', onLinkPointerMove)
    link.addEventListener('pointerleave', onLinkPointerLeave)
  })

  window.addEventListener('resize', resizeCanvas)
  requestAnimationFrame(loop)
}

window.addEventListener('DOMContentLoaded', init)
