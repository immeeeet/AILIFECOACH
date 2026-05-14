/**
 * ═══════════════════════════════════════════════════════════════
 *  Auth Service — Supabase Auth operations
 * ═══════════════════════════════════════════════════════════════
 */

import { supabase } from './client';
import type { ApiResponse, AuthSession } from '@/types';

export const authService = {
  /** Sign up with email and password */
  async signUp(email: string, password: string): Promise<ApiResponse<AuthSession>> {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return { data: null, error: { code: error.name, message: error.message }, status: 400 };
      return {
        data: {
          accessToken: data.session?.access_token ?? '',
          refreshToken: data.session?.refresh_token ?? '',
          expiresAt: data.session?.expires_at ?? 0,
          user: {} as any, // Will be populated by profile fetch
        },
        error: null,
        status: 200,
      };
    } catch (e: any) {
      return { data: null, error: { code: 'UNKNOWN', message: e.message }, status: 500 };
    }
  },

  /** Sign in with email and password */
  async signIn(email: string, password: string): Promise<ApiResponse<AuthSession>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { data: null, error: { code: error.name, message: error.message }, status: 401 };
      return {
        data: {
          accessToken: data.session?.access_token ?? '',
          refreshToken: data.session?.refresh_token ?? '',
          expiresAt: data.session?.expires_at ?? 0,
          user: {} as any,
        },
        error: null,
        status: 200,
      };
    } catch (e: any) {
      return { data: null, error: { code: 'UNKNOWN', message: e.message }, status: 500 };
    }
  },

  /** Sign out */
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  /** Get current session */
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /** Listen to auth state changes */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
