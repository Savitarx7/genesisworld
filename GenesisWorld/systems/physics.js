import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PhysicsSystem(entities) {
  const player = entities.player;
  const gravity = 0.6;

  if (!player) return entities;

  player.vy += gravity;
  player.position[1] += player.vy;
  player.position[0] += player.vx;

  // Floor collision
  const floorY = entities.floor.position[1];
  if (player.position[1] + player.size[1] > floorY) {
    player.position[1] = floorY - player.size[1];
    player.vy = 0;
    player.grounded = true;
  } else {
    player.grounded = false;
  }

  // Boundaries left/right
  if (player.position[0] < 0) player.position[0] = 0;
  if (player.position[0] + player.size[0] > SCREEN_WIDTH) {
    player.position[0] = SCREEN_WIDTH - player.size[0];
  }

  return entities;
}
