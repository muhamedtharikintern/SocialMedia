import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

/* =========================
   PNG ASSETS
========================= */

import searchIcon from '../assets/search_2.png';
import editIcon from '../assets/edit.png';
import cameraIcon from '../assets/camera.png';


import verifiedIcon from '../assets/verified.png';
import plusIcon from '../assets/plus.png';

import story1 from '../assets/story1.png';
import story2 from '../assets/story2.png';
import story3 from '../assets/story3.png';
import story4 from '../assets/story4.png';

import chat1 from '../assets/story2.png';
import chat2 from '../assets/chat2.png';
import chat3 from '../assets/chat3.png';
import chat4 from '../assets/chat4.png';
import chat5 from '../assets/chat5.png';
import chat6 from '../assets/chat6.png';
import chat7 from '../assets/chat7.png';

const ChatScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  const stories = [
    {
      id: 1,
      name: 'Your Story',
      image: story1,
      own: true,
    },
    {
      id: 2,
      name: 'actorvijay',
      image: story2,
    },
    {
      id: 3,
      name: 'rockstargames',
      image: story3,
    },
    {
      id: 4,
      name: 'primevideoin',
      image: story4,
    },
  ];

  const chats = [
    {
      id: 1,
      name: 'actorvijay',
      message: 'Sent a Post by sunnews',
      time: '5h',
      verified: true,
      image: chat1,
      screen :"ChatPageScreen"
    },
    {
      id: 2,
      name: 'Alex Chen',
      message: 'Can we discuss the AI image generation prompt?',
      time: '6h',
      image: chat2,
      screen :"ChatPageScreen"
    },
    {
      id: 3,
      name: 'David',
      message: 'I’ll send the final assets by EOD.',
      time: '7h',
      image: chat3,
      screen :"ChatPageScreen"
    },
    {
      id: 4,
      name: 'Emma',
      message: 'Can we discuss the AI image generation prompt?',
      time: '8h',
      image: chat4,
      screen :"ChatPageScreen"
    },
    {
      id: 5,
      name: 'Sophia',
      message: 'Thanks for the collaboration',
      time: '20h',
      verified: true,
      image: chat5,
      screen :"ChatPageScreen"
    },
    {
      id: 6,
      name: 'Studio Create',
      message: 'Your Post is ready. Check the dashboard',
      time: '6h',
      image: chat6,
      screen :"ChatPageScreen"
    },
    {
      id: 7,
      name: 'TechFlow AI',
      message: 'New AI model update available',
      time: '7h',
      image: chat7,
      screen :"ChatPageScreen"
    },
  ];

  const renderStory = item => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.85}
        style={styles.storyWrapper}>

        <View style={styles.storyRing}>

          <Image
            source={item.image}
            style={styles.storyImage}
          />

          {item.own && (
            <View style={styles.plusBadge}>

              <Image
                source={plusIcon}
                style={styles.plusIcon}
              />

            </View>
          )}

        </View>

        <Text style={styles.storyName}>
          {item.name}
        </Text>

      </TouchableOpacity>
    );
  };

  const renderChat = item => {
    return (
      <TouchableOpacity
      onPress={()=> navigation.navigate(item.screen)}
        key={item.id}
        activeOpacity={0.9}
        style={styles.chatRow}>

        <Image
          source={item.image}
          style={styles.profileImage}
        />

        <View style={styles.chatContent}>

          <View style={styles.nameRow}>

            <Text style={styles.chatName}>
              {item.name}
            </Text>

            {item.verified && (
              <Image
                source={verifiedIcon}
                style={styles.verifiedIcon}
              />
            )}

          </View>

          <Text
            numberOfLines={2}
            style={styles.chatMessage}>

            {item.message}

            <Text style={styles.chatTime}>
              {' '} - {item.time}
            </Text>

          </Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cameraButton}>

          <Image
            source={cameraIcon}
            style={styles.cameraIcon}
          />

        </TouchableOpacity>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        backgroundColor="#F5F5F5"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          {/* =========================
              SEARCH
          ========================= */}

          <View style={styles.searchContainer}>

            <Image
              source={searchIcon}
              style={styles.searchIcon}
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="#666666"
              style={styles.searchInput}
            />

          </View>

          {/* =========================
              STORIES
          ========================= */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyContainer}>

            {stories.map(renderStory)}

          </ScrollView>

          {/* =========================
              HEADER
          ========================= */}

          <View style={styles.messageHeader}>

            <Text style={styles.messageTitle}>
              Messages
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.editButton}>

              <Image
                source={editIcon}
                style={styles.editIcon}
              />

            </TouchableOpacity>

          </View>

          {/* =========================
              CHAT LIST
          ========================= */}

          <View style={styles.chatList}>
            {chats.map(renderChat)}
          </View>

          <View style={styles.bottomSpacing} />

        </ScrollView>      

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
  flex: 1,
  backgroundColor: '#F5F5F5',
  paddingTop:
    Platform.OS === 'android'
      ? StatusBar.currentHeight
      : 0,
},

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  scrollContent: {
  paddingTop: 24,
  paddingBottom: 120,
},

  /* =========================
      SEARCH
  ========================= */

  searchContainer: {
  width: width * 0.9,
  alignSelf: 'center',

  height: 56,
  borderRadius: 18,

  backgroundColor: '#F0DDC0',

  flexDirection: 'row',
  alignItems: 'center',

  paddingHorizontal: 18,

  marginTop: 8,
  marginBottom: 24,
},

