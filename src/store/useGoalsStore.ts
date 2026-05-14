/**
 * ═══════════════════════════════════════════════════════════════
 *  Goals Store — Zustand
 * ═══════════════════════════════════════════════════════════════
 */

import { create } from 'zustand';
import { db } from '@/services/supabase';
import type { Goal, GoalStatus, LoadingState } from '@/types';

interface GoalsState {
  goals: Goal[];
  activeGoal: Goal | null;
  loadingState: LoadingState;

  // Actions
  fetchGoals: (userId: string) => Promise<void>;
  addGoal: (goal: Partial<Goal>) => Promise<Goal | null>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  setActiveGoal: (goal: Goal | null) => void;
  updateProgress: (id: string, progressPercent: number) => Promise<void>;
}

export const useGoalsStore = create<GoalsState>((set, get) => ({
  goals: [],
  activeGoal: null,
  loadingState: 'idle',

  fetchGoals: async (userId) => {
    set({ loadingState: 'loading' });
    const result = await db.getMany<Goal>('goals', { userId, orderBy: 'priority' });
    set({ goals: result.data, loadingState: 'success' });
  },

  addGoal: async (goal) => {
    const result = await db.insert<Goal>('goals', goal);
    if (result.data) {
      set((state) => ({ goals: [result.data!, ...state.goals] }));
    }
    return result.data;
  },

  updateGoal: async (id, updates) => {
    await db.update<Goal>('goals', id, updates);
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    }));
  },

  deleteGoal: async (id) => {
    await db.remove('goals', id);
    set((state) => ({ goals: state.goals.filter((g) => g.id !== id) }));
  },

  setActiveGoal: (goal) => set({ activeGoal: goal }),

  updateProgress: async (id, progressPercent) => {
    const status: GoalStatus = progressPercent >= 100 ? 'completed' : 'active';
    await db.update<Goal>('goals', id, { progressPercent, status });
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, progressPercent, status } : g,
      ),
    }));
  },
}));
