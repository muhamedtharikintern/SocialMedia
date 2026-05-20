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

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

export default function ChatScreen({navigation}) {
  const [search, setSearch] = useState('');

  const stories = [
    {
      id: 1,
      name: 'Your Story',
      image: require('../assets/story1.png'),
      own: true,
    },
    {
      id: 2,
      name: 'actorvijay',
      image: require('../assets/story2.png'),
    },
    {
      id: 3,
      name: 'rockstargames',
      image: require('../assets/story3.png'),
    },
    {
      id: 4,
      name: 'primevideoin',
      image: require('../assets/story4.png'),
    },
  ];

  const chats = [
    {
      id: 1,
      name: 'actorvijay',
      message: 'Sent a Post by sunnews',
      time: '5h',
      verified: true,
      image: require('../assets/story1.png'),
    },
    {
      id: 2,
      name: 'Alex Chen',
      message: 'Can we discuss the AI image generation prompt?',
      time: '6h',
      image: require('../assets/chat2.png'),
    },
    {
      id: 3,
      name: 'David',
      message: 'I’ll send the final assets by EOD.',
      time: '7h',
      image: require('../assets/chat3.png'),
    },
    {
      id: 4,
      name: 'Emma',
      message: 'Can we discuss the AI image generation prompt?',
      time: '8h',
      image: require('../assets/chat4.png'),
    },
    {
      id: 5,
      name: 'Sophia',
      message: 'Thanks for the collaboration',
      time: '20h',
      verified: true,
      image: require('../assets/chat5.png'),
    },
    {
      id: 6,
      name: 'Studio Create',
      message: 'Your Post is ready. Check the dashboard',
      time: '6h',
      image: require('../assets/chat7.png'),
    },
    {
      id: 7,
      name: 'TechFlow AI',
      message: 'New AI model update available',
      time: '7h',
      image: require('../assets/chat8.png'),
    },
  ];

  const renderStory = item => (
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
            <Ionicons
              name="add"
              size={14}
              color="#FFFFFF"
            />
          </View>
        )}

      </View>

      <Text style={styles.storyName}>
        {item.name}
      </Text>

    </TouchableOpacity>
  );

  const renderChat = item => (
    <TouchableOpacity
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
            <Ionicons
              name="checkmark-circle"
              size={22}
              color="#1D9BF0"
              style={styles.verifyIcon}
            />
          )}

        </View>

        <Text style={styles.chatMessage}>
          {item.message}
          <Text style={styles.chatTime}>
            {' '} - {item.time}
          </Text>
        </Text>

      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cameraButton}>

        <Ionicons
          name="camera-outline"
          size={32}
          color="#111111"
        />

      </TouchableOpacity>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          {/* SEARCH */}
          <View style={styles.searchContainer}>

            <Feather
              name="search"
              size={32}
              color="#111111"
            />

            <TextInput
              placeholder="Search"
              placeholderTextColor="#666666"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />

          </View>

          {/* STORIES */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyContainer}>

            {stories.map(renderStory)}

          </ScrollView>

          {/* MESSAGE HEADER */}
          <View style={styles.messageHeader}>

            <Text style={styles.messageTitle}>
              Messages
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.editButton}>

              <Feather
                name="edit-3"
                size={24}
                color="#111111"
              />

            </TouchableOpacity>

          </View>

          {/* CHAT LIST */}
          <View style={styles.chatList}>
            {chats.map(renderChat)}
          </View>

        </ScrollView>

        {/* FLOATING NAV */}
        <View style={styles.bottomNav}>

          <TouchableOpacity style={styles.navButton}>
            <Ionicons
              name="home-outline"
              size={34}
              color="#111111"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Feather
              name="search"
              size={30}
              color="#111111"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.centerButton}>
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={34}
              color="#111111"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Feather
              name="send"
              size={30}
              color="#111111"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Ionicons
              name="person-outline"
              size={34}
              color="#111111"
            />
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}