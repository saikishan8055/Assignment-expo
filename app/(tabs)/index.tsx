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
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

import { providers } from '../../data/providers';
import ProviderSkeleton from '../components/ProviderSkeleton';

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

  // Fake loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 🔑 FILTER LOGIC (Favorites included)
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // Favorites tab
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
    <View className="flex-1 bg-gray-100 dark:bg-black">
      {/* Header */}
      <View className="bg-white px-6 pt-14 pb-4 dark:bg-neutral-900">
        <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Discover
        </Text>

        {/* Search */}
        <TextInput
          placeholder="Search services..."
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
          className="mt-4 rounded-xl bg-gray-100 px-4 py-3 text-gray-900 dark:bg-neutral-800 dark:text-white"
        />
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        renderItem={({ item }) => {
          const active = item === selectedCategory;

          return (
            <Pressable
              onPress={() => setSelectedCategory(item)}
              className={`mr-3 rounded-full px-4 py-2 ${
                active
                  ? 'bg-indigo-600'
                  : 'bg-white dark:bg-neutral-800'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  active
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Providers */}
      <FlatList
        data={loading ? Array(4).fill(null) : filteredProviders}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ListEmptyComponent={
          !loading && selectedCategory === 'Favorites' ? (
            <Text className="mt-20 text-center text-gray-500">
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
              className="mb-5 rounded-3xl bg-white p-5 shadow-md dark:bg-neutral-900"
            >
              {/* Top */}
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </Text>

                <Pressable onPress={() => toggleFavorite(item.id)}>
                  <Text className="text-xl">
                    {favorites.includes(item.id) ? '❤️' : '🤍'}
                  </Text>
                </Pressable>
              </View>

              {/* Category */}
              <Text className="mt-2 text-sm text-indigo-600">
                {item.category}
              </Text>

              {/* Description */}
              <Text
                numberOfLines={2}
                className="mt-2 text-gray-600 dark:text-gray-400"
              >
                {item.description}
              </Text>

              {/* Footer */}
              <View className="mt-4 flex-row justify-between items-center">
                <Text className="text-sm text-gray-500">
                  📍 {item.location}
                </Text>

                <Text className="font-semibold text-indigo-600">
                  View →
                </Text>
              </View>
            </Pressable>
          )
        }
      />
    </View>
  );
}