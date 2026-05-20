import React from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/* =========================
   SCREEN IMPORTS
========================= */

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CreateScreen from '../screens/CreateScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';

/* =========================
   PNG ICONS
========================= */

import homeIcon from '../assets/home.png';
import homeActiveIcon from '../assets/home_active.png';

import searchIcon from '../assets/search.png';
import searchActiveIcon from '../assets/search_active.png';

import chatIcon from '../assets/chat.png';
import chatActiveIcon from '../assets/chat_active.png';

import profileIcon from '../assets/profile.png';
import profileActiveIcon from '../assets/profile_active.png';

import aiIcon from '../assets/ai.png';

const Tab = createBottomTabNavigator();

const {width} = Dimensions.get('window');

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: 'absolute',

          bottom: Platform.OS === 'ios' ? 24 : 18,

          alignSelf: 'center',

          width: width * 0.90,
          height: 78,

          backgroundColor: 'rgba(255,255,255,0.92)',

          borderRadius: 999,

          borderTopWidth: 0,

          paddingTop: 10,

          paddingBottom:
            Platform.OS === 'ios' ? 22 : 10,

          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 14,
          shadowOffset: {
            width: 0,
            height: 4,
          },

          elevation: 8,
        },
      }}>

      {/* HOME */}

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                focused &&
                  styles.activeTabButton,
              ]}>

              <Image
                source={
                  focused
                    ? homeActiveIcon
                    : homeIcon
                }
                style={styles.bottomTabIcon}
              />

            </TouchableOpacity>
          ),
        }}
      />

      {/* SEARCH */}

      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                focused &&
                  styles.activeTabButton,
              ]}>

              <Image
                source={
                  focused
                    ? searchActiveIcon
                    : searchIcon
                }
                style={styles.bottomTabIcon}
              />

            </TouchableOpacity>
          ),
        }}
      />

      {/* CREATE */}

      <Tab.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.centerButton}>

              <Image
                source={aiIcon}
                style={styles.centerAIIcon}
              />

            </TouchableOpacity>
          ),
        }}
      />

      {/* MESSAGES */}

      <Tab.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                focused &&
                  styles.activeTabButton,
              ]}>

              <Image
                source={
                  focused
                    ? chatActiveIcon
                    : chatIcon
                }
                style={styles.bottomTabIcon}
              />

            </TouchableOpacity>
          ),
        }}
      />

      {/* PROFILE */}

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                focused &&
                  styles.activeTabButton,
              ]}>

              <Image
                source={
                  focused
                    ? profileActiveIcon
                    : profileIcon
                }
                style={styles.bottomTabIcon}
              />

            </TouchableOpacity>
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabButton: {
    width: 52,
    height: 52,

    borderRadius: 26,

    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTabButton: {
    backgroundColor: '#FFFFFF',

    transform: [
      {
        translateY: -18,
      },
    ],

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 10,
  },

  bottomTabIcon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',
  },

  centerButton: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: '#A100C8',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: -32,

    shadowColor: '#A100C8',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 10,
  },

  centerAIIcon: {
    width: 28,
    height: 28,

    tintColor: '#FFFFFF',

    resizeMode: 'contain',
  },
});