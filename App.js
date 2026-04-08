import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {

  // STATE
  const [kodeKelas, setKodeKelas] = useState('');
  const [isHadir, setIsHadir] = useState(false);
  const [waktuAbsen, setWaktuAbsen] = useState('');
  const [jamRealtime, setJamRealtime] = useState('Memuat jam...');

  const studentData = {
    nama: 'Budi Susanto',
    nim: '030812345',
    prodi: 'TRPL - Politeknik Astra'
  };

  // LIFECYCLE
  useEffect(() => {
    const timer = setInterval(() => {
      const waktu = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setJamRealtime(waktu);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAbsen = () => {
    if (kodeKelas.trim() === "") {
      alert("Kode kelas (Simulasi QR) tidak boleh kosong!");
      return;
    }
    setIsHadir(true);
    setWaktuAbsen(jamRealtime);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sistem Presensi</Text>
          <Text style={styles.clockText}>{jamRealtime}</Text>
        </View>

        {/* CONTENT WRAPPER */}
        <View style={styles.cardWrapper}>

          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <Image
              style={styles.profileImage}
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png" }}
            />
            <View>
              <Text style={styles.profileName}>{studentData.nama}</Text>
              <Text style={styles.profileNim}>{studentData.nim}</Text>
              <Text style={styles.profileProdi}>{studentData.prodi}</Text>
            </View>
          </View>

          {/* FORM / SUCCESS */}
          {!isHadir ? (
            <View style={styles.inputCard}>
              <Text style={styles.instuctionText}>Masukkan Kode Kelas:</Text>
              <Text style={styles.noteText}>(Simulasi dari hasil Scan QR Kamera)</Text>

              <TextInput
                style={styles.input}
                placeholder="Contoh: TRPL-03"
                value={kodeKelas}
                onChangeText={setKodeKelas}
              />

              <TouchableOpacity style={styles.buttonSubmit} onPress={handleAbsen}>
                <Text style={styles.buttonText}>Konfirmasi Kehadiran</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.successCard}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/845/845646.png" }}
                style={styles.successIcon}
              />
              <Text style={styles.successText}>Presensi Berhasil!</Text>
              <Text style={styles.timeText}>Tercatat pada: {waktuAbsen} WIB</Text>
              <Text style={styles.codeText}>Kode Terverifikasi: {kodeKelas}</Text>
            </View>
          )}

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

/* ===================
      STYLE SECTION
=================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9edf4",
    paddingHorizontal: 20,
  },

  // ───── HEADER ─────
  header: {
    marginTop: 10,
    backgroundColor: "#0056A0",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  clockText: {
    marginTop: 4,
    color: "#D1E8FF",
    fontSize: 14,
  },

  // ───── CARD WRAPPER ─────
  cardWrapper: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },

  // ───── PROFILE SECTION ─────
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    gap: 15,
  },
  profileImage: {
    width: 55,
    height: 55,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileNim: {
    fontSize: 14,
    color: "#555",
  },
  profileProdi: {
    fontSize: 14,
    color: "#777",
  },

  // ───── INPUT CARD ─────
  inputCard: {
    marginTop: 10,
  },
  instuctionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  noteText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fefefe",
  },
  buttonSubmit: {
    backgroundColor: "#0056A0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ───── SUCCESS CARD ─────
  successCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  successIcon: {
    width: 70,
    height: 70,
    marginBottom: 12,
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 5,
  },
  timeText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  codeText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});