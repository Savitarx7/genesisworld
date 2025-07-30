import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LEVEL_WIDTH = SCREEN_WIDTH * 3;

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

  // Boundaries left/right for level size
  if (player.position[0] < 0) player.position[0] = 0;
  if (player.position[0] + player.size[0] > LEVEL_WIDTH) {
    player.position[0] = LEVEL_WIDTH - player.size[0];
  }

  // Obstacle collisions
  Object.keys(entities).forEach((key) => {
    if (key.startsWith('obstacle')) {
      const o = entities[key];
      if (
        player.position[0] < o.position[0] + o.size[0] &&
        player.position[0] + player.size[0] > o.position[0] &&
        player.position[1] + player.size[1] > o.position[1] &&
        player.position[1] < o.position[1] + o.size[1]
      ) {
        // simple from top collision handling
        if (player.vy > 0 && player.position[1] + player.size[1] - player.vy <= o.position[1]) {
          player.position[1] = o.position[1] - player.size[1];
          player.vy = 0;
          player.grounded = true;
        } else if (player.position[0] < o.position[0]) {
          player.position[0] = o.position[0] - player.size[0];
        } else {
          player.position[0] = o.position[0] + o.size[0];
        }
      }
    }
  });

  // Enemy movement and collision with level bounds
  const enemy = entities.enemy;
  if (enemy) {
    enemy.position[0] += enemy.vx;
    if (enemy.position[0] < 200 || enemy.position[0] + enemy.size[0] > LEVEL_WIDTH - 200) {
      enemy.vx *= -1;
    }

    // player collision with enemy
    if (
      player.position[0] < enemy.position[0] + enemy.size[0] &&
      player.position[0] + player.size[0] > enemy.position[0] &&
      player.position[1] + player.size[1] > enemy.position[1] &&
      player.position[1] < enemy.position[1] + enemy.size[1]
    ) {
      // simple knock back
      player.position[0] -= player.vx * 5;
    }
  }

  // Update camera offset
  if (entities.camera) {
    entities.camera.x = Math.min(
      Math.max(player.position[0] - SCREEN_WIDTH / 2, 0),
      LEVEL_WIDTH - SCREEN_WIDTH,
    );
  }

  // propagate offset to renderers
  Object.keys(entities).forEach((key) => {
    if (entities[key].offsetX !== undefined) {
      entities[key].offsetX = entities.camera.x;
    }
  });

  return entities;
}
