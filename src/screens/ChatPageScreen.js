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

const {width, height} = Dimensions.get('window');

import backIcon from '../../assets/back.png';
import callIcon from '../../assets/call.png';
import videoIcon from '../../assets/video.png';
import plusIcon from '../../assets/plus.png';
import micIcon from '../../assets/mic.png';
import cameraIcon from '../../assets/camera.png';
import galleryIcon from '../../assets/gallery.png';
import verifiedIcon from '../../assets/verified.png';

export default function ChatpageScreen({navigation}) {
  const flatListRef = useRef(null);

  const [message, setMessage] = useState('');

  const messages = [
    {
      id: '1',
      type: 'sender',
      text: 'Hi bro!!',
    },
    {
      id: '2',
      type: 'sender',
      text: 'How are you??',
    },
    {
      id: '3',
      type: 'receiver',
      text: 'Hi bro..!!',
    },
    {
      id: '4',
      type: 'receiver',
      text: 'I’m Good what about you??',
    },
    {
      id: '5',
      type: 'sender',
      text: 'I’m also Good anna',
    },
    {
      id: '6',
      type: 'sender',
      text: 'How was your work going on???',
    },
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
          isSender
            ? styles.senderWrapper
            : styles.receiverWrapper,
        ]}>

        <View
          style={[
            styles.messageBubble,
            isSender
              ? styles.senderBubble
              : styles.receiverBubble,
          ]}>

          <Text
            style={[
              styles.messageText,
              isSender
                ? styles.senderText
                : styles.receiverText,
            ]}>

            {item.text}

          </Text>

        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>

        {/* HEADER */}
        <View style={styles.headerContainer}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconButton}
            onPress={() => navigation.goBack()}>

            <Image
              source={backIcon}
              style={styles.iconImage}
            />

          </TouchableOpacity>

          <View style={styles.profileSection}>

            <View style={styles.profileImageWrapper}>

              <Image
                source={require('../../assets/vijay.jpg')}
                style={styles.profileImage}
              />

            </View>

            <View style={styles.profileTextContainer}>

              <View style={styles.nameRow}>

                <Text style={styles.profileName}>
                  Vijay
                </Text>

                <Image
                  source={verifiedIcon}
                  style={styles.verifiedIcon}
                />

              </View>

              <Text style={styles.usernameText}>
                actorvijay
              </Text>

            </View>

          </View>

          <View style={styles.rightIconsContainer}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconButton}>

              <Image
                source={callIcon}
                style={styles.iconImage}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.iconButton,
                styles.videoButton,
              ]}>

              <Image
                source={videoIcon}
                style={styles.iconImage}
              />

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

        {/* TYPING */}
        <View style={styles.typingContainer}>

          <Text style={styles.typingText}>
            typing.....
          </Text>

        </View>

        {/* INPUT */}
        <View style={styles.bottomInputWrapper}>

          <View style={styles.inputContainer}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.smallIconButton}>

              <Image
                source={plusIcon}
                style={styles.bottomIcon}
              />

            </TouchableOpacity>

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Message...."
              placeholderTextColor="#FFFFFF"
              style={styles.input}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.smallIconButton}>

              <Image
                source={micIcon}
                style={styles.bottomIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.smallIconButton}>

              <Image
                source={cameraIcon}
                style={styles.bottomIcon}
              />

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.smallIconButton}>

              <Image
                source={galleryIcon}
                style={styles.bottomIcon}
              />

            </TouchableOpacity>

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
    paddingTop:
      Platform.OS === 'android'
        ? 18
        : 8,
  },

  headerContainer: {
    width: '100%',

    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconButton: {
    width: 72,
    height: 72,
    borderRadius: 36,

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

  iconImage: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },

  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  videoButton: {
    marginLeft: 16,
  },

  profileSection: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',

    marginHorizontal: 18,
  },

  profileImageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,

    borderWidth: 4,
    borderColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },

  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },

  profileTextContainer: {
    marginLeft: 18,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
  },

  verifiedIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',

    marginLeft: 8,
  },

  usernameText: {
    fontSize: 18,
    color: '#111111',

    marginTop: 2,
  },

  chatContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
  },

  messageWrapper: {
    marginBottom: 18,
  },

  senderWrapper: {
    alignItems: 'flex-end',
  },

  receiverWrapper: {
    alignItems: 'flex-start',
  },

  messageBubble: {
    maxWidth: width * 0.78,

    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 20,
  },

  senderBubble: {
    backgroundColor: '#A100C8',
  },

  receiverBubble: {
    backgroundColor: '#EBD4EF',
  },

  messageText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '500',
  },

  senderText: {
    color: '#FFFFFF',
  },

  receiverText: {
    color: '#111111',
  },

  typingContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  typingText: {
    fontSize: 22,
    color: '#111111',
    fontWeight: '500',
  },

  bottomInputWrapper: {
    width: '100%',

    paddingHorizontal: 20,
    paddingBottom:
      Platform.OS === 'ios'
        ? 30
        : 22,
  },

  inputContainer: {
    width: '100%',
    minHeight: 86,

    borderRadius: 999,

    backgroundColor: '#A100C8',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  smallIconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },

  input: {
    flex: 1,

    color: '#FFFFFF',

    fontSize: 22,
    fontWeight: '500',

    marginHorizontal: 20,
  },
});