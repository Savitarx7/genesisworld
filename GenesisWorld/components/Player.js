import React from 'react';
import { Svg, Polygon } from 'react-native-svg';
import { View } from 'react-native';

export default function Player({ position, size, offsetX = 0, color = '#00ff00' }) {
  const width = size[0];
  const height = size[1];
  const points = `0,${height} ${width / 2},0 ${width},${height}`;

  return (
    <View style={{ position: 'absolute', left: position[0] - offsetX, top: position[1], width, height }}>
      <Svg width={width} height={height}>
        <Polygon points={points} fill={color} />
      </Svg>
    </View>
  );
}
