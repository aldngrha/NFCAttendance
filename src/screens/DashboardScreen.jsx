import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import Prompt from '../components/Prompt';

function DashboardScreen() {
  const navigation = useNavigation();

  const androidPromptRef = useRef();

  const DeleteTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const records = [Ndef.emptyRecord()];
      const bytes = Ndef.encodeMessage(records);
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      Alert.alert('Sukses', 'Data berhasil dihapus');
      androidPromptRef.current.setVisible(false);
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const scanTag = async () => {
    androidPromptRef.current.setVisible(true);
    await DeleteTag();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Write Tag')}>
        <View style={styles.cardContainer}>
          <MaterialCommunityIcon name="nfc" size={40} color="white" />
          <Text style={styles.textStyle}>Tulis</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Read Tag')}>
        <View style={styles.cardContainer1}>
          <MaterialCommunityIcon
            name="smart-card-reader"
            size={40}
            color="white"
          />
          <Text style={styles.textStyle}>Baca</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Edit Tag')}>
        <View style={styles.cardContainer2}>
          <MaterialCommunityIcon
            name="square-edit-outline"
            size={40}
            color="white"
          />
          <Text style={styles.textStyle}>Edit</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={scanTag}>
        <View style={styles.cardContainer3}>
          <MaterialCommunityIcon
            name="eraser-variant"
            size={40}
            color="white"
          />
          <Text style={styles.textStyle}>Hapus</Text>
        </View>
      </TouchableOpacity>
      <Prompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
    </SafeAreaView>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexWrap: 'wrap',
    paddingTop: 20,
  },
  cardContainer: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    padding: 60,
    margin: 10,
    borderRadius: 20,
  },
  cardContainer1: {
    backgroundColor: '#19B300',
    alignItems: 'center',
    padding: 60,
    margin: 10,
    borderRadius: 20,
  },
  cardContainer2: {
    backgroundColor: '#f0ad4e',
    alignItems: 'center',
    padding: 60,
    margin: 10,
    borderRadius: 20,
  },
  cardContainer3: {
    backgroundColor: '#E40000',
    alignItems: 'center',
    padding: 60,
    margin: 10,
    borderRadius: 20,
  },
  textStyle: {
    color: 'white',
    marginTop: 10,
    fontSize: 25,
  },
});
