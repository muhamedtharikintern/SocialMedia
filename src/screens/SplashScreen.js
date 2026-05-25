import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    // ✅ define and call inside useEffect directly
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const user  = await AsyncStorage.getItem('user');

        if (token && user) {
          navigation.replace('BottomTabs');
        } else {
          navigation.replace('LoginScreen');
        }
      } catch (error) {
        navigation.replace('LoginScreen');
      }
    };

    checkAuth();
  }, [navigation]); // ✅ navigation in dependency array

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F3F4F6" barStyle="dark-content" />
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
});