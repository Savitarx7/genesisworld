import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WordBox({ message }) {
  if (!message) return null;
  return (
    <View style={styles.box} pointerEvents="none">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: '#00ff00',
    borderWidth: 1,
    padding: 10,
  },
  text: {
    color: '#0f0',
    textAlign: 'center',
  },
});
