import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

import backIcon from '../assets/back.png';
import callIcon from '../assets/call.png';
import videoIcon from '../assets/video.png';
import plusIcon from '../assets/plus.png';
import micIcon from '../assets/mic.png';
import cameraIcon from '../assets/camera.png';
import galleryIcon from '../assets/gallery.png';
import verifiedIcon from '../assets/verified.png';

export default function ChatpageScreen({navigation}) {
  const flatListRef = useRef(null);
  const [message, setMessage] = useState('');

  const messages = [
    {id: '1', type: 'sender', text: 'Hi bro!!'},
    {id: '2', type: 'sender', text: 'How are you??'},
    {id: '3', type: 'receiver', text: 'Hi bro..!!'},
    {id: '4', type: 'receiver', text: "I'm Good what about you??"},
    {id: '5', type: 'sender', text: "I'm also Good anna"},
    {id: '6', type: 'sender', text: 'How was your work going on???'},
  ];

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 300);
  }, []);

  const renderMessage = ({item}) => {
    const isSender = item.type === 'sender';

    return (
      <View
        style={[
          styles.messageWrapper,
          isSender ? styles.senderWrapper : styles.receiverWrapper,
        ]}>
        <View
          style={[
            styles.messageBubble,
            isSender ? styles.senderBubble : styles.receiverBubble,
          ]}>
          <Text
            style={[
              styles.messageText,
              isSender ? styles.senderText : styles.receiverText,
            ]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F3F4F6" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        {/* HEADER */}
        <View style={styles.headerContainer}>

          {/* Back Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconButton}
            onPress={() => navigation.goBack()}>
            <Image source={backIcon} style={styles.iconImage} />
          </TouchableOpacity>

          {/* Profile */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={require('../assets/story2.png')}
                style={styles.profileImage}
              />
            </View>

            <View style={styles.profileTextContainer}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>Vijay</Text>
                <Image source={verifiedIcon} style={styles.verifiedIcon} />
              </View>
              <Text style={styles.usernameText}>actorvijay</Text>
            </View>
          </View>

          {/* Right Icons */}
          <View style={styles.rightIconsContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}
            onPress={()=> navigation.navigate("VoiceCallScreen")}>
              <Image source={callIcon} style={styles.iconImage} />
            </TouchableOpacity>

            <TouchableOpacity
             onPress={()=> navigation.navigate("VidCallScreen")}
              activeOpacity={0.8}
              style={[styles.iconButton, styles.videoButton]}>
              <Image source={videoIcon} style={styles.iconImage} />
            </TouchableOpacity>
          </View>

        </View>

        {/* CHAT AREA */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* TYPING INDICATOR */}
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>typing.....</Text>
        </View>

        {/* INPUT BAR */}
        <View style={styles.bottomInputWrapper}>
          <View style={styles.inputContainer}>

            <TouchableOpacity activeOpacity={0.8} style={styles.smallIconButton}>
              <Image source={plusIcon} style={styles.bottomIcon} />
            </TouchableOpacity>

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Message...."
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.input}
            />

            <View style={styles.rightIcons}>
              <TouchableOpacity activeOpacity={0.8} style={styles.smallIconButton}>
                <Image source={micIcon} style={styles.bottomIcon} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.smallIconButton}>
                <Image source={cameraIcon} style={styles.bottomIcon} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.smallIconButton}>
                <Image source={galleryIcon} style={styles.bottomIcon} />
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: Platform.OS === 'android' ? 18 : 8,
  },

  // ── HEADER ──────────────────────────────────────────
  headerContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },

  iconImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },

  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
  },

  profileImageWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#FDBB67',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  profileTextContainer: {
    marginLeft: 12,
    justifyContent: 'center',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },

  verifiedIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 6,
  },

  usernameText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },

  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  videoButton: {
    marginLeft: 10,
  },

  // ── CHAT ────────────────────────────────────────────
  chatContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },

  messageWrapper: {
    marginBottom: 14,
  },

  senderWrapper: {
    alignItems: 'flex-end',
  },

  receiverWrapper: {
    alignItems: 'flex-start',
  },

  messageBubble: {
    maxWidth: width * 0.72,
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },

  senderBubble: {
    backgroundColor: '#FDBB67',
  },

  receiverBubble: {
    backgroundColor: '#FEF7ED',
  },

  messageText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },

  senderText: {
    color: '#FFFFFF',
  },

  receiverText: {
    color: '#111111',
  },

  // ── TYPING ──────────────────────────────────────────
  typingContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  typingText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '400',
  },

  // ── INPUT BAR ───────────────────────────────────────
  bottomInputWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 18,
  },

  inputContainer: {
    width: '100%',
    height: 68,
    borderRadius: 999,
    backgroundColor: '#FDBB67',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
  },

  smallIconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },

  bottomIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});