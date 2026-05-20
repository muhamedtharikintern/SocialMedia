import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';

const {width, height} = Dimensions.get('window');

/* =========================
   ASSETS
========================= */

import liveBg from '../assets/live_bg.png';

import profileImage from '../assets/profile1.png';

import closeIcon from '../assets/close.png';
import heartIcon from '../assets/heart.png';
import sendIcon from '../assets/send.png';
import dualSmileIcon from '../assets/dual_smile.png';
import questionIcon from '../assets/question.png';
import moreIcon from '../assets/more.png';

const liveScreen = ({navigation}) => {
  const [comment, setComment] = useState('');

  const reactions = [
    'Hello',
    '😂',
    '😍',
    '👋',
    '👍',
    '😂😂😂',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#1E1E1E"
        barStyle="light-content"
      />

      {/* =========================
          LIVE IMAGE
      ========================= */}

      <Image
        source={liveBg}
        style={styles.liveImage}
        resizeMode="cover"
      />

      {/* =========================
          TOP BAR
      ========================= */}

      <View style={styles.topBar}>

        {/* LEFT */}

        <View style={styles.leftHeader}>

          <Image
            source={profileImage}
            style={styles.profileImage}
          />

          <Text style={styles.username}>
            maxjacobson
          </Text>

        </View>

        {/* RIGHT */}

        <View style={styles.rightHeader}>

          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>
              LIVE
            </Text>
          </View>

          <View style={styles.viewerBadge}>

            <View style={styles.viewerDot} />

            <Text style={styles.viewerText}>
              1
            </Text>

          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.goBack()
            }
            style={styles.closeButton}>

            <Image
              source={closeIcon}
              style={styles.closeIcon}
            />

          </TouchableOpacity>

        </View>

      </View>

      {/* =========================
          JOINED MESSAGE
      ========================= */}

      <View style={styles.joinedContainer}>

        <Image
          source={profileImage}
          style={styles.joinedImage}
        />

        <Text style={styles.joinedText}>
          karenne joined
        </Text>

      </View>

      {/* =========================
          REQUEST CARD
      ========================= */}

      <View style={styles.requestCard}>

        <View style={styles.requestLeft}>

          <Image
            source={profileImage}
            style={styles.requestProfile}
          />

          <Text style={styles.requestText}>
            Send a request to be in{'\n'}
            maxjacobson's live video.
          </Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.requestButton}>

          <Text style={styles.requestButtonText}>
            Request
          </Text>

        </TouchableOpacity>

      </View>

      {/* =========================
          REACTIONS
      ========================= */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reactionScroll}>

        {reactions.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={styles.reactionPill}>

            <Text style={styles.reactionText}>
              {item}
            </Text>

          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* =========================
          BOTTOM ACTION BAR
      ========================= */}

      <View style={styles.bottomContainer}>

        {/* COMMENT */}

        <View style={styles.commentWrapper}>

          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Comment"
            placeholderTextColor="#E8E8E8"
            style={styles.commentInput}
          />

          <TouchableOpacity
            activeOpacity={0.8}>

            <Image
              source={moreIcon}
              style={styles.moreIcon}
            />

          </TouchableOpacity>

        </View>

        {/* ACTIONS */}

        <View style={styles.actionsContainer}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={questionIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={sendIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={heartIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}>

            <Image
              source={dualSmileIcon}
              style={styles.actionIcon}
            />

          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default liveScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1F1F1F',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  liveImage: {
    width: width,
    height: height * 0.86,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  /* =========================
      TOP BAR
  ========================= */

  topBar: {
    position: 'absolute',

    top:
      Platform.OS === 'ios'
        ? 58
        : 42,

    left: 20,
    right: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 54,
    height: 54,

    borderRadius: 27,
  },

  username: {
    color: '#FFFFFF',

    fontSize: 17,
    fontWeight: '700',

    marginLeft: 14,
  },

  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  liveBadge: {
    backgroundColor: '#1D9BF0',

    paddingHorizontal: 20,
    paddingVertical: 14,

    borderRadius: 12,

    marginRight: 12,
  },

  liveText: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '700',
  },

  viewerBadge: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor:
      'rgba(0,0,0,0.28)',

    paddingHorizontal: 18,
    paddingVertical: 14,

    borderRadius: 12,

    marginRight: 14,
  },

  viewerDot: {
    width: 12,
    height: 12,

    borderRadius: 6,

    backgroundColor: '#FFFFFF',

    marginRight: 8,
  },

  viewerText: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '600',
  },

  closeButton: {
    width: 44,
    height: 44,

    justifyContent: 'center',
    alignItems: 'center',
  },

  closeIcon: {
    width: 28,
    height: 28,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  /* =========================
      JOINED
  ========================= */

  joinedContainer: {
    position: 'absolute',

    left: 20,

    bottom: 310,

    flexDirection: 'row',
    alignItems: 'center',
  },

  joinedImage: {
    width: 54,
    height: 54,

    borderRadius: 27,

    marginRight: 14,
  },

  joinedText: {
    color: '#FFFFFF',

    fontSize: 17,
    fontWeight: '600',
  },

  /* =========================
      REQUEST CARD
  ========================= */

  requestCard: {
    position: 'absolute',

    left: 12,
    right: 12,

    bottom: 220,

    height: 92,

    borderRadius: 24,

    backgroundColor:
      'rgba(185, 210, 245, 0.42)',

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.14)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    overflow: 'hidden',
  },

  requestLeft: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,

    paddingHorizontal: 14,
  },

  requestProfile: {
    width: 50,
    height: 50,

    borderRadius: 25,

    marginRight: 14,
  },

  requestText: {
    color: '#FFFFFF',

    fontSize: 16,
    lineHeight: 24,

    fontWeight: '500',
  },

  requestButton: {
    width: 160,
    height: '100%',

    borderLeftWidth: 1,
    borderLeftColor:
      'rgba(255,255,255,0.18)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  requestButtonText: {
    color: '#FFFFFF',

    fontSize: 18,
    fontWeight: '700',
  },

  /* =========================
      REACTIONS
  ========================= */

  reactionScroll: {
    position: 'absolute',

    left: 12,

    bottom: 145,

    paddingRight: 24,
  },

  reactionPill: {
    minWidth: 100,
    height: 76,

    borderRadius: 999,

    paddingHorizontal: 26,

    marginRight: 16,

    backgroundColor:
      'rgba(255,255,255,0.16)',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.06)',
  },

  reactionText: {
    color: '#FFFFFF',

    fontSize: 20,
    fontWeight: '500',
  },

  /* =========================
      BOTTOM
  ========================= */

  bottomContainer: {
    position: 'absolute',

    left: 20,
    right: 20,

    bottom:
      Platform.OS === 'ios'
        ? 34
        : 24,

    flexDirection: 'row',
    alignItems: 'center',
  },

  commentWrapper: {
    flex: 1,

    height: 92,

    borderRadius: 999,

    backgroundColor:
      'rgba(0,0,0,0.36)',

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.08)',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 28,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 10,
  },

  commentInput: {
    flex: 1,

    color: '#FFFFFF',

    fontSize: 18,
    fontWeight: '500',
  },

  moreIcon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 16,
  },

  actionButton: {
    marginLeft: 16,
  },

  actionIcon: {
    width: 46,
    height: 46,

    resizeMode: 'contain',

    tintColor: '#FFFFFF',
  },
});