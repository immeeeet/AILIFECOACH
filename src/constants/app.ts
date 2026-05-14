/**
 * ═══════════════════════════════════════════════════════════════
 *  Application-wide constants
 * ═══════════════════════════════════════════════════════════════
 */

// ─── App Metadata ───────────────────────────────────────────────

export const APP_NAME = 'AI Life Coach';
export const APP_VERSION = '1.0.0';
export const APP_SLUG = 'ai-life-coach';

// ─── Subscription Tiers ─────────────────────────────────────────

export const SUBSCRIPTION = {
  FREE_TRIAL_DAYS: 7,
  MONTHLY_PRICE_INR: 399,
  MONTHLY_PRICE_USD: 4.99,
  PLAN_ID: 'pro_monthly',
} as const;

// ─── AI Configuration ───────────────────────────────────────────

export const AI_CONFIG = {
  MAX_CONTEXT_MESSAGES: 50,
  MAX_TOKEN_RESPONSE: 2048,
  SYSTEM_PERSONA: 'life_coach',
  TEMPERATURE: 0.7,
  EMBEDDING_DIMENSIONS: 1536,
} as const;

// ─── Ghost Competitor ───────────────────────────────────────────

export const GHOST_CONFIG = {
  IDEAL_WAKE_TIME: '05:30',
  IDEAL_SLEEP_TIME: '22:30',
  IDEAL_FOCUS_HOURS: 8,
  IDEAL_WORKOUT_MINUTES: 60,
  IDEAL_SCREEN_TIME_MINUTES: 120,
} as const;

// ─── Accountability ─────────────────────────────────────────────

export const ACCOUNTABILITY = {
  MIN_PENALTY_INR: 10,
  MAX_PENALTY_INR: 5000,
  PROOF_REQUIRED_AFTER_STREAK: 3,
  GRACE_PERIOD_MINUTES: 30,
} as const;

// ─── API Endpoints (relative paths) ────────────────────────────

export const ENDPOINTS = {
  AUTH: {
    SIGN_UP: '/auth/v1/signup',
    SIGN_IN: '/auth/v1/token',
    REFRESH: '/auth/v1/token?grant_type=refresh_token',
    SIGN_OUT: '/auth/v1/logout',
  },
  AI: {
    CHAT: '/v1/chat',
    ANALYZE: '/v1/analyze',
    PLAN: '/v1/plan',
    SUMMARIZE: '/v1/summarize',
  },
  INTEGRATIONS: {
    GITHUB: '/v1/integrations/github',
    LEETCODE: '/v1/integrations/leetcode',
    HEALTH: '/v1/integrations/health',
  },
} as const;

// ─── Storage Keys ───────────────────────────────────────────────

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  ONBOARDING_DONE: 'onboarding_complete',
  THEME_PREFERENCE: 'theme_pref',
  NOTIFICATION_PREFS: 'notification_prefs',
  CACHED_TASKS: 'cached_tasks',
  CACHED_GOALS: 'cached_goals',
  AI_MEMORY_CACHE: 'ai_memory_cache',
  LAST_SYNC_AT: 'last_sync_at',
} as const;

// ─── Limits ─────────────────────────────────────────────────────

export const LIMITS = {
  MAX_GOALS: 10,
  MAX_DAILY_TASKS: 25,
  MAX_HABITS: 20,
  MAX_PROOF_SIZE_MB: 10,
  MAX_VOICE_NOTE_SECONDS: 300,
  MAX_CHAT_HISTORY_DAYS: 90,
  SYNC_INTERVAL_MS: 30_000,
} as const;
