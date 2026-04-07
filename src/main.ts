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

function getTouchPoint(event: TouchEvent): Point | null {
  const touch = event.touches[0] || event.changedTouches[0]
  if (!touch) return null
  const canvas = getCanvas()
  if (!canvas) return null

  return getCanvasPoint(canvas, touch.clientX, touch.clientY)
}

function getTouchLink(event: TouchEvent): HTMLAnchorElement | null {
  const touch = event.touches[0] || event.changedTouches[0]
  if (!touch) return null

  const element = document.elementFromPoint(touch.clientX, touch.clientY)
  return element?.closest<HTMLAnchorElement>('.overlay-links a') ?? null
}

function onTouchStart(event: TouchEvent): void {
  const pointer = getTouchPoint(event)
  if (!pointer) return

  if (isInsideCanvas(pointer, getCanvas()!)) {
    background.setPointer(pointer.x, pointer.y)
  }

  updateHoverRectFromLink(getTouchLink(event))
}

function onTouchMove(event: TouchEvent): void {
  const pointer = getTouchPoint(event)
  if (!pointer) return

  const canvas = getCanvas()
  if (!canvas) return

  if (isInsideCanvas(pointer, canvas)) {
    background.setPointer(pointer.x, pointer.y)
  } else {
    background.clearPointer()
  }

  updateHoverRectFromLink(getTouchLink(event))
}

function onTouchEnd(): void {
  background.clearPointer()
  background.setHoverRect(null)
}

function getHeaderRuleLayout(): { x: number; y: number; width: number } {
  const canvas = getCanvas()
  if (!canvas) {
    return { x: 40, y: 84, width: Math.max(120, W - 80) }
  }

  const header = document.querySelector<HTMLElement>('.site-header')
  if (!header) {
    return { x: 40, y: 84, width: Math.max(120, W - 80) }
  }

  const headerRect = getCanvasRect(canvas, header.getBoundingClientRect())
  const minRuleWidth = 120
  const ruleMargin = 24
  const maxWidth = Math.min(W - ruleMargin * 2, Math.max(minRuleWidth, headerRect.width - 32))
  const x = Math.max(ruleMargin, headerRect.left + (headerRect.width - maxWidth) / 2)
  const y = Math.min(H - 40, Math.max(ruleMargin, headerRect.bottom - 10))

  return { x, y, width: maxWidth }
}

function drawHeading(): void {
  if (!ctx) return

  const title = ''
  const titleFont = fnt('monospace', 34, 'bold')
  const titleLineHeight = 40

  const rule = getHeaderRuleLayout()

  renderer.drawText(ctx, title, titleFont, titleLineHeight, W / 2, 36, {
    color: '#f6f2df',
    align: 'center',
  })

  renderer.drawHRule(ctx, '-', titleFont, titleLineHeight, rule.x, rule.y, rule.width, {
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
  document.addEventListener('touchstart', onTouchStart, { passive: true })
  document.addEventListener('touchmove', onTouchMove, { passive: true })
  document.addEventListener('touchend', onTouchEnd, { passive: true })
  document.addEventListener('touchcancel', onTouchEnd, { passive: true })

  document.querySelectorAll<HTMLAnchorElement>('.overlay-links a').forEach(attachLinkHoverHandlers)

  window.addEventListener('resize', resizeCanvas)
  requestAnimationFrame(loop)
}

function loop(): void {
  drawFrame()
  requestAnimationFrame(loop)
}

window.addEventListener('DOMContentLoaded', init)
