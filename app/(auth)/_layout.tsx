/**
 * ═══════════════════════════════════════════════════════════════
 *  Auth Layout — Login / Sign Up screens
 * ═══════════════════════════════════════════════════════════════
 */

import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
