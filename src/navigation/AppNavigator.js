import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import BottomTabs from './BottomTabs';
import SignupScreen from '../screens/SignupScreen'
import CreateScreen from '../screens/CreateScreen';
import ReelScreen from '../screens/ReelScreen';
import ReshareScreen from '../screens/ReshareScreen';
import TagScreen from '../screens/TagScreen';
import AIResultScreen from '../screens/AIResultScreen';
import PostNowScreen from '../screens/PostNowScreen';
import ChatPageScreen from '../screens/ChatPageScreen';
import VoiceCallScreen from '../screens/VoiceCallScreen';
import VidCallScreen from '../screens/VidCallScreen';
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
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator>
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
    <Stack.Screen name="BottomTabs" component={BottomTabs} options={{headerShown: false}}/>
    <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}}/>
    <Stack.Screen name="CreateScreen" component={CreateScreen} options={{headerShown: false}}/>
    <Stack.Screen name="ReelScreen" component={ReelScreen} options={{headerShown:false}}/>
    <Stack.Screen name="ReshareScreen" component={ReshareScreen} options={{headerShown:false}}/>
    <Stack.Screen name="TagScreen" component={TagScreen} options={{headerShown:false}}/>
    <Stack.Screen name="AIResultScreen" component={AIResultScreen} options={{headerShown:false}}/>
    <Stack.Screen name="PostNowScreen" component={PostNowScreen} options={{headerShown:false}}/>
    <Stack.Screen name="ChatPageScreen" component={ChatPageScreen} options={{headerShown:false}}/>
    <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen} options={{headerShown:false}}/>
     <Stack.Screen name="VidCallScreen" component={VidCallScreen} options={{headerShown:false}}/>
    <Stack.Screen name="PictureShotScreen" component={PictureShotScreen} options={{headerShown:false}}/>
    <Stack.Screen name="StoryScreen" component={StoryScreen} options={{headerShown:false}}/>
    <Stack.Screen name="MyLiveScreen" component={MyLiveScreen} options={{headerShown:false}}/>
    <Stack.Screen name="LiveScreen" component={LiveScreen} options={{headerShown:false}}/>
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{headerShown:false}}/>
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown:false}}/>
    <Stack.Screen name="PostScreen" component={PostScreen} options={{headerShown:false}}/>
    <Stack.Screen name="AddImagesScreen" component={AddImagesScreen} options={{headerShown:false}}/>
    <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{headerShown:false}}/>
    <Stack.Screen name="HighlightScreen" component={HighlightScreen} options={{headerShown:false}}/>
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{headerShown:false}}/>


      </Stack.Navigator>

  );
};

export default AppNavigator;