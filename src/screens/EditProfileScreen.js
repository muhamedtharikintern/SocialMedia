import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';

import AsyncStorage  from '@react-native-async-storage/async-storage';
import ImageResizer  from 'react-native-image-resizer';
import {launchImageLibrary} from 'react-native-image-picker';

const {width} = Dimensions.get('window');
const BASE_URL = 'https://deffovibeo.duckdns.org';

import defaultAvatar from '../assets/profile_edit.png';

const EditProfileScreen = ({navigation}) => {

  const [name,     setName]     = useState('');
  const [username, setUsername] = useState('');
  const [website,  setWebsite]  = useState('');
  const [bio,      setBio]      = useState('');
  const [email,    setEmail]    = useState('');
  const [phone,    setPhone]    = useState('');
  const [gender,   setGender]   = useState('');
  const [avatar,   setAvatar]   = useState(null);   // local uri of newly picked image
  const [avatarUrl,setAvatarUrl]= useState('');     // existing avatar from server

  const [loading,  setLoading]  = useState(false);
  const [fetching, setFetching] = useState(true);

  /* =========================
      LOAD CURRENT PROFILE
  ========================= */

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res   = await fetch(`${BASE_URL}/user/profile`, {
          method:  'GET',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message);

        const u = data.user;
        setName(u.name       ?? '');
        setUsername(u.username ?? '');
        setBio(u.bio         ?? '');
        setEmail(u.email     ?? '');
        setPhone(u.phone     ?? '');
        setAvatarUrl(u.avatar ?? '');
      } catch (err) {
        Alert.alert('Error', err.message);
      } finally {
        setFetching(false);
      }
    };
    loadProfile();
  }, []);

  /* =========================
      PICK IMAGE FROM GALLERY
  ========================= */

  const pickImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      async response => {
        if (response.didCancel || response.errorCode) return;
        const asset = response.assets?.[0];
        if (!asset?.uri) return;

        try {
          const resized = await ImageResizer.createResizedImage(
            asset.uri, 512, 512, 'JPEG', 80, 0,
          );
          setAvatar(resized.uri);
        } catch {
          setAvatar(asset.uri);
        }
      },
    );
  };

  /* =========================
      SAVE PROFILE
  ========================= */

  const saveProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      const formData = new FormData();
      if (name)     formData.append('name',     name);
      if (username) formData.append('username', username);
      if (bio)      formData.append('bio',      bio);
      if (phone)    formData.append('phone',    phone);
      if (website)  formData.append('website',  website);
      if (gender)   formData.append('gender',   gender);

      // attach new avatar only if user picked one
      if (avatar) {
        formData.append('avatar', {
          uri:  avatar,
          name: `avatar_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });
      }

      const res = await fetch(`${BASE_URL}/user/edit-profile`, {
        method:  'PUT',
        headers: {
          // ✅ No Content-Type — let React Native set multipart boundary
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error('Server returned invalid response: ' + rawText.slice(0, 100));
      }

      if (!res.ok || !data.success) throw new Error(data.message ?? 'Update failed');

      Alert.alert('Success', 'Profile updated!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      AVATAR SOURCE
  ========================= */

  const avatarSource = avatar
    ? {uri: avatar}
    : avatarUrl
    ? {uri: avatarUrl}
    : defaultAvatar;

  /* =========================
      RENDER
  ========================= */

  if (fetching) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#FDBB67" style={{marginTop: 80}} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Edit Profile</Text>

            <TouchableOpacity activeOpacity={0.8} onPress={saveProfile} disabled={loading}>
              {loading
                ? <ActivityIndicator size="small" color="#FDBB67" />
                : <Text style={styles.doneText}>Done</Text>
              }
            </TouchableOpacity>
          </View>

          {/* PROFILE PHOTO */}
          <View style={styles.profileSection}>
            <Image source={avatarSource} style={styles.profileImage} />
            <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
              <Text style={styles.changePhotoText}>Change Profile Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionDivider} />

          {/* NAME */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Name</Text>
            <View style={styles.fieldContent}>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.fieldInput}
                placeholderTextColor="#9B9B9B"
                placeholder="Name"
              />
              <View style={styles.inputDivider} />
            </View>
          </View>

          {/* USERNAME */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Username</Text>
            <View style={styles.fieldContent}>
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={styles.fieldInput}
                placeholderTextColor="#9B9B9B"
                placeholder="Username"
                autoCapitalize="none"
              />
              <View style={styles.inputDivider} />
            </View>
          </View>

          {/* WEBSITE */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Website</Text>
            <View style={styles.fieldContent}>
              <TextInput
                value={website}
                onChangeText={setWebsite}
                style={styles.fieldInput}
                placeholder="Website"
                placeholderTextColor="#9B9B9B"
                autoCapitalize="none"
              />
              <View style={styles.inputDivider} />
            </View>
          </View>

          {/* BIO */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Bio</Text>
            <View style={styles.fieldContent}>
              <TextInput
                value={bio}
                onChangeText={setBio}
                style={[styles.fieldInput, styles.bioInput]}
                multiline
                textAlignVertical="top"
                placeholderTextColor="#9B9B9B"
                placeholder="Bio"
              />
            </View>
          </View>

          <View style={styles.sectionDivider} />

          {/* PROFESSIONAL */}
          <TouchableOpacity activeOpacity={0.8} style={styles.professionalButton}>
            <Text style={styles.professionalButtonText}>
              Switch to Professional Account
            </Text>
          </TouchableOpacity>

          <Text style={styles.privateTitle}>Private Information</Text>

          {/* EMAIL */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Email</Text>
            <View style={styles.fieldContent}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.fieldInput}
                placeholderTextColor="#9B9B9B"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.inputDivider} />
            </View>
          </View>

          {/* PHONE */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Phone</Text>
            <View style={styles.fieldContent}>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.fieldInput}
                placeholderTextColor="#9B9B9B"
                keyboardType="phone-pad"
              />
              <View style={styles.inputDivider} />
            </View>
          </View>

          {/* GENDER */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Gender</Text>
            <View style={styles.fieldContent}>
              <TextInput
                value={gender}
                onChangeText={setGender}
                style={styles.fieldInput}
                placeholderTextColor="#9B9B9B"
                placeholder="Gender"
              />
              <View style={styles.inputDivider} />
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop:    10,
  },
  header: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop:        12,
    paddingBottom:     24,
  },
  cancelText: {
    fontSize:   18,
    fontWeight: '600',
    color:      '#111111',
  },
  headerTitle: {
    fontSize:   20,
    fontWeight: '700',
    color:      '#111111',
  },
  doneText: {
    fontSize:   18,
    fontWeight: '600',
    color:      '#FDBB67',
  },
  profileSection: {
    alignItems:    'center',
    justifyContent:'center',
    marginBottom:  28,
  },
  profileImage: {
    width:        150,
    height:       150,
    borderRadius: 75,
    marginBottom: 18,
  },
  changePhotoText: {
    fontSize:   18,
    fontWeight: '500',
    color:      '#FDBB67',
  },
  sectionDivider: {
    width:           width - 48,
    height:          1,
    backgroundColor: '#DDDDDD',
    alignSelf:       'center',
    marginBottom:    24,
  },
  fieldRow: {
    flexDirection:     'row',
    paddingHorizontal: 24,
    marginBottom:      26,
  },
  fieldLabel: {
    width:      110,
    fontSize:   17,
    fontWeight: '700',
    color:      '#111111',
    paddingTop: 10,
  },
  fieldContent: {
    flex: 1,
  },
  fieldInput: {
    fontSize:      17,
    fontWeight:    '500',
    color:         '#222222',
    minHeight:     42,
    paddingVertical: 0,
  },
  bioInput: {
    minHeight:  90,
    lineHeight: 28,
  },
  inputDivider: {
    height:          1,
    backgroundColor: '#DDDDDD',
    marginTop:       14,
  },
  professionalButton: {
    paddingHorizontal: 24,
    marginBottom:      40,
  },
  professionalButtonText: {
    fontSize:   18,
    fontWeight: '600',
    color:      '#FDBB67',
  },
  privateTitle: {
    fontSize:          20,
    fontWeight:        '700',
    color:             '#111111',
    paddingHorizontal: 24,
    marginBottom:      34,
  },
});
