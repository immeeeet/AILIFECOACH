/**
 * ═══════════════════════════════════════════════════════════════
 *  Auth Store — Zustand
 * ═══════════════════════════════════════════════════════════════
 */

import { create } from 'zustand';
import type { AuthStatus, UserProfile } from '@/types';
import { authService } from '@/services/supabase';

interface AuthState {
  status: AuthStatus;
  user: UserProfile | null;
  accessToken: string | null;

  // Actions
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  setUser: (user: UserProfile | null) => void;
  setStatus: (status: AuthStatus) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'idle',
  user: null,
  accessToken: null,

  signIn: async (email, password) => {
    set({ status: 'loading' });
    const result = await authService.signIn(email, password);
    if (result.error) {
      set({ status: 'unauthenticated' });
      return false;
    }
    set({
      status: 'authenticated',
      accessToken: result.data?.accessToken ?? null,
    });
    return true;
  },

  signUp: async (email, password) => {
    set({ status: 'loading' });
    const result = await authService.signUp(email, password);
    if (result.error) {
      set({ status: 'unauthenticated' });
      return false;
    }
    set({ status: 'authenticated', accessToken: result.data?.accessToken ?? null });
    return true;
  },

  signOut: async () => {
    await authService.signOut();
    set({ status: 'unauthenticated', user: null, accessToken: null });
  },

  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),

  initialize: async () => {
    set({ status: 'loading' });
    const session = await authService.getSession();
    if (session) {
      set({ status: 'authenticated', accessToken: session.access_token });
    } else {
      set({ status: 'unauthenticated' });
    }
  },
}));
