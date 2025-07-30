import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Controls({
  onLeft,
  onLeftRelease,
  onRight,
  onRightRelease,
  onJump,
  onShoot,
}) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.button}
        onPressIn={onLeft}
        onPressOut={onLeftRelease}
      >
        <Text style={styles.text}>Left</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPressIn={onRight}
        onPressOut={onRightRelease}
      >
        <Text style={styles.text}>Right</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPressIn={onJump}>
        <Text style={styles.text}>Jump</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPressIn={onShoot}>
        <Text style={styles.text}>Shoot</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#003300',
    padding: 10,
    borderColor: '#00ff00',
    borderWidth: 1,
  },
  text: {
    color: '#0f0',
  },
});
