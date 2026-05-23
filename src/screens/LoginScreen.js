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
  Alert,          // 👈 added
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 added

const {width, height} = Dimensions.get('window');

const BASE_URL = 'https://deffovibeo.duckdns.org'; // 👈 added

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // 👈 added

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

      // Save token & user
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
    // ✅ Your original UI — completely untouched
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F3F4F6" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          <View style={styles.logoContainer}>
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
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}>   {/* 👈 only added disabled prop */}
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

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

// ✅ Your original styles — completely untouched
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  keyboardView: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: height * 0.04,
    paddingBottom: 32,
  },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logo: { width: 120, height: 120 },
  welcomeText: { fontSize: 34, color: '#A100C8', fontWeight: '500', marginTop: 20 },
  formContainer: { width: '100%', alignItems: 'center' },
  inputWrapper: {
    width: width * 0.75,
    height: 64,
    borderWidth: 2,
    borderColor: '#8B8B8B',
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  input: { fontSize: 18, color: '#111111', fontWeight: '500' },
  forgotPasswordText: { fontSize: 18, color: '#8A00B8', fontWeight: '600', marginTop: 4, marginBottom: 24 },
  loginButton: {
    width: width * 0.75,
    height: 64,
    borderWidth: 2,
    borderColor: '#8B8B8B',
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: { fontSize: 22, color: '#666666', fontWeight: '500' },
  socialContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 56 },
  socialButton: {
    width: 62, height: 62, borderRadius: 18, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 10,
    shadowColor: '#000', shadowOpacity: 0.10, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 5,
  },
  socialIcon: { width: 30, height: 30 },
  bottomContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 40 },
  bottomText: { fontSize: 18, color: '#8A00B8', fontWeight: '400' },
  signupText: { fontSize: 18, color: '#8A00B8', fontWeight: '700' },
});