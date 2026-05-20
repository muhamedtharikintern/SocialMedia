import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

export default function TagScreen() {
  const [activeTab, setActiveTab] = useState('tagged');

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>

        {/* HEADER */}
        <View style={styles.header}>

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
              size={22}
              color="#1D9BF0"
              style={styles.verifiedBadge}
            />
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Feather
              name="settings"
              size={28}
              color="#111111"
            />
          </TouchableOpacity>

        </View>

        {/* PROFILE SECTION */}
        <View style={styles.profileContainer}>

          <View style={styles.profileImageWrapper}>

            <View style={styles.storyRing}>
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

          <View style={styles.profileStatsContainer}>

            <Text style={styles.profileName}>
              Arun Vijay
            </Text>

            <View style={styles.statsRow}>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  15
                </Text>

                <Text style={styles.statLabel}>
                  posts
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  2M
                </Text>

                <Text style={styles.statLabel}>
                  followers
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>
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
        <View style={styles.bioContainer}>

          <Text style={styles.roleText}>
            Actor
          </Text>

          <Text style={styles.bioText}>
            Actor by Profession... Passionate Skydiver!!
          </Text>

        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionButtonsRow}>

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
          contentContainerStyle={styles.highlightScroll}>

          {highlights.map(item => (
            <View
              key={item.id}
              style={styles.highlightItem}>

              {item.isAdd ? (
                <TouchableOpacity style={styles.newHighlightCircle}>
                  <Ionicons
                    name="add"
                    size={34}
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

              <Text style={styles.highlightTitle}>
                {item.title}
              </Text>

            </View>
          ))}

        </ScrollView>

        {/* PROFILE TABS */}
        <View style={styles.profileTabsContainer}>

          <TouchableOpacity
            style={styles.profileTab}
            onPress={() => setActiveTab('grid')}>

            <MaterialCommunityIcons
              name="view-grid-outline"
              size={34}
              color="#111111"
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileTab}
            onPress={() => setActiveTab('reels')}>

            <Ionicons
              name="play-outline"
              size={38}
              color="#111111"
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileTab}
            onPress={() => setActiveTab('reshare')}>

            <Ionicons
              name="sync-outline"
              size={38}
              color="#111111"
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileTab}
            onPress={() => setActiveTab('tagged')}>

            <Ionicons
              name="person-outline"
              size={34}
              color="#A100C8"
            />

          </TouchableOpacity>

        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* EMPTY TAG SECTION */}
        <View style={styles.emptyContainer}>

          <Text style={styles.emptyTitle}>
            Photos and videos of you
          </Text>

          <Text style={styles.emptyDescription}>
            When people tag you in photos and videos,
            they’ll appear here.
          </Text>

        </View>

      </ScrollView>

      {/* FLOATING BOTTOM NAV */}
      <View style={styles.bottomTabBar}>

        <TouchableOpacity style={styles.bottomIconButton}>
          <Ionicons
            name="home-outline"
            size={30}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomIconButton}>
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

        <TouchableOpacity style={styles.bottomIconButton}>
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
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 140,
  },

  header: {
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 26,
  },

  iconButton: {
    width: 58,
    height: 58,
    borderRadius: 29,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
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
    fontWeight: '700',
    color: '#111111',
  },

  verifiedBadge: {
    marginLeft: 10,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,
  },

  profileImageWrapper: {
    position: 'relative',
  },

  storyRing: {
    width: 110,
    height: 110,
    borderRadius: 55,

    borderWidth: 4,
    borderColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },

  addStoryButton: {
    position: 'absolute',
    right: 2,
    bottom: 2,

    width: 34,
    height: 34,
    borderRadius: 17,

    backgroundColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  profileStatsContainer: {
    flex: 1,
    marginLeft: 20,
  },

  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111111',

    marginBottom: 18,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statItem: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',

    marginBottom: 4,
  },

  statLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111111',
  },

  bioContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
  },

  roleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',

    marginBottom: 8,
  },

  bioText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#111111',
  },

  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    marginTop: 24,
  },

  actionButton: {
    width: '48%',
    height: 50,

    borderRadius: 14,

    backgroundColor: '#EFD9F3',

    justifyContent: 'center',
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },

  highlightScroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  highlightItem: {
    alignItems: 'center',
    marginRight: 24,
  },

  newHighlightCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,

    borderWidth: 4,
    borderColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },

  highlightRing: {
    width: 108,
    height: 108,
    borderRadius: 54,

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

  highlightTitle: {
    marginTop: 12,

    fontSize: 16,
    fontWeight: '500',
    color: '#111111',
  },

  profileTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    marginTop: 28,
    paddingBottom: 18,
  },

  profileTab: {
    padding: 8,
  },

  divider: {
    height: 1,
    backgroundColor: '#D8D8D8',
  },

  emptyContainer: {
    paddingHorizontal: 34,
    paddingTop: 40,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',

    textAlign: 'center',

    marginBottom: 26,
  },

  emptyDescription: {
    fontSize: 18,
    lineHeight: 48,

    color: '#111111',
    fontWeight: '500',
  },

  bottomTabBar: {
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

  bottomIconButton: {
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