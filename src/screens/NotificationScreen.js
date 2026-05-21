import React, {useMemo, useState} from 'react';
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
  Platform,
} from 'react-native';

const {width} = Dimensions.get('window');

/* =========================
   PNG ICONS FROM ASSETS
========================= */

import backIcon from '../assets/back.png';

/* =========================
   LOCAL IMAGE ASSETS
========================= */

import profile1 from '../assets/profile1.png';
import profile2 from '../assets/profile2.png';
import profile3 from '../assets/profile3.png';
import profile4 from '../assets/profile4.png';
 import profile5 from '../assets/profile5.png';
// import profile6 from '../assets/profile6.png';

import postImage from '../assets/post1.png';

const NotificationsScreen = ({navigation}) => {
  const [followingUsers, setFollowingUsers] = useState([]);

  const notificationsData = useMemo(
    () => [
      {
        id: 1,
        type: 'follow',
        user: 'Elena Vance',
        text: 'Started Following You.',
        time: '5d',
        profile: profile1,
      },

      {
        id: 2,
        type: 'suggestion',
        title: 'New Follow Suggestion:',
        user: 'Marks_martin',
        text: 'You have 6 mutuals.',
        time: '6d',
        profile: profile2,
      },

      {
        id: 3,
        type: 'likedPost',
        user: 'Noah',
        text: 'Liked your post',
        time: '5d',
        profile: profile3,
        post: postImage,
      },

      {
        id: 4,
        section: 'Last 7 days',
      },

      {
        id: 5,
        type: 'likedPost',
        user: 'James',
        text: 'Liked your post',
        time: '8d',
        profile: profile4,
        post: postImage,
      },

      {
        id: 6,
        type: 'story',
        user: 'James, dwayne_johnson',
        text: 'and 13 others liked your story',
        time: '9d',
        profile: profile5,
        post: postImage,
      },

      {
        id: 7,
        section: 'Last 30 days',
      },

    //   {
    //     id: 8,
    //     type: 'suggestion',
    //     title: 'New Follow Suggestion:',
    //     user: 'Marks',
    //     text: 'You have 2 mutuals.',
    //     time: '2w',
    //     profile: profile6,
    //   },

      {
        id: 9,
        type: 'likedPost',
        user: 'Roman',
        text: 'Liked your post',
        time: '3w',
        profile: profile4,
        post: postImage,
      },

      {
        id: 10,
        type: 'story',
        user: 'Vin diesel, dwayne_johnson',
        text: 'and 12 others liked your story',
        time: '6w',
        profile: profile2,
      },
    ],
    [],
  );

  const toggleFollow = id => {
    if (followingUsers.includes(id)) {
      setFollowingUsers(
        followingUsers.filter(item => item !== id),
      );
    } else {
      setFollowingUsers([...followingUsers, id]);
    }
  };

  const renderNotification = item => {
    if (item.section) {
      return (
        <View
          key={item.id}
          style={styles.sectionWrapper}>

          <Text style={styles.sectionTitle}>
            {item.section}
          </Text>

        </View>
      );
    }

    return (
      <View
        key={item.id}
        style={styles.notificationCard}>

        {/* LEFT SIDE */}

        <View style={styles.leftSection}>

          <Image
            source={item.profile}
            style={styles.profileImage}
          />

          <View style={styles.contentContainer}>

            {item.type === 'suggestion' ? (
              <>
                <Text style={styles.suggestionTitle}>
                  {item.title}
                </Text>

                <Text style={styles.notificationText}>
                  <Text style={styles.boldText}>
                    {item.user}{' '}
                  </Text>

                  {item.text}
                </Text>
              </>
            ) : (
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>
                  {item.user}{' '}
                </Text>

                {item.text}
              </Text>
            )}

            <Text style={styles.timeText}>
              {item.time}
            </Text>

          </View>

        </View>

        {/* RIGHT SIDE */}

        {item.type === 'suggestion' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.followButton,
              followingUsers.includes(item.id) &&
                styles.followingButton,
            ]}
            onPress={() => toggleFollow(item.id)}>

            <Text
              style={[
                styles.followButtonText,
                followingUsers.includes(item.id) &&
                  styles.followingText,
              ]}>

              {followingUsers.includes(item.id)
                ? 'Following'
                : 'Follow'}

            </Text>

          </TouchableOpacity>
        ) : item.post ? (
          <Image
            source={item.post}
            style={styles.postPreview}
          />
        ) : null}

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>

          <Image
            source={backIcon}
            style={styles.backIcon}
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Notifications
        </Text>

        <View style={styles.emptySpace} />

      </View>

      {/* CONTENT */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>

        {notificationsData.map(renderNotification)}

      </ScrollView>

    </SafeAreaView>
  );
};

export default NotificationsScreen;

/* =========================
   APP NAVIGATOR
========================= */

/*

import NotificationsScreen from '../screens/NotificationsScreen';

<Stack.Screen
  name="NotificationsScreen"
  component={NotificationsScreen}
  options={{headerShown: false}}
/>

*/

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + 8
        : 0,
  },

  header: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,

    paddingTop: 12,
    paddingBottom: 20,
  },

  backButton: {
    width: 52,
    height: 52,
    borderRadius: 26,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

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

  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 24,
    color: '#111111',
    fontWeight: '700',
  },

  emptySpace: {
    width: 52,
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },

  notificationCard: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 32,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    flex: 1,
    paddingRight: 16,
  },

  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,

    marginRight: 16,
  },

  contentContainer: {
    flex: 1,
  },

  notificationText: {
    fontSize: 16,
    color: '#777777',
    lineHeight: 24,
    fontWeight: '500',
  },

  boldText: {
    color: '#111111',
    fontWeight: '700',
  },

  suggestionTitle: {
    fontSize: 16,
    color: '#777777',
    fontWeight: '500',

    marginBottom: 4,
  },

  timeText: {
    fontSize: 14,
    color: '#777777',
    fontWeight: '500',

    marginTop: 4,
  },

  followButton: {
    minWidth: 100,
    height: 44,

    borderRadius: 14,

    backgroundColor: '#1D9BF0',

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 20,
  },

  followingButton: {
    backgroundColor: '#ECECEC',
  },

  followButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  followingText: {
    color: '#111111',
  },

  postPreview: {
    width: 72,
    height: 72,

    borderRadius: 12,
  },

  sectionWrapper: {
    marginTop: 8,
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 20,
    color: '#111111',
    fontWeight: '700',
  },
});