import { View, Text, StyleSheet, Pressable, Image, Switch } from 'react-native';
import { useState } from 'react';

export default function Profile() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, isDarkMode && styles.headerTextDark]}>
          Profile
        </Text>
      </View>

      {/* Profile Card */}
      <View style={[styles.card, isDarkMode && styles.cardDark]}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
        <Text style={[styles.name, isDarkMode && styles.nameDark]}>John Doe</Text>
        <Text style={[styles.email, isDarkMode && styles.emailDark]}>
          johndoe@example.com
        </Text>

        {/* Dark Mode Toggle */}
        <View style={styles.darkModeRow}>
          <Text style={[styles.darkModeText, isDarkMode && styles.darkModeTextDark]}>
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#ccc', true: '#4f46e5' }}
            thumbColor={isDarkMode ? '#fff' : '#fff'}
          />
        </View>

        {/* Edit Profile Button */}
        <Pressable style={[styles.button, isDarkMode && styles.buttonDark]}>
          <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>
            Edit Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    paddingTop: 50,
  },
  containerDark: {
    backgroundColor: '#1f2937',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  headerTextDark: {
    color: '#fff',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardDark: {
    backgroundColor: '#374151',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  nameDark: {
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  emailDark: {
    color: '#d1d5db',
  },
  darkModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  darkModeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  darkModeTextDark: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 999,
  },
  buttonDark: {
    backgroundColor: '#6366f1',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextDark: {
    color: '#f3f4f6',
  },
});