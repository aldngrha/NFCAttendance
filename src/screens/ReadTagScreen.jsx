import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';

const ReadTagScreen = () => {
  const [ndefText, setNdefText] = useState([]);

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {});

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity title="Start NFC">
        <Text>Baca</Text>
      </TouchableOpacity>
      <TouchableOpacity title="Stop NFC">
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReadTagScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'green',
  },
  btnScan: {
    borderRadius: 21,
  },
});
