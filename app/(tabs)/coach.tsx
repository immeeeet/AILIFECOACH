/**
 * ═══════════════════════════════════════════════════════════════
 *  Coach Tab — AI Chat Interface
 * ═══════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '@/constants';

export default function CoachScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Ionicons name="terminal" size={14} color={colors.primary} />
        <Text style={styles.title}>TERMINAL</Text>
      </View>

      <View style={styles.chatArea}>
        <View style={styles.centerContent}>
          <Ionicons name="planet" size={72} color={colors.primary} style={styles.iconGlow} />
          <Text style={styles.chatPrompt}>Awaiting command.</Text>
          <Text style={styles.chatSubPrompt}>What's the next objective?</Text>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.input}
            placeholder="Initialize sequence..."
            placeholderTextColor={colors.textTertiary}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="arrow-up" size={20} color={colors.bg} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[4],
    gap: spacing[2],
  },
  title: {
    fontFamily: typography.family.bold,
    fontSize: typography.size.xs,
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  chatArea: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing[5],
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGlow: {
    marginBottom: spacing[6],
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  chatPrompt: {
    fontFamily: typography.family.bold,
    fontSize: typography.size.xl,
    color: colors.textPrimary,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  chatSubPrompt: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.bgSurface,
    borderRadius: 24,
    padding: spacing[1],
    paddingLeft: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: typography.family.regular,
    fontSize: typography.size.base,
    paddingVertical: spacing[3],
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing[2],
  },
});
