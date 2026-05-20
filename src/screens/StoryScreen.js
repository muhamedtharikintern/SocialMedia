import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';

const {width, height} = Dimensions.get('window');

/* =========================
   PNG ASSETS
========================= */

import storyImage from '../assets/story_image.png';

import closeIcon from '../assets/close.png';
import sendIcon from '../assets/send.png';
import moreIcon from '../assets/more.png';
import cameraIcon from '../assets/cam.png';

import profileImage from '../assets/profile_1.png';

const StoryScreen = ({navigation}) => {
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        translucent
        backgroundColor="#1B1B1B"
        barStyle="light-content"
      />

      {/* =========================
          STORY IMAGE
      ========================= */}

      <Image
        source={storyImage}
        style={styles.storyImage}
        resizeMode="cover"
      />

      {/* =========================
          TOP OVERLAY
      ========================= */}

      <View style={styles.topOverlay}>

        {/* STORY PROGRESS */}

        <View style={styles.progressContainer}>

          <View style={styles.progressActive} />

          <View style={styles.progressInactive} />

        </View>

        {/* TOP ROW */}

        <View style={styles.topRow}>

          {/* LEFT */}

          <View style={styles.userSection}>

            <Image
              source={profileImage}
              style={styles.profileImage}
            />

            <Text style={styles.username}>
              craig_love
            </Text>

            <Text style={styles.timeText}>
              4h
            </Text>

          </View>

          {/* CLOSE */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.goBack()
            }
            style={styles.closeButton}>

            <Image
              source={closeIcon}
              style={styles.closeIcon}
            />

          </TouchableOpacity>

        </View>

      </View>

      {/* =========================
          BOTTOM ACTIONS
      ========================= */}

      <View style={styles.bottomContainer}>

        {/* MESSAGE INPUT */}

        <View style={styles.messageWrapper}>

          {/* CAMERA */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cameraButton}>

            <Image
              source={cameraIcon}
              style={styles.cameraIcon}
            />

          </TouchableOpacity>

          {/* INPUT */}

          <TextInput
            placeholder="Send Message"
            placeholderTextColor="#E5E5E5"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />

        </View>

        {/* SEND */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionButton}>

          <Image
            source={sendIcon}
            style={styles.actionIcon}
          />

        </TouchableOpacity>

        {/* MORE */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionButton}>

          <Image
            source={moreIcon}
            style={styles.moreIcon}
          />

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1B1B1B',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  /* =========================
      STORY IMAGE
  ========================= */

  storyImage: {
    width: width,
    height: height * 0.83,

    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  /* =========================
      TOP OVERLAY
  ========================= */

  topOverlay: {
    position: 'absolute',

    top:
      Platform.OS === 'ios'
        ? 58
        : 42,

    left: 0,
    right: 0,

    paddingHorizontal: 16,
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 18,
  },

  progressActive: {
    flex: 1,
    height: 3,

    backgroundColor: '#FFFFFF',

    borderRadius: 999,

    marginRight: 6,
  },

  progressInactive: {
    flex: 1,
    height: 3,

    backgroundColor:
      'rgba(255,255,255,0.45)',

    borderRadius: 999,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 52,
    height: 52,

    borderRadius: 26,

    marginRight: 12,
  },

  username: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '700',

    marginRight: 10,
  },

  timeText: {
    color:
      'rgba(255,255,255,0.72)',

    fontSize: 15,
    fontWeight: '500',
  },

  closeButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    justifyContent: 'center',
    alignItems: 'center',
  },

  closeIcon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  /* =========================
      BOTTOM SECTION
  ========================= */

  bottomContainer: {
    position: 'absolute',

    bottom:
      Platform.OS === 'ios'
        ? 34
        : 24,

    left: 0,
    right: 0,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 18,
  },

  messageWrapper: {
    flex: 1,
    height: 72,

    borderRadius: 999,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,

    marginRight: 16,

    backgroundColor:
      'rgba(0,0,0,0.35)',

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.08)',

    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  cameraButton: {
    width: 50,
    height: 50,

    borderRadius: 25,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor:
      'rgba(255,255,255,0.15)',

    marginRight: 14,
  },

  cameraIcon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  input: {
    flex: 1,

    color: '#FFFFFF',

    fontSize: 17,
    fontWeight: '500',
  },

  actionButton: {
    width: 48,
    height: 48,

    justifyContent: 'center',
    alignItems: 'center',
  },

  actionIcon: {
    width: 32,
    height: 32,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  moreIcon: {
    width: 28,
    height: 28,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },
});