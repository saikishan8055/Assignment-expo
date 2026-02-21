import { View, Text, FlatList, Pressable } from 'react-native';
import { providers } from '../../data/providers';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteProviders = providers.filter((p) =>
    favorites.includes(p.id)
  );

  if (favoriteProviders.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">No favorites yet ❤️</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={favoriteProviders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="mb-5 rounded-3xl bg-white p-5">
          <View className="flex-row justify-between">
            <Text className="text-lg font-semibold">{item.name}</Text>

            {/* 🤍 Unfavorite → disappears instantly */}
            <Pressable onPress={() => toggleFavorite(item.id)}>
              <Text className="text-xl">❤️</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}