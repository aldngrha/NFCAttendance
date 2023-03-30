import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {database} from '../../firebase';
import {onValue, ref} from 'firebase/database';
import DatePicker from 'react-native-date-picker';

const ReadDataScreen = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(1);
  const [classFilter, setClassFilter] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateFilterText, setDateFilterText] = useState(
    'Filter berdasarkan tanggal',
  );

  // Memuat data dari Firebase saat komponen dimount
  useEffect(() => {
    const fetchData = async () => {
      const absensiRef = ref(database, 'attendance');
      // gunakan onValue() untuk mendapatkan data dari Firebase secara real-time
      onValue(absensiRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          setData(Object.values(data));
        }
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    setClassFilter('');
    setDate(new Date());
    setDateFilterText('Filter berdasarkan tanggal');
  }, []);

  // Render setiap item dalam FlatList
  const renderItem = ({item, index}) => {
    const key = Object.keys(item)[0];
    const {kelas, nama_lengkap, status_absen, tanggal, waktu_scan} = item[key];

    let filteredData = data;
    if (classFilter) {
      filteredData = filteredData.filter(item => {
        const itemData = item[key];
        const classNumber = classFilter.trim().toLowerCase(); // menghapus spasi di awal dan akhir, lalu mengubah menjadi lowercase
        return itemData && itemData.kelas.toLowerCase().startsWith(classNumber); // mengubah kelas menjadi lowercase dan membandingkan dengan classNumber yang sudah diubah menjadi lowercase
      });
    }

    const inputDate = new Date(date);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const formattedDate = inputDate.toLocaleDateString('id-ID', options);

    if (formattedDate) {
      filteredData = filteredData.filter(item => {
        const itemData = item[key];
        return itemData && itemData.tanggal === formattedDate;
      });
    }

    if (filteredData.length > 0) {
      return (
        <View style={styles.row}>
          <Text style={styles.cell}>{index + counter}</Text>
          <Text style={styles.cell}>{tanggal}</Text>
          <Text style={styles.cell}>{nama_lengkap}</Text>
          <Text style={styles.cell}>{kelas}</Text>
          <Text style={styles.cell}>{waktu_scan}</Text>
          <Text style={styles.cell}>{status_absen}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setClassFilter(text)}
          value={classFilter}
          placeholder="Filter berdasarkan kelas"
        />
        <>
          <TouchableOpacity
            style={{
              borderColor: '#acacac',
              borderWidth: 1,
              borderRadius: 10,
              marginRight: 15,
              marginLeft: 15,
              paddingHorizontal: 20,
              paddingVertical: 14,
            }}
            onPress={() => setOpen(true)}>
            <Text style={{marginLeft: -7, color: '#acacac'}}>
              {dateFilterText}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              };
              const formattedDate = date.toLocaleDateString('id-ID', options);
              setDateFilterText(formattedDate);
            }}
            locale="id-ID"
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>No</Text>
        <Text style={styles.headerText}>Tanggal</Text>
        <Text style={styles.headerText}>Nama Lengkap</Text>
        <Text style={styles.headerText}>Kelas</Text>
        <Text style={styles.headerText}>Waktu Scan</Text>
        <Text style={styles.headerText}>Status Absen</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => Object.keys(item)[0]}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.row}>
            <Text style={styles.cell}>Data tidak ditemukan</Text>
          </View>
        }
      />
    </View>
  );
};

export default ReadDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#acacac',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 8,
  },
});
