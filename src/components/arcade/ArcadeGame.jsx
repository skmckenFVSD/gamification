import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSeason } from "../../context/SeasonContext.jsx";
import ArcadeRink from "./ArcadeRink.jsx";
import ArcadeHUD from "./ArcadeHUD.jsx";
import ComboTracker from "./ComboTracker.jsx";
import { createPlayer, updatePlayer } from "./PlayerController.jsx";
import { createPuck, updatePuck } from "./Puck.jsx";
import { createGoalie, updateGoalie } from "./Goalie.jsx";

const RINK_W = 1280;
const RINK_H = 720;
const GAME_SECONDS = 75;
const STARTING_SHOTS = 24;
const NET = {
  x: RINK_W * 0.5 - 180,
  y: 84,
  width: 360,
  height: 74,
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function aimDescriptor(deltaX) {
  if (deltaX < -130) return "Far Left";
  if (deltaX < -45) return "Left Lane";
  if (deltaX > 130) return "Far Right";
  if (deltaX > 45) return "Right Lane";
  return "Center Net";
}

export default function ArcadeGame() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const stateRef = useRef(null);
  const inputRef = useRef({ left: false, right: false, charging: false });

  const [hud, setHud] = useState({
    score: 0,
    shotsRemaining: STARTING_SHOTS,
    combo: 1,
    charge: 0,
    timeRemaining: GAME_SECONDS,
    aimLabel: "Center Net",
    accuracy: 0,
  });
  const [callouts, setCallouts] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const { theme } = useSeason();

  const palette = useMemo(
    () => ({
      rinkTop: "rgba(226, 242, 255, 0.9)",
      rinkBottom: "rgba(148, 187, 220, 0.22)",
      line: "rgba(170, 228, 255, 0.36)",
      net: "rgba(255,255,255,0.84)",
      crease: "rgba(100, 207, 255, 0.16)",
      goalie: theme.colors.primary,
      player: theme.colors.secondary,
      glow: theme.colors.glow,
      glowSoft: theme.colors.glowSoft,
      text: theme.colors.text,
      puckTrail: theme.colors.primary,
    }),
    [theme]
  );

  useEffect(() => {
    const player = createPlayer(RINK_W, RINK_H);
    const goalie = createGoalie(RINK_W, NET.y);

    stateRef.current = {
      player,
      goalie,
      pucks: [],
      score: 0,
      shotsRemaining: STARTING_SHOTS,
      combo: 1,
      streak: 0,
      goals: 0,
      saves: 0,
      shotsTaken: 0,
      timeRemaining: GAME_SECONDS,
      elapsed: 0,
      aimX: player.x,
      aimY: 180,
      charge: 0,
      chargeDirection: 1,
      gameOver: false,
    };

    const handleKeyDown = (event) => {
      if (event.repeat) return;
      if (event.code === "ArrowLeft" || event.code === "KeyA") inputRef.current.left = true;
      if (event.code === "ArrowRight" || event.code === "KeyD") inputRef.current.right = true;
      if (event.code === "Space") {
        event.preventDefault();
        if (!stateRef.current.gameOver) inputRef.current.charging = true;
      }
      if (event.code === "KeyR" && stateRef.current.gameOver) {
        resetGame();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "ArrowLeft" || event.code === "KeyA") inputRef.current.left = false;
      if (event.code === "ArrowRight" || event.code === "KeyD") inputRef.current.right = false;
      if (event.code === "Space") {
        event.preventDefault();
        if (inputRef.current.charging) {
          releaseShot();
        }
        inputRef.current.charging = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let last = performance.now();

    const loop = (now) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;

      update(dt);
      draw();

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [palette]);

  function resetGame() {
    const player = createPlayer(RINK_W, RINK_H);
    const goalie = createGoalie(RINK_W, NET.y);

    stateRef.current = {
      player,
      goalie,
      pucks: [],
      score: 0,
      shotsRemaining: STARTING_SHOTS,
      combo: 1,
      streak: 0,
      goals: 0,
      saves: 0,
      shotsTaken: 0,
      timeRemaining: GAME_SECONDS,
      elapsed: 0,
      aimX: player.x,
      aimY: 180,
      charge: 0,
      chargeDirection: 1,
      gameOver: false,
    };

    setCallouts([]);
    setIsGameOver(false);
  }

  function pushCallout(text, type = "info") {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setCallouts((current) => [...current, { id, text, type }]);
    window.setTimeout(() => {
      setCallouts((current) => current.filter((item) => item.id !== id));
    }, 1700);
  }

  function releaseShot() {
    const state = stateRef.current;
    if (!state || state.gameOver) return;
    if (state.shotsRemaining <= 0) return;

    const puck = createPuck({
      x: state.player.x,
      y: state.player.y - 14,
      aimX: state.aimX,
      aimY: state.aimY,
      power: state.charge,
    });

    state.pucks.push(puck);
    state.shotsRemaining -= 1;
    state.shotsTaken += 1;
    state.charge = 0;
    state.chargeDirection = 1;
  }

  function update(dt) {
    const state = stateRef.current;
    if (!state) return;

    if (!state.gameOver) {
      state.elapsed += dt;
      state.timeRemaining = Math.max(0, state.timeRemaining - dt);

      updatePlayer(state.player, inputRef.current, dt, RINK_W);

      const aimDx = state.aimX - state.player.x;
      state.aimLabel = aimDescriptor(aimDx);

      if (inputRef.current.charging) {
        state.charge += state.chargeDirection * dt * 1.8;
        if (state.charge >= 1) {
          state.charge = 1;
          state.chargeDirection = -1;
        } else if (state.charge <= 0.1) {
          state.charge = 0.1;
          state.chargeDirection = 1;
        }
      } else {
        state.charge = Math.max(0, state.charge - dt * 2.2);
      }

      const difficulty = clamp(state.elapsed / GAME_SECONDS, 0, 1.15);
      updateGoalie(state.goalie, state.pucks, dt, RINK_W, difficulty, state.elapsed);

      for (const puck of state.pucks) {
        if (!puck.active) continue;
        updatePuck(puck, dt, RINK_H);

        const saveBand = Math.abs(puck.y - state.goalie.y) <= state.goalie.height * 0.7;
        const horizontalGap = Math.abs(puck.x - state.goalie.x);
        if (saveBand && horizontalGap <= state.goalie.width * 0.58 + puck.radius) {
          puck.active = false;
          state.saves += 1;
          state.streak = 0;
          state.combo = 1;
          pushCallout("Saved by goalie", "miss");
          continue;
        }

        const insideGoal =
          puck.y <= NET.y + NET.height &&
          puck.x >= NET.x &&
          puck.x <= NET.x + NET.width;

        if (insideGoal) {
          puck.active = false;
          state.goals += 1;
          state.streak += 1;
          state.combo = clamp(1 + Math.floor(state.streak / 2), 1, 8);

          const accuracyGap = Math.abs(puck.x - state.goalie.x);
          const accuracyBonus = clamp(Math.round((accuracyGap / 220) * 60), 0, 60);
          const powerBonus = Math.round(puck.power * 40);
          const points = Math.round((100 + accuracyBonus + powerBonus) * state.combo);

          state.score += points;

          if (state.combo >= 3) {
            pushCallout(`Copilot assist streak x${state.combo}`, "combo");
          } else {
            pushCallout(`Goal +${points}`, "goal");
          }
          continue;
        }

        if (puck.y < -20 || puck.x < -40 || puck.x > RINK_W + 40) {
          puck.active = false;
          state.streak = 0;
          state.combo = 1;
          pushCallout("Shot missed", "miss");
        }
      }

      state.pucks = state.pucks.filter((puck) => puck.active);

      if (state.timeRemaining <= 0 || (state.shotsRemaining <= 0 && state.pucks.length === 0)) {
        state.gameOver = true;
        setIsGameOver(true);
      }
    }

    const accuracy = state.shotsTaken
      ? Math.round((state.goals / state.shotsTaken) * 100)
      : 0;

    setHud({
      score: state.score,
      shotsRemaining: state.shotsRemaining,
      combo: state.combo,
      charge: state.charge,
      timeRemaining: state.timeRemaining,
      aimLabel: state.aimLabel || "Center Net",
      accuracy,
    });
  }

  function draw() {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, RINK_W, RINK_H);

    const iceGradient = ctx.createLinearGradient(0, 0, 0, RINK_H);
    iceGradient.addColorStop(0, "rgb(224, 242, 255)");
    iceGradient.addColorStop(0.42, "rgb(184, 217, 240)");
    iceGradient.addColorStop(1, "rgb(126, 165, 197)");
    ctx.fillStyle = iceGradient;
    ctx.fillRect(0, 0, RINK_W, RINK_H);

    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(0, 0, RINK_W, 18);

    ctx.strokeStyle = "rgba(92, 176, 224, 0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, RINK_H * 0.55);
    ctx.lineTo(RINK_W, RINK_H * 0.55);
    ctx.stroke();

    ctx.fillStyle = "rgba(95, 183, 228, 0.24)";
    ctx.fillRect(NET.x - 34, NET.y - 16, NET.width + 68, NET.height + 28);

    ctx.strokeStyle = "rgba(255,255,255,0.66)";
    ctx.lineWidth = 4;
    ctx.strokeRect(NET.x, NET.y, NET.width, NET.height);

    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath();
    ctx.ellipse(RINK_W * 0.5, NET.y + NET.height + 28, 220, 48, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.34)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(RINK_W * 0.5, RINK_H * 0.58, 86, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.shadowColor = palette.goalie;
    ctx.shadowBlur = 28;
    ctx.fillStyle = "rgba(4, 18, 38, 0.82)";
    roundRect(ctx, state.goalie.x - state.goalie.width * 0.5, state.goalie.y - 18, state.goalie.width, 36, 14);
    ctx.fill();
    ctx.fillStyle = palette.goalie;
    roundRect(ctx, state.goalie.x - state.goalie.width * 0.42, state.goalie.y - 10, state.goalie.width * 0.84, 20, 10);
    ctx.fill();
    ctx.restore();

    const aimDx = clamp(state.aimX - state.player.x, -220, 220);
    const aimEndX = state.player.x + aimDx;
    const aimEndY = clamp(state.aimY, 120, state.player.y - 40);

    ctx.strokeStyle = "rgba(255,255,255,0.32)";
    ctx.setLineDash([9, 7]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(state.player.x, state.player.y - 10);
    ctx.lineTo(aimEndX, aimEndY);
    ctx.stroke();
    ctx.setLineDash([]);

    drawPlayer(ctx, state.player, palette, aimEndX, aimEndY);

    for (const puck of state.pucks) {
      drawPuck(ctx, puck, palette);
    }

    if (state.gameOver) {
      ctx.fillStyle = "rgba(2, 8, 18, 0.58)";
      ctx.fillRect(0, 0, RINK_W, RINK_H);
      ctx.fillStyle = palette.text;
      ctx.textAlign = "center";
      ctx.font = "900 56px Inter, sans-serif";
      ctx.fillText("Round Complete", RINK_W * 0.5, RINK_H * 0.45);
      ctx.font = "700 26px Inter, sans-serif";
      ctx.fillText(`Final Score: ${state.score.toLocaleString()}`, RINK_W * 0.5, RINK_H * 0.52);
      ctx.font = "600 20px Inter, sans-serif";
      ctx.fillText("Press R to run it back", RINK_W * 0.5, RINK_H * 0.59);
    }
  }

  function handlePointerMove(event) {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * RINK_W;
    const y = ((event.clientY - rect.top) / rect.height) * RINK_H;

    state.aimX = clamp(x, 80, RINK_W - 80);
    state.aimY = clamp(y, 92, state.player.y - 32);
  }

  function handlePointerDown() {
    const state = stateRef.current;
    if (!state || state.gameOver) return;
    inputRef.current.charging = true;
  }

  function handlePointerUp() {
    if (inputRef.current.charging) {
      releaseShot();
    }
    inputRef.current.charging = false;
  }

  return (
    <section className="arcade-mode">
      <ArcadeRink
        canvasRef={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
      <ArcadeHUD hud={hud} />
      <ComboTracker callouts={callouts} />

      <div className="arcade-mode__legend" aria-label="Arcade controls">
        <span>A/D or arrows to move</span>
        <span>Hold and release Space to shoot</span>
        <span>Mouse or touch to aim lane</span>
      </div>

      {isGameOver ? (
        <button type="button" className="arcade-mode__restart faceoff-button-primary" onClick={resetGame}>
          Restart Round
        </button>
      ) : null}
    </section>
  );
}

function drawPlayer(ctx, player, palette, aimX, aimY) {
  const stickAngle = Math.atan2(aimY - (player.y - 20), aimX - player.x);

  ctx.save();
  ctx.translate(player.x, player.y);

  ctx.shadowColor = palette.glow;
  ctx.shadowBlur = 22;

  ctx.fillStyle = "rgba(5, 20, 38, 0.8)";
  roundRect(ctx, -28, -54, 56, 72, 18);
  ctx.fill();

  ctx.fillStyle = palette.player;
  roundRect(ctx, -20, -46, 40, 40, 12);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  ctx.arc(0, -60, 13, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(stickAngle + 0.2);
  ctx.fillStyle = "rgba(196, 228, 255, 0.88)";
  roundRect(ctx, 4, -3, 62, 6, 3);
  ctx.fill();
  roundRect(ctx, 57, -3, 10, 18, 3);
  ctx.fill();

  ctx.restore();
}

function drawPuck(ctx, puck, palette) {
  for (let i = 0; i < puck.trail.length; i += 1) {
    const t = puck.trail[i];
    const alpha = (i + 1) / puck.trail.length;
    ctx.fillStyle = `rgba(35, 213, 255, ${Math.min(0.38, alpha * 0.28 * t.a)})`;
    ctx.beginPath();
    ctx.arc(t.x, t.y, 3 + alpha * 5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.shadowColor = palette.puckTrail;
  ctx.shadowBlur = 15;
  ctx.fillStyle = "rgba(240, 250, 255, 0.92)";
  ctx.beginPath();
  ctx.arc(puck.x, puck.y, puck.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(8, 26, 48, 0.86)";
  ctx.beginPath();
  ctx.arc(puck.x, puck.y, puck.radius * 0.56, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w * 0.5, h * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
