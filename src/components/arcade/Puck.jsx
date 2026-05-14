let puckId = 0;

export function createPuck({ x, y, aimX, aimY, power }) {
  const dx = aimX - x;
  const dy = Math.min(-120, aimY - y);
  const length = Math.max(1, Math.hypot(dx, dy));
  const nx = dx / length;
  const ny = dy / length;

  const speed = 740 + power * 660;
  const curve = ((aimX - x) / 460) * (0.35 + power * 0.65);

  return {
    id: ++puckId,
    x,
    y,
    radius: 11,
    vx: nx * speed,
    vy: ny * speed,
    curve,
    power,
    trail: [],
    active: true,
  };
}

export function updatePuck(puck, dt, rinkHeight) {
  puck.vx += puck.curve * (1 - puck.y / rinkHeight) * 420 * dt;
  puck.vy += 58 * dt;

  puck.x += puck.vx * dt;
  puck.y += puck.vy * dt;

  puck.trail.push({ x: puck.x, y: puck.y, a: 0.42 + puck.power * 0.4 });
  if (puck.trail.length > 9) {
    puck.trail.shift();
  }
}
