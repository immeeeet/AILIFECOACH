/**
 * ═══════════════════════════════════════════════════════════════
 *  useAppReady — Handles font loading, auth init, splash screen
 * ═══════════════════════════════════════════════════════════════
 */

import { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { useAuthStore } from '@/store';

SplashScreen.preventAutoHideAsync();

export function useAppReady() {
  const [appReady, setAppReady] = useState(false);
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    async function prepare() {
      try {
        await initialize();
      } catch (e) {
        console.warn('Auth init failed:', e);
      } finally {
        // Guarantee the app loads immediately regardless of auth success
        setAppReady(true);
      }
    }
    prepare();
  }, [initialize]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        // Ignore splash screen hide errors
      }
    }
  }, [appReady]);

  return { appReady, onLayoutRootView };
}
