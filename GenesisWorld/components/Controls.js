import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Controls({ onLeft, onRight, onJump }) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity style={styles.button} onPressIn={onLeft}>
        <Text style={styles.text}>Left</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPressIn={onRight}>
        <Text style={styles.text}>Right</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPressIn={onJump}>
        <Text style={styles.text}>Jump</Text>
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
