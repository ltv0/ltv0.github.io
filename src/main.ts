import { clearCanvas, ctx, fnt, renderer, setCanvas, updateViewport, W, H } from './canvas'
import { TextSkyBackground } from './background'

type Point = { x: number; y: number }

const background = new TextSkyBackground(fnt('monospace', 18), 22)

function getCanvas(): HTMLCanvasElement | null {
  return ctx?.canvas ?? null
}

function getCanvasPoint(canvas: HTMLCanvasElement, clientX: number, clientY: number): Point {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  }
}

function getCanvasRect(canvas: HTMLCanvasElement, domRect: DOMRect): DOMRect {
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

function isInsideCanvas(point: Point, canvas: HTMLCanvasElement): boolean {
  return point.x >= 0 && point.x <= canvas.width && point.y >= 0 && point.y <= canvas.height
}

function resizeCanvas(): void {
  const canvas = getCanvas()
  if (!canvas) return

  const width = Math.max(300, canvas.clientWidth)
  const height = Math.max(200, canvas.clientHeight)

  updateViewport(width, height)
  background.resize(width, height)
}

function updateHoverRectFromLink(link: HTMLAnchorElement | null): void {
  const canvas = getCanvas()
  if (!canvas || !link) {
    background.setHoverRect(null)
    return
  }

  background.setHoverRect(getCanvasRect(canvas, link.getBoundingClientRect()))
}

function onPointerMove(event: PointerEvent): void {
  const canvas = getCanvas()
  if (!canvas) return

  const pointer = getCanvasPoint(canvas, event.clientX, event.clientY)
  if (isInsideCanvas(pointer, canvas)) {
    background.setPointer(pointer.x, pointer.y)
  } else {
    background.clearPointer()
  }
}

function onPointerLeave(): void {
  background.clearPointer()
  background.setHoverRect(null)
}

function onLinkPointerMove(event: PointerEvent): void {
  const canvas = getCanvas()
  if (!canvas) return

  const pointer = getCanvasPoint(canvas, event.clientX, event.clientY)
  if (isInsideCanvas(pointer, canvas)) {
    background.setPointer(pointer.x, pointer.y)
  }

  updateHoverRectFromLink(event.currentTarget as HTMLAnchorElement)
}

function onLinkPointerLeave(): void {
  background.setHoverRect(null)
}

function drawHeading(): void {
  if (!ctx) return

  const title = ''
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

function drawFrame(): void {
  if (!ctx) return

  clearCanvas('#08121c')
  background.update()
  background.draw(ctx)
  drawHeading()
}

function attachLinkHoverHandlers(link: HTMLAnchorElement): void {
  link.addEventListener('pointerenter', onLinkPointerMove)
  link.addEventListener('pointermove', onLinkPointerMove)
  link.addEventListener('pointerleave', onLinkPointerLeave)
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

  document.querySelectorAll<HTMLAnchorElement>('.overlay-links a').forEach(attachLinkHoverHandlers)

  window.addEventListener('resize', resizeCanvas)
  requestAnimationFrame(loop)
}

function loop(): void {
  drawFrame()
  requestAnimationFrame(loop)
}

window.addEventListener('DOMContentLoaded', init)
