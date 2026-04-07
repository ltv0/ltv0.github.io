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
  background.setPointer(event.clientX - rect.left, event.clientY - rect.top)
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
  const body = `### [dev post here too](https://devpost.com/software/weather-report-2aew5f) ca\n` +
    `### [hackathon game link here](http://ltv0.me/blaster-hack-commandline-game/)`
  const titleFont = fnt('monospace', 28, 'bold')
  const bodyFont = fnt('monospace', 18)
  const titleLineHeight = 34
  const bodyLineHeight = 24

  renderer.drawText(ctx, title, titleFont, titleLineHeight, W / 2, 36, {
    color: '#f6f2df',
    align: 'center',
  })

  renderer.drawHRule(ctx, '-', titleFont, titleLineHeight, 40, 84, W - 80, {
    color: '#7fd1ff',
  })

  const block = renderer.getBlock(body, bodyFont, bodyLineHeight, W - 80)
  renderer.drawBlock(ctx, block, 40, 120, {
    color: '#d6deeb',
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
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerleave', onPointerLeave)
  window.addEventListener('resize', resizeCanvas)
  requestAnimationFrame(loop)
}

window.addEventListener('DOMContentLoaded', init)
