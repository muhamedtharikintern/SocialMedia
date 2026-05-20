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
  Platform,
  TextInput,
} from 'react-native';

const {width, height} = Dimensions.get('window');

/* =========================
   ASSETS
========================= */

import liveImage from '../assets/live_image.png';

import rotateIcon from '../assets/rotate.png';
import sendIcon from '../assets/send.png';
import smileIcon from '../assets/smile.png';
import sparkleSmileIcon from '../assets/sparkle_smile.png';
import moreIcon from '../assets/more.png';
import liveMiniImage from '../assets/live_mini.png';
import profileImage from '../assets/profile_1.png';

const MyliveScreen = ({navigation}) => {
  const [comment, setComment] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#1F1F1F"
        barStyle="light-content"
      />

      {/* =========================
          LIVE IMAGE
      ========================= */}

      <Image
        source={liveImage}
        style={styles.liveImage}
        resizeMode="cover"
      />

      {/* =========================
          TOP OVERLAY
      ========================= */}

      <View style={styles.topOverlay}>

        {/* LEFT */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.topIconButton}>

          <Image
            source={rotateIcon}
            style={styles.rotateIcon}
          />

        </TouchableOpacity>

        {/* CENTER */}

        <View style={styles.liveCenterContainer}>

          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>
              LIVE
            </Text>
          </View>

          <View style={styles.viewerBadge}>

            <View style={styles.eyeDot} />

            <Text style={styles.viewerText}>
              1
            </Text>

          </View>

        </View>

        {/* RIGHT */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.goBack()
          }>

          <Text style={styles.endText}>
            End
          </Text>

        </TouchableOpacity>

      </View>

      {/* =========================
          LIVE TEXTS
      ========================= */}

      <View style={styles.liveInfoContainer}>

        <Text style={styles.liveInfoText}>
          We're telling your followers that you've started a live video.
        </Text>

        <Text style={styles.liveInfoText}>
          Hang on! We're telling more followers to join your video.
        </Text>

      </View>

      {/* =========================
          JOINED USER
      ========================= */}

      <View style={styles.joinedContainer}>

        <View style={styles.joinedLeft}>

          <Image
            source={profileImage}
            style={styles.profileImage}
          />

          <Text style={styles.joinedText}>
            maxjacobson joined
          </Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.waveButton}>

          <Text style={styles.waveEmoji}>
            👋
          </Text>

          <Text style={styles.waveText}>
            Wave
          </Text>

        </TouchableOpacity>

      </View>

      {/* =========================
          BOTTOM BAR
      ========================= */}

      <View style={styles.bottomBar}>

        {/* COMMENT INPUT */}

        <View style={styles.commentWrapper}>

          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Comment"
            placeholderTextColor="#EAEAEA"
            style={styles.commentInput}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.moreButton}>

            <Image
              source={moreIcon}
              style={styles.moreIcon}
            />

          </TouchableOpacity>

        </View>

        {/* ACTIONS */}

        <View style={styles.actionsContainer}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={sendIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={smileIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={sparkleSmileIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.miniImageButton}>

            <Image
              source={liveMiniImage}
              style={styles.miniImage}
            />

          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default MyliveScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1F1F1F',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  /* =========================
      LIVE IMAGE
  ========================= */

  liveImage: {
    width: width,
    height: height * 0.82,

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

    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  topIconButton: {
    width: 46,
    height: 46,

    justifyContent: 'center',
    alignItems: 'center',
  },

  rotateIcon: {
    width: 34,
    height: 34,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  liveCenterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  liveBadge: {
    backgroundColor: '#1D9BF0',

    paddingHorizontal: 20,
    paddingVertical: 14,

    borderRadius: 12,

    marginRight: 12,
  },

  liveText: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '700',

    letterSpacing: 0.4,
  },

  viewerBadge: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor:
      'rgba(0,0,0,0.28)',

    paddingHorizontal: 18,
    paddingVertical: 14,

    borderRadius: 12,
  },

  eyeDot: {
    width: 12,
    height: 12,

    borderRadius: 6,

    backgroundColor: '#FFFFFF',

    marginRight: 8,
  },

  viewerText: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '600',
  },

  endText: {
    color: '#FFFFFF',

    fontSize: 18,
    fontWeight: '600',
  },

  /* =========================
      LIVE INFO
  ========================= */

  liveInfoContainer: {
    position: 'absolute',

    left: 22,
    right: 22,

    bottom: 265,
  },

  liveInfoText: {
    color:
      'rgba(255,255,255,0.75)',

    fontSize: 15,
    lineHeight: 24,

    fontWeight: '500',

    marginBottom: 8,
  },

  /* =========================
      JOINED USER
  ========================= */

  joinedContainer: {
    position: 'absolute',

    left: 22,
    right: 22,

    bottom: 190,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  joinedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 54,
    height: 54,

    borderRadius: 27,

    marginRight: 14,
  },

  joinedText: {
    color: '#FFFFFF',

    fontSize: 18,
    fontWeight: '600',
  },

  waveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      'rgba(255,255,255,0.16)',

    borderRadius: 999,

    paddingHorizontal: 22,
    paddingVertical: 14,
  },

  waveEmoji: {
    fontSize: 18,

    marginRight: 8,
  },

  waveText: {
    color: '#FFFFFF',

    fontSize: 17,
    fontWeight: '600',
  },

  /* =========================
      BOTTOM BAR
  ========================= */

  bottomBar: {
    position: 'absolute',

    left: 22,
    right: 22,

    bottom:
      Platform.OS === 'ios'
        ? 34
        : 24,

    flexDirection: 'row',
    alignItems: 'center',
  },

  commentWrapper: {
    flex: 1,
    height: 92,

    borderRadius: 999,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 28,

    backgroundColor:
      'rgba(0,0,0,0.35)',

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.06)',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 10,
  },

  commentInput: {
    flex: 1,

    color: '#FFFFFF',

    fontSize: 18,
    fontWeight: '500',
  },

  moreButton: {
    marginLeft: 12,
  },

  moreIcon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 18,
  },

  actionButton: {
    marginLeft: 16,
  },

  actionIcon: {
    width: 42,
    height: 42,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  miniImageButton: {
    marginLeft: 16,
  },

  miniImage: {
    width: 54,
    height: 54,

    borderRadius: 10,
  },
});