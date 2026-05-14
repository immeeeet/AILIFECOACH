/**
 * ═══════════════════════════════════════════════════════════════
 *  Feed Tab — Anti-Doomscroll Feed (Placeholder)
 * ═══════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants';

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Feed</Text>
        <Text style={styles.subtitle}>Replace doomscrolling with your own progress</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Anti-Doomscroll Feed</Text>
          <Text style={styles.cardSubtitle}>
            Personalized progress cards, brutal reminders, and motivational content
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    padding: spacing[5],
    paddingBottom: spacing[20],
  },
  title: {
    fontFamily: typography.family.bold,
    fontSize: typography.size['2xl'],
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    color: colors.textTertiary,
    marginTop: spacing[1],
    marginBottom: spacing[6],
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: colors.border,
    padding: spacing[5],
  },
  cardTitle: {
    fontFamily: typography.family.semiBold,
    fontSize: typography.size.md,
    color: colors.primary,
    marginBottom: spacing[1],
  },
  cardSubtitle: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
});
