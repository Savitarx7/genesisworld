import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Player from './components/Player';
import Block from './components/Block';
import GenesisToken from './components/GenesisToken';
import Enemy from './components/Enemy';
import TextBox from './components/TextBox';
import Controls from './components/Controls';
import PhysicsSystem from './systems/physics';
import EnemySystem from './systems/enemy';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GenesisWorldScreen() {
  const engine = useRef(null);
  const [level, setLevel] = useState(0);

  const levels = [
    {
      text: 'Welcome hero! Recover the Genesis Token.',
      tokenPos: [SCREEN_WIDTH - 80, SCREEN_HEIGHT - 140],
      enemies: [
        { minX: 100, maxX: SCREEN_WIDTH - 100, y: SCREEN_HEIGHT - 140 },
      ],
    },
    {
      text: 'Beware of the roaming foes.',
      tokenPos: [SCREEN_WIDTH - 80, SCREEN_HEIGHT - 220],
      enemies: [
        { minX: 50, maxX: SCREEN_WIDTH - 200, y: SCREEN_HEIGHT - 140 },
        { minX: 150, maxX: SCREEN_WIDTH - 100, y: SCREEN_HEIGHT - 220 },
      ],
    },
  ];

  const [story, setStory] = useState(levels[0].text);
  const [tokenDropped, setTokenDropped] = useState(false);

  const createEntities = (lvl) => {
    const config = levels[lvl];
    const base = {
      player: {
        position: [50, SCREEN_HEIGHT - 150],
        size: [40, 40],
        vx: 0,
        vy: 0,
        grounded: false,
        renderer: <Player />,
      },
      floor: {
        position: [0, SCREEN_HEIGHT - 100],
        size: [SCREEN_WIDTH, 100],
        renderer: <Block />,
      },
      token: {
        position: config.tokenPos,
        size: [60, 60],
        activated: false,
        renderer: <GenesisToken />,
      },
    };

    config.enemies.forEach((e, i) => {
      base[`enemy${i}`] = {
        position: [e.minX, e.y],
        size: [40, 40],
        vx: 2,
        minX: e.minX,
        maxX: e.maxX,
        renderer: <Enemy />,
      };
    });

    base.onPlayerHit = () => {};
    return base;
  };

  const [gameEntities, setGameEntities] = useState(createEntities(0));

  const handlePlayerHit = () => {
    setStory('You were hit! Try again.');
    setTokenDropped(false);
    const newEntities = createEntities(level);
    newEntities.onPlayerHit = handlePlayerHit;
    setGameEntities(newEntities);
  };

  useEffect(() => {
    setGameEntities((ents) => ({ ...ents, onPlayerHit: handlePlayerHit }));
  }, []);

  const systems = [PhysicsSystem, EnemySystem];

  const handleLeft = () => {
    setGameEntities((ents) => {
      ents.player.vx = -3;
      return { ...ents };
    });
  };

  const handleRight = () => {
    setGameEntities((ents) => {
      ents.player.vx = 3;
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

  const handleDropToken = () => {
    setTokenDropped(true);
    setGameEntities((ents) => {
      ents.token.activated = true;
      return { ...ents };
    });
    setStory('Great! Token secured.');
    setTimeout(() => {
      if (level < levels.length - 1) {
        const next = level + 1;
        setLevel(next);
        setStory(levels[next].text);
        setTokenDropped(false);
        const nextEntities = createEntities(next);
        nextEntities.onPlayerHit = handlePlayerHit;
        setGameEntities(nextEntities);
      } else {
        setStory('You recovered all tokens! The realm is saved.');
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
      <Controls onLeft={handleLeft} onRight={handleRight} onJump={handleJump} />
      <TextBox text={story} />
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
