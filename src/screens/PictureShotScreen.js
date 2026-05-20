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
} from 'react-native';

const {width, height} = Dimensions.get('window');

/* =========================
   PNG ASSETS
========================= */

import closeIcon from '../assets/close.png';
import nextIcon from '../assets/next.png';

import galleryIcon from '../assets/gallery.png';
import flashIcon from '../assets/flash.png';
import rotateIcon from '../assets/rotate.png';
import filterIcon from '../assets/filter.png';

import cameraPreview from '../assets/camera_preview.png';

const modes = [
  'BOOMERANG',
  'LIVE',
  'NORMAL',
  'TYPE',
  'SUPERZOOM',
];

const PictureShotScreen = ({navigation}) => {
  const [activeMode, setActiveMode] =
    useState('NORMAL');

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        translucent
        backgroundColor="#1E1E1E"
        barStyle="light-content"
      />

      {/* =========================
          CAMERA PREVIEW
      ========================= */}

      <View style={styles.previewWrapper}>

        <Image
          source={cameraPreview}
          style={styles.previewImage}
          resizeMode="cover"
        />

        {/* TOP ACTIONS */}

        <View style={styles.topActions}>

          {/* CLOSE */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topButton}
            onPress={() => navigation.goBack()}>

            <Image
              source={closeIcon}
              style={styles.topIcon}
            />

          </TouchableOpacity>

          {/* NEXT */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topButton}>

            <Image
              source={nextIcon}
              style={styles.topIcon}
            />

          </TouchableOpacity>

        </View>

      </View>

      {/* =========================
          CAMERA CONTROLS
      ========================= */}

      <View style={styles.controlsWrapper}>

        {/* LEFT GALLERY */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}>

          <Image
            source={galleryIcon}
            style={styles.sideIcon}
          />

        </TouchableOpacity>

        {/* FLASH */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}>

          <Image
            source={flashIcon}
            style={styles.sideIcon}
          />

        </TouchableOpacity>

        {/* SHUTTER */}

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.shutterOuter}>

          <View style={styles.shutterInner} />

        </TouchableOpacity>

        {/* ROTATE */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}>

          <Image
            source={rotateIcon}
            style={styles.sideIcon}
          />

        </TouchableOpacity>

        {/* FILTER */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}>

          <Image
            source={filterIcon}
            style={styles.sideIcon}
          />

          <View style={styles.blueDot} />

        </TouchableOpacity>

      </View>

      {/* =========================
          MODES
      ========================= */}

      <View style={styles.modeContainer}>

        {modes.map(item => {
          const active = activeMode === item;

          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.8}
              onPress={() =>
                setActiveMode(item)
              }>

              <Text
                style={[
                  styles.modeText,
                  active &&
                    styles.activeModeText,
                ]}>

                {item}

              </Text>

            </TouchableOpacity>
          );
        })}

      </View>

    </SafeAreaView>
  );
};

export default PictureShotScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  /* =========================
      PREVIEW
  ========================= */

  previewWrapper: {
    width: '100%',
    height: height * 0.68,

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    overflow: 'hidden',

    marginTop: 22,
  },

  previewImage: {
    width: '100%',
    height: '100%',
  },

  topActions: {
    position: 'absolute',

    top: 22,
    left: 20,
    right: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topButton: {
    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor:
      'rgba(255,255,255,0.14)',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.20)',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  topIcon: {
    width: 26,
    height: 26,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  /* =========================
      CONTROLS
  ========================= */

  controlsWrapper: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    marginTop: 18,

    paddingHorizontal: 16,
  },

  sideButton: {
    width: 54,
    height: 54,

    borderRadius: 27,

    justifyContent: 'center',
    alignItems: 'center',
  },

  sideIcon: {
    width: 34,
    height: 34,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  blueDot: {
    position: 'absolute',

    top: 6,
    right: 4,

    width: 16,
    height: 16,

    borderRadius: 8,

    backgroundColor: '#1D9BF0',
  },

  /* =========================
      SHUTTER
  ========================= */

  shutterOuter: {
    width: 112,
    height: 112,

    borderRadius: 56,

    backgroundColor: '#7C7C7C',

    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 10,
  },

  shutterInner: {
    width: 82,
    height: 82,

    borderRadius: 41,

    backgroundColor: '#F5F5F5',
  },

  /* =========================
      MODES
  ========================= */

  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 18,

    marginTop: 34,
  },

  modeText: {
    fontSize: 18,
    fontWeight: '600',

    color: '#A7A7A7',

    letterSpacing: 1,
  },

  activeModeText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});