import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ReelScreen    from './ReelScreen';
import ReshareScreen from './ReshareScreen';
import TagScreen     from './TagScreen';

const {width}  = Dimensions.get('window');
const BASE_URL = 'https://deffovibeo.duckdns.org';

import defaultAvatar from '../assets/profile.png';

export default function ProfileScreen({navigation}) {
  const [activeTab,    setActiveTab]    = useState('posts');
  const [posts,        setPosts]        = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // profile state
  const [profile,        setProfile]        = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const highlights = [
    {id: 1, title: 'Highlights', image: require('../assets/highlight1.png')},
    {id: 2, title: 'Workout',    image: require('../assets/highlight2.png')},
  ];

  /* =========================
      FETCH PROFILE
  ========================= */

  const fetchProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const res  = await fetch(`${BASE_URL}/user/profile`, {
        method:  'GET',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      setProfile(data.user);
    } catch (err) {
      console.error('Profile fetch error:', err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  /* =========================
      FETCH USER POSTS
  ========================= */

  const fetchUserPosts = useCallback(async () => {
    try {
      setLoadingPosts(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Session expired. Please login again.');
        return;
      }

      const res  = await fetch(`${BASE_URL}/posts/my-posts`, {
        method:  'GET',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Failed to fetch posts');
      setPosts(data.posts);
    } catch (err) {
      console.error('Fetch posts error:', err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  // refetch both profile + posts every time screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile();
      fetchUserPosts();
    });
    return unsubscribe;
  }, [navigation, fetchProfile, fetchUserPosts]);

  /* =========================
      DERIVED VALUES
  ========================= */

  const avatarSource = profile?.avatar
    ? {uri: profile.avatar}
    : defaultAvatar;

  const displayName     = profile?.name     ?? '';
  const displayUsername = profile?.username ?? '';
  const displayBio      = profile?.bio      ?? '';

  /* =========================
      RENDER
  ========================= */

  if (loadingProfile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#A100C8" style={{marginTop: 80}} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F3F4F6" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>

        {/* TOP BAR */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('CreatePostScreen')}>
            <Image
              source={require('../assets/add.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>

          {/* shows real username from server */}
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{displayUsername}</Text>
            <Image
              source={require('../assets/verified.png')}
              style={{height: 24, width: 24, resizeMode: 'contain'}}
            />
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('SettingsScreen')}>
            <Image
              source={require('../assets/settings.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>

        {/* PROFILE SECTION */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileRing}>
              {/* shows real avatar from server */}
              <Image
                source={avatarSource}
                style={styles.profileImage}
              />
            </View>
            <TouchableOpacity style={styles.addStoryButton}>
              <Image
                source={require('../assets/plus_circle.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{posts.length}</Text>
              <Text style={styles.statLabel}>posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile?.followersCount ?? 0}
              </Text>
              <Text style={styles.statLabel}>followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile?.followingCount ?? 0}
              </Text>
              <Text style={styles.statLabel}>following</Text>
            </View>
          </View>
        </View>

        {/* BIO */}
        <View style={styles.bioContainer}>
          {/* shows real name from server */}
          {displayName ? (
            <Text style={styles.nameText}>{displayName}</Text>
          ) : null}

          {/* shows real bio from server */}
          {displayBio ? (
            <Text style={styles.bioText}>{displayBio}</Text>
          ) : null}
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('EditProfileScreen')}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        {/* HIGHLIGHTS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.highlightContainer}>
          <View style={styles.highlightWrapper}>
            <TouchableOpacity style={styles.newHighlight}>
              <Image
                source={require('../assets/plus_circle.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={styles.highlightText}>New</Text>
          </View>

          {highlights.map(item => (
            <View key={item.id} style={styles.highlightWrapper}>
              <Image source={item.image} style={styles.highlightImage} />
              <Text style={styles.highlightText}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab('posts')}>
            <Image
              source={require('../assets/posts.png')}
              style={[styles.tabIcon, activeTab === 'posts' && styles.activeTabIcon]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab('reels')}>
            <Image
              source={require('../assets/reels.png')}
              style={[styles.tabIcon, activeTab === 'reels' && styles.activeTabIcon]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab('reshared')}>
            <Image
              source={require('../assets/reshares.png')}
              style={[styles.tabIcon, activeTab === 'reshared' && styles.activeTabIcon]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab('tagged')}>
            <Image
              source={require('../assets/tagged.png')}
              style={[styles.tabIcon, activeTab === 'tagged' && styles.activeTabIcon]}
            />
          </TouchableOpacity>
        </View>

        {/* TAB CONTENT */}
        <View style={styles.tabContent}>

          {activeTab === 'posts' && (
            <>
              {loadingPosts ? (
                <ActivityIndicator size="large" color="#FDBB67" style={{marginTop: 40}} />
              ) : posts.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No posts yet</Text>
                </View>
              ) : (
                <View style={styles.gridContainer}>
                  {posts.map((post, index) => (
                    <Image
                      key={post._id ?? index}
                      source={{uri: post.media[0].url}}
                      style={styles.postImage}
                    />
                  ))}
                </View>
              )}
            </>
          )}

          {activeTab === 'reels'    && <ReelScreen />}
          {activeTab === 'reshared' && <ReshareScreen />}
          {activeTab === 'tagged'   && <TagScreen />}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const imageSize = (width - 12) / 3;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    paddingTop:    Platform.OS === 'android' ? 26 : 18,
    paddingBottom: 160,
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    marginBottom:      26,
  },
  iconButton: {
    width:           56,
    height:          56,
    borderRadius:    28,
    backgroundColor: '#FFFFFF',
    justifyContent:  'center',
    alignItems:      'center',
    shadowColor:     '#000',
    shadowOpacity:   0.08,
    shadowRadius:    10,
    shadowOffset:    {width: 0, height: 4},
    elevation:       5,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  username: {
    fontSize:   22,
    color:      '#111111',
    fontWeight: '700',
  },
  profileSection: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileRing: {
    width:          108,
    height:         108,
    borderRadius:   54,
    borderWidth:    4,
    borderColor:    '#FDBB67',
    justifyContent: 'center',
    alignItems:     'center',
  },
  profileImage: {
    width:        94,
    height:       94,
    borderRadius: 47,
  },
  addStoryButton: {
    position:        'absolute',
    bottom:          2,
    right:           2,
    width:           32,
    height:          32,
    borderRadius:    16,
    backgroundColor: '#FDBB67',
    justifyContent:  'center',
    alignItems:      'center',
    borderWidth:     3,
    borderColor:     '#FFFFFF',
  },
  statsContainer: {
    flex:           1,
    flexDirection:  'row',
    justifyContent: 'space-around',
    marginLeft:     20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize:     24,
    color:        '#111111',
    fontWeight:   '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize:   16,
    color:      '#111111',
    fontWeight: '500',
  },
  bioContainer: {
    paddingHorizontal: 20,
    marginTop:         18,
  },
  nameText: {
    fontSize:     18,
    color:        '#111111',
    fontWeight:   '700',
    marginBottom: 6,
  },
  bioText: {
    fontSize:   15,
    color:      '#111111',
    lineHeight: 22,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection:     'row',
    justifyContent:    'space-between',
    paddingHorizontal: 20,
    marginTop:         22,
  },
  actionButton: {
    width:           '48%',
    height:          48,
    backgroundColor: '#FDBB67',
    borderRadius:    14,
    justifyContent:  'center',
    alignItems:      'center',
  },
  actionButtonText: {
    fontSize:   16,
    color:      '#111111',
    fontWeight: '700',
  },
  highlightContainer: {
    paddingHorizontal: 20,
    paddingTop:        24,
  },
  highlightWrapper: {
    alignItems:  'center',
    marginRight: 20,
  },
  newHighlight: {
    width:           100,
    height:          100,
    borderRadius:    50,
    borderWidth:     4,
    borderColor:     '#FDBB67',
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: '#FFFFFF',
  },
  highlightImage: {
    width:        100,
    height:       100,
    borderRadius: 50,
  },
  highlightText: {
    marginTop:  10,
    fontSize:   15,
    color:      '#111111',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection:     'row',
    justifyContent:    'space-around',
    alignItems:        'center',
    marginTop:         28,
    marginBottom:      18,
    paddingHorizontal: 12,
  },
  tabButton: {
    paddingVertical:   8,
    paddingHorizontal: 12,
  },
  tabIcon: {
    width:      30,
    height:     30,
    resizeMode: 'contain',
    opacity:    0.45,
  },
  activeTabIcon: {
    opacity:   1,
    tintColor: '#FDBB67',
  },
  tabContent: {
    marginTop: 10,
  },
  gridContainer: {
    flexDirection:  'row',
    flexWrap:       'wrap',
    justifyContent: 'space-between',
  },
  postImage: {
    width:        imageSize,
    height:       imageSize * 1.28,
    borderRadius: 24,
    marginBottom: 6,
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