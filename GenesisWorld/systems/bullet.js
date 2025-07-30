export default function BulletSystem(entities) {
  const showMessage = entities.showMessage;
  Object.keys(entities).forEach((key) => {
    if (key.startsWith('bullet')) {
      const bullet = entities[key];
      bullet.position[0] += bullet.vx;
      if (bullet.position[0] > entities.levelWidth) {
        delete entities[key];
      } else {
        Object.keys(entities).forEach((eKey) => {
          if (eKey.startsWith('enemy')) {
            const enemy = entities[eKey];
            const bx = bullet.position[0];
            const by = bullet.position[1];
            const bw = bullet.size[0];
            const bh = bullet.size[1];
            const ex = enemy.position[0];
            const ey = enemy.position[1];
            const ew = enemy.size[0];
            const eh = enemy.size[1];
            if (bx < ex + ew && bx + bw > ex && by < ey + eh && by + bh > ey) {
              delete entities[eKey];
              delete entities[key];
              if (typeof showMessage === 'function') showMessage('Enemy defeated!');
            }
          }
        });
      }
    }
  });
  return entities;
}