searchIcon: {
  width: 24,
  height: 24,

  resizeMode: 'contain',

  tintColor: '#111111',
},

searchInput: {
  flex: 1,

  marginLeft: 12,

  fontSize: 15,
  fontWeight: '600',

  color: '#111111',
},

  /* =========================
      STORIES
  ========================= */

  storyContainer: {
  paddingLeft: 24,
  paddingRight: 12,

  marginBottom: 28,
},

storyWrapper: {
  alignItems: 'center',
  marginRight: 16,
},

storyRing: {
  width: 82,
  height: 82,

  borderRadius: 999,

  borderWidth: 3,
  borderColor: '#FDBB67',

  alignItems: 'center',
  justifyContent: 'center',

  marginBottom: 8,

  position: 'relative',
},

storyImage: {
  width: 72,
  height: 72,

  borderRadius: 999,
},

plusBadge: {
  width: 24,
  height: 24,

  borderRadius: 999,

  backgroundColor: '#FFFFFF',

  position: 'absolute',
  bottom: -2,
  right: -2,

  alignItems: 'center',
  justifyContent: 'center',

  borderWidth: 2,
  borderColor: '#FDBB67',
},

plusIcon: {
  width: 12,
  height: 12,

  resizeMode: 'contain',

  tintColor: '#FDBB67',
},

storyName: {
  fontSize: 11,
  fontWeight: '500',

  color: '#111111',
},

  /* =========================
      HEADER
  ========================= */

  messageHeader: {
  width: width * 0.9,
  alignSelf: 'center',

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginBottom: 18,
},

messageTitle: {
  fontSize: 18,
  fontWeight: '700',

  color: '#111111',
},

editButton: {
  width: 52,
  height: 52,

  borderRadius: 999,

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

editIcon: {
  width: 20,
  height: 20,

  resizeMode: 'contain',
},

  /* =========================
      CHATS
  ========================= */

  chatList: {
    width: width * 0.9,
    alignSelf: 'center',
  },

  chatRow: {
  flexDirection: 'row',
  alignItems: 'center',

  marginBottom: 22,
},

profileImage: {
  width: 60,
  height: 60,

  borderRadius: 999,
},

chatContent: {
  flex: 1,
  marginLeft: 14,
  paddingRight: 10,
},

nameRow: {
  flexDirection: 'row',
  alignItems: 'center',

  marginBottom: 4,
},

chatName: {
  fontSize: 13,
  fontWeight: '700',

  color: '#111111',
},

verifiedIcon: {
  width: 14,
  height: 14,

  resizeMode: 'contain',

  marginLeft: 6,
},

chatMessage: {
  fontSize: 11,
  lineHeight: 18,
  fontWeight: '500',

  color: '#111111',
},

chatTime: {
  color: '#444444',
  fontWeight: '500',
},

  cameraButton: {
  width: 42,
  height: 42,

  borderRadius: 21,

  backgroundColor: 'rgba(255,255,255,0.92)',

  alignItems: 'center',
  justifyContent: 'center',

  borderWidth: 1,
  borderColor: '#F3EAF7',

  shadowColor: '#000',
  shadowOpacity: 0.04,
  shadowRadius: 6,
  shadowOffset: {
    width: 0,
    height: 2,
  },

  elevation: 2,
},

  cameraIcon: {
  width: 20,
  height: 20,

  resizeMode: 'contain',

  tintColor: '#E3A7F5',
},

  /* =========================
      BOTTOM NAV
  ========================= */

  bottomNav: {
    position: 'absolute',

    bottom: 20,
    left: 20,
    right: 20,

    height: 84,

    backgroundColor: 'rgba(255,255,255,0.92)',

    borderRadius: 28,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 12,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,

    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  navButton: {
    width: 54,
    height: 54,

    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    width: 30,
    height: 30,

    resizeMode: 'contain',
  },

  centerButton: {
    width: 62,
    height: 62,

    borderRadius: 999,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: -42,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,
  },

  centerIcon: {
    width: 32,
    height: 32,

    resizeMode: 'contain',
  },

  sendButton: {
    width: 62,
    height: 62,

    borderRadius: 999,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: -42,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,
  },

  sendIcon: {
    width: 28,
    height: 28,

    resizeMode: 'contain',
  },

  bottomSpacing: {
    height: 100,
  },
});