import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/* =========================
   SCREEN IMPORTS
========================= */

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CreateAIScreen from '../screens/CreateAIScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

/* =========================
   ICONS
========================= */

import homeIcon from '../assets/home.png';
import searchIcon from '../assets/search.png';
import chatIcon from '../assets/chat.png';
import profileIcon from '../assets/profile_2.png';
import aiIcon from '../assets/ai.png';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');

/* =========================
   CUSTOM TAB BUTTON
========================= */

const TabButton = ({
  children,
  onPress,
  center,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        center && styles.centerContainer,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: 'absolute',

          bottom: 18,

          left: 18,
          right: 18,

          height: 68,

          backgroundColor: 'rgba(255,255,255,0.88)',

          borderRadius: 999,
          borderTopWidth: 0,

          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 3,
          },

          elevation: 10,
        },
      }}>

      {/* HOME */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarButton: props => (
            <TabButton {...props} />
          ),

          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={homeIcon}
                style={[
                  styles.icon,
                  focused && styles.activeIcon,
                ]}
              />
            </View>
          ),
        }}
      />

      {/* SEARCH */}
      <Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          tabBarButton: props => (
            <TabButton {...props} />
          ),

          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={searchIcon}
                style={[
                  styles.icon,
                  focused && styles.activeIcon,
                ]}
              />
            </View>
          ),
        }}
      />

      {/* CENTER AI BUTTON */}
      <Tab.Screen
        name="CreateAIScreen"
        component={CreateAIScreen}
        options={{
          tabBarButton: props => (
            <TabButton
              {...props}
              center
            />
          ),

          tabBarIcon: () => (
            <View style={styles.centerButton}>
              <Image
                source={aiIcon}
                style={styles.centerAIIcon}
              />
            </View>
          ),
        }}
      />

      {/* CHAT */}
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarButton: props => (
            <TabButton {...props} />
          ),

          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={chatIcon}
                style={[
                  styles.icon,
                  focused && styles.activeIcon,
                ]}
              />
            </View>
          ),
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarButton: props => (
            <TabButton {...props} />
          ),

          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={profileIcon}
                style={[
                  styles.icon,
                  focused && styles.activeIcon,
                ]}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  /* TAB BUTTON SPACING */
buttonContainer: {
  width: 62,
  height: 68,

  justifyContent: 'center',
  alignItems: 'center',
},

  /* CENTER AI FLOATING */
  centerContainer: {
    marginTop: -18,
  },

iconContainer: {
  width: 62,
  height: 68,

  justifyContent: 'center',
  alignItems: 'center',
},

  /* NORMAL ICON */
icon: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
},

  /* ONLY ICON MOVES UP */
  activeIcon: {
    transform: [
      {
        translateY: -10,
      },
      {
        scale: 1.08,
      },
    ],
  },

  /* AI CENTER BUTTON */
  centerButton: {
    width: 58,
    height: 58,
    borderRadius: 29,

    backgroundColor: '#FDBB67',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#FDBB67',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 10,
  },

centerAIIcon: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
},
});