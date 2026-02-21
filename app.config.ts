// import { ExpoConfig } from 'expo/config';

// const config: ExpoConfig = {
//   name: 'mini-marketplace',
//   slug: 'mini-marketplace',
//   plugins: ['expo-router'],
//   experiments: {
//     typedRoutes: true,
//   },
// };

// export default config;
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'mini-marketplace',
  slug: 'mini-marketplace',

  // ✅ ADD THIS
  scheme: 'minimarketplace',

  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
};

export default config;