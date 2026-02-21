// import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useEffect, useMemo, useState } from 'react';
// import { providers } from '../../data/providers';
// import ProviderSkeleton from '../components/ProviderSkeleton';

// const categories = ['All', 'Home Chef', 'Home Gym', 'Pet Groomer'];

// export default function HomeScreen() {
//   const router = useRouter();

//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fake loading delay (skeleton demo)
//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1200);
//   }, []);

//   const filteredProviders = useMemo(() => {
//     return providers.filter((p) => {
//       const matchCategory =
//         selectedCategory === 'All' || p.category === selectedCategory;

//       const matchSearch = p.name
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       return matchCategory && matchSearch;
//     });
//   }, [search, selectedCategory]);

//   const toggleFavorite = (id: string) => {
//     setFavorites((prev) =>
//       prev.includes(id)
//         ? prev.filter((f) => f !== id)
//         : [...prev, id]
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-100 dark:bg-black">
//       {/* Header */}
//       <View className="bg-white px-6 pt-14 pb-4 dark:bg-neutral-900">
//         <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">
//           Discover
//         </Text>

//         {/* Search */}
//         <TextInput
//           placeholder="Search services..."
//           placeholderTextColor="#9ca3af"
//           value={search}
//           onChangeText={setSearch}
//           className="mt-4 rounded-xl bg-gray-100 px-4 py-3 text-gray-900 dark:bg-neutral-800 dark:text-white"
//         />
//       </View>

//       {/* Categories */}
//       <FlatList
//         horizontal
//         data={categories}
//         keyExtractor={(item) => item}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
//         renderItem={({ item }) => {
//           const active = item === selectedCategory;
//           return (
//             <Pressable
//               onPress={() => setSelectedCategory(item)}
//               className={`mr-3 rounded-full px-4 py-2 ${
//                 active
//                   ? 'bg-indigo-600'
//                   : 'bg-white dark:bg-neutral-800'
//               }`}
//             >
//               <Text
//                 className={`text-sm font-medium ${
//                   active ? 'text-white' : 'text-gray-700 dark:text-gray-300'
//                 }`}
//               >
//                 {item}
//               </Text>
//             </Pressable>
//           );
//         }}
//       />

//       {/* Providers */}
//       <FlatList
//         data={loading ? Array(4).fill(null) : filteredProviders}
//         keyExtractor={(_, index) => index.toString()}
//         contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
//         renderItem={({ item }) =>
//           loading ? (
//             <ProviderSkeleton />
//           ) : (
//             <Pressable
//               onPress={() =>
//                 router.push({
//                   pathname: '/provider/[id]',
//                   params: { id: item.id },
//                 })
//               }
//               className="mb-5 rounded-3xl bg-white p-5 shadow-md dark:bg-neutral-900"
//             >
//               {/* Top */}
//               <View className="flex-row justify-between items-center">
//                 <Text className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {item.name}
//                 </Text>

//                 <Pressable onPress={() => toggleFavorite(item.id)}>
//                   <Text className="text-xl">
//                     {favorites.includes(item.id) ? '❤️' : '🤍'}
//                   </Text>
//                 </Pressable>
//               </View>

//               {/* Category */}
//               <Text className="mt-2 text-sm text-indigo-600">
//                 {item.category}
//               </Text>

//               {/* Description */}
//               <Text
//                 numberOfLines={2}
//                 className="mt-2 text-gray-600 dark:text-gray-400"
//               >
//                 {item.description}
//               </Text>

//               {/* Footer */}
//               <View className="mt-4 flex-row justify-between items-center">
//                 <Text className="text-sm text-gray-500">
//                   📍 {item.location}
//                 </Text>

//                 <Text className="font-semibold text-indigo-600">
//                   View →
//                 </Text>
//               </View>
//             </Pressable>
//           )
//         }
//       />
//     </View>
//   );
// }
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

import { providers } from '../../data/providers';
import ProviderSkeleton from '../../app/components/ProviderSkeleton';

const categories = [
  'All',
  'Favorites',
  'Home Chef',
  'Home Gym',
  'Pet Groomer',
];

export default function HomeScreen() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      if (selectedCategory === 'Favorites') {
        return (
          favorites.includes(p.id) &&
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      const matchCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [search, selectedCategory, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>
          Find trusted services near you
        </Text>

        <TextInput
          placeholder="Search services..."
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* CATEGORIES */}
      {/* <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const active = item === selectedCategory;

          // return (
          //   <Pressable
          //     onPress={() => setSelectedCategory(item)}
          //     style={[
          //       styles.categoryPill,
          //       active && styles.categoryPillActive,
          //     ]}
          //   >
          //     <Text
          //       style={[
          //         styles.categoryText,
          //         active && styles.categoryTextActive,
          //       ]}
          //     >
          //       {item}
          //     </Text>
          //   </Pressable>
          // );
        }}
      /> */}

      {/* PROVIDERS */}
      <FlatList
        data={loading ? Array(4).fill(null) : filteredProviders}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading && selectedCategory === 'Favorites' ? (
            <Text style={styles.emptyText}>
              No favorites yet ❤️
            </Text>
          ) : null
        }
        renderItem={({ item }) =>
          loading ? (
            <ProviderSkeleton />
          ) : (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/provider/[id]',
                  params: { id: item.id },
                })
              }
              style={styles.card}
            >
              {/* TOP */}
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardCategory}>{item.category}</Text>
                </View>

                <Pressable onPress={() => toggleFavorite(item.id)}>
                  <Text style={styles.heart}>
                    {favorites.includes(item.id) ? '❤️' : '🤍'}
                  </Text>
                </Pressable>
              </View>

              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </Text>

              {/* FOOTER */}
              <View style={styles.cardFooter}>
                <Text style={styles.location}>📍 {item.location}</Text>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>View →</Text>
                </View>
              </View>
            </Pressable>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  /* Header */
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6b7280',
  },

  /* Search */
  searchInput: {
    marginTop: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },

  /* Categories */
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // categoryPill: {
  //   marginRight: 12,
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   borderRadius: 99,
  //   backgroundColor: '#ffffff',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#e5e7eb',
  // },
  categoryPillActive: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  categoryTextActive: {
    color: '#ffffff',
  },

  /* Provider Cards */
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  cardCategory: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#4f46e5',
  },
  heart: {
    fontSize: 24,
  },
  cardDescription: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },
  cardFooter: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#6b7280',
  },
  viewButton: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  viewText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4f46e5',
  },

  emptyText: {
    marginTop: 80,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
  },
});