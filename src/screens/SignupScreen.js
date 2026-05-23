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
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

// 👇 Change this to your actual server URL
const BASE_URL = 'https://deffovibeo.duckdns.org';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);  // 👈 added

  const handleSignup = async () => {
    // Validation
    if (!name.trim() ||  !email.trim() || !password.trim()) {
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

      // Save token & user
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      navigation.replace('BottomTabs');

    } catch (error) {
      Alert.alert('Connection Error', 'Could not reach the server. Check your BASE_URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    // ✅ Everything below is exactly your original UI — untouched
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F3F4F6" barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">

          <View style={styles.logoSection}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Welcome</Text>
          </View>

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
              style={styles.signupButton}
              onPress={handleSignup}
              disabled={loading}>   {/* 👈 only added disabled prop */}
              <Text style={styles.signupButtonText}>Signup</Text>
            </TouchableOpacity>

            <Text style={styles.socialText}>or Sign up with</Text>

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

// ✅ Your original styles — completely untouched
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: height * 0.015,
    paddingBottom: 24,
  },
  logoSection: { alignItems: 'center', marginBottom: 18 },
  logo: { width: 92, height: 92 },
  welcomeText: { fontSize: 34, color: '#A100C8', fontWeight: '500', marginTop: 14 },
  inputWrapper: {
    width: width * 0.75,
    height: 64,
    borderWidth: 2,
    borderColor: '#7D7D7D',
    borderRadius: 28,
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginBottom: 18,
    backgroundColor: '#F3F4F6',
  },
  termsText: { fontSize: 18, color: '#8A00B8', fontWeight: '500', marginTop: 2, marginBottom: 20 },
  socialText: { fontSize: 18, color: '#111111', marginTop: 24, marginBottom: 20, fontWeight: '400' },
  socialContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 42 },
  keyboardContainer: { flex: 1 },
  brandText: { fontSize: 26, color: '#A100C8', fontWeight: '400', marginTop: -2 },
  formContainer: { width: '100%', alignItems: 'center' },
  input: { fontSize: 17, color: '#111111', fontWeight: '500' },
  signupButton: {
    width: width * 0.75,
    height: 64,
    borderWidth: 2,
    borderColor: '#7D7D7D',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  signupButtonText: { fontSize: 24, color: '#707070', fontWeight: '500' },
  socialButton: {
    width: 62, height: 62, borderRadius: 18, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 10,
    shadowColor: '#000', shadowOpacity: 0.10, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 5,
  },
  socialIcon: { width: 30, height: 30 },
  bottomContainer: { flexDirection: 'row', alignItems: 'center' },
  bottomText: { fontSize: 18, color: '#8A00B8', fontWeight: '400' },
  loginText: { fontSize: 18, color: '#8A00B8', fontWeight: '700' },
});