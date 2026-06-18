import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

import backIcon from '../assets/back.png';
import verifiedIcon from '../assets/verified.png';

import micIcon from '../assets/mic.png';
import videoOffIcon from '../assets/videooff.png';
import muteIcon from '../assets/mute.png';
import endCallIcon from '../assets/endcall.png';

export default function VoiceCallScreen({navigation}) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const [connectingText, setConnectingText] =
    useState('Connecting...');

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      {/* TOP HEADER */}
      <View style={styles.topContainer}>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>

          <Image
            source={backIcon}
            style={styles.backIcon}
          />

        </TouchableOpacity>

      </View>

      {/* CENTER PROFILE */}
      <View style={styles.centerContainer}>

        <Animated.View
          style={[
            styles.profileOuterCircle,
            {
              transform: [{scale: pulseAnim}],
            },
          ]}>

          <Image
            source={require('../assets/story2.png')}
            style={styles.profileImage}
          />

        </Animated.View>

        <View style={styles.nameRow}>

          <Text style={styles.username}>
            actorvijay
          </Text>

          <Image
            source={verifiedIcon}
            style={styles.verifiedIcon}
          />

        </View>

        <Text style={styles.connectingText}>
          {connectingText}
        </Text>

      </View>

      {/* BOTTOM CONTROLS */}
      <View style={styles.bottomSection}>

        <View style={styles.controlsWrapper}>

          {/* VIDEO OFF */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.controlButton}>

            <Image
              source={videoOffIcon}
              style={styles.controlIcon}
            />

          </TouchableOpacity>

          {/* MIC */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.controlButton}>

            <Image
              source={micIcon}
              style={styles.controlIcon}
            />

          </TouchableOpacity>

          {/* MUTE */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.controlButton}>

            <Image
              source={muteIcon}
              style={styles.controlIcon}
            />

          </TouchableOpacity>

          {/* END CALL */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.endCallButton}
            onPress={() => navigation.goBack()}>

            <Image
              source={endCallIcon}
              style={styles.endCallIcon}
            />

          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',

    paddingTop:
      Platform.OS === 'android'
        ? 18
        : 8,
  },

  topContainer: {
    width: '100%',

    paddingHorizontal: 20,
    paddingTop: 16,
  },

  backButton: {
    width: 72,
    height: 72,
    borderRadius: 36,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  backIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },

  centerContainer: {
    flex: 1,

    alignItems: 'center',

    paddingTop: 40,
  },

  profileOuterCircle: {
    width: 154,
    height: 154,
    borderRadius: 77,

    borderWidth: 4,
    borderColor: '#FDBB67',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FDBB67',
  },

  profileImage: {
    width: 138,
    height: 138,
    borderRadius: 69,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 28,
  },

  username: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111111',
  },

  verifiedIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',

    marginLeft: 10,
  },

  connectingText: {
    marginTop: 18,

    fontSize: 24,
    fontWeight: '500',

    color: '#808080',
  },

  bottomSection: {
    width: '100%',

    paddingHorizontal: 20,

    paddingBottom:
      Platform.OS === 'ios'
        ? 34
        : 24,
  },

  controlsWrapper: {
    width: '100%',
    minHeight: 110,

    borderRadius: 999,

    backgroundColor: '#FDBB67',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    paddingHorizontal: 20,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  controlButton: {
    width: 78,
    height: 78,
    borderRadius: 39,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  controlIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },

  endCallButton: {
    width: 78,
    height: 78,
    borderRadius: 39,

    backgroundColor: '#FF2D55',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#FF2D55',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  endCallIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});