import React from 'react';
import { View } from 'react-native';

export default function Bullet({ position, size, cameraX = 0 }) {
  const width = size[0];
  const height = size[1];
  return (
    <View
      style={{
        position: 'absolute',
        left: position[0] - cameraX,
        top: position[1],
        width,
        height,
        backgroundColor: '#ffff00',
      }}
    />
  );
}
