import React, {useState} from 'react';
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
} from 'react-native';

import ReelScreen from './ReelScreen';
import ReshareScreen from './ReshareScreen';
import TagScreen from './TagScreen';

const {width} = Dimensions.get('window');

export default function ProfileScreen({navigation}) {
 const [activeTab, setActiveTab] = useState('posts');

  const highlights = [
    {
      id: 1,
      title: 'Highlights',
      image: require('../assets/highlight1.png'),
    },
    {
      id: 2,
      title: 'Workout',
      image: require('../assets/highlight2.png'),
    },
  ];

  const posts = [
    require('../assets/post1.png'),
    require('../assets/post2.png'),
    require('../assets/post3.png'),
    require('../assets/post4.png'),
    require('../assets/post5.png'),
    require('../assets/post_6.png'),
    require('../assets/post_7.png'),
    require('../assets/post_8.png'),
    require('../assets/post_9.png'),
    require('../assets/post_10.png'),
    require('../assets/post_11.png'),
    require('../assets/post_12.png'),
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>

        {/* TOP BAR */}
        <View style={styles.headerContainer}>

          <TouchableOpacity style={styles.iconButton}
          onPress={()=> navigation.navigate("CreatePostScreen")}>
            <Image
           source={require('../assets/add.png')}
           style={{height:30,width:30,resizeMode:"contain"}}/>
          </TouchableOpacity>

          <View style={styles.usernameContainer}>

            <Text style={styles.username}>
              arunvijay
            </Text>

              <Image
           source={require('../assets/verified.png')}
           style={{height:24,width:24,resizeMode:"contain"}}/>

          </View>

          <TouchableOpacity style={styles.iconButton}
          onPress={()=> navigation.navigate("SettingsScreen")}>
             <Image
           source={require('../assets/settings.png')}
           style={{height:30,width:30,resizeMode:"contain"}}/>
          </TouchableOpacity>

        </View>

        {/* PROFILE SECTION */}
        <View style={styles.profileSection}>

          <View style={styles.profileImageContainer}>

            <View style={styles.profileRing}>
              <Image
                source={require('../assets/profile.png')}
                style={styles.profileImage}
              />
            </View>

            <TouchableOpacity style={styles.addStoryButton}>

            <Image
           source={require('../assets/plus_circle.png')}
           style={{height:18,width:18,resizeMode:"contain"}}/>
            </TouchableOpacity>

          </View>

          <View style={styles.statsContainer}>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>posts</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2M</Text>
              <Text style={styles.statLabel}>followers</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>following</Text>
            </View>

          </View>

        </View>

        {/* BIO */}
        <View style={styles.bioContainer}>

          <Text style={styles.nameText}>
            Arun Vijay
          </Text>

          <Text style={styles.roleText}>
            Actor
          </Text>

          <Text style={styles.bioText}>
            Actor by Profession... Passionate Skydiver!!
          </Text>

        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionContainer}>

          <TouchableOpacity style={styles.actionButton}
          onPress={()=> navigation.navigate("EditProfileScreen")}>
            <Text style={styles.actionButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>
              Share Profile
            </Text>
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
            style={{height:30,width:30,resizeMode:"contain"}}/>
            </TouchableOpacity>

            <Text style={styles.highlightText}>
              New
            </Text>

          </View>

          {highlights.map(item => (
            <View
              key={item.id}
              style={styles.highlightWrapper}>

              <Image
                source={item.image}
                style={styles.highlightImage}
              />

              <Text style={styles.highlightText}>
                {item.title}
              </Text>

            </View>
          ))}

        </ScrollView>

    <View style={styles.tabContainer}>

              {/* POSTS */}
              <TouchableOpacity
                style={styles.tabButton}
                onPress={() =>
                  setActiveTab('posts')
                }>

                <Image
                  source={require('../assets/posts.png')}
                  style={[
                    styles.tabIcon,
                    activeTab === 'posts' &&
                      styles.activeTabIcon,
                  ]}
                />
              </TouchableOpacity>

              {/* REELS */}
              <TouchableOpacity
                style={styles.tabButton}
                onPress={() =>
                  setActiveTab('reels')
                }>

                <Image
                  source={require('../assets/reels.png')}
                  style={[
                    styles.tabIcon,
                    activeTab === 'reels' &&
                      styles.activeTabIcon,
                  ]}
                />
              </TouchableOpacity>

              {/* RESHARED */}
              <TouchableOpacity
                style={styles.tabButton}
                onPress={() =>
                  setActiveTab('reshared')
                }>

                <Image
                  source={require('../assets/reshares.png')}
                  style={[
                    styles.tabIcon,
                    activeTab ===
                      'reshared' &&
                      styles.activeTabIcon,
                  ]}
                />
              </TouchableOpacity>

              {/* TAGGED */}
              <TouchableOpacity
                style={styles.tabButton}
                onPress={() =>
                  setActiveTab('tagged')
                }>

                <Image
                  source={require('../assets/tagged.png')}
                  style={[
                    styles.tabIcon,
                    activeTab === 'tagged' &&
                      styles.activeTabIcon,
                  ]}
                />
              </TouchableOpacity>

            </View>

              <View style={styles.tabContent}>

              {/* POSTS */}
              {activeTab === 'posts' && (
                <View style={styles.gridContainer}>
                  {posts.map((item, index) => (
                    <Image
                      key={index}
                      source={item}
                      style={styles.postImage}
                    />
                  ))}
                </View>
              )}

              {/* REELS */}
              {activeTab === 'reels' && (
                <ReelScreen />
              )}

              {/* RESHARED */}
              {activeTab === 'reshared' && (
                <ReshareScreen />
              )}

              {/* TAGGED */}
              {activeTab === 'tagged' && (
                <TagScreen />
              )}

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
    paddingTop: Platform.OS === 'android' ? 26 : 18,
    paddingBottom: 160,
  },

  headerContainer: {
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 26,
  },

  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  username: {
    fontSize: 22,
    color: '#111111',
    fontWeight: '700',
  },

  verifiedIcon: {
    marginLeft: 10,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,
  },

  profileImageContainer: {
    position: 'relative',
  },

  profileRing: {
    width: 108,
    height: 108,
    borderRadius: 54,

    borderWidth: 4,
    borderColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },

  addStoryButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,

    width: 32,
    height: 32,
    borderRadius: 16,

    backgroundColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  statsContainer: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-around',

    marginLeft: 20,
  },

  statItem: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 24,
    color: '#111111',
    fontWeight: '700',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '500',
  },
  tabContent: {
  marginTop: 10,
},

