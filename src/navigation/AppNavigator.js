import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import BottomTabs from './BottomTabs';
import SignupScreen from '../screens/SignupScreen'
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReelScreen from '../screens/ReelScreen';
import ReshareScreen from '../screens/ReshareScreen';
import TagScreen from '../screens/TagScreen';
import AIResultScreen from '../screens/AIResultScreen';
import PostNowScreen from '../screens/PostNowScreen';
import ChatPageScreen from '../screens/ChatPageScreen';
import VoiceCallScreen from '../screens/VoiceCallScreen';
import PictureShotScreen from '../screens/PictureShotScreen';
import StoryScreen from '../screens/StoryScreen';
import MyLiveScreen from '../screens/MyLiveScreen';
import LiveScreen from '../screens/LiveScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PostScreen from '../screens/PostScreen';
import AddImagesScreen from '../screens/AddImagesScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import HighlightScreen from '../screens/HighlightScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator>
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
    <Stack.Screen name="BottomTabs" component={BottomTabs} options={{headerShown: false}}/>
    <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}}/>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
    <Stack.Screen name="ExploreScreen"component={ExploreScreen} options={{headerShown: false}}/>
    <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="ReelScreen" component={ReelScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="ReshareScreen" component={ReshareScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="TagScreen" component={TagScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="AIResultScreen" component={AIResultScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="PostNowScreen" component={PostNowScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="ChatPageScreen" component={ChatPageScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="VoiceCallScreen" component={VoiceCallScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="PictureShotScreen" component={PictureShotScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="StoryScreen" component={StoryScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="MyLiveScreen" component={MyLiveScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="LiveScreen" component={LiveScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="EditProfileScreen" component={EditProfileScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="SettingsScreen" component={SettingsScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="PostScreen" component={PostScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="AddImagesScreen" component={AddImagesScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="CreatePostScreen" component={CreatePostScreen} options={{headerShown:false}}/>
    <Stack.Screen nam="HighlightScreen" component={HighlightScreen} options={{headerShown:false}}/>


      </Stack.Navigator>

  );
};

export default AppNavigator;