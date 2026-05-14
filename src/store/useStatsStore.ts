/**
 * ═══════════════════════════════════════════════════════════════
 *  Stats Store — Zustand
 *  Manages life statistics, streaks, and ghost competitor
 * ═══════════════════════════════════════════════════════════════
 */

import { create } from 'zustand';
import type { LifeStats, GhostCompetitor, DailySummary, LoadingState } from '@/types';

interface StatsState {
  stats: LifeStats | null;
  ghost: GhostCompetitor | null;
  dailySummary: DailySummary | null;
  loadingState: LoadingState;

  // Actions
  fetchStats: (userId: string) => Promise<void>;
  fetchGhost: (userId: string) => Promise<void>;
  fetchDailySummary: (userId: string, date: string) => Promise<void>;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: null,
  ghost: null,
  dailySummary: null,
  loadingState: 'idle',

  fetchStats: async (userId) => {
    set({ loadingState: 'loading' });
    // TODO: Fetch from Supabase
    set({ loadingState: 'success' });
  },

  fetchGhost: async (userId) => {
    // TODO: Calculate ghost competitor metrics from today's data
  },

  fetchDailySummary: async (userId, date) => {
    // TODO: Fetch daily summary from Supabase
  },

  incrementStreak: () => {
    set((state) => {
      if (!state.stats) return {};
      const newStreak = state.stats.currentStreak + 1;
      return {
        stats: {
          ...state.stats,
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, state.stats.longestStreak),
        },
      };
    });
  },

  resetStreak: () => {
    set((state) => {
      if (!state.stats) return {};
      return {
        stats: { ...state.stats, currentStreak: 0 },
      };
    });
  },
}));
