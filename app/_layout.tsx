import { Stack } from 'expo-router';
import { FavoritesProvider } from '../context/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="provider/[id]"
          options={{ headerShown: false, title: 'Details', }}
          
        />  
      </Stack>
    </FavoritesProvider>
  );
}