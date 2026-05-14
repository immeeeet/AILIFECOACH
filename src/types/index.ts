// ─── Core Types ─────────────────────────────────────────────────
export type {
  AuthSession,
  AuthStatus,
  UserProfile,
  SubscriptionTier,
  UserPreferences,
  UserStats,
  OnboardingData,
  GoalCategory,
} from './user';

// ─── Goals & Tasks ──────────────────────────────────────────────
export type {
  Goal,
  GoalStatus,
  Milestone,
  Task,
  TaskStatus,
  TaskPriority,
  EnergyLevel,
  TimeSlot,
  TaskPlan,
  DailyTaskBlock,
  Habit,
  HabitFrequency,
  HabitLog,
  DailySummary,
} from './goals';

// ─── AI & Chat ──────────────────────────────────────────────────
export type {
  ChatMessage,
  MessageContentType,
  MessageMetadata,
  ExtractedInsight,
  InsightType,
  SuggestedAction,
  EmotionalTone,
  AIMemory,
  MemoryType,
  Conversation,
  UserAnalysis,
  PersonalityTrait,
  EnergyPattern,
  TimeSlotEnergy,
} from './ai';

// ─── Stats & Ghost ──────────────────────────────────────────────
export type {
  GhostCompetitor,
  GhostMetrics,
  GapItem,
  LifeStats,
  StreakPeriod,
  PenaltyEvent,
  ChartDataPoint,
  StatCategory,
} from './stats';

// ─── Feed & Integrations ───────────────────────────────────────
export type {
  FeedItem,
  FeedItemType,
  Integration,
  IntegrationPlatform,
  IntegrationData,
  GithubData,
  LeetCodeData,
  HealthData,
  AppNotification,
  NotificationType,
  InterceptEvent,
} from './feed';

// ─── Common ─────────────────────────────────────────────────────
export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  LoadingState,
  Timestamps,
  DeepPartial,
  TabRoute,
  TabConfig,
} from './common';
