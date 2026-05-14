import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'AI Life Coach',
  slug: 'ai-life-coach',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'aicoach',
  userInterfaceStyle: 'dark',
  newArchEnabled: true,
  splash: {
    backgroundColor: '#050505',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.meet.aicoach',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#050505',
    },
    package: 'com.meet.aicoach',
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#050505',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/notification-icon.png',
        color: '#E8B84B',
      },
    ],
  ],
  // experiments: {
  //   typedRoutes: true,
  // },
  extra: {
    eas: {
      projectId: 'your-project-id',
    },
  },
});
