import {ActivityIndicator, Alert, StyleSheet, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {Sync} from '../../assets';
import Button from '../components/Button';
import Prompt from '../components/Prompt';
import {ref, push} from 'firebase/database';
import {database} from '../../firebase';
import {useNavigation} from '@react-navigation/native';

const ScanScreen = () => {
  const androidPromptRef = useRef();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const handleRead = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      try {
        if (tag.ndefMessage && tag.ndefMessage.length > 0) {
          const bytes = tag.ndefMessage[0].payload;
          const name = Ndef.text.decodePayload(bytes);
          const byte = tag.ndefMessage[1].payload;
          const kelas = Ndef.text.decodePayload(byte);
          androidPromptRef.current.setVisible(false);

          setIsLoading(true);
          const absensiRef = push(ref(database, 'attendance'));
          const timestamp = Date.now();
          const timeOptions = {timeZone: 'Asia/Jakarta', hour12: false};
          const time = new Date(timestamp).toLocaleTimeString(
            'id-ID',
            timeOptions,
          );
          const scanHour = new Date(timestamp).getHours();
          const status = scanHour >= 7 ? 'Terlambat' : 'Tepat waktu';

          const date = new Date(timestamp);
          const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
          const formattedDate = date.toLocaleDateString('id-ID', options);

          const data = {
            tanggal: formattedDate,
            nama_lengkap: name,
            kelas: kelas,
            waktu_scan: time,
            status_absen: status,
          };
          push(absensiRef, data)
            .then(() => {
              setIsLoading(false);
              navigation.navigate('Success', {data: data});
            })
            .catch(error => {
              Alert.alert('Error', 'Gagal mengirim data ke server');
            });
        } else {
          Alert.alert('Error', 'Tidak ada data yang ditemukan pada NFC tag');
          androidPromptRef.current.setVisible(false);
        }
      } catch (error) {
        Alert.alert('Error', 'Tidak ada data yang ditemukan pada NFC tag');
        androidPromptRef.current.setVisible(false);
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const scanTag = async () => {
    androidPromptRef.current.setVisible(true);
    await handleRead();
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <Sync />
      <Text style={styles.text}>Scan kartu untuk absen</Text>
      <Button theme="primary" label="Scan Tag" onPress={scanTag} />
      <Prompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
    </SafeAreaView>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginBottom: 20,
    fontSize: 17,
  },
});
