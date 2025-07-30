import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TextBox({ text }) {
  if (!text) return null;
  return (
    <View style={styles.container} pointerEvents="none">
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: '#00ff00',
    borderWidth: 1,
    padding: 10,
  },
  text: {
    color: '#0f0',
    textAlign: 'center',
  },
});
