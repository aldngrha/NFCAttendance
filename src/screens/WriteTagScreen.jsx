import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import NfcManager, {Ndef, NfcEvents, NfcTech} from 'react-native-nfc-manager';
import Button from '../components/Button';
import Prompt from '../components/Prompt';

const validateInput = (nama, kelas) => {
  if (!nama && !kelas) {
    Alert.alert('Error', 'Nama atau kelas tidak boleh kosong');
    return false;
  }
  return true;
};

const WriteTagScreen = () => {
  const androidPromptRef = useRef();

  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');

  const handleSubmit = async () => {
    // Menyimpan input dari user ke dalam state

    if (!validateInput(nama, kelas)) {
      return;
    }

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Membuat array record untuk ditulis ke NFC tag
      const records = [Ndef.textRecord(nama), Ndef.textRecord(kelas)];
      const bytes = Ndef.encodeMessage(records);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        Alert.alert('Sukses', 'Data berhasil ditulis ke NFC tag');
        setNama('');
        setKelas('');
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
    await handleSubmit();
  };

  const handleScanTag = async () => {
    if (!nama || !kelas) {
      Alert.alert('Error', 'Nama atau kelas tidak boleh kosong');
      return;
    }
    await scanTag();
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <View style={styles.inputContainer}> */}
      <View style={styles.card}>
        <Text style={{marginBottom: 10, color: 'black'}}>
          Nama Lengkap : {nama}
        </Text>
        <Text style={{color: 'black'}}>Kelas : {kelas}</Text>
        {/* </View> */}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          placeholder="Nama Lengkap ..."
          style={styles.input}
          value={nama}
          onChangeText={text => setNama(text)}
        />
        <Text style={styles.label}>Kelas</Text>
        <TextInput
          placeholder="Kelas ..."
          style={styles.input}
          value={kelas}
          onChangeText={text => setKelas(text)}
        />
      </View>
      <Button theme="primary" label="Tulis tag" onPress={handleScanTag} />
      <Prompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default WriteTagScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: -150,
    position: 'relative',
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
});
