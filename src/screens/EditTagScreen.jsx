import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import Button from '../components/Button';
import Prompt from '../components/Prompt';
import NfcManager, {NfcEvents, NfcTech, Ndef} from 'react-native-nfc-manager';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const EditTagScreen = () => {
  const androidPromptRef = useRef();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [kelass, setKelass] = useState('');
  const [isDataAvailable, setIsDataAvailable] = useState(false); // Tambahkan state baru

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
          setName(name);
          setKelass(kelas);
          setIsDataAvailable(true);
          Alert.alert('Sukses', 'Data berhasil dibaca dari NFC tag');
          androidPromptRef.current.setVisible(false);
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

  const handleEdit = () => {
    navigation.navigate('Update Data', {name, kelass});
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsDataAvailable(false);
      };
    }, [setIsDataAvailable]),
  );

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.card}>
        {isDataAvailable ? (
          <>
            <Text style={{marginBottom: 10, color: 'black'}}>
              Nama Lengkap : {name}
            </Text>
            <Text style={{color: 'black'}}>Kelas : {kelass}</Text>
          </>
        ) : (
          <Text
            style={{
              color: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Scan Tag untuk menampilkan data
          </Text>
        )}
      </View>
      {isDataAvailable}
      <Button
        theme="primary"
        label={isDataAvailable ? 'Edit Tag' : 'Scan Tag'}
        onPress={isDataAvailable ? handleEdit : scanTag}
      />
      <Prompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
    </View>
  );
};

export default EditTagScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -300,
  },
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'green',
  },
});
