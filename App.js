import { registerRootComponent } from 'expo';
import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import GenesisWorldScreen from './GenesisWorld/GenesisWorldScreen';

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    FiraCode: require('./assets/fonts/FiraCode-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
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
