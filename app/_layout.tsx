import { Stack } from 'expo-router';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ThemeProvider } from '../context/ThemeContext';
import { ProfileProvider } from '../context/ProfileContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <FavoritesProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="provider/[id]"
              // options={{ headerShown: true, title: 'Details' }}
            />
          </Stack>
        </FavoritesProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}