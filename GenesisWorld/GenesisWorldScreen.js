import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Player from './components/Player';
import Block from './components/Block';
import GenesisToken from './components/GenesisToken';
import Enemy from './components/Enemy';
import Bullet from './components/Bullet';
import TextBox from './components/TextBox';
import Controls from './components/Controls';
import PhysicsSystem from './systems/physics';
import EnemySystem from './systems/enemy';
import BulletSystem from './systems/bullet';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GenesisWorldScreen() {
  const engine = useRef(null);
  const [level, setLevel] = useState(0);

  const levels = [
    {
      text: 'Welcome hero! Recover the Genesis Token.',
      width: SCREEN_WIDTH * 3,
      tokenPos: [SCREEN_WIDTH * 3 - 80, SCREEN_HEIGHT - 140],
      enemies: [
        { minX: 300, maxX: SCREEN_WIDTH * 3 - 200, y: SCREEN_HEIGHT - 140 },
      ],
      platforms: [
        { x: 150, y: SCREEN_HEIGHT - 200, w: 120, h: 20 },
      ],
    },
    {
      text: 'Beware of the roaming foes.',
      width: SCREEN_WIDTH * 4,
      tokenPos: [SCREEN_WIDTH * 4 - 80, SCREEN_HEIGHT - 220],
      enemies: [
        { minX: 200, maxX: SCREEN_WIDTH * 2, y: SCREEN_HEIGHT - 140 },
        { minX: 600, maxX: SCREEN_WIDTH * 3, y: SCREEN_HEIGHT - 220 },
      ],
      platforms: [
        { x: 300, y: SCREEN_HEIGHT - 160, w: 120, h: 20 },
        { x: 700, y: SCREEN_HEIGHT - 240, w: 120, h: 20 },
      ],
    },
    {
      text: 'Final stretch, defeat all foes!',
      width: SCREEN_WIDTH * 5,
      tokenPos: [SCREEN_WIDTH * 5 - 80, SCREEN_HEIGHT - 300],
      enemies: [
        { minX: 400, maxX: SCREEN_WIDTH * 3, y: SCREEN_HEIGHT - 140 },
        { minX: 800, maxX: SCREEN_WIDTH * 4, y: SCREEN_HEIGHT - 220 },
        { minX: SCREEN_WIDTH * 3, maxX: SCREEN_WIDTH * 5 - 100, y: SCREEN_HEIGHT - 300 },
      ],
      platforms: [
        { x: 500, y: SCREEN_HEIGHT - 180, w: 120, h: 20 },
        { x: 1100, y: SCREEN_HEIGHT - 260, w: 120, h: 20 },
        { x: 1400, y: SCREEN_HEIGHT - 340, w: 120, h: 20 },
      ],
    },
  ];

  const [message, setMessage] = useState(levels[0].text);
  const [tokenDropped, setTokenDropped] = useState(false);
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const createEntities = (lvl) => {
    const config = levels[lvl];
    const base = {
      player: {
        position: [50, SCREEN_HEIGHT - 150],
        size: [40, 40],
        vx: 0,
        vy: 0,
        grounded: false,
        cameraX: 0,
        renderer: <Player />,
      },
      floor: {
        position: [0, SCREEN_HEIGHT - 100],
        size: [config.width, 100],
        cameraX: 0,
        renderer: <Block />,
      },
      token: {
        position: config.tokenPos,
        size: [60, 60],
        activated: false,
        cameraX: 0,
        renderer: <GenesisToken />,
      },
      levelWidth: config.width,
      camera: { offsetX: 0 },
    };

    config.enemies.forEach((e, i) => {
      base[`enemy${i}`] = {
        position: [e.minX, e.y],
        size: [40, 40],
        vx: 2,
        minX: e.minX,
        maxX: e.maxX,
        cameraX: 0,
        renderer: <Enemy />,
      };
    });

    if (config.platforms) {
      config.platforms.forEach((p, i) => {
        base[`platform${i}`] = {
          position: [p.x, p.y],
          size: [p.w, p.h],
          cameraX: 0,
          renderer: <Block />,
        };
      });
    }

    base.onPlayerHit = () => {};
    return base;
  };

  const [gameEntities, setGameEntities] = useState(() => {
    const ents = createEntities(0);
    ents.showMessage = showMessage;
    return ents;
  });
  const bulletRef = useRef(0);

  const handlePlayerHit = () => {
    showMessage('You were hit! Try again.');
    setTokenDropped(false);
    const newEntities = createEntities(level);
    newEntities.onPlayerHit = handlePlayerHit;
    newEntities.showMessage = showMessage;
    setGameEntities(newEntities);
  };

  useEffect(() => {
    setGameEntities((ents) => ({ ...ents, onPlayerHit: handlePlayerHit, showMessage }));
    showMessage(levels[0].text);
  }, []);

  useEffect(() => {
    showMessage(levels[level].text);
  }, [level]);

  const systems = [PhysicsSystem, EnemySystem, BulletSystem];

  const handleLeft = () => {
    setGameEntities((ents) => {
      ents.player.vx = -3;
      return { ...ents };
    });
  };

  const handleLeftRelease = () => {
    setGameEntities((ents) => {
      ents.player.vx = 0;
      return { ...ents };
    });
  };

  const handleRight = () => {
    setGameEntities((ents) => {
      ents.player.vx = 3;
      return { ...ents };
    });
  };

  const handleRightRelease = () => {
    setGameEntities((ents) => {
      ents.player.vx = 0;
      return { ...ents };
    });
  };

  const handleJump = () => {
    setGameEntities((ents) => {
      if (ents.player.grounded) {
        ents.player.vy = -12;
      }
      return { ...ents };
    });
  };

  const handleShoot = () => {
    setGameEntities((ents) => {
      bulletRef.current += 1;
      const key = `bullet${bulletRef.current}`;
      ents[key] = {
        position: [ents.player.position[0] + ents.player.size[0], ents.player.position[1] + ents.player.size[1] / 2],
        size: [10, 4],
        vx: 6,
        cameraX: 0,
        renderer: <Bullet />,
      };
      return { ...ents };
    });
  };

  const handleDropToken = () => {
    setTokenDropped(true);
    setGameEntities((ents) => {
      ents.token.activated = true;
      return { ...ents };
    });
    showMessage('Great! Token secured.');
    setTimeout(() => {
      if (level < levels.length - 1) {
        const next = level + 1;
        setLevel(next);
        showMessage(levels[next].text);
        setTokenDropped(false);
        const nextEntities = createEntities(next);
        nextEntities.onPlayerHit = handlePlayerHit;
        nextEntities.showMessage = showMessage;
        setGameEntities(nextEntities);
      } else {
        showMessage('You recovered all tokens! The realm is saved.');
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={engine}
        style={styles.game}
        systems={systems}
        entities={gameEntities}
      />
      <Controls
        onLeft={handleLeft}
        onLeftRelease={handleLeftRelease}
        onRight={handleRight}
        onRightRelease={handleRightRelease}
        onJump={handleJump}
        onShoot={handleShoot}
      />
      <TextBox text={message} />
      {Math.abs(gameEntities.player.position[0] - gameEntities.token.position[0]) < 50 && (
        <TouchableOpacity style={styles.dropButton} onPress={handleDropToken} disabled={tokenDropped}>
          <Text style={{ color: '#0f0' }}>{tokenDropped ? 'Token Placed' : 'Drop Token'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  game: {
    flex: 1,
    backgroundColor: '#000',
  },
  dropButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#003300',
    padding: 10,
    borderColor: '#00ff00',
    borderWidth: 1,
  },
});
