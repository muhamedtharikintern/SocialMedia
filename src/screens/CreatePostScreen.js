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
  Pressable,
} from 'react-native';

const {height, width} = Dimensions.get('window');

/* =========================
   ASSETS
========================= */

import postIcon from '../assets/post.png';
import reelIcon from '../assets/reel.png';
import storyIcon from '../assets/story.png';
import highlightsIcon from '../assets/highlights.png';
import liveIcon from '../assets/live.png';
import aiIcon from '../assets/ai.png';

const createOptions = [
  {
    id: 1,
    title: 'Post',
    icon: postIcon,
    screen: 'AddImagesScreen',
  },
  {
    id: 2,
    title: 'Reel',
    icon: reelIcon,
    screen: 'PictureShotScreen',
  },
  {
    id: 3,
    title: 'Story',
    icon: storyIcon,
    screen: 'StoryScreen',
  },
  {
    id: 4,
    title: 'Highlights',
    icon: highlightsIcon,
    screen: 'HighlightsScreen',
  },
  {
    id: 5,
    title: 'Live',
    icon: liveIcon,
    screen: 'liveScreen',
  },
  {
    id: 6,
    title: 'AI',
    icon: aiIcon,
    screen: 'AIScreen',
  },
];

const CreatePostScreen = ({navigation}) => {

  const handleClose = () => {
    navigation.goBack();
  };

  const handleNavigate = screen => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.mainContainer}>

      {/* =========================
          BACKDROP
      ========================= */}

      <Pressable
        style={styles.backdrop}
        onPress={handleClose}
      />

      {/* =========================
          BOTTOM SHEET
      ========================= */}

      <View style={styles.bottomSheet}>

        {/* HANDLE */}

        <View style={styles.handleWrapper}>
          <View style={styles.handle} />
        </View>

        {/* HEADER */}

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            Create
          </Text>
        </View>

        {/* OPTIONS */}

        <View style={styles.optionsContainer}>

          {createOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={styles.optionRow}
              onPress={() =>
                handleNavigate(item.screen)
              }>

              <View style={styles.optionLeft}>

                <View style={styles.iconContainer}>
                  <Image
                    source={item.icon}
                    style={styles.optionIcon}
                  />
                </View>

                <Text style={styles.optionText}>
                  {item.title}
                </Text>

              </View>

            </TouchableOpacity>
          ))}

        </View>

      </View>

    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },

  backdrop: {
    flex: 1,
  },

  bottomSheet: {
    width: '100%',
    height: height * 0.73,

    backgroundColor: '#F5F5F5',

    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,

    overflow: 'hidden',
  },

  handleWrapper: {
    alignItems: 'center',

    paddingTop: 12,
    paddingBottom: 20,
  },

  handle: {
    width: 92,
    height: 7,

    borderRadius: 999,

    backgroundColor: '#000000',
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingBottom: 28,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',

    color: '#111111',
  },

  optionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
  },

  optionRow: {
    height: 132,

    justifyContent: 'center',

    paddingHorizontal: 32,

    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',

    backgroundColor: '#F5F5F5',
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 56,
    height: 56,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 28,
  },

  optionIcon: {
    width: 42,
    height: 42,

    resizeMode: 'contain',
  },

  optionText: {
    fontSize: 28,
    fontWeight: '500',

    color: '#000000',
  },
});