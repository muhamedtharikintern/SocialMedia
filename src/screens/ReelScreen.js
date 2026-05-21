import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export default function ReelScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* EMPTY REEL SECTION */}
      <View style={styles.emptySection}>
        <Text style={styles.emptyTitle}>
          Share a moment with the world
        </Text>
        <LinearGradient
          colors={['#D783FF', '#C65BFF', '#A100C8']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.createButton}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.createButtonInner}>
            <Text style={styles.createButtonText}>
              Create your first reel
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptySection: {
    alignItems: 'center',
    marginTop: 44,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 28,
    color: '#111111',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 44,
  },
  createButton: {
    width: width * 0.72,
    height: 68,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '700',
  },
});