import { useEffect, useRef } from 'react'

export default function StarField() {
  const cvRef = useRef(null)

  useEffect(() => {
    const cv = cvRef.current
    const ctx = cv.getContext('2d')
    let W, H, stars = [], raf

    const resize = () => {
      W = cv.width = window.innerWidth
      H = cv.height = window.innerHeight
      stars = Array.from({ length: 320 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + 0.2,
        a: Math.random(), da: (Math.random() - 0.5) * 0.006,
        color: Math.random() > 0.9 ? '#a78bfa' : Math.random() > 0.8 ? '#93c5fd' : '#ffffff'
      }))
    }

    const nebulae = () => [
      { x: W * 0.15, y: H * 0.25, r: W * 0.38, h: 240 },
      { x: W * 0.85, y: H * 0.75, r: W * 0.32, h: 270 },
      { x: W * 0.5, y: H * 0.5, r: W * 0.22, h: 200 },
    ]

    let nb = []
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#00000f'; ctx.fillRect(0, 0, W, H)
      nb.forEach(n => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
        g.addColorStop(0, `hsla(${n.h},60%,16%,0.20)`); g.addColorStop(1, 'transparent')
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
      })
      stars.forEach(s => {
        s.a += s.da
        if (s.a < 0.05 || s.a > 1) s.da *= -1
        ctx.globalAlpha = Math.max(0.05, Math.min(1, s.a))
        ctx.fillStyle = s.color
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize(); nb = nebulae(); draw()
    window.addEventListener('resize', () => { resize(); nb = nebulae() })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={cvRef} className="fixed inset-0 z-0 pointer-events-none" />
}
