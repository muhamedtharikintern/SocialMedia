import React, {useMemo, useState} from 'react';
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
   PNG ICONS FROM ASSETS
========================= */

import closeIcon from '../assets/close.png';
import nextIcon from '../assets/next.png';
import flashIcon from '../assets/flash.png';
import rotateIcon from '../assets/rotate.png';
import effectsIcon from '../assets/effects.png';

/* =========================
   LOCAL IMAGE ASSETS
========================= */

import cameraPreview from '../assets/story_image.png';
import galleryImage from '../assets/gallery.png';

const CreateScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] =
    useState('Story');

  const bottomTabs = useMemo(
    () => ['Story', 'Post', 'Reel', 'Live'],
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        backgroundColor="#1E1E1E"
        barStyle="light-content"
      />

      <View style={styles.container}>

        {/* ================= HEADER ================= */}

        <View style={styles.headerContainer}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topIconButton}
            onPress={() => navigation.goBack()}>

            <Image
              source={closeIcon}
              style={styles.topIcon}
            />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topIconButton}>

            <Image
              source={nextIcon}
              style={styles.topIcon}
            />

          </TouchableOpacity>

        </View>

        {/* ================= CAMERA PREVIEW ================= */}

        <View style={styles.previewWrapper}>

          <Image
            source={cameraPreview}
            style={styles.previewImage}
          />

        </View>

        {/* ================= CONTROLS ================= */}

        <View style={styles.controlsContainer}>

          {/* LEFT THUMB */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.galleryWrapper}>

            <Image
              source={galleryImage}
              style={styles.galleryImage}
            />

          </TouchableOpacity>

          {/* FLASH */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={flashIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

          {/* CAPTURE BUTTON */}

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.captureOuter}>

            <View style={styles.captureInner} />

          </TouchableOpacity>

          {/* ROTATE */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={rotateIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

          {/* EFFECTS */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={effectsIcon}
              style={styles.actionIcon}
            />

            <View style={styles.blueDot} />

          </TouchableOpacity>

        </View>

        {/* ================= BOTTOM TABS ================= */}

        <View style={styles.bottomTabsContainer}>

          {bottomTabs.map(item => {
            const isSelected =
              selectedTab === item;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedTab(item)
                }
                style={styles.tabButton}>

                <Text
                  style={[
                    styles.tabText,
                    isSelected &&
                      styles.activeTabText,
                  ]}>

                  {item.toUpperCase()}

                </Text>

              </TouchableOpacity>
            );
          })}

        </View>

      </View>

    </SafeAreaView>
  );
};

export default CreateScreen;

/* =========================
   APP NAVIGATOR
========================= */

/*

import CreateScreen from '../screens/CreateScreen';

<Stack.Screen
  name="CreateScreen"
  component={CreateScreen}
  options={{headerShown: false}}
/>

*/

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1F1F1F',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },

  /* ================= HEADER ================= */

  headerContainer: {
    width: '100%',

    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 24,
    zIndex: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
  },

  topIconButton: {
    width: 56,
    height: 56,

    borderRadius: 28,

    backgroundColor: 'rgba(255,255,255,0.18)',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  topIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },

  /* ================= PREVIEW ================= */

  previewWrapper: {
    width: width,
    height: height * 0.72,

    overflow: 'hidden',

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    backgroundColor: '#2B2B2B',
  },

  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  /* ================= CONTROLS ================= */

  controlsContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 24,

    marginTop: 20,
  },

  galleryWrapper: {
    width: 48,
    height: 48,

    borderRadius: 14,

    overflow: 'hidden',

    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  actionButton: {
    width: 54,
    height: 54,

    borderRadius: 27,

    backgroundColor: 'rgba(255,255,255,0.08)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  actionIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },

  blueDot: {
    width: 14,
    height: 14,

    borderRadius: 999,

    backgroundColor: '#1D9BF0',

    position: 'absolute',
    top: 2,
    right: 0,
  },

  /* ================= CAPTURE BUTTON ================= */

  captureOuter: {
    width: 120,
    height: 120,

    borderRadius: 999,

    backgroundColor: 'rgba(255,255,255,0.35)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  captureInner: {
    width: 88,
    height: 88,

    borderRadius: 999,

    backgroundColor: '#FFFFFF',
  },

  /* ================= BOTTOM TABS ================= */

  bottomTabsContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 36,
  },

  tabButton: {
    marginHorizontal: 14,
  },

  tabText: {
    fontSize: 18,
    color: '#BDBDBD',
    fontWeight: '700',

    letterSpacing: 1,
  },

  activeTabText: {
    color: '#FFFFFF',
  },
});