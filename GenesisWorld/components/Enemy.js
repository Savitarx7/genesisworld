import React from 'react';
import { View } from 'react-native';

export default function Enemy({ position, size, color = '#ff0000' }) {
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
        borderColor: '#ffaaaa',
        borderWidth: 1,
      }}
    />
  );
}
