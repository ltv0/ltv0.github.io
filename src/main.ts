import { clearCanvas, ctx, fnt, renderer, setCanvas, updateViewport, W, H } from './canvas'
import { TextSkyBackground } from './background'

type Point = { x: number; y: number }

const TOUCH_REPULSION_STRENGTH = 14
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

  const viewport = window.visualViewport
  const rect = canvas.getBoundingClientRect()
  const width = Math.max(
    300,
    viewport?.width ?? rect.width ?? window.innerWidth,
  )
  const height = Math.max(
    200,
    viewport?.height ?? rect.height ?? window.innerHeight,
  )

  updateViewport(width, height)
  background.resize(width, height)
  resizeHeroText()
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

function getOverlayLinksRect(): DOMRect | null {
  const canvas = getCanvas()
  if (!canvas) return null

  const overlay = document.querySelector<HTMLElement>('.overlay-links')
  if (!overlay || overlay === document.body || overlay === document.documentElement) return null

  return getCanvasRect(canvas, overlay.getBoundingClientRect())
}

function getOverlayTextRegion(): DOMRect {
  const canvas = getCanvas()
  if (!canvas) {
    return new DOMRect(24, 0, W - 48, 0)
  }

  const overlayRect = getOverlayLinksRect()
  if (overlayRect) {
    return overlayRect
  }

  const header = document.querySelector<HTMLElement>('.site-header')
  if (!header) {
    return new DOMRect(24, 0, W - 48, 0)
  }

  return getCanvasRect(canvas, header.getBoundingClientRect())
}

function onTouchStart(event: TouchEvent): void {
  const pointer = getTouchPoint(event)
  if (!pointer) return

  if (isInsideCanvas(pointer, getCanvas()!)) {
    background.setPointer(pointer.x, pointer.y, TOUCH_REPULSION_STRENGTH)
  }

  updateHoverRectFromLink(getTouchLink(event))
}

function onTouchMove(event: TouchEvent): void {
  const pointer = getTouchPoint(event)
  if (!pointer) return

  const canvas = getCanvas()
  if (!canvas) return

  if (isInsideCanvas(pointer, canvas)) {
    background.setPointer(pointer.x, pointer.y, TOUCH_REPULSION_STRENGTH)
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

  const minRuleWidth = 120
  const ruleMargin = 24
  const maxWidth = Math.min(W - ruleMargin * 2, Math.max(minRuleWidth, W - 48))
  const x = Math.max(ruleMargin, (W - maxWidth) / 2)

  if (!isDesktopView()) {
    const y = Math.max(ruleMargin, H - 24)
    return { x, y, width: maxWidth }
  }

  const region = getOverlayTextRegion()
  const regionWidth = Math.max(minRuleWidth, region.width - 32)
  const regionX = Math.max(ruleMargin, region.left + (region.width - Math.min(maxWidth, regionWidth)) / 2)
  const y = Math.min(H - 40, Math.max(ruleMargin, region.bottom - 10))

  return { x: regionX, y, width: Math.min(maxWidth, regionWidth) }
}

function getCssVar(name: string, fallback = ''): string {
  if (typeof window === 'undefined' || !document.documentElement) return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

function getHeaderTitle(): string {
  return document.querySelector<HTMLElement>('.site-brand')?.textContent?.trim() ?? 'Portfolio'
}

function isDesktopView(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true
  }

  return window.matchMedia('(min-width: 900px)').matches
}

function getHeadingY(titleBlock: { height: number }, textRegion: DOMRect): number {
  if (isDesktopView()) {
    return Math.max(textRegion.bottom + 14, 24)
  }

  return Math.max(H - titleBlock.height - 24, textRegion.bottom + 14)
}

function getFittingTitleFont(title: string, maxWidth: number) {
  const maxFontSize = 40
  const minFontSize = 16
  const lineHeightRatio = 1.3

  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 1) {
    const font = fnt('monospace', fontSize, 'bold')
    const width = renderer.measureNaturalWidth(title, font, {
      whiteSpace: 'normal',
    })

    if (width <= maxWidth) {
      return {
        font,
        fontSize,
        lineHeight: Math.round(fontSize * lineHeightRatio),
      }
    }
  }

  return {
    font: fnt('monospace', minFontSize, 'bold'),
    fontSize: minFontSize,
    lineHeight: Math.round(minFontSize * lineHeightRatio),
  }
}

