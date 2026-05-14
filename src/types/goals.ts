/**
 * ═══════════════════════════════════════════════════════════════
 *  Domain Types — Goals, Tasks, Habits
 * ═══════════════════════════════════════════════════════════════
 */

import type { GoalCategory } from './user';

// ─── Goals ──────────────────────────────────────────────────────

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: GoalCategory;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: GoalStatus;
  targetDate: string | null;
  createdAt: string;
  updatedAt: string;
  progressPercent: number;
  milestones: Milestone[];
  aiGeneratedPlan: TaskPlan | null;
}

export type GoalStatus = 'active' | 'paused' | 'completed' | 'abandoned';

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  completed: boolean;
  completedAt: string | null;
  dueDate: string | null;
}

// ─── Tasks ──────────────────────────────────────────────────────

export interface Task {
  id: string;
  userId: string;
  goalId: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  energyLevel: EnergyLevel;
  estimatedMinutes: number;
  actualMinutes: number | null;
  scheduledDate: string;
  scheduledTimeSlot: TimeSlot | null;
  completedAt: string | null;
  createdAt: string;
  proofRequired: boolean;
  proofUrl: string | null;
  penaltyAmount: number | null;
  isAiGenerated: boolean;
  tags: string[];
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type EnergyLevel = 'high' | 'medium' | 'low';
export type TimeSlot = 'early_morning' | 'morning' | 'afternoon' | 'evening' | 'night';

export interface TaskPlan {
  goalId: string;
  generatedAt: string;
  dailyTasks: DailyTaskBlock[];
  weeklyMilestones: string[];
}

export interface DailyTaskBlock {
  date: string;
  tasks: Omit<Task, 'id' | 'userId' | 'createdAt' | 'completedAt'>[];
}

// ─── Habits ─────────────────────────────────────────────────────

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  category: GoalCategory;
  frequency: HabitFrequency;
  targetPerDay: number;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  createdAt: string;
  isActive: boolean;
  reminderTime: string | null;
}

export type HabitFrequency = 'daily' | 'weekdays' | 'weekends' | 'custom';

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  value: number;     // e.g., 3 glasses of water, 45 min workout
  note: string | null;
}

// ─── Daily Summary ──────────────────────────────────────────────

export interface DailySummary {
  date: string;
  tasksCompleted: number;
  tasksFailed: number;
  tasksTotal: number;
  habitsCompleted: number;
  habitsTotal: number;
  focusMinutes: number;
  penaltiesCharged: number;
  moodRating: number | null;   // 1-10
  energyRating: number | null; // 1-10
  aiReflection: string | null;
  streakDay: number;
}
