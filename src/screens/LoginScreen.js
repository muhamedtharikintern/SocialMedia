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
} from 'react-native';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  const handleSignup = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />


            <Text style={styles.welcomeText}>Welcome</Text>
          </View>

          {/* Input Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter User Name"
                placeholderTextColor="#777777"
                value={username}
                onChangeText={setUsername}
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
              <Text style={styles.forgotPasswordText}>
                Forgot Password
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.loginButton}
              onPress={handleLogin}>
              <Text style={styles.loginButtonText}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.socialButton}>
              <Image
                source={require('../assets/google.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.socialButton}>
              <Image
                source={require('../assets/facebook.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.socialButton}>
              <Image
                source={require('../assets/apple.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Signup */}
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>
              Don’t have an Account?
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSignup}>
              <Text style={styles.signupText}>
                {' '}Sign up
              </Text>
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
    backgroundColor: '#F3F4F6',
  },

  keyboardView: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: height * 0.08,
    paddingBottom: 32,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    width: 120,
    height: 120,
  },



  welcomeText: {
    fontSize: 34,
    color: '#A100C8',
    fontWeight: '500',
    marginTop: 40,
  },

  formContainer: {
    width: '100%',
    alignItems: 'center',
  },

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

  input: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '500',
  },

  forgotPasswordText: {
    fontSize: 18,
    color: '#8A00B8',
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 40,
  },

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

  loginButtonText: {
    fontSize: 22,
    color: '#666666',
    fontWeight: '500',
  },

  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 110,
  },

  socialButton: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,

    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  socialIcon: {
    width: 30,
    height: 30,
  },

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
  },

  bottomText: {
    fontSize: 18,
    color: '#8A00B8',
    fontWeight: '400',
  },

  signupText: {
    fontSize: 18,
    color: '#8A00B8',
    fontWeight: '700',
  },
});