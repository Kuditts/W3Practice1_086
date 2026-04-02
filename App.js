import React, { Component } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import KartuProfil from "./components/KartuProfil";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kodeKelas: '',
      isHadir: false,
      waktuAbsen: '',
      jamRealtime: 'Memuat jam...',
    };

    this.studentData = {
      nama: 'Bizlee',
      nim: '0320240020',
      prodi: 'MI - Politeknik Astra',
    };
  }

  componentDidMount() {
    console.log('[Mounting] Aplikasi Presensi Dibuka');

    this.intervalJam = setInterval(() => {
      const waktu = new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      this.setState({ jamRealtime: waktu });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isHadir === true && prevState.isHadir === false) {
      console.log(`[Updating] Suksesi presensi pada pukul: ${this.state.waktuAbsen}`);
    }
  }

  componentWillUnmount() {
    console.log('[Unmounting] Aplikasi Ditutup. Membersihkan memori...');
    clearInterval(this.intervalJam);
  }

  handleAbsen = () => {
    if (this.state.kodeKelas.trim() === '') {
      alert('Kode kelas (Simulasi QR) tidak boleh kosong!');
      return;
    }

    this.setState({
      isHadir: true,
      waktuAbsen: this.state.jamRealtime,
    });
  };

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sistem Presensi</Text>
            <Text style={styles.clockText}>{this.state.jamRealtime}</Text>
          </View>

          <KartuProfil students={this.studentData} />

          <View style={styles.actionSection}>
            {this.state.isHadir ? (
              <View style={styles.successCard}>
                <Image 
                  source={{uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png'}}
                  style={styles.successIcon}
                />
                <Text style={styles.successText}>Presensi Berhasil!</Text>
                <Text style={styles.timeText}>
                  Tercatat pada: {this.state.waktuAbsen}
                </Text>
                <Text style={styles.codeText}>
                  Kode terverifikasi: {this.state.kodeKelas}
                </Text>
              </View>
            ) : (
              <View style={styles.inputCard}>
                <Text style={styles.instuctionText}>Masukkan Kode Kelas:</Text>
                <Text style={styles.noteText}>
                  (Simulasi dari hasil Scan QR Kamera )
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Contoh: MI - 2A"
                  value={this.state.kodeKelas}
                  onChangeText={(text) => this.setState({ kodeKelas: text })}
                  autoCapitalize="characters"
                />

                <TouchableOpacity 
                  style={styles.buttonSubmit} 
                  onPress={this.handleAbsen}
                >
                  <Text style={styles.buttonText}>
                    Konfirmasi Kehadiran
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  header: {
    backgroundColor: '#0056A0',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#D1E8FF',
    fontSize: 14,
    marginTop: 5,
  },
  clockText: {
    color: '#fff',
    marginTop: 5,
  },
  actionSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  instuctionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  noteText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    color: '#333',
  },
  buttonSubmit: {
    backgroundColor: '#0056A0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  successText: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    fontFamily: 'monospace',
  },
  codeText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});