tabIcon: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
  opacity: 0.45,
},

activeTabIcon: {
  opacity: 1,
  tintColor: '#A100C8',
},

  bioContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
  },

  nameText: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '700',
    marginBottom: 6,
  },

  roleText: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '600',
    marginBottom: 4,
  },

  bioText: {
    fontSize: 15,
    color: '#111111',
    lineHeight: 22,
    fontWeight: '500',
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    marginTop: 22,
  },

  actionButton: {
    width: '48%',
    height: 48,

    backgroundColor: '#EFDDF2',

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '700',
  },

  highlightContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  highlightWrapper: {
    alignItems: 'center',
    marginRight: 20,
  },

  newHighlight: {
    width: 100,
    height: 100,
    borderRadius: 50,

    borderWidth: 4,
    borderColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },

  highlightImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  highlightText: {
    marginTop: 10,

    fontSize: 15,
    color: '#111111',
    fontWeight: '500',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    marginTop: 28,
    marginBottom: 18,

    paddingHorizontal: 12,
  },

  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  postImage: {
    width: imageSize,
    height: imageSize * 1.28,

    borderRadius: 24,

    marginBottom: 6,
  },

  bottomNav: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 26 : 18,

    alignSelf: 'center',

    width: width * 0.92,
    height: 88,

    backgroundColor: 'rgba(255,255,255,0.88)',

    borderRadius: 32,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    borderWidth: 1,
    borderColor: '#DADADA',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  navButton: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  centerNavButton: {
    width: 70,
    height: 70,
    borderRadius: 35,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: -48,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 7,
  },
});