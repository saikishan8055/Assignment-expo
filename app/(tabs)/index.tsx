import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";

import { providers } from "../../data/providers";
import { useFavorites } from "../../context/FavoritesContext";
import ProviderSkeleton from "../../app/components/ProviderSkeleton";

const categories = ["All", "Favorites", "Home Chef", "Home Gym", "Pet Groomer"];

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const { favorites, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      if (selectedCategory === "Favorites") {
        return (
          favorites.includes(p.id) &&
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, selectedCategory, favorites]);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* HEADER */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Discover</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Find trusted services near you
        </Text>
        <TextInput
          placeholder="Search services..."
          placeholderTextColor={isDark ? "#9ca3af" : "#9ca3af"}
          value={search}
          onChangeText={setSearch}
          style={[styles.searchInput, isDark && styles.searchInputDark]}
        />
      </View>
      <FlatList
        data={loading ? Array(4).fill(null) : filteredProviders}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading && selectedCategory === "Favorites" ? (
            <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
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
                  pathname: "/provider/[id]",
                  params: { id: item.id },
                })
              }
              style={[styles.card, isDark && styles.cardDark]}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.cardTitle, isDark && styles.cardTitleDark]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.cardCategory,
                      isDark && styles.cardCategoryDark,
                    ]}
                  >
                    {item.category}
                  </Text>
                </View>
                <Pressable onPress={() => toggleFavorite(item.id)}>
                  <Text style={styles.heart}>
                    {favorites.includes(item.id) ? "❤️" : "🤍"}
                  </Text>
                </Pressable>
              </View>

              <Text
                style={[
                  styles.cardDescription,
                  isDark && styles.cardDescriptionDark,
                ]}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              <View style={styles.cardFooter}>
                <Text style={[styles.location, isDark && styles.locationDark]}>
                  📍 {item.location}
                </Text>
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
  container: { flex: 1, backgroundColor: "#f9fafb" },
  containerDark: { backgroundColor: "#111111" },

  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  headerDark: { backgroundColor: "#1f1f1f" },

  title: { fontSize: 32, fontWeight: "800", color: "#111827" },
  titleDark: { color: "#fff" },

  subtitle: { marginTop: 4, fontSize: 14, color: "#6b7280" },
  subtitleDark: { color: "#d1d5db" },

  searchInput: {
    marginTop: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  searchInputDark: { backgroundColor: "#1f1f1f", color: "#fff" },

  categoryList: { paddingHorizontal: 16, paddingVertical: 12 },
  categoryPill: {
    marginRight: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 99,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  categoryPillDark: { backgroundColor: "#333", borderColor: "#555" },
  categoryPillActive: { backgroundColor: "#4f46e5", borderColor: "#4f46e5" },
  categoryText: { fontSize: 14, fontWeight: "600", color: "#374151" },
  categoryTextDark: { color: "#d1d5db" },
  categoryTextActive: { color: "#fff" },

  listContent: { paddingHorizontal: 16, paddingBottom: 32 },
  card: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardDark: { backgroundColor: "#1f1f1f" },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  cardTitleDark: { color: "#fff" },
  cardCategory: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
    color: "#4f46e5",
  },
  cardCategoryDark: { color: "#6366f1" },
  heart: { fontSize: 24 },
  cardDescription: { marginTop: 12, fontSize: 14, color: "#6b7280" },
  cardDescriptionDark: { color: "#d1d5db" },

  cardFooter: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: { fontSize: 13, color: "#6b7280" },
  locationDark: { color: "#d1d5db" },
  viewButton: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  viewText: { fontSize: 13, fontWeight: "600", color: "#4f46e5" },

  emptyText: {
    marginTop: 80,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 16,
  },
  emptyTextDark: { color: "#d1d5db" },
});
