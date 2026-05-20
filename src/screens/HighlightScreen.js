
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
   ASSETS
========================= */

import backIcon from '../assets/back.png';
import archiveIcon from '../assets/archive.png';

const HighlightsScreen = ({navigation}) => {

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F5F5"
      />

      <View style={styles.container}>

        {/* =========================
            HEADER
        ========================= */}

        <View style={styles.headerContainer}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backButton}
            onPress={handleBack}>

            <Image
              source={backIcon}
              style={styles.backIcon}
            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Add to Highlight
          </Text>

          <View style={styles.rightPlaceholder} />

        </View>

        {/* =========================
            CONTENT
        ========================= */}

        <View style={styles.contentContainer}>

          <View style={styles.iconWrapper}>

            <Image
              source={archiveIcon}
              style={styles.archiveIcon}
            />

          </View>

          <Text style={styles.mainTitle}>
            Add to your story
          </Text>

          <Text style={styles.descriptionText}>
            Kepp your stories in your archive after they disappear,
            so you can look back on your memories. only you can see
            what’s in your archive.
          </Text>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default HighlightsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    paddingTop: height * 0.02,
  },

  /* =========================
      HEADER
  ========================= */

  headerContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 24,
    marginBottom: 40,
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
  },

  headerTitle: {
    flex: 1,

    textAlign: 'center',

    fontSize: 24,
    fontWeight: '700',

    color: '#111111',

    marginRight: 64,
  },

  rightPlaceholder: {
    width: 64,
  },

  /* =========================
      CONTENT
  ========================= */

  contentContainer: {
    flex: 1,

    alignItems: 'center',

    paddingHorizontal: 32,
    paddingTop: height * 0.08,
  },

  iconWrapper: {
    width: 160,
    height: 160,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 32,
  },

  archiveIcon: {
    width: 130,
    height: 130,

    resizeMode: 'contain',
  },

  mainTitle: {
    fontSize: 30,
    fontWeight: '700',

    color: '#000000',

    marginBottom: 28,
  },

  descriptionText: {
    width: '100%',

    fontSize: 22,
    lineHeight: 42,
    fontWeight: '400',

    color: '#111111',

    textAlign: 'left',
  },
});