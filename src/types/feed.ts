/**
 * ═══════════════════════════════════════════════════════════════
 *  Domain Types — Feed, Integrations, Notifications
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Anti-Doomscroll Feed ───────────────────────────────────────

export interface FeedItem {
  id: string;
  type: FeedItemType;
  title: string;
  content: string;
  imageUrl: string | null;
  priority: number;       // Higher = shows first
  createdAt: string;
  expiresAt: string | null;
  actionable: boolean;
  actionPayload: Record<string, unknown> | null;
}

export type FeedItemType =
  | 'progress_highlight'     // "You've coded 12 hours this week!"
  | 'brutal_reminder'        // "You said you'd run today. It's 9pm."
  | 'ghost_gap'              // "Your ideal self worked out. You didn't."
  | 'insight'                // AI-generated observation about patterns
  | 'motivational'           // Curated motivational content
  | 'streak_alert'           // "Don't break your 15-day streak!"
  | 'weekly_review'          // Weekly summary card
  | 'goal_nudge'             // "3 days left to hit your milestone"
  | 'penalty_warning';       // "₹200 will be charged in 2 hours"

// ─── Integrations ───────────────────────────────────────────────

export interface Integration {
  id: string;
  userId: string;
  platform: IntegrationPlatform;
  connected: boolean;
  connectedAt: string | null;
  lastSyncAt: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  metadata: Record<string, unknown>;
}

export type IntegrationPlatform =
  | 'github'
  | 'leetcode'
  | 'google_fit'
  | 'apple_health'
  | 'fitbit'
  | 'strava'
  | 'notion'
  | 'calendar';

export interface IntegrationData {
  platform: IntegrationPlatform;
  syncedAt: string;
  data: GithubData | LeetCodeData | HealthData;
}

export interface GithubData {
  totalCommitsToday: number;
  totalCommitsWeek: number;
  contributionStreak: number;
  topLanguages: string[];
  recentRepos: string[];
}

export interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  contestRating: number;
  recentSubmissions: string[];
}

export interface HealthData {
  steps: number;
  heartRateAvg: number;
  sleepHours: number;
  caloriesBurned: number;
  workoutMinutes: number;
  stressLevel: number;
}

// ─── Notifications ──────────────────────────────────────────────

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, unknown> | null;
  read: boolean;
  scheduledAt: string;
  sentAt: string | null;
}

export type NotificationType =
  | 'task_reminder'
  | 'streak_warning'
  | 'penalty_alert'
  | 'daily_summary'
  | 'weekly_review'
  | 'goal_milestone'
  | 'ai_insight'
  | 'social_intercept';

// ─── Social Media Interceptor ───────────────────────────────────

export interface InterceptEvent {
  id: string;
  userId: string;
  appName: string;
  interceptedAt: string;
  userChoice: 'blocked' | 'bypassed' | 'dismissed';
  currentGoalShown: string;
  timeSpentAfterBypassMs: number | null;
}
