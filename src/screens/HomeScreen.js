import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

const {width, height} = Dimensions.get('window');

/* =========================
   PNG ICON ASSETS
========================= */

import addIcon from '../assets/add.png';
import notificationIcon from '../assets/notification.png';

import homeIcon from '../assets/home.png';
import homeActiveIcon from '../assets/home_active.png';

import searchIcon from '../assets/search.png';
import searchActiveIcon from '../assets/search_active.png';

import chatIcon from '../assets/chat.png';
import chatActiveIcon from '../assets/chat_active.png';

import profileIcon from '../assets/profile.png';
import profileActiveIcon from '../assets/profile_active.png';

import aiIcon from '../assets/ai.png';

import heartIcon from '../assets/heart.png';
import heartActiveIcon from '../assets/heart_active.png';

import commentIcon from '../assets/comment.png';
import reshareIcon from '../assets/reshare.png';
import sendIcon from '../assets/send.png';
import bookmarkIcon from '../assets/bookmark.png';

import verifiedIcon from '../assets/verified.png';

const stories = [
  {
    id: 1,
    name: 'Your Story',
    image: require('../assets/story1.png'),
    own: true,
  },
  {
    id: 2,
    name: 'actorvijay',
    image: require('../assets/story2.png'),
  },
  {
    id: 3,
    name: 'rockstargames',
    image: require('../assets/story3.png'),
  },
  {
    id: 4,
    name: 'primevideoin',
    image: require('../assets/story4.png'),
  },
];

const posts = [
  {
    id: 1,
    user: 'croma',
    profile: require('../assets/profile1.png'),
    verified: true,
    image: require('../assets/post1.png'),
    caption: 'Sony Playstation 5 series is now available at Croma',
    tags: '#playstation #ps5 #playstation5',
    time: '11 hr ago',
  },
  {
    id: 2,
    user: 'rockstargames',
    profile: require('../assets/profile2.png'),
    verified: true,
    image: require('../assets/post2.png'),
    caption: 'Watch Grand Theft Auto VI Trailer Now',
    time: '3 April 2026',
  },
  {
    id: 3,
    user: 'apple',
    profile: require('../assets/profile3.png'),
    verified: true,
    image: require('../assets/post3.png'),
    caption: 'apple Strike a pose.',
    time: '1 January 2025',
  },
  {
    id: 4,
    user: 'primevideoin',
    profile: require('../assets/profile4.png'),
    verified: true,
    image: require('../assets/post4.png'),
    caption:
      'A revenge-obsessed Sunny descends further into darkness stepping into a much larger game.',
    time: '1 January 2025',
  },
];

