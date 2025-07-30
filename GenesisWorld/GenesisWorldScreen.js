import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Player from './components/Player';
import Block from './components/Block';
import GenesisToken from './components/GenesisToken';
import Controls from './components/Controls';
import Enemy from './components/Enemy';
import WordBox from './components/WordBox';
import PhysicsSystem from './systems/physics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const LEVEL_WIDTH = SCREEN_WIDTH * 3;

export default function GenesisWorldScreen() {
  const engine = useRef(null);
  const [tokenDropped, setTokenDropped] = useState(false);
  const [message, setMessage] = useState('Welcome to GenesisWorld! Retrieve the Genesis Token.');

  const entities = {
    player: {
      position: [50, SCREEN_HEIGHT - 150],
      size: [40, 40],
      vx: 0,
      vy: 0,
      grounded: false,
      offsetX: 0,
      renderer: <Player />,
    },
    floor: {
      position: [0, SCREEN_HEIGHT - 100],
      size: [LEVEL_WIDTH, 100],
      offsetX: 0,
      renderer: <Block />,
    },
    obstacle1: {
      position: [300, SCREEN_HEIGHT - 140],
      size: [60, 40],
      offsetX: 0,
      renderer: <Block />,
    },
    obstacle2: {
      position: [800, SCREEN_HEIGHT - 140],
      size: [60, 40],
      offsetX: 0,
      renderer: <Block />,
    },
    enemy: {
      position: [600, SCREEN_HEIGHT - 140],
      size: [40, 40],
      vx: 2,
      offsetX: 0,
      renderer: <Enemy />,
    },
    token: {
      position: [LEVEL_WIDTH - 80, SCREEN_HEIGHT - 140],
      size: [60, 60],
      activated: tokenDropped,
      offsetX: 0,
      renderer: <GenesisToken />,
    },
    camera: { x: 0 },
  };

  const [gameEntities, setGameEntities] = useState(entities);

  const systems = [PhysicsSystem];

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
  };

  useEffect(() => {
    const x = gameEntities.player.position[0];
    if (x > 250 && message === 'Welcome to GenesisWorld! Retrieve the Genesis Token.') {
      setMessage('Beware the Red Guardian ahead!');
    }
    if (tokenDropped) {
      setMessage('You have placed the Token! GenesisWorld is saved.');
    }
  }, [gameEntities.player.position[0], tokenDropped]);

  return (
    <View style={styles.container}>
      <GameEngine
        ref={engine}
        style={styles.game}
        systems={systems}
        entities={gameEntities}
      />
      <Controls onLeft={handleLeft} onRight={handleRight} onJump={handleJump} />
      {Math.abs(gameEntities.player.position[0] - gameEntities.token.position[0]) < 50 && (
        <TouchableOpacity style={styles.dropButton} onPress={handleDropToken} disabled={tokenDropped}>
          <Text style={{ color: '#0f0' }}>{tokenDropped ? 'Token Placed' : 'Drop Token'}</Text>
        </TouchableOpacity>
      )}
      <WordBox message={message} />
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
