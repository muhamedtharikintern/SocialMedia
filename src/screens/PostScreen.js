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
  Alert,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from 'react-native-image-resizer';

const {width} = Dimensions.get('window');
const BASE_URL = 'https://deffovibeo.duckdns.org';

/* =========================
   ASSETS
========================= */

import backIcon       from '../assets/back.png';
import tagPeopleIcon  from '../assets/tag_people.png';
import locationIcon   from '../assets/location.png';
import musicIcon      from '../assets/music.png';
import publicIcon     from '../assets/public.png';
import followersIcon  from '../assets/followers.png';
import privateIcon    from '../assets/private.png';
import arrowRightIcon from '../assets/next.png';
import shareIcon      from '../assets/share.png';

/* =========================
   HELPER: Safe JSON parse
========================= */

const safeParseJSON = async response => {
  const rawText = await response.text();
  try {
    return JSON.parse(rawText);
  } catch (e) {
    throw new Error(
      'Server returned invalid response: ' + rawText.slice(0, 150),
    );
  }
};

const PostScreen = ({navigation, route}) => {

  // ── Receive params from AIResultScreen or CreatePostScreen ───
  const {
    selectedImage = null,   // from CreatePostScreen (local uri)
    aiImage       = null,   // from AIResultScreen (local uri or S3 url)
    caption       = '',     // from AIResultScreen
    hashtags      = [],     // from AIResultScreen (array)
  } = route?.params ?? {};

  // Use aiImage if selectedImage not present
  const imageToShow = selectedImage ?? aiImage;

  // Parse hashtags array into display string e.g. "#AIArt  #CreateAI"
  const hashtagDisplay = Array.isArray(hashtags)
    ? hashtags.map(h => (h.startsWith('#') ? h : `#${h}`)).join('   ')
    : hashtags;

  const [shareToApps,     setShareToApps]     = useState(true);
  const [selectedPrivacy, setSelectedPrivacy] = useState('followers');
  const [uploading,       setUploading]       = useState(false);

  /* =========================
      UPLOAD POST
  ========================= */

  const uploadPost = async () => {
    if (!imageToShow) {
      Alert.alert('No image selected');
      return;
    }

    try {
      setUploading(true);

      // ── get token ────────────────────────────────
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Session expired. Please login again.');
        return;
      }

      let finalImageUri = imageToShow;

      // Only resize if it's a local file uri (not an https S3 url)
      if (!imageToShow.startsWith('http')) {
        const resized = await ImageResizer.createResizedImage(
          imageToShow,
          1080,
          1080,
          'JPEG',
          80,
          0,
        );
        finalImageUri = resized.uri;
      }

      // ── STEP 1: Upload image to S3 ───────────────
      const formData = new FormData();
      formData.append('file', {
        uri:  finalImageUri,
        name: `post_${Date.now()}.jpg`,
        type: 'image/jpeg',
      });

      const uploadRes = await fetch(`${BASE_URL}/upload/posts`, {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const uploadData = await safeParseJSON(uploadRes);

      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.message ?? 'Image upload failed');
      }

      console.log('S3 URL:', uploadData.url);

      // ── STEP 2: Save post to MongoDB ─────────────
      const postRes = await fetch(`${BASE_URL}/posts/post-create`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          caption:    caption,
          hashtags:   JSON.stringify(
            Array.isArray(hashtags)
              ? hashtags.map(h => h.replace('#', ''))
              : [],
          ),
          visibility: selectedPrivacy,
          url:        uploadData.url,
          type:       uploadData.type ?? 'image',
        }),
      });

      const postData = await safeParseJSON(postRes);

      if (!postRes.ok || !postData.success) {
        throw new Error(postData.message ?? 'Post creation failed');
      }

      console.log('Post created:', postData.post._id);

      Alert.alert('Posted!', 'Your post is live.', [
        {text: 'OK', onPress: () => navigation.navigate("HomeScreen")},
      ]);

    } catch (err) {
      console.error('Upload error:', err.message);
      Alert.alert('Error', err.message);
    } finally {
      setUploading(false);
    }
  };

  /* =========================
      RENDER HELPERS
  ========================= */

  const renderPrivacyButton = (type, icon, title) => {
    const isSelected = selectedPrivacy === type;
    return (
      <TouchableOpacity
        key={type}
        activeOpacity={0.8}
        onPress={() => setSelectedPrivacy(type)}
        style={[
          styles.privacyButton,
          isSelected && styles.activePrivacyButton,
        ]}>
        <Image
          source={icon}
          style={[
            styles.privacyIcon,
            isSelected && styles.activePrivacyIcon,
          ]}
        />
        <Text
          style={[
            styles.privacyText,
            isSelected && styles.activePrivacyText,
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderActionRow = (icon, title) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.actionRow}>
      <View style={styles.actionLeft}>
        <Image source={icon} style={styles.actionIcon} />
        <Text style={styles.actionTitle}>{title}</Text>
      </View>
      <Image source={arrowRightIcon} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  /* =========================
      RENDER
  ========================= */

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#F5F5F5"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* PREVIEW IMAGE */}
        {imageToShow ? (
          <Image
            source={{uri: imageToShow}}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : null}

        {/* CAPTION SECTION */}
        <Text style={styles.sectionTitle}>Captions & Hashtags</Text>

        <View style={styles.captionCard}>
          {caption ? (
            <Text style={styles.captionText}>"{caption}"</Text>
          ) : null}

          {hashtagDisplay ? (
            <Text style={styles.hashTags}>{hashtagDisplay}</Text>
          ) : null}
        </View>

        {/* ACTION CARD */}
        <View style={styles.actionCard}>
          {renderActionRow(tagPeopleIcon, 'Tag People')}
          {renderActionRow(locationIcon,  'Add Location')}
          {renderActionRow(musicIcon,     'Add Music')}
        </View>

        {/* PRIVACY */}
        <Text style={styles.sectionTitle}>Who can see this</Text>

        <View style={styles.privacyContainer}>
          {renderPrivacyButton('public',    publicIcon,    'Public')}
          {renderPrivacyButton('followers', followersIcon, 'Followers')}
          {renderPrivacyButton('private',   privateIcon,   'Private')}
        </View>

        {/* SHARE SWITCH */}
        <View style={styles.shareRow}>
          <View style={styles.shareLeft}>
            <Image source={shareIcon} style={styles.shareIcon} />
            <Text style={styles.shareText}>Share to other apps</Text>
          </View>
          <Switch
            value={shareToApps}
            onValueChange={setShareToApps}
            trackColor={{false: '#9E9E9E', true: '#22C55E'}}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#9E9E9E"
          />
        </View>

        {/* POST BUTTON */}
        <TouchableOpacity
          onPress={uploadPost}
          activeOpacity={0.85}
          disabled={uploading}
          style={[styles.postButton, uploading && {opacity: 0.7}]}>
          {uploading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.postButtonText}>Post Now</Text>
          )}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  header: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: 24,
    paddingTop:        Platform.OS === 'ios' ? 24 : 20,
    marginBottom:      28,
  },
  backButton: {
    width:           48,
    height:          48,
    borderRadius:    24,
    backgroundColor: '#FFFFFF',
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     '#000',
    shadowOpacity:   0.08,
    shadowRadius:    12,
    shadowOffset:    {width: 0, height: 4},
    elevation:       5,
  },
  backIcon: {
    width:      22,
    height:     22,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize:   22,
    fontWeight: '700',
    color:      '#111111',
  },
  headerSpacer: {
    width: 48,
  },
  previewImage: {
    width:        width - 48,
    height:       width * 0.58,
    borderRadius: 28,
    alignSelf:    'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize:         22,
    fontWeight:       '700',
    color:            '#111111',
    marginHorizontal: 40,
    marginBottom:     20,
  },
  captionCard: {
    width:             width - 48,
    alignSelf:         'center',
    backgroundColor:   '#FFFFFF',
    borderRadius:      28,
    borderWidth:       2,
    borderColor:       '#D86BFF',
    paddingVertical:   36,
    paddingHorizontal: 28,
    marginBottom:      28,
    shadowColor:       '#000',
    shadowOpacity:     0.08,
    shadowRadius:      12,
    shadowOffset:      {width: 0, height: 4},
    elevation:         5,
  },
  captionText: {
    fontSize:     18,
    fontWeight:   '600',
    color:        '#111111',
    textAlign:    'center',
    lineHeight:   34,
    marginBottom: 28,
  },
  hashTags: {
    fontSize:   16,
    fontWeight: '700',
    color:      '#111111',
    textAlign:  'center',
    lineHeight: 34,
  },
  actionCard: {
    width:           width - 48,
    alignSelf:       'center',
    backgroundColor: '#FFFFFF',
    borderRadius:    28,
    borderWidth:     2,
    borderColor:     '#D86BFF',
    paddingVertical: 12,
    marginBottom:    36,
    shadowColor:     '#000',
    shadowOpacity:   0.08,
    shadowRadius:    12,
    shadowOffset:    {width: 0, height: 4},
    elevation:       5,
  },
  actionRow: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: 28,
    paddingVertical:   22,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  actionIcon: {
    width:      40,
    height:     40,
    resizeMode: 'contain',
    marginRight:20,
  },
  actionTitle: {
    fontSize:   18,
    fontWeight: '700',
    color:      '#111111',
  },
  arrowIcon: {
    width:      20,
    height:     20,
    resizeMode: 'contain',
  },
  privacyContainer: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    marginHorizontal:24,
    marginBottom:    40,
  },
  privacyButton: {
    flex:            1,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'center',
    height:          52,
    borderRadius:    16,
    borderWidth:     1.5,
    borderColor:     '#D86BFF',
    backgroundColor: '#FFFFFF',
    paddingHorizontal:10,
    marginHorizontal: 6,
    overflow:        'hidden',
  },
  activePrivacyButton: {
    backgroundColor: '#A100C8',
    borderColor:     '#A100C8',
  },
  privacyIcon: {
    width:      18,
    height:     18,
    resizeMode: 'contain',
    tintColor:  '#D86BFF',
    marginRight: 6,
  },
  activePrivacyIcon: {
    tintColor: '#FFFFFF',
  },
  privacyText: {
    fontSize:          width < 380 ? 12 : 14,
    fontWeight:        '700',
    color:             '#D86BFF',
    includeFontPadding:false,
  },
  activePrivacyText: {
    color: '#FFFFFF',
  },
  shareRow: {
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    marginHorizontal:40,
    marginBottom:    44,
  },
  shareLeft: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  shareIcon: {
    width:      26,
    height:     26,
    resizeMode: 'contain',
    marginRight:20,
  },
  shareText: {
    fontSize:   18,
    fontWeight: '700',
    color:      '#111111',
  },
  postButton: {
    width:           width - 48,
    height:          68,
    borderRadius:    999,
    backgroundColor: '#A100C8',
    alignSelf:       'center',
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     '#000',
    shadowOpacity:   0.12,
    shadowRadius:    12,
    shadowOffset:    {width: 0, height: 4},
    elevation:       5,
  },
  postButtonText: {
    fontSize:   20,
    fontWeight: '700',
    color:      '#FFFFFF',
  },
});