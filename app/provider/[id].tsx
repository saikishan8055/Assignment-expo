import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { providers } from '../../data/providers';

export default function ProviderDetails() {
  const { id } = useLocalSearchParams();
  const provider = providers.find((p) => p.id === id);

  if (!provider) {
    return <Text className="p-4">Provider not found</Text>;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold">{provider.name}</Text>
      <Text className="text-gray-500">{provider.category}</Text>

      <Text className="mt-3 text-gray-700">
        {provider.description}
      </Text>

      <Text className="mt-4 font-semibold">
        ⭐ {provider.rating}
      </Text>

      <View className="mt-4">
        <Text className="mb-1 font-semibold">Services</Text>
        {provider.services.map((service) => (
          <Text key={service} className="text-gray-600">
            • {service}
          </Text>
        ))}
      </View>
    </View>
  );
}