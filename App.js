import { registerRootComponent } from 'expo';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import GenesisWorldScreen from './GenesisWorld/GenesisWorldScreen';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GenesisWorldScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

// 👇 Register the app with Expo
registerRootComponent(App);
