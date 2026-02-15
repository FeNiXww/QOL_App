import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const userData = data.results[0];
      
      setUser({
        name: userData.name.first,
        age: userData.dob.age,
        image: userData.picture.large,
        location: userData.location.city,
        native: Math.random() > 0.5 ? 'Hebrew' : 'Arabic',
        learns: Math.random() > 0.5 ? 'Arabic' : 'Hebrew',
        hobby: 'Language Exchange'
      });
    } catch (error) {
      Alert.alert("Error", "Could not fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QOL 🤝</Text>
      
      {user && (
        <View style={styles.card}>
          <Image source={{ uri: user.image }} style={styles.image} />
          
          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}, {user.age}</Text>
            </View>
            
            <Text style={styles.location}>📍 {user.location}</Text>
            
            <View style={styles.languageBox}>
              <Text style={styles.langItem}>🗣 Speaks: <Text style={styles.bold}>{user.native}</Text></Text>
              <Text style={styles.langItem}>🎓 Learning: <Text style={styles.bold}>{user.learns}</Text></Text>
            </View>

            <View style={styles.tag}>
               <Text style={styles.tagText}>✨ {user.hobby}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.passButton]} onPress={fetchUser}>
          <Text style={styles.buttonText}>Pass ❌</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.matchButton]} 
          onPress={() => Alert.alert("Connected! 🎉", `Time to practice with ${user.name}!`)}>
          <Text style={styles.buttonText}>Connect 💬</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#4A90E2', marginTop: 30 },
  card: { width: '100%', height: 500, backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', elevation: 5, marginBottom: 30 },
  image: { width: '100%', height: '55%' },
  infoContainer: { padding: 20 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
  location: { fontSize: 18, color: 'gray', marginBottom: 15 },
  languageBox: { backgroundColor: '#f0f8ff', padding: 10, borderRadius: 10, marginBottom: 15 },
  langItem: { fontSize: 16, marginBottom: 5, color: '#333' },
  bold: { fontWeight: 'bold', color: '#0056b3' },
  tag: { backgroundColor: '#e3f2fd', padding: 10, borderRadius: 20, alignSelf: 'flex-start' },
  tagText: { color: '#1565c0', fontWeight: '600' },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  button: { width: '48%', padding: 15, borderRadius: 50, alignItems: 'center', elevation: 3 },
  passButton: { backgroundColor: '#ff5252' },
  matchButton: { backgroundColor: '#4caf50' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});