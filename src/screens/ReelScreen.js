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

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export default function ReelScreen({navigation}) {
  const [activeTab, setActiveTab] = useState('reels');

  const highlights = [
    {
      id: 1,
      title: 'Highlights',
      image: require('../../assets/highlight1.png'),
    },
    {
      id: 2,
      title: 'Workout',
      image: require('../../assets/highlight2.png'),
    },
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

        {/* HEADER */}
        <View style={styles.headerContainer}>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="add"
              size={34}
              color="#111111"
            />
          </TouchableOpacity>

          <View style={styles.usernameContainer}>

            <Text style={styles.username}>
              arunvijay
            </Text>

            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#1D9BF0"
              style={styles.verifiedIcon}
            />

          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Feather
              name="settings"
              size={30}
              color="#111111"
            />
          </TouchableOpacity>

        </View>

        {/* PROFILE SECTION */}
        <View style={styles.profileSection}>

          <View style={styles.profileImageContainer}>

            <View style={styles.profileRing}>
              <Image
                source={require('../../assets/profile.png')}
                style={styles.profileImage}
              />
            </View>

            <TouchableOpacity style={styles.addStoryButton}>
              <Ionicons
                name="add"
                size={18}
                color="#FFFFFF"
              />
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

        {/* BUTTONS */}
        <View style={styles.actionContainer}>

          <TouchableOpacity style={styles.actionButton}>
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
              <Ionicons
                name="add"
                size={34}
                color="#A100C8"
              />
            </TouchableOpacity>

            <Text style={styles.highlightText}>
              New
            </Text>

          </View>

          {highlights.map(item => (
            <View
              key={item.id}
              style={styles.highlightWrapper}>

              <View style={styles.highlightRing}>
                <Image
                  source={item.image}
                  style={styles.highlightImage}
                />
              </View>

              <Text style={styles.highlightText}>
                {item.title}
              </Text>

            </View>
          ))}

        </ScrollView>

        {/* TABS */}
        <View style={styles.tabContainer}>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab('posts')}>

            <MaterialCommunityIcons
              name="view-grid-outline"
              size={34}
              color="#111111"
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab('reels')}>

            <Ionicons
              name="play-outline"
              size={36}
              color="#A100C8"
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab('tagged')}>

            <Ionicons
              name="sync-outline"
              size={36}
              color="#111111"
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab('saved')}>

            <Ionicons
              name="person-outline"
              size={34}
              color="#111111"
            />

          </TouchableOpacity>

        </View>

        {/* EMPTY REEL SECTION */}
        <View style={styles.emptySection}>

          <Text style={styles.emptyTitle}>
            Share a moment with the world
          </Text>

          <LinearGradient
            colors={['#D783FF', '#C65BFF', '#A100C8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.createButton}>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.createButtonInner}>

              <Text style={styles.createButtonText}>
                Create your first reel
              </Text>

            </TouchableOpacity>

          </LinearGradient>

        </View>

      </ScrollView>

      {/* FLOATING NAVIGATION */}
      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="home-outline"
            size={32}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Feather
            name="search"
            size={28}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerNavButton}>
          <MaterialCommunityIcons
            name="star-four-points-outline"
            size={32}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Feather
            name="send"
            size={28}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.activeProfileButton}>
          <Ionicons
            name="person-outline"
            size={32}
            color="#111111"
          />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  scrollContainer: {
    paddingTop: Platform.OS === 'android' ? 26 : 18,
    paddingBottom: 180,
  },

  headerContainer: {
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 28,
  },

  iconButton: {
    width: 62,
    height: 62,
    borderRadius: 31,

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
    fontSize: 24,
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
    width: 112,
    height: 112,
    borderRadius: 56,

    borderWidth: 4,
    borderColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 98,
    height: 98,
    borderRadius: 49,
  },

  addStoryButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,

    width: 34,
    height: 34,
    borderRadius: 17,

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

    marginLeft: 24,
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

  bioContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  nameText: {
    fontSize: 20,
    color: '#111111',
    fontWeight: '700',
    marginBottom: 6,
  },

  roleText: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '700',
    marginBottom: 6,
  },

  bioText: {
    fontSize: 16,
    color: '#111111',
    lineHeight: 24,
    fontWeight: '500',
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    marginTop: 24,
  },

  actionButton: {
    width: '48%',
    height: 52,

    backgroundColor: '#EFDDF2',

    borderRadius: 16,

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
    paddingTop: 28,
  },

  highlightWrapper: {
    alignItems: 'center',
    marginRight: 24,
  },

  newHighlight: {
    width: 106,
    height: 106,
    borderRadius: 53,

    borderWidth: 4,
    borderColor: '#A100C8',

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  highlightRing: {
    width: 106,
    height: 106,
    borderRadius: 53,

    borderWidth: 4,
    borderColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',
  },

  highlightImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },

  highlightText: {
    marginTop: 12,

    fontSize: 16,
    color: '#111111',
    fontWeight: '500',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    marginTop: 28,
    paddingBottom: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },

  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  emptySection: {
    alignItems: 'center',
    marginTop: 44,
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 28,
    color: '#111111',
    fontWeight: '700',

    textAlign: 'center',
    lineHeight: 38,

    marginBottom: 44,
  },

  createButton: {
    width: width * 0.72,
    height: 68,

    borderRadius: 24,

    justifyContent: 'center',
    alignItems: 'center',
  },

  createButtonInner: {
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  createButtonText: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '700',
  },

  bottomNav: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 20,

    alignSelf: 'center',

    width: width * 0.90,
    height: 88,

    backgroundColor: 'rgba(255,255,255,0.92)',

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

  activeProfileButton: {
    width: 64,
    height: 64,
    borderRadius: 32,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: -52,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 7,
  },

  centerNavButton: {
    width: 66,
    height: 66,
    borderRadius: 33,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

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