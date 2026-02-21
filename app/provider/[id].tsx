// import { View, Text } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { providers } from '../../data/providers';

// export default function ProviderDetails() {
//   const { id } = useLocalSearchParams();
//   const provider = providers.find((p) => p.id === id);

//   if (!provider) {
//     return <Text className="p-4">Provider not found</Text>;
//   }

//   return (
//     <View className="flex-1 bg-white p-4">
//       <Text className="text-2xl font-bold">{provider.name}</Text>
//       <Text className="text-gray-500">{provider.category}</Text>

//       <Text className="mt-3 text-gray-700">
//         {provider.description}
//       </Text>

//       <Text className="mt-4 font-semibold">
//         ⭐ {provider.rating}
//       </Text>

//       <View className="mt-4">
//         <Text className="mb-1 font-semibold">Services</Text>
//         {provider.services.map((service) => (
//           <Text key={service} className="text-gray-600">
//             • {service}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );
// }
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { providers } from '../../data/providers';
import { useFavorites } from '../../context/FavoritesContext';

export default function ProviderDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const provider = providers.find((p) => p.id === id);
  if (!provider) return <Text style={styles.notFound}>Provider not found</Text>;

  const isFavorite = favorites.includes(provider.id);

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{provider.name}</Text>
        <Pressable onPress={() => toggleFavorite(provider.id)}>
          <Text style={styles.heart}>{isFavorite ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>

      {/* DETAILS CARD */}
      <View style={styles.card}>
        <Text style={styles.category}>Category: {provider.category}</Text>
        <Text style={styles.description}>{provider.description}</Text>

        <Text style={styles.sectionTitle}>Services:</Text>
        {provider.services.map((service) => (
          <Text key={service} style={styles.serviceItem}>
            • {service}
          </Text>
        ))}

        <Text style={styles.info}>📍 {provider.location}</Text>
        <Text style={styles.info}>⭐ {provider.rating}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  notFound: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    color: '#6b7280',
    fontSize: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    marginTop:80,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  backButton: {
    marginRight: 12,
  },
  backIcon: {
    fontSize: 20,
    color: '#111827',
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  heart: {
    fontSize: 22,
  },

  card: {
    margin: 16,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  category: {
    fontSize: 14,
    color: '#4f46e5',
    marginBottom: 8,
    fontWeight: '600',
  },

  description: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },

  serviceItem: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    marginBottom: 4,
  },

  info: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
});