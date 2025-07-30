export default function EnemySystem(entities) {
  const { player, onPlayerHit } = entities;
  Object.keys(entities).forEach((key) => {
    if (key.startsWith('enemy')) {
      const enemy = entities[key];
      enemy.position[0] += enemy.vx;
      if (enemy.position[0] < enemy.minX || enemy.position[0] > enemy.maxX) {
        enemy.vx *= -1;
      }
      if (player) {
        const px = player.position[0];
        const py = player.position[1];
        const pw = player.size[0];
        const ph = player.size[1];
        const ex = enemy.position[0];
        const ey = enemy.position[1];
        const ew = enemy.size[0];
        const eh = enemy.size[1];
        if (
          px < ex + ew &&
          px + pw > ex &&
          py < ey + eh &&
          py + ph > ey
        ) {
          if (typeof onPlayerHit === 'function') onPlayerHit();
        }
      }
    }
  });
  return entities;
}
