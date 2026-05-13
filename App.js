import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [ket, setKet] = useState('');
  const [nominal, setNominal] = useState('');
  const [transaksi, setTransaksi] = useState([]);

  // Hitung saldo
  const totalSaldo = transaksi.reduce((total, item) => {
    return item.tipe === 'masuk'
      ? total + item.nominal
      : total - item.nominal;
  }, 0);

  // Tambah transaksi
  const tambahTransaksi = (tipe) => {
    if (!ket || !nominal) {
      alert('Isi semua data!');
      return;
    }

    const dataBaru = {
      id: Date.now().toString(),
      ket: ket,
      nominal: parseInt(nominal),
      tipe: tipe,
    };

    setTransaksi([dataBaru, ...transaksi]);

    setKet('');
    setNominal('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header Saldo */}
      <View style={styles.saldoBox}>
        <Text style={styles.saldoLabel}>Total Saldo</Text>
        <Text style={styles.saldo}>
          Rp {totalSaldo.toLocaleString('id-ID')}
        </Text>
      </View>

      {/* Form Input */}
      <View style={styles.form}>
        <TextInput
          placeholder="Deskripsi Transaksi"
          style={styles.input}
          value={ket}
          onChangeText={setKet}
        />

        <TextInput
          placeholder="Nominal"
          style={styles.input}
          keyboardType="numeric"
          value={nominal}
          onChangeText={setNominal}
        />

        {/* Tombol */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.masukBtn]}
            onPress={() => tambahTransaksi('masuk')}
          >
            <Text style={styles.buttonText}>Pemasukan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.keluarBtn]}
            onPress={() => tambahTransaksi('keluar')}
          >
            <Text style={styles.buttonText}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* History */}
      <FlatList
        data={transaksi}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada transaksi
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemKet}>{item.ket}</Text>

            <Text
              style={{
                color:
                  item.tipe === 'masuk'
                    ? 'green'
                    : 'red',
                fontWeight: 'bold',
              }}
            >
              {item.tipe === 'masuk' ? '+' : '-'} Rp{' '}
              {item.nominal.toLocaleString('id-ID')}
            </Text>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  saldoBox: {
    backgroundColor: '#4e73df',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  saldoLabel: {
    color: 'white',
    fontSize: 18,
  },

  saldo: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },

  form: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  masukBtn: {
    backgroundColor: 'green',
    marginRight: 5,
  },

  keluarBtn: {
    backgroundColor: 'red',
    marginLeft: 5,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemKet: {
    fontSize: 16,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: 'gray',
  },
});
