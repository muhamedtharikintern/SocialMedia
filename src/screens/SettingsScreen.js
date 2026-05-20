import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Platform,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

/* =========================
   ASSETS
========================= */

import backIcon from '../assets/back.png';

import accountIcon from '../assets/account.png';
import privacyIcon from '../assets/privacy.png';
import notificationIcon from '../assets/notification.png';
import aiIcon from '../assets/ai.png';
import usageIcon from '../assets/usage.png';
import supportIcon from '../assets/support.png';
import loginIcon from '../assets/login.png';

import arrowRightIcon from '../assets/arrow_right.png';
import starIcon from '../assets/star.png';

const SettingsScreen = ({navigation}) => {
  const [pushNotifications, setPushNotifications] =
    useState(false);

  const [emailNotifications, setEmailNotifications] =
    useState(false);

  const [autoSuggestions, setAutoSuggestions] =
    useState(false);

  const [contentStyle, setContentStyle] =
    useState(false);

  const renderArrowItem = (
    title,
    subtitle,
  ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.settingRow}>

        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>
            {title}
          </Text>

          <Text style={styles.settingSubtitle}>
            {subtitle}
          </Text>
        </View>

        <Image
          source={arrowRightIcon}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    );
  };

  const renderToggleItem = (
    title,
    subtitle,
    value,
    setValue,
  ) => {
    return (
      <View style={styles.settingRow}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>
            {title}
          </Text>

          <Text style={styles.settingSubtitle}>
            {subtitle}
          </Text>
        </View>

        <Switch
          value={value}
          onValueChange={setValue}
          trackColor={{
            false: '#9E9E9E',
            true: '#22C55E',
          }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#9E9E9E"
        />
      </View>
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
          styles.scrollContainer
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
            Settings and activity
          </Text>

        </View>

        {/* =========================
            AI PRO CARD
        ========================= */}

        <View style={styles.aiCard}>

          <Image
            source={starIcon}
            style={styles.starIcon}
          />

          <Text style={styles.aiTitle}>
            Create AI Pro
          </Text>

          <Text style={styles.aiSubTitle}>
            Upgrade Your Plan
          </Text>

          <Text style={styles.aiDescription}>
            Advanced models, Even more faster image
            creation.
          </Text>

          <Text style={styles.aiDescription}>
            Maximum deep research, Expanded voice
            mode.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.upgradeButton}>

            <Text style={styles.upgradeText}>
              Upgrade
            </Text>

          </TouchableOpacity>

        </View>

        {/* =========================
            ACCOUNT
        ========================= */}

        <View style={styles.sectionHeader}>

          <Image
            source={accountIcon}
            style={styles.sectionIcon}
          />

          <Text style={styles.sectionTitle}>
            Account
          </Text>

        </View>

        {renderArrowItem(
          'Profile details',
          'Name, Email, Bio, Others...',
        )}

        {renderArrowItem(
          'Password',
          'Last updated 6 months ago',
        )}

        {renderArrowItem(
          'Linked accounts',
          'Google, Facebook, Apple',
        )}

        {/* =========================
            PRIVACY
        ========================= */}

        <View style={styles.sectionHeader}>

          <Image
            source={privacyIcon}
            style={styles.sectionIcon}
          />

          <Text style={styles.sectionTitle}>
            Privacy
          </Text>

        </View>

        {renderArrowItem(
          'Account visibility',
          'Public, Private, or Hybrid mode',
        )}

        {renderArrowItem(
          'Blocked users',
          'Manage 0 restricted profiles',
        )}

        {/* =========================
            NOTIFICATIONS
        ========================= */}

        <View style={styles.sectionHeader}>

          <Image
            source={notificationIcon}
            style={styles.sectionIcon}
          />

          <Text style={styles.sectionTitle}>
            Notifications
          </Text>

        </View>

        {renderToggleItem(
          'Push Notifications',
          'System alerts and mentions',
          pushNotifications,
          setPushNotifications,
        )}

        {renderToggleItem(
          'Email Notifications',
          'Weekly digest and news',
          emailNotifications,
          setEmailNotifications,
        )}

        {/* =========================
            AI PREFS
        ========================= */}

        <View style={styles.sectionHeader}>

          <Image
            source={aiIcon}
            style={styles.sectionIcon}
          />

          <Text style={styles.sectionTitle}>
            AI Preferences
          </Text>

        </View>

        {renderToggleItem(
          'Auto Suggestions',
          'Predictive creative flow',
          autoSuggestions,
          setAutoSuggestions,
        )}

        {renderToggleItem(
          'Content style',
          'Currently: Editorial Dark',
          contentStyle,
          setContentStyle,
        )}

        {/* =========================
            HOW YOU USE
        ========================= */}

        <View style={styles.sectionHeader}>

          <Image
            source={usageIcon}
            style={styles.sectionIcon}
          />

          <Text style={styles.sectionTitle}>
            How you use vibeo
          </Text>

        </View>

        {renderArrowItem(
          'Saved',
          'Save post, reel, music',
        )}

        {renderArrowItem(
          'Your activity',
          'See your activities',
        )}

        {renderArrowItem(
          'Time management',
          'Set and see time management',
        )}

        {/* =========================
            SUPPORT
        ========================= */}

        <View style={styles.sectionHeader}>

          <Image
            source={supportIcon}
            style={styles.sectionIcon}
          />

          <Text style={styles.sectionTitle}>
            More info and support
          </Text>

        </View>

        {renderArrowItem(
          'Help',
          'Report a problem, Account status...',
        )}

        {renderArrowItem(
          'About',
          'About you account, privacy policy...',
        )}

        {/* =========================
            LOGIN
        ========================= */}

        <View style={styles.sectionHeader}>

          <Image
            source={loginIcon}
            style={styles.sectionIcon}
          />

          <Text style={styles.sectionTitle}>
            Login
          </Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bottomButton}>

          <Text style={styles.addAccountText}>
            Add account
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bottomButton}>

          <Text style={styles.logoutText}>
            Log out
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  scrollContainer: {
    paddingBottom: 60,
  },

  /* =========================
      HEADER
  ========================= */

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 24,

    paddingTop:
      Platform.OS === 'ios'
        ? 24
        : 20,

    marginBottom: 32,
  },

  backButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

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
    width: 20,
    height: 20,

    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',

    color: '#111111',

    marginLeft: 20,
  },

  /* =========================
      AI CARD
  ========================= */

  aiCard: {
    width: width - 48,

    alignSelf: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 32,

    borderWidth: 4,
    borderColor: '#4D4AE4',

    paddingVertical: 28,
    paddingHorizontal: 24,

    alignItems: 'center',

    marginBottom: 32,
  },

  starIcon: {
    width: 48,
    height: 48,

    resizeMode: 'contain',

    marginBottom: 12,
  },

  aiTitle: {
    fontSize: 20,
    fontWeight: '700',

    color: '#111111',

    marginBottom: 12,
  },

  aiSubTitle: {
    fontSize: 18,
    fontWeight: '700',

    color: '#111111',

    marginBottom: 16,
  },

  aiDescription: {
    fontSize: 14,
    fontWeight: '500',

    color: '#111111',

    textAlign: 'center',

    lineHeight: 22,
  },

  upgradeButton: {
    marginTop: 24,

    width: 210,
    height: 48,

    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#4D4AE4',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  upgradeText: {
    fontSize: 18,
    fontWeight: '700',

    color: '#FFFFFF',
  },

  /* =========================
      SECTION
  ========================= */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 28,

    marginBottom: 24,
    marginTop: 8,
  },

  sectionIcon: {
    width: 28,
    height: 28,

    resizeMode: 'contain',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',

    color: '#111111',

    marginLeft: 16,
  },

  /* =========================
      SETTINGS ROW
  ========================= */

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 36,

    marginBottom: 28,
  },

  settingTextContainer: {
    flex: 1,

    paddingRight: 20,
  },

  settingTitle: {
    fontSize: 18,
    fontWeight: '700',

    color: '#111111',

    marginBottom: 8,
  },

  settingSubtitle: {
    fontSize: 14,
    fontWeight: '500',

    color: '#111111',

    lineHeight: 22,
  },

  arrowIcon: {
    width: 18,
    height: 18,

    resizeMode: 'contain',
  },

  /* =========================
      BOTTOM BUTTONS
  ========================= */

  bottomButton: {
    paddingHorizontal: 36,

    marginBottom: 28,
  },

  addAccountText: {
    fontSize: 18,
    fontWeight: '600',

    color: '#5B21B6',
  },

  logoutText: {
    fontSize: 18,
    fontWeight: '600',

    color: '#FF0033',
  },
});