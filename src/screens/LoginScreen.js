import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

// Responsive scaling helpers
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const BASE_URL = 'https://deffovibeo.duckdns.org';

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter username and password.');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, password}),
      });
      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Login Failed', data.message || 'Something went wrong.');
        return;
      }
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      navigation.replace('BottomTabs');
    } catch (error) {
      Alert.alert('Connection Error', 'Could not reach the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFF8EC" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Welcome</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter User Name"
                placeholderTextColor="#777777"
                value={name}
                onChangeText={setName}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#777777"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.loginButton, loading && {opacity: 0.6}]}
              onPress={handleLogin}
              disabled={loading}>
              <Text style={styles.loginButtonText}>
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social */}
          <View style={styles.socialContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
              <Image source={require('../assets/google.png')} style={styles.socialIcon} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
              <Image source={require('../assets/facebook.png')} style={styles.socialIcon} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
              <Image source={require('../assets/apple.png')} style={styles.socialIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {/* Sign up */}
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Don't have an Account?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleSignup}>
              <Text style={styles.signupText}> Sign up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8EC',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(32),
    backgroundColor: '#F0DDC0',
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(28),
  },
  logo: {
    width: scale(110),
    height: scale(110),
  },
  welcomeText: {
    fontSize: moderateScale(32),
    color: '#FDBB67',
    fontWeight: '500',
    marginTop: verticalScale(16),
  },

  // Form
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    width: width * 0.78,
    height: verticalScale(58),
    borderWidth: 2,
    borderColor: '#8B8B8B',
    borderRadius: moderateScale(28),
    backgroundColor: '#FFF8EC',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  input: {
    fontSize: moderateScale(16),
    color: '#111111',
    fontWeight: '500',
    padding: 0,       // removes default Android inner padding
  },
  forgotPasswordText: {
    fontSize: moderateScale(15),
    color: '#FDBB67',
    fontWeight: '600',
    marginTop: verticalScale(2),
    marginBottom: verticalScale(20),
  },
  loginButton: {
    width: width * 0.78,
    height: verticalScale(58),
    borderWidth: 2,
    borderColor: '#8B8B8B',
    borderRadius: moderateScale(28),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: moderateScale(20),
    color: '#666666',
    fontWeight: '500',
  },

  // Social
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(44),
  },
  socialButton: {
    width: scale(56),
    height: scale(56),
    borderRadius: moderateScale(16),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10),
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  socialIcon: {
    width: scale(28),
    height: scale(28),
  },

  // Bottom
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(32),
  },
  bottomText: {
    fontSize: moderateScale(15),
    color: '#FDBB67',
    fontWeight: '400',
  },
  signupText: {
    fontSize: moderateScale(15),
    color: '#FDBB67',
    fontWeight: '700',
  },
});