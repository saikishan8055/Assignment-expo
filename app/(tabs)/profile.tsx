import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useProfile } from "../../context/ProfileContext";
import { useTheme } from "../../context/ThemeContext";

export default function Profile() {
  const { profile, updateProfile } = useProfile();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);

  const saveProfile = () => {
    updateProfile({ name, email, avatar });
    setEditing(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) setAvatar(result.assets[0].uri);
  };

  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.containerDark]}
      contentContainerStyle={{ alignItems: "center", paddingTop: 50 }}
    >
      <Pressable onPress={editing ? pickImage : undefined}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </Pressable>

      {editing ? (
        <>
          <TextInput
            value={name}
            onChangeText={setName}
            style={[styles.input, isDarkMode && styles.inputDark]}
            placeholder="Name"
            placeholderTextColor={isDarkMode ? "#d1d5db" : "#9ca3af"}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={[styles.input, isDarkMode && styles.inputDark]}
            placeholder="Email"
            placeholderTextColor={isDarkMode ? "#d1d5db" : "#9ca3af"}
          />
        </>
      ) : (
        <>
          <Text style={[styles.name, isDarkMode && styles.nameDark]}>
            {profile.name}
          </Text>
          <Text style={[styles.email, isDarkMode && styles.emailDark]}>
            {profile.email}
          </Text>
        </>
      )}

      <Pressable
        onPress={editing ? saveProfile : () => setEditing(true)}
        style={[styles.button, isDarkMode && styles.buttonDark]}
      >
        <Text style={[styles.buttonText, isDarkMode && styles.buttonText]}>
          {editing ? "Save Profile" : "Edit Profile"}
        </Text>
      </Pressable>

      <Pressable
        onPress={toggleDarkMode}
        style={[styles.button, styles.darkButton]}
      >
        <Text style={styles.buttonText}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  containerDark: { backgroundColor: "#1f2937" },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "700", color: "#111827" },
  nameDark: { color: "#fff" },
  email: { fontSize: 16, color: "#6b7280", marginBottom: 20 },
  emailDark: { color: "#d1d5db" },
  input: {
    width: 250,
    height: 45,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 8,
    color: "#111827",
    backgroundColor: "#fff",
  },
  inputDark: {
    borderColor: "#4b5563",
    backgroundColor: "#374151",
    color: "#fff",
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
    marginTop: 16,
  },
  buttonDark: { backgroundColor: "#6366f1" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  darkButton: { backgroundColor: "#f3f4f6", marginTop: 10 },
});
