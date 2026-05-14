/**
 * ═══════════════════════════════════════════════════════════════
 *  Root Layout — Expo Router
 *  Handles font loading, auth gating, and global providers
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAppReady } from '@/hooks';
import { colors } from '@/constants';

export default function RootLayout() {
  const { appReady, onLayoutRootView } = useAppReady();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!appReady) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    // Bypassing auth to view dashboard
    const isAuthenticated = true; 

    if (!isAuthenticated && !inAuthGroup) {
      // If they aren't authenticated and try to access tabs, boot them to onboarding
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // If they are authenticated and in auth group, push to tabs
      router.replace('/(tabs)');
    }
  }, [appReady, segments]);

  if (!appReady) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor={colors.bg} />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
