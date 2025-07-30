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
  }

  // Platform collisions
  Object.keys(entities).forEach((key) => {
    if (key.startsWith('platform')) {
      const platform = entities[key];
      if (
        player.vy >= 0 &&
        player.position[1] + player.size[1] >= platform.position[1] &&
        player.position[1] + player.size[1] - player.vy <= platform.position[1] &&
        player.position[0] + player.size[0] > platform.position[0] &&
        player.position[0] < platform.position[0] + platform.size[0]
      ) {
        player.position[1] = platform.position[1] - player.size[1];
        player.vy = 0;
        player.grounded = true;
      }
    }
  });

  // Boundaries left/right within level width
  if (player.position[0] < 0) player.position[0] = 0;
  const levelWidth = entities.levelWidth || SCREEN_WIDTH;
  if (player.position[0] + player.size[0] > levelWidth) {
    player.position[0] = levelWidth - player.size[0];
  }

  // Update camera offset
  if (entities.camera) {
    entities.camera.offsetX = Math.min(
      Math.max(0, player.position[0] - SCREEN_WIDTH / 2),
      levelWidth - SCREEN_WIDTH
    );
    Object.keys(entities).forEach((key) => {
      if (entities[key] && entities[key].position) {
        entities[key].cameraX = entities.camera.offsetX;
      }
    });
  }

  return entities;
}
