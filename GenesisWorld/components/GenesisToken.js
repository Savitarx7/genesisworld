import React from 'react';
import { View, Text } from 'react-native';

export default function GenesisToken({ position, size, activated }) {
  const width = size[0];
  const height = size[1];
  return (
    <View
      style={{
        position: 'absolute',
        left: position[0],
        top: position[1],
        width,
        height,
        backgroundColor: activated ? '#00ff00' : '#002200',
        borderColor: '#00ff00',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#0f0', fontSize: 12 }}>{activated ? 'Token Set' : 'Token Pillar'}</Text>
    </View>
  );
}
