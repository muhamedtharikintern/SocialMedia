import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

/* =========================
   ASSETS
========================= */

import downIcon from '../assets/down.png';

import image1 from '../assets/gallery1.png';
import image2 from '../assets/gallery2.png';
import image3 from '../assets/gallery3.png';
import image4 from '../assets/gallery4.png';
import image5 from '../assets/gallery5.png';
import image6 from '../assets/gallery6.png';
import image7 from '../assets/gallery7.png';
import image8 from '../assets/gallery8.png';
import image9 from '../assets/gallery9.png';
import image10 from '../assets/gallery10.png';
import image11 from '../assets/gallery11.png';
import image12 from '../assets/gallery12.png';

const galleryImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
];

const AddImagesScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] =
    useState(galleryImages[0]);

  const [selectedTab, setSelectedTab] =
    useState('Library');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#F5F5F5"
        barStyle="dark-content"
      />

      <View style={styles.container}>

        {/* =========================
            HEADER
        ========================= */}

        <View style={styles.header}>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.goBack()
            }>
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.recentsContainer}>

            <Text style={styles.recentsText}>
              Recents
            </Text>

            <Image
              source={downIcon}
              style={styles.downIcon}
            />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(
                'PostScreen',
              )
            }>
            <Text style={styles.nextText}>
              Next
            </Text>
          </TouchableOpacity>

        </View>

        {/* =========================
            SELECTED IMAGE
        ========================= */}

        <Image
          source={selectedImage}
          style={styles.selectedImage}
        />

        {/* =========================
            GALLERY
        ========================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.galleryContainer
          }>

          <View style={styles.galleryGrid}>

            {galleryImages.map(
              (item, index) => {
                const isActive =
                  selectedImage === item;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() =>
                      setSelectedImage(item)
                    }
                    style={[
                      styles.imageWrapper,
                      isActive &&
                        styles.activeImageWrapper,
                    ]}>

                    <Image
                      source={item}
                      style={styles.galleryImage}
                    />

                  </TouchableOpacity>
                );
              },
            )}

          </View>

        </ScrollView>

        {/* =========================
            BOTTOM TABS
        ========================= */}

        <View style={styles.bottomTabs}>

          {['Library', 'Photo', 'Video'].map(
            item => {
              const isSelected =
                selectedTab === item;

              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() =>
                    setSelectedTab(item)
                  }
                  style={styles.bottomTabButton}>

                  <Text
                    style={[
                      styles.bottomTabText,
                      isSelected &&
                        styles.activeBottomTabText,
                    ]}>
                    {item}
                  </Text>

                </TouchableOpacity>
              );
            },
          )}

        </View>

      </View>

    </SafeAreaView>
  );
};

export default AddImagesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  /* =========================
      HEADER
  ========================= */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 24,

    paddingTop:
      Platform.OS === 'ios'
        ? 20
        : 16,

    paddingBottom: 20,
  },

  cancelText: {
    fontSize: 18,
    fontWeight: '500',

    color: '#111111',
  },

  recentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  recentsText: {
    fontSize: 20,
    fontWeight: '700',

    color: '#111111',

    marginRight: 8,
  },

  downIcon: {
    width: 16,
    height: 16,

    resizeMode: 'contain',
  },

  nextText: {
    fontSize: 18,
    fontWeight: '500',

    color: '#3797FF',
  },

  /* =========================
      SELECTED IMAGE
  ========================= */

  selectedImage: {
    width: width,
    height: width * 1,

    resizeMode: 'cover',

    marginBottom: 2,
  },

  /* =========================
      GALLERY
  ========================= */

  galleryContainer: {
    paddingBottom: 120,
  },

  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  imageWrapper: {
    width: width / 4,
    height: width / 4,

    padding: 1,
  },

  activeImageWrapper: {
    opacity: 0.6,
  },

  galleryImage: {
    width: '100%',
    height: '100%',

    borderRadius: 20,

    resizeMode: 'cover',
  },

  /* =========================
      BOTTOM TABS
  ========================= */

  bottomTabs: {
    position: 'absolute',
    bottom: 0,

    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: '#F5F5F5',

    paddingTop: 18,
    paddingBottom: 36,

    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },

  bottomTabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomTabText: {
    fontSize: 18,
    fontWeight: '500',

    color: '#A7A7A7',
  },

  activeBottomTabText: {
    color: '#111111',
    fontWeight: '700',
  },
});