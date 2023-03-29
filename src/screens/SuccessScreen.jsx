import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';

const SuccessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {tanggal, nama_lengkap, kelas, waktu_scan, status_absen} =
    route.params.data;

  const date = new Date(tanggal);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('id-ID', options);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.beforeCard}>
        <Text style={styles.title}>Berhasil Scan Tag</Text>
        <MaterialCommunityIcon name="check-circle" size={25} color="#6C63FF" />
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Hari, Tanggal : {formattedDate}</Text>
        <Text style={styles.text}>Nama Lengkap : {nama_lengkap}</Text>
        <Text style={styles.text}>Kelas : {kelas}</Text>
        <Text style={styles.text}>Waktu Scan : {waktu_scan}</Text>
        <Text style={styles.text}>Status Absen : {status_absen}</Text>
      </View>
      <Button
        theme="primary"
        label="Kembali ke home"
        onPress={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  beforeCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginRight: 5,
  },
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    marginBottom: 10,
  },
});
