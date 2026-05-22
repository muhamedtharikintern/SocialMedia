import React, {useState} from 'react';

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
} from 'react-native';

const {width} = Dimensions.get('window');

/* =========================
   ASSETS
========================= */

import profileImage from '../assets/profile_edit.png';

const EditprofileScreen = ({navigation}) => {
  const [name, setName] = useState('Jacob West');
  const [username, setUsername] =
    useState('jacob_w');
  const [website, setWebsite] =
    useState('');

  const [bio, setBio] = useState(
    'Digital goodies designer @pixsellz\nEverything is designed.',
  );

  const [email, setEmail] =
    useState('jacob.west@gmail.com');

  const [phone, setPhone] =
    useState('+1 202 555 0147');

  const [gender, setGender] =
    useState('Male');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* STATUS BAR */}
      <StatusBar
        backgroundColor="#F5F5F5"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
  style={styles.keyboardContainer}
  behavior={
    Platform.OS === 'ios'
      ? 'padding'
      : 'height'
  }
  keyboardVerticalOffset={
    Platform.OS === 'ios' ? 20 : 0
  }>

  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={
      styles.scrollContent
    }
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="interactive">


        {/* =========================
            HEADER
        ========================= */}

        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.goBack()
            }>
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Edit Profile
          </Text>

          <TouchableOpacity
  activeOpacity={0.8}
  onPress={() =>
    navigation.goBack()
  }>
  <Text style={styles.doneText}>
    Done
  </Text>
</TouchableOpacity>
        </View>

        {/* =========================
            PROFILE
        ========================= */}

        <View style={styles.profileSection}>
          <Image
            source={profileImage}
            style={styles.profileImage}
          />

          <TouchableOpacity
            activeOpacity={0.8}>
            <Text
              style={
                styles.changePhotoText
              }>
              Change Profile Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* DIVIDER */}

        <View
          style={styles.sectionDivider}
        />

        {/* NAME */}

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>
            Name
          </Text>

          <View style={styles.fieldContent}>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.fieldInput}
              placeholderTextColor="#9B9B9B"
            />

            <View
              style={styles.inputDivider}
            />
          </View>
        </View>

        {/* USERNAME */}

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>
            Username
          </Text>

          <View style={styles.fieldContent}>
            <TextInput
              value={username}
              onChangeText={
                setUsername
              }
              style={styles.fieldInput}
              placeholderTextColor="#9B9B9B"
            />

            <View
              style={styles.inputDivider}
            />
          </View>
        </View>

        {/* WEBSITE */}

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>
            Website
          </Text>

          <View style={styles.fieldContent}>
            <TextInput
              value={website}
              onChangeText={setWebsite}
              style={styles.fieldInput}
              placeholder="Website"
              placeholderTextColor="#9B9B9B"
            />

            <View
              style={styles.inputDivider}
            />
          </View>
        </View>

        {/* BIO */}

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>
            Bio
          </Text>

          <View style={styles.fieldContent}>
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={[
                styles.fieldInput,
                styles.bioInput,
              ]}
              multiline
              textAlignVertical="top"
              placeholderTextColor="#9B9B9B"
            />
          </View>
        </View>

        {/* DIVIDER */}

        <View
          style={styles.sectionDivider}
        />

        {/* PROFESSIONAL ACCOUNT */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={
            styles.professionalButton
          }>
          <Text
            style={
              styles.professionalButtonText
            }>
            Switch to Professional
            Account
          </Text>
        </TouchableOpacity>

        {/* PRIVATE INFO */}

        <Text style={styles.privateTitle}>
          Private Information
        </Text>

        {/* EMAIL */}

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>
            Email
          </Text>

          <View style={styles.fieldContent}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.fieldInput}
              placeholderTextColor="#9B9B9B"
            />

            <View
              style={styles.inputDivider}
            />
          </View>
        </View>

        {/* PHONE */}

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>
            Phone
          </Text>

          <View style={styles.fieldContent}>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.fieldInput}
              placeholderTextColor="#9B9B9B"
            />

            <View
              style={styles.inputDivider}
            />
          </View>
        </View>

        {/* GENDER */}

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>
            Gender
          </Text>

          <View style={styles.fieldContent}>
            <TextInput
              value={gender}
              onChangeText={setGender}
              style={styles.fieldInput}
              placeholderTextColor="#9B9B9B"
            />

            <View
              style={styles.inputDivider}
            />
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditprofileScreen;

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
    paddingTop: 10,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',

    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },

  cancelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },

  doneText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D9BF0',
  },

  /* PROFILE */

  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 18,
  },

  changePhotoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2F80ED',
  },

  sectionDivider: {
    width: width - 48,
    height: 1,
    backgroundColor: '#DDDDDD',
    alignSelf: 'center',
    marginBottom: 24,
  },

  /* FORM */

  fieldRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 26,
  },

  fieldLabel: {
    width: 110,
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    paddingTop: 10,
  },

  fieldContent: {
    flex: 1,
  },

  fieldInput: {
    fontSize: 17,
    fontWeight: '500',
    color: '#222222',
    minHeight: 42,
    paddingVertical: 0,
  },

  bioInput: {
    minHeight: 90,
    lineHeight: 28,
  },

  inputDivider: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginTop: 14,
  },

  /* PROFESSIONAL */

  professionalButton: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },

  professionalButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F80ED',
  },

  /* PRIVATE */

  privateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    paddingHorizontal: 24,
    marginBottom: 34,
  },
});