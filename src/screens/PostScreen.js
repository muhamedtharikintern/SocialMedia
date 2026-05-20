import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Platform,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

/* =========================
   ASSETS
========================= */

import backIcon from '../assets/back.png';

import tagPeopleIcon from '../assets/tag_people.png';
import locationIcon from '../assets/location.png';
import musicIcon from '../assets/music.png';

import publicIcon from '../assets/public.png';
import followersIcon from '../assets/followers.png';
import privateIcon from '../assets/private.png';

import arrowRightIcon from '../assets/next.png';
import shareIcon from '../assets/share.png';

import postImage from '../assets/post_image.png';

const PostScreen = ({navigation}) => {
  const [shareToApps, setShareToApps] =
    useState(true);

  const [selectedPrivacy, setSelectedPrivacy] =
    useState('followers');

  const renderPrivacyButton = (
    type,
    icon,
    title,
  ) => {
    const isSelected =
      selectedPrivacy === type;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          setSelectedPrivacy(type)
        }
        style={[
          styles.privacyButton,
          isSelected &&
            styles.activePrivacyButton,
        ]}>

        <Image
          source={icon}
          style={[
            styles.privacyIcon,
            isSelected &&
              styles.activePrivacyIcon,
          ]}
        />

        <Text
          style={[
            styles.privacyText,
            isSelected &&
              styles.activePrivacyText,
          ]}>
          {title}
        </Text>

      </TouchableOpacity>
    );
  };

  const renderActionRow = (
    icon,
    title,
  ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.actionRow}>

        <View style={styles.actionLeft}>

          <Image
            source={icon}
            style={styles.actionIcon}
          />

          <Text style={styles.actionTitle}>
            {title}
          </Text>

        </View>

        <Image
          source={arrowRightIcon}
          style={styles.arrowIcon}
        />

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#F5F5F5"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }>

        {/* =========================
            HEADER
        ========================= */}

        <View style={styles.header}>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.goBack()
            }
            style={styles.backButton}>

            <Image
              source={backIcon}
              style={styles.backIcon}
            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Post
          </Text>

          <View style={styles.headerSpacer} />

        </View>

        {/* =========================
            PREVIEW IMAGE
        ========================= */}

        <Image
          source={postImage}
          style={styles.previewImage}
        />

        {/* =========================
            CAPTION SECTION
        ========================= */}

        <Text style={styles.sectionTitle}>
          Captions & Hasgtags
        </Text>

        <View style={styles.captionCard}>

          <Text style={styles.captionText}>
            “Bathing in sunlight and blooming
            like a sunflower.”
          </Text>

          <Text style={styles.hashTags}>
            #AIArt   #Digitalcreativity
            {'   '}
            #CreateAI
          </Text>

          <Text style={styles.hashTags}>
            #Cinematicvibes
            {'   '}
            #Futuredesign
          </Text>

        </View>

        {/* =========================
            ACTION CARD
        ========================= */}

        <View style={styles.actionCard}>

          {renderActionRow(
            tagPeopleIcon,
            'Tag People',
          )}

          {renderActionRow(
            locationIcon,
            'Add Location',
          )}

          {renderActionRow(
            musicIcon,
            'Add Music',
          )}

        </View>

        {/* =========================
            PRIVACY
        ========================= */}

        <Text style={styles.sectionTitle}>
          Who can see this
        </Text>

        <View style={styles.privacyContainer}>

          {renderPrivacyButton(
            'public',
            publicIcon,
            'Public',
          )}

          {renderPrivacyButton(
            'followers',
            followersIcon,
            'Followers',
          )}

          {renderPrivacyButton(
            'private',
            privateIcon,
            'Private',
          )}

        </View>

        {/* =========================
            SHARE SWITCH
        ========================= */}

        <View style={styles.shareRow}>

          <View style={styles.shareLeft}>

            <Image
              source={shareIcon}
              style={styles.shareIcon}
            />

            <Text style={styles.shareText}>
              Share to other apps
            </Text>

          </View>

          <Switch
            value={shareToApps}
            onValueChange={setShareToApps}
            trackColor={{
              false: '#9E9E9E',
              true: '#22C55E',
            }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#9E9E9E"
          />

        </View>

        {/* =========================
            POST BUTTON
        ========================= */}

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.postButton}>

          <Text style={styles.postButtonText}>
            Post Now
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  scrollContent: {
    paddingBottom: 60,
  },

  /* =========================
      HEADER
  ========================= */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 24,

    paddingTop:
      Platform.OS === 'ios'
        ? 24
        : 20,

    marginBottom: 28,
  },

  backButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

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
    width: 22,
    height: 22,

    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',

    color: '#111111',
  },

  headerSpacer: {
    width: 48,
  },

  /* =========================
      IMAGE
  ========================= */

  previewImage: {
    width: width - 48,
    height: width * 0.58,

    borderRadius: 28,

    alignSelf: 'center',

    marginBottom: 32,
  },

  /* =========================
      TITLES
  ========================= */

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',

    color: '#111111',

    marginHorizontal: 40,
    marginBottom: 20,
  },

  /* =========================
      CAPTION CARD
  ========================= */

  captionCard: {
    width: width - 48,

    alignSelf: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    borderWidth: 2,
    borderColor: '#D86BFF',

    paddingVertical: 36,
    paddingHorizontal: 28,

    marginBottom: 28,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  captionText: {
    fontSize: 18,
    fontWeight: '600',

    color: '#111111',

    textAlign: 'center',

    lineHeight: 34,

    marginBottom: 28,
  },

  hashTags: {
    fontSize: 16,
    fontWeight: '700',

    color: '#111111',

    textAlign: 'center',

    lineHeight: 34,
  },

  /* =========================
      ACTION CARD
  ========================= */

  actionCard: {
    width: width - 48,

    alignSelf: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    borderWidth: 2,
    borderColor: '#D86BFF',

    paddingVertical: 12,

    marginBottom: 36,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 28,
    paddingVertical: 22,
  },

  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIcon: {
    width: 40,
    height: 40,

    resizeMode: 'contain',

    marginRight: 20,
  },

  actionTitle: {
    fontSize: 18,
    fontWeight: '700',

    color: '#111111',
  },

  arrowIcon: {
    width: 20,
    height: 20,

    resizeMode: 'contain',
  },

  /* =========================
      PRIVACY
  ========================= */

  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginHorizontal: 40,
    marginBottom: 40,
  },

  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: (width - 110) / 3,
    height: 50,

    borderRadius: 16,

    borderWidth: 1.5,
    borderColor: '#D86BFF',

    backgroundColor: '#FFFFFF',
  },

  activePrivacyButton: {
    backgroundColor: '#A100C8',
    borderColor: '#A100C8',
  },

  privacyIcon: {
    width: 20,
    height: 20,

    resizeMode: 'contain',

    tintColor: '#D86BFF',

    marginRight: 8,
  },

  activePrivacyIcon: {
    tintColor: '#FFFFFF',
  },

  privacyText: {
    fontSize: 14,
    fontWeight: '700',

    color: '#D86BFF',
  },

  activePrivacyText: {
    color: '#FFFFFF',
  },

  /* =========================
      SHARE ROW
  ========================= */

  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginHorizontal: 40,
    marginBottom: 44,
  },

  shareLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shareIcon: {
    width: 26,
    height: 26,

    resizeMode: 'contain',

    marginRight: 20,
  },

  shareText: {
    fontSize: 18,
    fontWeight: '700',

    color: '#111111',
  },

  /* =========================
      POST BUTTON
  ========================= */

  postButton: {
    width: width - 48,
    height: 68,

    borderRadius: 999,

    backgroundColor: '#A100C8',

    alignSelf: 'center',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  postButtonText: {
    fontSize: 20,
    fontWeight: '700',

    color: '#FFFFFF',
  },
});