function getFittingBlockFont(
  text: string,
  maxWidth: number,
  maxFontSize: number,
  minFontSize: number,
  fontWeight: string | number = 'normal',
  lineHeightRatio = 1.4,
) {
  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 1) {
    const font = fnt('monospace', fontSize, fontWeight)
    const stats = renderer.measureLineStats(text, font, maxWidth, {
      whiteSpace: 'normal',
    })

    if (stats.maxLineWidth <= maxWidth) {
      return {
        font,
        fontSize,
        lineHeight: Math.round(fontSize * lineHeightRatio),
      }
    }
  }

  return {
    font: fnt('monospace', minFontSize, fontWeight),
    fontSize: minFontSize,
    lineHeight: Math.round(minFontSize * lineHeightRatio),
  }
}

function resizeHeroText(): void {
  const heroCopy = document.querySelector<HTMLElement>('.hero-copy')
  if (!heroCopy) return

  const heroStyles = window.getComputedStyle(heroCopy)
  const horizontalPadding = parseFloat(heroStyles.paddingLeft || '0') + parseFloat(heroStyles.paddingRight || '0')
  const availableWidth = Math.max(120, heroCopy.clientWidth - horizontalPadding)

  const title = heroCopy.querySelector<HTMLHeadingElement>('h1')
  if (title && title.textContent) {
    const titleMeta = getFittingBlockFont(title.textContent.trim(), availableWidth, 42, 18, 'bold', 1.08)
    title.style.fontSize = `${titleMeta.fontSize}px`
    title.style.lineHeight = `${titleMeta.lineHeight}px`
  }

  const paragraph = heroCopy.querySelector<HTMLParagraphElement>('p')
  if (paragraph && paragraph.textContent) {
    const paragraphMeta = getFittingBlockFont(paragraph.textContent.trim(), availableWidth, 18, 12, 'normal', 1.6)
    paragraph.style.fontSize = `${paragraphMeta.fontSize}px`
    paragraph.style.lineHeight = `${paragraphMeta.lineHeight}px`
  }

  heroCopy.querySelectorAll<HTMLAnchorElement>('.button, .button-secondary').forEach(button => {
    const buttonText = button.textContent?.trim() ?? ''
    if (!buttonText) return

    const buttonStyles = window.getComputedStyle(button)
    const buttonPadding = parseFloat(buttonStyles.paddingLeft || '0') + parseFloat(buttonStyles.paddingRight || '0')
    const buttonWidth = Math.max(80, button.clientWidth - buttonPadding)
    const buttonMeta = getFittingBlockFont(buttonText, buttonWidth, 18, 12, '700', 1.15)
    button.style.fontSize = `${buttonMeta.fontSize}px`
    button.style.lineHeight = `${buttonMeta.lineHeight}px`
  })
}

function drawHeading(): void {
  if (!ctx) return

  const canvas = getCanvas()
  if (!canvas) return

  const header = document.querySelector<HTMLElement>('.site-header')
  const textRegion = header ? getCanvasRect(canvas, header.getBoundingClientRect()) : new DOMRect(24, 0, W - 48, 0)
  const maxTextWidth = Math.max(120, Math.min(textRegion.width - 32, W - 48))
  const rule = getHeaderRuleLayout()
  const titleFontMeta = getFittingTitleFont(getHeaderTitle(), maxTextWidth)

  renderer.drawHRule(ctx, '-', titleFontMeta.font, titleFontMeta.lineHeight, rule.x, rule.y, rule.width, {
    color: getCssVar('--accent', '#9ba7ff'),
  })
}

function drawFrame(): void {
  if (!ctx) return

  clearCanvas(getCssVar('--bg', '#0d102e'))
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
  window.addEventListener('orientationchange', resizeCanvas)
  window.visualViewport?.addEventListener('resize', resizeCanvas)
  window.visualViewport?.addEventListener('scroll', resizeCanvas)
  requestAnimationFrame(loop)
}

function loop(): void {
  drawFrame()
  requestAnimationFrame(loop)
}

window.addEventListener('DOMContentLoaded', init)
