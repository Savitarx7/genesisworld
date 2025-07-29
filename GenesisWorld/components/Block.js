import React from 'react';
import { View } from 'react-native';

export default function Block({ position, size, color = '#003300' }) {
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
        backgroundColor: color,
        borderColor: '#00ff00',
        borderWidth: 1,
      }}
    />
  );
}
