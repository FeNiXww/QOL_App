import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'; // מחקנו את useEffect כי לא צריך אותו בלוגיקה הזו
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

// 1. המאגר המתוקן: רק ישראלים ופלסטינים, רק עברית וערבית
const PROFILES = [
  { 
    id: 1,
    name: "Ahmed", 
    age: 24, 
    image: "https://randomuser.me/api/portraits/men/32.jpg", 
    location: "Ramallah", 
    learns: "Hebrew (Basic)", 
    native: "Arabic",
    hobby: "Coding & Hummus" 
  },
  { 
    id: 2,
    name: "Noa", 
    age: 22, 
    image: "https://randomuser.me/api/portraits/women/44.jpg", 
    location: "Tel Aviv", 
    learns: "Arabic (Beginner)", 
    native: "Hebrew",
    hobby: "Surfing & Art" 
  },
  { 
    id: 3,
    name: "Ibrahim", 
    age: 26, 
    image: "https://randomuser.me/api/portraits/men/22.jpg", 
    location: "Jerusalem", 
    learns: "Hebrew (Fluent)", 
    native: "Arabic",
    hobby: "Music & Football" 
  },
  { 
    id: 4,
    name: "Maya", 
    age: 23, 
    image: "https://randomuser.me/api/portraits/women/68.jpg", 
    location: "Haifa", 
    learns: "Arabic (Intermediate)", 
    native: "Hebrew",
    hobby: "Photography" 
  },
  { 
    id: 5,
    name: "Yussuf", 
    age: 25, 
    image: "https://randomuser.me/api/portraits/men/11.jpg", 
    location: "Nablus", 
    learns: "Hebrew (Advanced)", 
    native: "Arabic",
    hobby: "Reading & Tech" 
  }
];

export default function App() {
  // השינוי הגדול: במקום לבחור רנדומלי, אנחנו שומרים אינדקס (מספר סידורי)
  const [currentIndex, setCurrentIndex] = useState(0);

  // המשתמש הנוכחי שמוצג על המסך
  const user = PROFILES[currentIndex];

  // פונקציה למעבר למשתמש הבא
  const nextUser = () => {
    // אם הגענו לסוף הרשימה -> תחזור לראשון (0). אחרת -> תעבור לבא (+1)
    if (currentIndex < PROFILES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // לופ חוזר להתחלה
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Language Soulmate 🤝</Text>
      
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

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.passButton]} onPress={nextUser}>
          <Text style={styles.buttonText}>Pass ❌</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.matchButton]} 
          onPress={() => Alert.alert("It's a Match! 🎉", `Start chatting with ${user.name} in ${user.learns.split(' ')[0]}!`)}>
          <Text style={styles.buttonText}>Connect 💬</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#4A90E2', marginTop: 30 },
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