// import { View, Text, FlatList, Pressable } from 'react-native';
// import { providers } from '../../data/providers';
// import { useFavorites } from '../../context/FavoritesContext';

// export default function FavoritesScreen() {
//   const { favorites, toggleFavorite } = useFavorites();

//   const favoriteProviders = providers.filter((p) =>
//     favorites.includes(p.id)
//   );

//   if (favoriteProviders.length === 0) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-gray-500">No favorites yet ❤️</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       contentContainerStyle={{ padding: 16 }}
//       data={favoriteProviders}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View className="mb-5 rounded-3xl bg-white p-5">
//           <View className="flex-row justify-between">
//             <Text className="text-lg font-semibold">{item.name}</Text>

//             {/* 🤍 Unfavorite → disappears instantly */}
//             <Pressable onPress={() => toggleFavorite(item.id)}>
//               <Text className="text-xl">❤️</Text>
//             </Pressable>
//           </View>
//         </View>
//       )}
//     />
//   );
// }
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { providers } from '../../data/providers';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteProviders = providers.filter((p) =>
    favorites.includes(p.id)
  );

  if (favoriteProviders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No favorites yet ❤️
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteProviders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.name}>
                {item.name}
              </Text>
              <Text style={styles.category}>
                {item.category}
              </Text>
            </View>

            {/* ❤️ Unfavorite */}
            <Pressable onPress={() => toggleFavorite(item.id)}>
              <Text style={styles.heart}>❤️</Text>
            </Pressable>
          </View>

          <Text
            numberOfLines={2}
            style={styles.description}
          >
            {item.description}
          </Text>

          <View style={styles.footer}>
            <Text style={styles.location}>
              📍 {item.location}
            </Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  /* Empty */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },

  /* List */
  listContent: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f3f4f6',
  },

  /* Card */
  card: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  category: {
    marginTop: 4,
    fontSize: 13,
    color: '#4f46e5',
  },

  heart: {
    fontSize: 24,
  },

  description: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },

  footer: {
    marginTop: 16,
  },
  location: {
    fontSize: 13,
    color: '#6b7280',
  },
});