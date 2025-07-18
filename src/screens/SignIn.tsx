import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { login } from '../service/APIFunctions';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types'; // adjust path as needed


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setToken } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const handleSignIn = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const responseData = await login(email, password);
      const token = responseData.data.access_token;
      await setToken(token);
      navigation.navigate("Tabs")
      setLoading(false);
      // Optionally navigate to the next screen here
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please check your credentials and try again.');
      console.log('error:  ', err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Sign In</Text>
        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.input}
          error={error && !email ? 'Email is required' : ''}
        />
        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.input}
          error={error && !password ? 'Password is required' : ''}
        />
      
        <CustomButton
          title={loading ? 'Signing In...' : 'Sign In'}
          onPress={handleSignIn}
          loading={loading}
          fullWidth
          style={styles.button}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    color: '#222',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});

export default SignIn;