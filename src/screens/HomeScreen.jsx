import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Attandance, Oops, Off} from '../../assets';
import Button from '../components/Button';
import NfcManager from 'react-native-nfc-manager';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [hasNfc, setHasNfc] = useState(null);
  const [isEnabled, setIsEnabled] = useState(null);

  useEffect(() => {
    const checkNfc = async () => {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        setIsEnabled(await NfcManager.isEnabled());
      }
      setHasNfc(supported);
    };

    checkNfc();
  }, []);

  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Oops />
        <Text style={{marginTop: 25}}>
          Maaf, perangkat kamu tidak mendukung fitur NFC
        </Text>
      </View>
    );
  } else if (!isEnabled) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Off />
        <Text style={{marginTop: 25}}>
          Aktifkan fitur NFC kamu terlebih dahulu
        </Text>
        <TouchableOpacity
          onPress={() => {
            NfcManager.goToNfcSetting();
          }}
          style={{
            backgroundColor: '#6C63FF',
            paddingHorizontal: 75,
            paddingVertical: 15,
            borderRadius: 15,
            marginVertical: 15,
          }}>
          <Text style={{color: 'white'}}>Pergi ke pengaturan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            setIsEnabled(await NfcManager.isEnabled());
          }}
          style={{
            borderWidth: 1,
            borderRadius: 15,
            paddingHorizontal: 103,
            paddingVertical: 15,
            borderColor: '#6C63FF',
          }}>
          <Text style={{color: '#6C63FF'}}>Cek Ulang</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
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
}

const styles = StyleSheet.create([]);
