export const PLAYER_Y_OFFSET = 94;

export function createPlayer(width, height) {
  return {
    x: width * 0.5,
    y: height - PLAYER_Y_OFFSET,
    radius: 34,
    speed: 560,
  };
}

export function updatePlayer(player, input, dt, width) {
  let axis = 0;
  if (input.left) axis -= 1;
  if (input.right) axis += 1;

  player.x += axis * player.speed * dt;

  const minX = 88;
  const maxX = width - 88;
  if (player.x < minX) player.x = minX;
  if (player.x > maxX) player.x = maxX;
}
