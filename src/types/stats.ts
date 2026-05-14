/**
 * ═══════════════════════════════════════════════════════════════
 *  Domain Types — Ghost Competitor & Stats
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Ghost Competitor ───────────────────────────────────────────

export interface GhostCompetitor {
  userId: string;
  date: string;
  idealSelf: GhostMetrics;
  currentSelf: GhostMetrics;
  gapAnalysis: GapItem[];
  overallScore: number;       // 0-100
  weeklyTrend: 'improving' | 'declining' | 'stagnant';
}

export interface GhostMetrics {
  wakeTime: string;
  sleepTime: string;
  focusHours: number;
  workoutMinutes: number;
  tasksCompleted: number;
  screenTimeMinutes: number;
  moodAverage: number;
  habitsCompleted: number;
  learningMinutes: number;
}

export interface GapItem {
  metric: string;
  ideal: number;
  current: number;
  gapPercent: number;
  status: 'ahead' | 'on_track' | 'behind' | 'critical';
  suggestion: string;
}

// ─── Life Statistics ────────────────────────────────────────────

export interface LifeStats {
  // Time tracking
  totalFocusHours: number;
  totalWorkoutHours: number;
  totalSleepHours: number;
  averageDailyScreenTime: number;

  // Productivity
  tasksCompletedThisWeek: number;
  tasksCompletedThisMonth: number;
  taskCompletionRate: number;
  averageTasksPerDay: number;

  // Habits
  activeHabits: number;
  totalHabitCompletions: number;
  habitConsistencyRate: number;

  // Streaks
  currentStreak: number;
  longestStreak: number;
  streakHistory: StreakPeriod[];

  // Financial (Penalties)
  totalPenaltiesCharged: number;
  totalPenaltiesSaved: number;
  penaltyHistory: PenaltyEvent[];
}

export interface StreakPeriod {
  startDate: string;
  endDate: string;
  length: number;
}

export interface PenaltyEvent {
  id: string;
  taskId: string;
  amount: number;
  currency: 'INR' | 'USD';
  status: 'charged' | 'saved' | 'refunded';
  date: string;
}

// ─── Chart Data ─────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string;
  value: number;
  date: string;
}

export interface StatCategory {
  id: string;
  title: string;
  icon: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  trendPercent: number;
  chartData: ChartDataPoint[];
}
