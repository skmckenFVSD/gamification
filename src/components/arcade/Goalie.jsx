export function createGoalie(width, netY) {
  return {
    x: width * 0.5,
    y: netY + 26,
    width: 132,
    height: 32,
    targetX: width * 0.5,
  };
}

export function updateGoalie(goalie, pucks, dt, width, difficulty, time) {
  const threatening = pucks.find((puck) => puck.active && puck.y < 360 && puck.vy < -30);

  if (threatening) {
    goalie.targetX = threatening.x;
  } else {
    goalie.targetX = width * 0.5 + Math.sin(time * 1.35) * (170 + difficulty * 32);
  }

  const maxReach = width * 0.5 - 210;
  const minX = width * 0.5 - maxReach;
  const maxX = width * 0.5 + maxReach;

  goalie.targetX = Math.max(minX, Math.min(maxX, goalie.targetX));

  const response = 4 + difficulty * 3.2;
  goalie.x += (goalie.targetX - goalie.x) * Math.min(1, dt * response);
}
