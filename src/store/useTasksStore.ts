/**
 * ═══════════════════════════════════════════════════════════════
 *  Tasks Store — Zustand
 * ═══════════════════════════════════════════════════════════════
 */

import { create } from 'zustand';
import { db } from '@/services/supabase';
import type { Task, TaskStatus, LoadingState } from '@/types';

interface TasksState {
  tasks: Task[];
  todaysTasks: Task[];
  loadingState: LoadingState;

  // Actions
  fetchTasks: (userId: string, date?: string) => Promise<void>;
  fetchTodaysTasks: (userId: string) => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<Task | null>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  failTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  todaysTasks: [],
  loadingState: 'idle',

  fetchTasks: async (userId, date) => {
    set({ loadingState: 'loading' });
    const filters: Record<string, any> = {};
    if (date) filters.scheduled_date = date;
    const result = await db.getMany<Task>('tasks', { userId, filters, orderBy: 'priority' });
    set({ tasks: result.data, loadingState: 'success' });
  },

  fetchTodaysTasks: async (userId) => {
    const today = new Date().toISOString().split('T')[0];
    const result = await db.getMany<Task>('tasks', {
      userId,
      filters: { scheduled_date: today },
      orderBy: 'priority',
    });
    set({ todaysTasks: result.data });
  },

  addTask: async (task) => {
    const result = await db.insert<Task>('tasks', task);
    if (result.data) {
      set((state) => ({ tasks: [result.data!, ...state.tasks] }));
    }
    return result.data;
  },

  updateTask: async (id, updates) => {
    await db.update<Task>('tasks', id, updates);
    const updateFn = (tasks: Task[]) =>
      tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    set((state) => ({
      tasks: updateFn(state.tasks),
      todaysTasks: updateFn(state.todaysTasks),
    }));
  },

  completeTask: async (id) => {
    await db.update<Task>('tasks', id, {
      status: 'completed' as TaskStatus,
      completedAt: new Date().toISOString(),
    });

    const updateFn = (tasks: Task[]) =>
      tasks.map((t) =>
        t.id === id ? { ...t, status: 'completed' as TaskStatus, completedAt: new Date().toISOString() } : t,
      );

    set((state) => ({
      tasks: updateFn(state.tasks),
      todaysTasks: updateFn(state.todaysTasks),
    }));
  },

  failTask: async (id) => {
    await db.update<Task>('tasks', id, { status: 'failed' as TaskStatus });
    const updateFn = (tasks: Task[]) =>
      tasks.map((t) => (t.id === id ? { ...t, status: 'failed' as TaskStatus } : t));
    set((state) => ({
      tasks: updateFn(state.tasks),
      todaysTasks: updateFn(state.todaysTasks),
    }));
  },

  deleteTask: async (id) => {
    await db.remove('tasks', id);
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
      todaysTasks: state.todaysTasks.filter((t) => t.id !== id),
    }));
  },
}));
