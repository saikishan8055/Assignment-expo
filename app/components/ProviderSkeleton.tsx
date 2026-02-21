import { View } from 'react-native';

export default function ProviderSkeleton() {
  return (
    <View className="mb-4 rounded-3xl bg-white p-5 dark:bg-neutral-900">
      <View className="h-4 w-2/3 rounded bg-gray-200 dark:bg-neutral-700" />
      <View className="mt-3 h-3 w-1/3 rounded bg-gray-200 dark:bg-neutral-700" />
      <View className="mt-4 h-3 w-full rounded bg-gray-200 dark:bg-neutral-700" />
      <View className="mt-2 h-3 w-5/6 rounded bg-gray-200 dark:bg-neutral-700" />
    </View>
  );
}