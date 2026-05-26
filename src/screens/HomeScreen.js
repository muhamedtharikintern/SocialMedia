import React, {useState, useEffect, useCallback} from 'react';
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
  ActivityIndicator,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const BASE_URL = 'https://deffovibeo.duckdns.org';

/* =========================
   PNG ICON ASSETS
========================= */

import addIcon          from '../assets/add.png';
import notificationIcon from '../assets/notification.png';
import heartIcon        from '../assets/heart.png';
import commentIcon      from '../assets/comment.png';
import reshareIcon      from '../assets/reshare.png';
import sendIcon         from '../assets/send_1.png';
import bookmarkIcon     from '../assets/bookmark.png';
import verifiedIcon     from '../assets/verified.png';

const stories = [
  {id: 1, name: 'Your Story', image: require('../assets/story1.png'), own: true},
  {id: 2, name: 'actorvijay', image: require('../assets/story2.png')},
  {id: 3, name: 'rockstargames', image: require('../assets/story3.png')},
  {id: 4, name: 'primevideoin', image: require('../assets/story4.png')},
];

const HomeScreen = ({navigation}) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [posts,      setPosts]      = useState([]);
  const [loading,    setLoading]    = useState(false);

  /* =========================
      FETCH ALL POSTS
  ========================= */

  const fetchAllPosts = useCallback(async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Session expired. Please login again.');
        return;
      }

      const res = await fetch(`${BASE_URL}/posts/all-posts`, {
        method:  'GET',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? 'Failed to fetch posts');
      }

      setPosts(data.posts);
    } catch (err) {
      console.error('Fetch feed error:', err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch on mount and on screen focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchAllPosts);
    return unsubscribe;
  }, [navigation, fetchAllPosts]);

  /* =========================
      HELPERS
  ========================= */

  const toggleLike = id => {
    setLikedPosts(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const formatTime = dateStr => {
    if (!dateStr) return '';
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)         return `${diff}s ago`;
    if (diff < 3600)       return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)      return `${Math.floor(diff / 3600)}hr ago`;
    if (diff < 2592000)    return `${Math.floor(diff / 86400)}d ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  /* =========================
      RENDER STORY
  ========================= */

  const renderStory = item => (
    <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.storyWrapper}>
      <View style={styles.storyRing}>
        <Image source={item.image} style={styles.storyImage} />
        {item.own && (
          <View style={styles.plusBadge}>
            <Image source={addIcon} style={styles.plusIcon} />
          </View>
        )}
      </View>
      <Text style={styles.storyText} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  /* =========================
      RENDER POST
  ========================= */

  const renderPost = item => {
    const isLiked    = likedPosts.includes(item._id);
    const mediaUrl   = item.media?.[0]?.url;
    const username   = item.userId?.username ?? 'user';
    const profileImg = item.userId?.profileImage
      ? {uri: item.userId.profileImage}
      : require('../assets/profile1.png');

    return (
      <View key={item._id} style={styles.postContainer}>

        {/* POST HEADER */}
        <View style={styles.postHeader}>
          <View style={styles.userRow}>
            <Image source={profileImg} style={styles.profileImage} />
            <Text style={styles.username}>{username}</Text>
            <Image source={verifiedIcon} style={styles.verifiedIcon} />
          </View>
        </View>

        {/* POST IMAGE */}
        {mediaUrl ? (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: mediaUrl}}
              style={styles.postImage}
              resizeMode="cover"
            />

            {/* FLOATING ACTIONS */}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.actionButton}
                onPress={() => toggleLike(item._id)}>
                <Image
                  source={heartIcon}
                  style={[
                    styles.postActionIcon,
                    isLiked && {tintColor: '#FF3B30'},
                  ]}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
                <Image source={commentIcon} style={styles.postActionIcon} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
                <Image source={reshareIcon} style={styles.postActionIcon} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
                <Image source={sendIcon} style={styles.postActionIcon} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
                <Image source={bookmarkIcon} style={styles.postActionIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* POST FOOTER */}
        <View style={styles.postFooter}>
          {item.caption ? (
            <Text style={styles.captionTitle}>
              {username}{' '}
              <Text style={styles.captionText}>{item.caption}</Text>
            </Text>
          ) : null}

          {item.hashtags?.length > 0 && (
            <Text style={styles.tags}>
              {item.hashtags.map(h => `#${h}`).join('  ')}
            </Text>
          )}

          <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
        </View>

      </View>
    );
  };

  /* =========================
      MAIN RENDER
  ========================= */

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.headerIcon}
            onPress={() => navigation.navigate('CreateScreen')}>
            <Image source={addIcon} style={styles.headerActionIcon} />
          </TouchableOpacity>

          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.headerIcon}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <Image source={notificationIcon} style={styles.headerActionIcon} />
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
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#A100C8"
              style={{marginTop: 60}}
            />
          ) : posts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No posts yet</Text>
            </View>
          ) : (
            posts.map(renderPost)
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 6 : 0,
  },
  scrollContent: {
    paddingTop:    Platform.OS === 'android' ? 14 : 10,
    paddingBottom: 140,
  },
  header: {
    width:             '100%',
    paddingHorizontal: 20,
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    marginBottom:      24,
  },
  headerIcon: {
    width:           48,
    height:          48,
    borderRadius:    24,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: '#FFFFFF',
    borderWidth:     1,
    borderColor:     '#ECECEC',
    shadowColor:     '#000',
    shadowOpacity:   0.08,
    shadowRadius:    12,
    shadowOffset:    {width: 0, height: 4},
    elevation:       5,
  },
  headerActionIcon: {
    width:      22,
    height:     22,
    resizeMode: 'contain',
  },
  logo: {
    width:  100,
    height: 42,
  },
  storyContainer: {
    paddingLeft:  20,
    paddingRight: 8,
    marginBottom: 28,
  },
  storyWrapper: {
    alignItems:  'center',
    marginRight: 18,
    width:       76,
  },
  storyRing: {
    width:          72,
    height:         72,
    borderRadius:   36,
    borderWidth:    3,
    borderColor:    '#A100C8',
    justifyContent: 'center',
    alignItems:     'center',
    marginBottom:   8,
  },
  storyImage: {
    width:        62,
    height:       62,
    borderRadius: 31,
  },
  plusBadge: {
    position:        'absolute',
    bottom:          -2,
    right:           -2,
    width:           22,
    height:          22,
    borderRadius:    11,
    backgroundColor: '#A100C8',
    justifyContent:  'center',
    alignItems:      'center',
    borderWidth:     2,
    borderColor:     '#FFFFFF',
  },
  plusIcon: {
    width:      10,
    height:     10,
    tintColor:  '#FFFFFF',
    resizeMode: 'contain',
  },
  storyText: {
    fontSize:   12,
    color:      '#111111',
    fontWeight: '500',
  },
  feedContainer: {
    paddingHorizontal: 6,
  },
  postContainer: {
    marginBottom: 32,
  },
  postHeader: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom:      14,
  },
  userRow: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  profileImage: {
    width:        28,
    height:       28,
    borderRadius: 14,
    marginRight:  8,
  },
  username: {
    fontSize:   15,
    color:      '#111111',
    fontWeight: '700',
  },
  verifiedIcon: {
    width:      16,
    height:     16,
    resizeMode: 'contain',
    marginLeft: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  postImage: {
    width:        width - 12,
    height:       height * 0.6,
    borderRadius: 28,
    alignSelf:    'center',
  },
  actionContainer: {
    position: 'absolute',
    right:    18,
    top:      16,
    alignItems: 'center',
  },
  actionButton: {
    width:           46,
    height:          46,
    borderRadius:    23,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
    marginBottom:    14,
  },
  postActionIcon: {
    width:      24,
    height:     24,
    resizeMode: 'contain',
  },
  postFooter: {
    paddingHorizontal: 14,
    marginTop:         14,
  },
  captionTitle: {
    fontSize:     15,
    color:        '#111111',
    fontWeight:   '700',
    marginBottom: 4,
  },
  captionText: {
    fontWeight: '400',
    color:      '#222222',
  },
  tags: {
    fontSize:     13,
    color:        '#8A00B8',
    fontWeight:   '500',
    marginBottom: 6,
  },
  timeText: {
    fontSize:   12,
    color:      '#666666',
    fontWeight: '400',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop:  60,
  },
  emptyText: {
    fontSize:   16,
    color:      '#999999',
    fontWeight: '500',
  },
});
