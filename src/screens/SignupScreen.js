import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

// Responsive scaling helpers
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const BASE_URL = 'https://deffovibeo.duckdns.org';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password}),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Signup Failed', data.message || 'Something went wrong.');
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

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFF8EC" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">

          {/* Logo */}
          <View style={styles.logoSection}>
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
                placeholder="Enter Name"
                placeholderTextColor="#7B7B7B"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter Email Address"
                placeholderTextColor="#7B7B7B"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor="#7B7B7B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Confirm Your Password"
                placeholderTextColor="#7B7B7B"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
              />
            </View>

            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.termsText}>Agree with Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.signupButton, loading && {opacity: 0.6}]}
              onPress={handleSignup}
              disabled={loading}>
              <Text style={styles.signupButtonText}>
                {loading ? 'Signing up...' : 'Signup'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.socialText}>or Sign up with</Text>

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

            {/* Bottom */}
            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>Already have an Account?</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
                <Text style={styles.loginText}> Login</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8EC',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(24),
    backgroundColor: '#F0DDC0',
  },

  // Logo
  logoSection: {
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  logo: {
    width: scale(90),
    height: scale(90),
  },
  welcomeText: {
    fontSize: moderateScale(32),
    color: '#FDBB67',
    fontWeight: '500',
    marginTop: verticalScale(12),
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
    borderColor: '#7D7D7D',
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    paddingHorizontal: scale(18),
    marginBottom: verticalScale(16),
    backgroundColor: '#FFF8EC',
  },
  input: {
    fontSize: moderateScale(15),
    color: '#111111',
    fontWeight: '500',
    padding: 0,
  },
  termsText: {
    fontSize: moderateScale(15),
    color: '#FDBB67',
    fontWeight: '500',
    marginTop: verticalScale(2),
    marginBottom: verticalScale(18),
  },
  signupButton: {
    width: width * 0.78,
    height: verticalScale(58),
    borderWidth: 2,
    borderColor: '#7D7D7D',
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  signupButtonText: {
    fontSize: moderateScale(20),
    color: '#707070',
    fontWeight: '500',
  },

  // Social
  socialText: {
    fontSize: moderateScale(15),
    color: '#111111',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(16),
    fontWeight: '400',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(32),
  },
  socialButton: {
    width: scale(54),
    height: scale(54),
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
    width: scale(26),
    height: scale(26),
  },

  // Bottom
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: moderateScale(15),
    color: '#FDBB67',
    fontWeight: '400',
  },
  loginText: {
    fontSize: moderateScale(15),
    color: '#FDBB67',
    fontWeight: '700',
  },
});