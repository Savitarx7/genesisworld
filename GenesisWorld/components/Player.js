import React from 'react';
import { Svg, Circle, Rect } from 'react-native-svg';
import { View } from 'react-native';

export default function Player({ position, size, color = '#00ff00', cameraX = 0 }) {
  const width = size[0];
  const height = size[1];
  const bodyHeight = height * 0.6;
  const headRadius = height * 0.2;
  return (
    <View style={{ position: 'absolute', left: position[0] - cameraX, top: position[1], width, height }}>
      <Svg width={width} height={height}>
        <Circle cx={width / 2} cy={headRadius} r={headRadius} fill={color} />
        <Rect x={width * 0.25} y={headRadius * 2} width={width * 0.5} height={bodyHeight} fill={color} />
      </Svg>
    </View>
  );
}
