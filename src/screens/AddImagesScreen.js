import React, {useEffect, useState, useCallback} from 'react';

import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const {width} = Dimensions.get('window');

const ITEM_SIZE = width / 4;
const PAGE_SIZE = 40; // Load 40 at a time instead of 500

import downIcon from '../assets/down.png';

/* =========================
   TAB → ASSET TYPE MAP
========================= */

const TAB_ASSET_TYPE = {
  Library: 'Photos',
  Photo:   'Photos',
  Video:   'Videos',
};

const AddImagesScreen = ({navigation}) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Library');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(null);

  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      loadGalleryImages(TAB_ASSET_TYPE[selectedTab], true);
    }
  }, [selectedTab, permissionGranted]);

  /* =========================
      PERMISSION LOGIC
  ========================= */

  const getPermissionType = () => {
    if (Platform.OS === 'ios') {
      return PERMISSIONS.IOS.PHOTO_LIBRARY;
    }
    if (Platform.Version >= 33) {
      return PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    }
    return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  };

  const checkAndRequestPermission = async () => {
    try {
      const permission = getPermissionType();
      const status = await check(permission);

      switch (status) {
        case RESULTS.GRANTED:
        case RESULTS.LIMITED:
          setPermissionGranted(true);
          break;

        case RESULTS.DENIED:
          const result = await request(permission);
          if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
            setPermissionGranted(true);
          }
          break;

        case RESULTS.BLOCKED:
          Alert.alert(
            'Gallery Permission Required',
            'Please enable gallery access in your device settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => openSettings()},
            ],
          );
          break;
      }
    } catch (error) {
      console.log('Permission Error:', error.message);
    }
  };

  /* =========================
      LOAD GALLERY (paginated)
  ========================= */

  const loadGalleryImages = async (
    assetType = 'Photos',
    reset = false,
    cursor = null,
  ) => {
    if (loading) return;

    try {
      setLoading(true);

      if (reset) {
        setGalleryImages([]);
        setSelectedImage(null);
        setEndCursor(null);
        setHasNextPage(false);
      }

      const params = {
        first: PAGE_SIZE,
        assetType,
        include: ['filename'],
      };

      if (cursor) {
        params.after = cursor;
      }

      const photos = await CameraRoll.getPhotos(params);

      const uris = photos.edges
        .map(item => item.node.image.uri)
        .filter(Boolean);

      setGalleryImages(prev => (reset ? uris : [...prev, ...uris]));
      setHasNextPage(photos.page_info.has_next_page);
      setEndCursor(photos.page_info.end_cursor);

      if (reset && uris.length > 0) {
        setSelectedImage(uris[0]);
      }
    } catch (error) {
      console.log('Gallery Load Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      LOAD MORE (pagination)
  ========================= */

  const loadMore = () => {
    if (hasNextPage && !loading) {
      loadGalleryImages(TAB_ASSET_TYPE[selectedTab], false, endCursor);
    }
  };

  /* =========================
      RENDER GALLERY ITEM
      (memoized to avoid re-renders)
  ========================= */

  const renderItem = useCallback(
    ({item}) => {
      const isActive = selectedImage === item;
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedImage(item)}
          style={[
            styles.imageWrapper,
            isActive && styles.activeImageWrapper,
          ]}>
          <Image
            source={{uri: item}}
            style={styles.galleryImage}
            // Key perf props:
            resizeMode="cover"
            fadeDuration={0} // no fade animation = faster
          />
        </TouchableOpacity>
      );
    },
    [selectedImage],
  );

  const keyExtractor = useCallback((item, index) => `${item}-${index}`, []);

  /* =========================
      RENDER
  ========================= */

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#F5F5F5"
        barStyle="dark-content"
      />

      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.recentsContainer}>
            <Text style={styles.recentsText}>Recents</Text>
            <Image source={downIcon} style={styles.downIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('PostScreen', {selectedImage})
            }>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* SELECTED IMAGE / VIDEO PREVIEW */}
        {selectedImage ? (
          <Image
            source={{uri: selectedImage}}
            style={styles.selectedImage}
            resizeMode="cover"
            fadeDuration={0}
          />
        ) : (
          <View style={styles.selectedImagePlaceholder} />
        )}

        {/* GALLERY GRID — FlatList for lazy rendering */}
        <FlatList
          data={galleryImages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.galleryContainer}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          // Performance props
          removeClippedSubviews={true}
          maxToRenderPerBatch={20}
          windowSize={10}
          initialNumToRender={20}
          getItemLayout={(data, index) => ({
            length: ITEM_SIZE,
            offset: ITEM_SIZE * Math.floor(index / 4),
            index,
          })}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                size="small"
                color="#A7A7A7"
                style={styles.loader}
              />
            ) : null
          }
        />

        {/* BOTTOM TABS */}
        <View style={styles.bottomTabs}>
          {['Library', 'Photo', 'Video'].map(item => {
            const isSelected = selectedTab === item;
            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => setSelectedTab(item)}
                style={styles.bottomTabButton}>
                <Text
                  style={[
                    styles.bottomTabText,
                    isSelected && styles.activeBottomTabText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 16,
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
    justifyContent: 'center',
  },

  recentsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    marginRight: 6,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  downIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginTop: 2,
  },

  nextText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3797FF',
  },

  selectedImage: {
    width: width,
    height: width,
    marginBottom: 2,
  },

  selectedImagePlaceholder: {
    width: width,
    height: width,
    backgroundColor: '#E0E0E0',
    marginBottom: 2,
  },

  galleryContainer: {
    paddingBottom: 120,
  },

  imageWrapper: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    padding: 1,
  },

  activeImageWrapper: {
    opacity: 0.6,
  },

  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },

  loader: {
    paddingVertical: 16,
  },

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
