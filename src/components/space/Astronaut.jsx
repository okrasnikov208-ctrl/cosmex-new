import { useEffect, useRef } from 'react'

export default function Astronaut({ className = '' }) {
  const cvRef = useRef(null)

  useEffect(() => {
    const cv = cvRef.current
    const ctx = cv.getContext('2d')
    let raf, t = 0

    const draw = () => {
      t++
      ctx.clearRect(0, 0, cv.width, cv.height)
      const cx = cv.width / 2, cy = cv.height / 2
      const bob = Math.sin(t * 0.018) * 8
      const tilt = Math.sin(t * 0.012) * 0.05

      ctx.save()
      ctx.translate(cx, cy + bob)
      ctx.rotate(tilt)

      // BACKPACK
      const packG = ctx.createLinearGradient(24, -5, 46, 25)
      packG.addColorStop(0, '#b8c4dc'); packG.addColorStop(1, '#6a7a98')
      ctx.fillStyle = packG
      ctx.beginPath(); ctx.roundRect(24, -5, 22, 30, 5); ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.moveTo(28, 2 + i*8); ctx.lineTo(42, 2 + i*8); ctx.stroke()
      }

      // BODY
      const bodyG = ctx.createRadialGradient(-8, 0, 2, 0, 10, 30)
      bodyG.addColorStop(0, '#eef0ff'); bodyG.addColorStop(0.6, '#c8d2f0'); bodyG.addColorStop(1, '#8090b8')
      ctx.fillStyle = bodyG
      ctx.beginPath(); ctx.ellipse(0, 15, 24, 30, 0, 0, Math.PI * 2); ctx.fill()

      // Chest panel
      ctx.fillStyle = 'rgba(30,50,110,0.65)'
      ctx.beginPath(); ctx.ellipse(0, 10, 14, 16, 0, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(80,140,255,0.6)'; ctx.fillRect(-7, 3, 5, 3)
      ctx.fillStyle = 'rgba(80,140,255,0.6)'; ctx.fillRect(2, 3, 5, 3)
      ctx.fillStyle = 'rgba(255,210,50,0.9)'; ctx.fillRect(-2, 7, 4, 2)
      ctx.fillStyle = 'rgba(255,80,80,0.8)'; ctx.beginPath(); ctx.arc(0, 13, 2, 0, Math.PI*2); ctx.fill()

      // Collar
      const colG = ctx.createLinearGradient(-18,-8,18,2)
      colG.addColorStop(0,'#d8e0f8'); colG.addColorStop(1,'#98a8c8')
      ctx.fillStyle = colG
      ctx.beginPath(); ctx.ellipse(0, -6, 17, 9, 0, 0, Math.PI * 2); ctx.fill()

      // HELMET shell
      const helmG = ctx.createRadialGradient(-6, -34, 4, 0, -28, 24)
      helmG.addColorStop(0, '#d8e0ff'); helmG.addColorStop(0.5, '#7888c0'); helmG.addColorStop(1, '#1e2e68')
      ctx.fillStyle = helmG
      ctx.beginPath(); ctx.arc(0, -28, 23, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = '#90a8d8'; ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.arc(0, -28, 23, 0, Math.PI * 2); ctx.stroke()

      // Visor
      const visG = ctx.createLinearGradient(-14,-42,14,-14)
      visG.addColorStop(0,'#0c1830'); visG.addColorStop(1,'#182848')
      ctx.fillStyle = visG
      ctx.beginPath(); ctx.ellipse(0,-28,15,12,0,0,Math.PI*2); ctx.fill()
      // Gold tint
      ctx.fillStyle = 'rgba(255,170,20,0.18)'
      ctx.beginPath(); ctx.ellipse(0,-28,15,12,0,0,Math.PI*2); ctx.fill()
      // Main reflection
      const refG = ctx.createLinearGradient(-12,-42,2,-22)
      refG.addColorStop(0,'rgba(255,255,255,0.55)'); refG.addColorStop(1,'rgba(255,255,255,0)')
      ctx.fillStyle = refG
      ctx.beginPath(); ctx.ellipse(-4,-34,7,5,-0.4,0,Math.PI*2); ctx.fill()
      // Secondary reflection
      ctx.fillStyle = 'rgba(255,255,255,0.18)'
      ctx.beginPath(); ctx.ellipse(6,-25,3,2,0.3,0,Math.PI*2); ctx.fill()
      // Space scene in visor
      ctx.fillStyle = 'rgba(60,120,255,0.25)'
      ctx.beginPath(); ctx.ellipse(2,-30,5,3.5,0,0,Math.PI*2); ctx.fill()

      // ARMS
      const armSwing = Math.sin(t * 0.022) * 10
      ctx.strokeStyle = '#d8e0f8'; ctx.lineWidth = 12; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(-22,0); ctx.quadraticCurveTo(-34,8+armSwing*0.4,-38,20+armSwing); ctx.stroke()
      ctx.strokeStyle = '#a0b0d0'; ctx.lineWidth = 10; ctx.stroke()
      ctx.beginPath(); ctx.moveTo(22,0); ctx.quadraticCurveTo(34,8-armSwing*0.4,38,20-armSwing); ctx.stroke()
      ctx.strokeStyle = '#a0b0d0'; ctx.lineWidth = 10; ctx.stroke()
      // Gloves
      ctx.fillStyle = '#607080'
      ctx.beginPath(); ctx.arc(-38,20+armSwing,7,0,Math.PI*2); ctx.fill()
      ctx.beginPath(); ctx.arc(38,20-armSwing,7,0,Math.PI*2); ctx.fill()

      // LEGS
      ctx.strokeStyle = '#c8d4ec'; ctx.lineWidth = 13
      ctx.beginPath(); ctx.moveTo(-13,42); ctx.lineTo(-15,66); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(13,42); ctx.lineTo(15,66); ctx.stroke()
      ctx.strokeStyle = '#98a8c8'; ctx.lineWidth = 11
      ctx.beginPath(); ctx.moveTo(-13,42); ctx.lineTo(-15,66); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(13,42); ctx.lineTo(15,66); ctx.stroke()
      // Boots
      ctx.fillStyle = '#485870'
      ctx.beginPath(); ctx.ellipse(-15,68,10,5.5,0,0,Math.PI*2); ctx.fill()
      ctx.beginPath(); ctx.ellipse(15,68,10,5.5,0,0,Math.PI*2); ctx.fill()
      ctx.fillStyle = '#364858'
      ctx.beginPath(); ctx.ellipse(-15,68,8,4,0,0,Math.PI*2); ctx.fill()
      ctx.beginPath(); ctx.ellipse(15,68,8,4,0,0,Math.PI*2); ctx.fill()

      // TETHER
      const tp = 0.35 + Math.sin(t*0.025)*0.15
      ctx.strokeStyle = `rgba(140,190,255,${tp})`; ctx.lineWidth = 1.5; ctx.setLineDash([5,5])
      ctx.beginPath(); ctx.moveTo(-80,-80); ctx.quadraticCurveTo(-20,-50,0,-28); ctx.stroke()
      ctx.setLineDash([])

      // SUIT GLOW
      ctx.shadowColor = 'rgba(91,143,255,0.4)'; ctx.shadowBlur = 20
      ctx.strokeStyle = 'rgba(91,143,255,0.1)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.ellipse(0,10,28,36,0,0,Math.PI*2); ctx.stroke()
      ctx.shadowBlur = 0

      // PARTICLES
      for (let i = 0; i < 4; i++) {
        const a = (t*0.008 + i*1.57) % (Math.PI*2)
        const d = 38 + Math.sin(t*0.02+i)*6
        const alpha = 0.25 + Math.sin(t*0.04+i)*0.2
        ctx.fillStyle = `rgba(120,180,255,${alpha})`
        ctx.beginPath(); ctx.arc(Math.cos(a)*d, Math.sin(a)*d-10, 1.5, 0, Math.PI*2); ctx.fill()
      }

      ctx.restore()
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas ref={cvRef} width={220} height={240}
      className={`pointer-events-none ${className}`}
      style={{ filter: 'drop-shadow(0 0 24px rgba(91,143,255,0.5))' }}
    />
  )
}
