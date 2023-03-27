import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Button from '../components/Button';
import Prompt from '../components/Prompt';
import NfcManager, {NfcEvents, NfcTech, Ndef} from 'react-native-nfc-manager';

const ReadTagScreen = () => {
  const androidPromptRef = useRef();

  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');

  // useEffect(() => {
  //   NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
  //     // console.warn('tag discover', tag);
  //   });

  //   return () => {
  //     NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  //   };
  // }, []);

  const handleRead = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag.ndefMessage) {
        const bytes = tag.ndefMessage[0].payload;
        const byte = tag.ndefMessage[1].payload;
        const name = Ndef.text.decodePayload(bytes);
        const kelas = Ndef.text.decodePayload(byte);
        setNama(name);
        setKelas(kelas);
        Alert.alert('Sukses', 'Data berhasil dibaca dari NFC tag');
        androidPromptRef.current.setVisible(false);
      } else {
        Alert.alert('Error', 'Tidak ada data yang ditemukan pada NFC tag');
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
    <View style={styles.sectionContainer}>
      <View style={styles.card}>
        <Text style={{marginBottom: 10, color: 'black'}}>{nama}</Text>
        <Text style={{color: 'black'}}>{kelas}</Text>
        {/* </View> */}
      </View>
      <Button theme="primary" label="Scan Tag" onPress={scanTag} />
      <Prompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
    </View>
  );
};

export default ReadTagScreen;

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
