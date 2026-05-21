import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

/* =========================
   PNG ASSETS
========================= */

import backIcon from '../assets/back.png';

import profileImage from '../assets/profile.png';
import verifiedIcon from '../assets/verified.png';

import videoIcon from '../assets/video.png';
import micIcon from '../assets/mic.png';
import switchIcon from '../assets/switch.png';
import endCallIcon from '../assets/endcall.png';

const VidcallScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        backgroundColor="#F5F5F5"
        barStyle="dark-content"
      />

      <View style={styles.container}>

        {/* =========================
            TOP HEADER
        ========================= */}

        <View style={styles.header}>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.backButton}
            onPress={() => navigation.goBack()}>

            <Image
              source={backIcon}
              style={styles.backIcon}
            />

          </TouchableOpacity>

        </View>

        {/* =========================
            CENTER PROFILE
        ========================= */}

        <View style={styles.centerSection}>

          <View style={styles.storyRing}>

            <Image
              source={profileImage}
              style={styles.profileImage}
            />

          </View>

          <View style={styles.nameRow}>

            <Text style={styles.userName}>
              actorvijay
            </Text>

            <Image
              source={verifiedIcon}
              style={styles.verifiedIcon}
            />

          </View>

          <Text style={styles.connectingText}>
            Connecting...
          </Text>

        </View>

        {/* =========================
            CALL CONTROLS
        ========================= */}

        <View style={styles.bottomControlWrapper}>

          <View style={styles.controlContainer}>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.controlButton}>

              <Image
                source={videoIcon}
                style={styles.controlIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.controlButton}>

              <Image
                source={micIcon}
                style={styles.controlIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.controlButton}>

              <Image
                source={switchIcon}
                style={styles.controlIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.endCallButton}
              onPress={() => navigation.goBack()}>

              <Image
                source={endCallIcon}
                style={styles.endCallIcon}
              />

            </TouchableOpacity>

          </View>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default VidcallScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  /* =========================
      HEADER
  ========================= */

  header: {
    paddingTop: height * 0.03,
    paddingHorizontal: 24,
  },

  backButton: {
    width: 64,
    height: 64,

    borderRadius: 999,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

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
    tintColor: '#111111',
  },

  /* =========================
      CENTER CONTENT
  ========================= */

  centerSection: {
    alignItems: 'center',

    marginTop: height * 0.06,
  },

  storyRing: {
    width: 126,
    height: 126,

    borderRadius: 999,

    borderWidth: 4,
    borderColor: '#A100C8',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 24,
  },

  profileImage: {
    width: 112,
    height: 112,

    borderRadius: 999,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 12,
  },

  userName: {
    fontSize: 24,
    fontWeight: '700',

    color: '#111111',
  },

  verifiedIcon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',

    marginLeft: 10,
  },

  connectingText: {
    fontSize: 18,
    fontWeight: '500',

    color: '#8A8A8A',
  },

  /* =========================
      BOTTOM CONTROLS
  ========================= */

  bottomControlWrapper: {
    position: 'absolute',

    bottom: 42,

    width: '100%',
    alignItems: 'center',
  },

  controlContainer: {
    width: width * 0.9,

    height: 96,

    borderRadius: 999,

    backgroundColor: '#9D019D',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    paddingHorizontal: 20,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,
  },

  controlButton: {
    width: 72,
    height: 72,

    borderRadius: 999,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  controlIcon: {
    width: 34,
    height: 34,

    resizeMode: 'contain',
    tintColor: '#111111',
  },

  endCallButton: {
    width: 72,
    height: 72,

    borderRadius: 999,

    backgroundColor: '#FF2D55',

    alignItems: 'center',
    justifyContent: 'center',
  },

  endCallIcon: {
    width: 34,
    height: 34,

    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
});