const HomeScreen = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

  const toggleLike = id => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(item => item !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const renderStory = item => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.8}
        style={styles.storyWrapper}>

        <View style={styles.storyRing}>

          <Image
            source={item.image}
            style={styles.storyImage}
          />

          {item.own && (
            <View style={styles.plusBadge}>

              <Image
                source={addIcon}
                style={styles.plusIcon}
              />

            </View>
          )}

        </View>

        <Text
          style={styles.storyText}
          numberOfLines={1}>

          {item.name}

        </Text>

      </TouchableOpacity>
    );
  };

  const renderPost = item => {
    const isLiked = likedPosts.includes(item.id);

    return (
      <View
        key={item.id}
        style={styles.postContainer}>

        {/* POST HEADER */}

        <View style={styles.postHeader}>

          <View style={styles.userRow}>

            <Image
              source={item.profile}
              style={styles.profileImage}
            />

            <Text style={styles.username}>
              {item.user}
            </Text>

            {item.verified && (
              <Image
                source={verifiedIcon}
                style={styles.verifiedIcon}
              />
            )}

          </View>

        </View>

        {/* POST IMAGE */}

        <View style={styles.imageContainer}>

          <Image
            source={item.image}
            style={styles.postImage}
            resizeMode="cover"
          />

          {/* FLOATING ACTIONS */}

          <View style={styles.actionContainer}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionButton}
              onPress={() => toggleLike(item.id)}>

              <Image
                source={
                  isLiked
                    ? heartActiveIcon
                    : heartIcon
                }
                style={styles.postActionIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionButton}>

              <Image
                source={commentIcon}
                style={styles.postActionIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionButton}>

              <Image
                source={reshareIcon}
                style={styles.postActionIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionButton}>

              <Image
                source={sendIcon}
                style={styles.postActionIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionButton}>

              <Image
                source={bookmarkIcon}
                style={styles.postActionIcon}
              />

            </TouchableOpacity>

          </View>

        </View>

        {/* POST FOOTER */}

        <View style={styles.postFooter}>

          <Text style={styles.captionTitle}>

            {item.user}{' '}

            <Text style={styles.captionText}>
              {item.caption}
            </Text>

          </Text>

          {item.tags && (
            <Text style={styles.tags}>
              {item.tags}
            </Text>
          )}

          <Text style={styles.timeText}>
            {item.time}
          </Text>

        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.headerIcon}>

            <Image
              source={addIcon}
              style={styles.headerActionIcon}
            />

          </TouchableOpacity>

          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.headerIcon}>

            <Image
              source={notificationIcon}
              style={styles.headerActionIcon}
            />

          </TouchableOpacity>

        </View>

        {/* STORIES */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storyContainer}>

          {stories.map(renderStory)}

        </ScrollView>

        {/* FEED */}

        <View style={styles.feedContainer}>
          {posts.map(renderPost)}
        </View>

      </ScrollView>

      {/* FLOATING BOTTOM TABS */}

      <View style={styles.bottomTabWrapper}>

        {/* HOME */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabButton}
          onPress={() => setActiveTab('home')}>

          <Image
            source={
              activeTab === 'home'
                ? homeActiveIcon
                : homeIcon
            }
            style={styles.bottomTabIcon}
          />

        </TouchableOpacity>

        {/* SEARCH */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabButton}
          onPress={() => setActiveTab('search')}>

          <Image
            source={
              activeTab === 'search'
                ? searchActiveIcon
                : searchIcon
            }
            style={styles.bottomTabIcon}
          />

        </TouchableOpacity>

        {/* CENTER AI BUTTON */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.centerButton}
          onPress={() => setActiveTab('create')}>

          <Image
            source={aiIcon}
            style={styles.centerAIIcon}
          />

        </TouchableOpacity>

        {/* CHAT */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabButton}
          onPress={() => setActiveTab('messages')}>

          <Image
            source={
              activeTab === 'messages'
                ? chatActiveIcon
                : chatIcon
            }
            style={styles.bottomTabIcon}
          />

        </TouchableOpacity>

        {/* PROFILE */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabButton}
          onPress={() => setActiveTab('profile')}>

          <Image
            source={
              activeTab === 'profile'
                ? profileActiveIcon
                : profileIcon
            }
            style={styles.bottomTabIcon}
          />

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + 6
        : 0,
  },

  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 14 : 10,
    paddingBottom: 140,
  },

  header: {
    width: '100%',

    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 24,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#ECECEC',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  headerActionIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  logo: {
    width: 100,
    height: 42,
  },

  storyContainer: {
    paddingLeft: 20,
    paddingRight: 8,
    marginBottom: 28,
  },

  storyWrapper: {
    alignItems: 'center',
    marginRight: 18,
    width: 76,
  },

  storyRing: {
    width: 72,
    height: 72,
    borderRadius: 36,

    borderWidth: 3,
    borderColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 8,
  },

  storyImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },

  plusBadge: {
    position: 'absolute',

    bottom: -2,
    right: -2,

    width: 22,
    height: 22,
    borderRadius: 11,

    backgroundColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  plusIcon: {
    width: 10,
    height: 10,

    tintColor: '#FFFFFF',

    resizeMode: 'contain',
  },

  storyText: {
    fontSize: 12,
    color: '#111111',
    fontWeight: '500',
  },

  feedContainer: {
    paddingHorizontal: 6,
  },

  postContainer: {
    marginBottom: 32,
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 12,

    marginBottom: 14,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,

    marginRight: 8,
  },

  username: {
    fontSize: 15,
    color: '#111111',
    fontWeight: '700',
  },

  verifiedIcon: {
    width: 16,
    height: 16,

    resizeMode: 'contain',

    marginLeft: 4,
  },

  imageContainer: {
    position: 'relative',
  },

  postImage: {
    width: width - 12,
    height: height * 0.60,

    borderRadius: 28,

    alignSelf: 'center',
  },

  actionContainer: {
    position: 'absolute',

    right: 18,
    top: 16,

    alignItems: 'center',
  },

  actionButton: {
    width: 46,
    height: 46,
    borderRadius: 23,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.18)',

    marginBottom: 14,
  },

  postActionIcon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',
  },

  postFooter: {
    paddingHorizontal: 14,
    marginTop: 14,
  },

  captionTitle: {
    fontSize: 15,
    color: '#111111',
    fontWeight: '700',
    marginBottom: 4,
  },

  captionText: {
    fontWeight: '400',
    color: '#222222',
  },

  tags: {
    fontSize: 13,
    color: '#8A00B8',
    fontWeight: '500',
    marginBottom: 6,
  },

  timeText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '400',
  },

  /* =========================
     FLOATING BOTTOM TABS
  ========================= */

  bottomTabWrapper: {
    position: 'absolute',

    bottom: Platform.OS === 'ios' ? 26 : 18,

    alignSelf: 'center',

    width: width * 0.90,
    height: 78,

    backgroundColor: 'rgba(255,255,255,0.92)',

    borderRadius: 999,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    paddingHorizontal: 12,

    borderWidth: 1,
    borderColor: '#ECECEC',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  tabButton: {
    width: 52,
    height: 52,
    borderRadius: 26,

    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomTabIcon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',
  },

  centerButton: {
    width: 62,
    height: 62,
    borderRadius: 31,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#A100C8',

    marginTop: -28,

    shadowColor: '#A100C8',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  centerAIIcon: {
    width: 28,
    height: 28,

    tintColor: '#FFFFFF',

    resizeMode: 'contain',
  },
});