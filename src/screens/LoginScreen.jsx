import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Login} from '../../assets';
import {auth} from '../../firebase';
import Button from '../components/Button';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Dashboard');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Login Success!', 'Kamu berhasil login'); // menampilkan alert sukses
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        let customError = null;

        switch (errorCode) {
          case 'auth/invalid-email':
            customError = {message: 'Email yang dimasukkan tidak valid'};
            break;
          case 'auth/user-disabled':
            customError = {message: 'Akun Anda telah dinonaktifkan'};
            break;
          case 'auth/user-not-found':
            customError = {
              message: 'Email atau password yang dimasukkan tidak ditemukan',
            };
            break;
          case 'auth/wrong-password':
            customError = {
              message: 'Email atau password yang dimasukkan salah',
            };
            break;
          default:
            customError = {message: errorMessage};
            break;
        }

        throw customError;
      });
  };

  const handleLoginPress = () => {
    handleLogin().catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Login />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <Button theme="primary" label="Login" onPress={handleLoginPress} />
      <Button label="Kembali" onPress={navigation.goBack} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    backgroundColor: 'white',
    position: 'relative',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#acacac',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    justifyContent: 'flex-start',
  },
});
