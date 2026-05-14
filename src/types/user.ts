/**
 * ═══════════════════════════════════════════════════════════════
 *  Core Domain Types — User, Auth, Subscription
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Auth ───────────────────────────────────────────────────────

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: UserProfile;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

// ─── User Profile ───────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  timezone: string;
  createdAt: string;
  updatedAt: string;
  onboardingComplete: boolean;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt: string | null;
  preferences: UserPreferences;
  stats: UserStats;
}

export type SubscriptionTier = 'free_trial' | 'pro' | 'expired';

export interface UserPreferences {
  wakeTime: string;           // "06:00"
  sleepTime: string;          // "23:00"
  focusHoursGoal: number;
  workoutGoalMinutes: number;
  notificationsEnabled: boolean;
  hardcoreMode: boolean;
  penaltyAmountInr: number;
  socialInterceptorEnabled: boolean;
  blockedApps: string[];
  dailyReflectionTime: string;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  tasksCompleted: number;
  goalsAchieved: number;
  totalFocusMinutes: number;
  joinedDaysAgo: number;
}

// ─── Onboarding ─────────────────────────────────────────────────

export interface OnboardingData {
  name: string;
  age: number;
  occupation: 'student' | 'developer' | 'hustler' | 'professional' | 'other';
  mainGoals: GoalCategory[];
  wakeTime: string;
  sleepTime: string;
  biggestStruggle: string;
  motivationStyle: 'gentle' | 'balanced' | 'hardcore';
  enablePenalties: boolean;
  penaltyAmount: number;
}

export type GoalCategory =
  | 'career'
  | 'fitness'
  | 'skills'
  | 'money'
  | 'abroad'
  | 'relationships'
  | 'mental_health'
  | 'education';
