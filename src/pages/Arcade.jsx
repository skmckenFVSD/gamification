// CopilotMan — placeholder canvas. Real maze + 4 process-ghosts comes next iteration.
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Arcade() {
  const canvasRef = useRef(null)
  const { currentPlayer, addArcadeScore } = useApp()
  const [score, setScore] = useState(0)
  const [showNudge, setShowNudge] = useState(false)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0
    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 4 + Math.random() * 4,
      dx: -1 - Math.random(),
    }))
    const player = { x: 60, y: canvas.height / 2 }
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      player.y = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', onMove)

    function loop() {
      t += 1
      ctx.fillStyle = '#0E1530'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#7B5BFF'
      ctx.beginPath()
      ctx.arc(player.x, player.y, 16, 0.3 * Math.PI, 1.7 * Math.PI)
      ctx.lineTo(player.x, player.y)
      ctx.fill()

      for (const d of dots) {
        d.x += d.dx
        if (d.x < -10) {
          d.x = canvas.width + 10
          d.y = Math.random() * canvas.height
        }
        const dx = d.x - player.x
        const dy = d.y - player.y
        if (dx * dx + dy * dy < (16 + d.r) ** 2) {
          d.x = canvas.width + 10
          setScore((s) => s + 100)
        }
        ctx.fillStyle = '#FFE3B0'
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (t < 60 * 30) {
        raf = requestAnimationFrame(loop)
      } else {
        setRunning(false)
      }
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', onMove)
    }
  }, [running])

  function start() {
    setScore(0)
    setRunning(true)
  }

  function end() {
    addArcadeScore(currentPlayer.id, score)
    setRunning(false)
    setShowNudge(true)
  }

  return (
    <div className="page arcade">
      <h1>CopilotMan Arcade</h1>
      <p className="muted">Eat the inefficiency dots. Stub gameplay — real maze + 4 process-ghosts (Reply-All, CC-Storm, Manual-Reconcile, Status-Meeting) coming next iteration.</p>

      <div className="hud">Score: <strong>{score.toLocaleString()}</strong></div>

      <canvas ref={canvasRef} width={720} height={360} className="arcade-canvas" />

      <div className="cta-row">
        {!running && <button className="btn primary" onClick={start}>Start round</button>}
        {running && <button className="btn" onClick={end}>End round (save score)</button>}
      </div>

      {showNudge && (
        <div className="nudge" onClick={() => setShowNudge(false)}>
          <div className="nudge-card" onClick={(e) => e.stopPropagation()}>
            <h3>Nice round! 🎯</h3>
            <p>Got a real Copilot win to log? The arcade is just for fun — the rink is where wins count.</p>
            <div className="cta-row">
              <Link to="/submit" className="btn primary">Log a win</Link>
              <button className="btn" onClick={() => setShowNudge(false)}>Later</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
