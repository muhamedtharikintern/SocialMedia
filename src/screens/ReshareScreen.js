import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const GRID_SPACING = 6;
const IMAGE_SIZE = (width - 24) / 3;

export default function ReshareScreen() {
  const [activeTab, setActiveTab] = useState('reshare');

  const highlights = [
    {
      id: 1,
      title: 'New',
      isAdd: true,
    },
    {
      id: 2,
      title: 'Highlights',
      image: require('../../assets/highlight1.png'),
    },
    {
      id: 3,
      title: 'Workout',
      image: require('../../assets/highlight2.png'),
    },
  ];

  const posts = [
    require('../../assets/post_1.png'),
    require('../../assets/post_2.png'),
    require('../../assets/post_3.png'),
    require('../../assets/post_4.png'),
    require('../../assets/post_5.png'),
    require('../../assets/post_6.png'),
    require('../../assets/post_7.png'),
    require('../../assets/post_8.png'),
    require('../../assets/post_9.png'),
    require('../../assets/post_10.png'),
    require('../../assets/post_11.png'),
    require('../../assets/post_12.png'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>

        {/* TOP HEADER */}
        <View style={styles.header}>

          <TouchableOpacity style={styles.circleButton}>
            <Ionicons
              name="add"
              size={34}
              color="#111111"
            />
          </TouchableOpacity>

          <View style={styles.usernameWrapper}>
            <Text style={styles.username}>
              arunvijay
            </Text>

            <Ionicons
              name="checkmark-circle"
              size={22}
              color="#1D9BF0"
              style={styles.verifiedIcon}
            />
          </View>

          <TouchableOpacity style={styles.circleButton}>
            <Feather
              name="settings"
              size={30}
              color="#111111"
            />
          </TouchableOpacity>

        </View>

        {/* PROFILE INFO */}
        <View style={styles.profileSection}>

          <View style={styles.leftProfileSection}>

            <View style={styles.profileRing}>
              <Image
                source={require('../../assets/profile.png')}
                style={styles.profileImage}
              />
            </View>

            <TouchableOpacity style={styles.addStoryButton}>
              <Ionicons
                name="add"
                size={16}
                color="#FFFFFF"
              />
            </TouchableOpacity>

          </View>

          <View style={styles.profileInfo}>

            <Text style={styles.name}>
              Arun Vijay
            </Text>

            <View style={styles.statsRow}>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  15
                </Text>

                <Text style={styles.statLabel}>
                  posts
                </Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  2M
                </Text>

                <Text style={styles.statLabel}>
                  followers
                </Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  23
                </Text>

                <Text style={styles.statLabel}>
                  following
                </Text>
              </View>

            </View>

          </View>

        </View>

        {/* BIO */}
        <View style={styles.bioSection}>

          <Text style={styles.roleText}>
            Actor
          </Text>

          <Text style={styles.bioText}>
            Actor by Profession... Passionate Skydiver!!
          </Text>

        </View>

        {/* BUTTONS */}
        <View style={styles.buttonRow}>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>
              Share Profile
            </Text>
          </TouchableOpacity>

        </View>

        {/* HIGHLIGHTS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.highlightScroll}>

          {highlights.map(item => (
            <View
              key={item.id}
              style={styles.highlightItem}>

              {item.isAdd ? (
                <TouchableOpacity style={styles.addHighlight}>
                  <Ionicons
                    name="add"
                    size={36}
                    color="#A100C8"
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.highlightRing}>
                  <Image
                    source={item.image}
                    style={styles.highlightImage}
                  />
                </View>
              )}

              <Text style={styles.highlightLabel}>
                {item.title}
              </Text>

            </View>
          ))}

        </ScrollView>

        {/* TABS */}
        <View style={styles.tabsContainer}>

          <TouchableOpacity
            onPress={() => setActiveTab('grid')}
            style={styles.tabButton}>

            <MaterialCommunityIcons
              name="view-grid-outline"
              size={34}
              color="#111111"
            />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('reel')}
            style={styles.tabButton}>

            <Ionicons
              name="play-outline"
              size={36}
              color="#111111"
            />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('reshare')}
            style={styles.tabButton}>

            <Ionicons
              name="sync-outline"
              size={38}
              color="#A100C8"
            />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('tagged')}
            style={styles.tabButton}>

            <Ionicons
              name="person-outline"
              size={34}
              color="#111111"
            />

          </TouchableOpacity>

        </View>

        {/* POSTS GRID */}
        <View style={styles.gridWrapper}>

          {posts.map((item, index) => (
            <Image
              key={index}
              source={item}
              style={styles.gridImage}
            />
          ))}

        </View>

      </ScrollView>

      {/* BOTTOM TAB */}
      <View style={styles.bottomTabContainer}>

        <TouchableOpacity style={styles.navIconButton}>
          <Ionicons
            name="home-outline"
            size={30}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navIconButton}>
          <Feather
            name="search"
            size={28}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton}>
          <MaterialCommunityIcons
            name="star-four-points-outline"
            size={32}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navIconButton}>
          <Feather
            name="send"
            size={28}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.activeProfileButton}>
          <Ionicons
            name="person-outline"
            size={30}
            color="#111111"
          />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  scrollContainer: {
    paddingTop: Platform.OS === 'android' ? 22 : 14,
    paddingBottom: 140,
  },

  header: {
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 24,
  },

  circleButton: {
    width: 58,
    height: 58,
    borderRadius: 29,

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

  usernameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  username: {
    fontSize: 22,
    color: '#111111',
    fontWeight: '700',
  },

  verifiedIcon: {
    marginLeft: 8,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,
  },

  leftProfileSection: {
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

    width: 34,
    height: 34,
    borderRadius: 17,

    backgroundColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 22,
  },

  name: {
    fontSize: 24,
    color: '#111111',
    fontWeight: '600',

    marginBottom: 14,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 22,
    color: '#111111',
    fontWeight: '700',

    marginBottom: 4,
  },

  statLabel: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '500',
  },

  bioSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },

  roleText: {
    fontSize: 20,
    color: '#111111',
    fontWeight: '700',

    marginBottom: 8,
  },

  bioText: {
    fontSize: 16,
    color: '#111111',
    lineHeight: 24,
    fontWeight: '500',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    marginTop: 20,
  },

  profileButton: {
    width: '48%',
    height: 48,

    borderRadius: 14,

    backgroundColor: '#EED7F1',

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileButtonText: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '700',
  },

  highlightScroll: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  highlightItem: {
    alignItems: 'center',
    marginRight: 22,
  },

  addHighlight: {
    width: 106,
    height: 106,
    borderRadius: 53,

    backgroundColor: '#FFFFFF',

    borderWidth: 4,
    borderColor: '#A100C8',

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

  highlightLabel: {
    marginTop: 10,

    fontSize: 16,
    color: '#111111',
    fontWeight: '500',
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    marginTop: 20,
    paddingBottom: 16,
  },

  tabButton: {
    padding: 8,
  },

  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingHorizontal: GRID_SPACING / 2,
  },

  gridImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE * 1.28,

    borderRadius: 24,

    margin: GRID_SPACING / 2,

    resizeMode: 'cover',
  },

  bottomTabContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 18,

    alignSelf: 'center',

    width: width * 0.92,
    height: 82,

    backgroundColor: 'rgba(255,255,255,0.88)',

    borderRadius: 30,

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

  navIconButton: {
    width: 58,
    height: 58,
    borderRadius: 29,

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

  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,

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

  activeProfileButton: {
    width: 66,
    height: 66,
    borderRadius: 33,

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