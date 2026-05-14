/**
 * Primitive UI: Card Component
 * Base card with Terminal Black styling
 */

import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors, radii, spacing } from '@/constants';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glow';
  glowColor?: string;
  children: React.ReactNode;
}

export function Card({ variant = 'default', glowColor, style, children, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        variant === 'elevated' && styles.elevated,
        variant === 'outlined' && styles.outlined,
        variant === 'glow' && [styles.glow, glowColor ? { shadowColor: glowColor } : null],
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.lg,
    padding: spacing[5],
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  elevated: {
    backgroundColor: colors.bgElevated,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
