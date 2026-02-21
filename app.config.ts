
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'mini-marketplace',
  slug: 'mini-marketplace',

 
  scheme: 'minimarketplace',

  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
};

export default config;