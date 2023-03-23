import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Attandance} from '../../assets';
import Button from '../components/Button';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Attandance />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginTop: 30,
          marginBottom: 30,
        }}>
        Absensi Online
      </Text>
      <Button theme="primary" label="Absen Siswa" />
      <Button
        theme="secondary"
        label="Login Admin"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create([]);
