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

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.createButton}>
          <Text style={styles.createButtonText}>
            Create your first reel
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#FDBB67',
    justifyContent: 'center',
    alignItems: 'center',
  },

  createButtonText: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '700',
  },
});