/**
 * ═══════════════════════════════════════════════════════════════
 *  Domain Types — AI Chat & Memory
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Chat ───────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  contentType: MessageContentType;
  timestamp: string;
  metadata: MessageMetadata | null;
}

export type MessageContentType = 'text' | 'voice_transcript' | 'image' | 'task_card' | 'insight_card';

export interface MessageMetadata {
  voiceDurationMs?: number;
  extractedInsights?: ExtractedInsight[];
  suggestedActions?: SuggestedAction[];
  emotionalTone?: EmotionalTone;
  referencedGoalIds?: string[];
  referencedTaskIds?: string[];
}

export interface ExtractedInsight {
  id: string;
  type: InsightType;
  content: string;
  confidence: number;  // 0-1
  relatedToGoal: string | null;
}

export type InsightType =
  | 'procrastination_trigger'
  | 'energy_pattern'
  | 'strength'
  | 'weakness'
  | 'habit_observation'
  | 'emotional_state'
  | 'progress_update'
  | 'goal_shift';

export interface SuggestedAction {
  type: 'create_task' | 'update_goal' | 'add_habit' | 'schedule_block' | 'adjust_plan';
  label: string;
  payload: Record<string, unknown>;
}

export type EmotionalTone =
  | 'motivated'
  | 'stressed'
  | 'frustrated'
  | 'happy'
  | 'neutral'
  | 'anxious'
  | 'burned_out'
  | 'determined';

// ─── AI Memory / RAG ────────────────────────────────────────────

export interface AIMemory {
  id: string;
  userId: string;
  type: MemoryType;
  content: string;
  embedding: number[] | null;  // Vector embedding for RAG
  importance: number;          // 0-10
  createdAt: string;
  lastAccessedAt: string;
  sourceMessageId: string | null;
  tags: string[];
}

export type MemoryType =
  | 'fact'              // "User wakes up at 6am"
  | 'preference'        // "User prefers morning workouts"
  | 'pattern'           // "User procrastinates after lunch"
  | 'goal_context'      // "User wants to move to Canada"
  | 'emotional'         // "User felt burned out last week"
  | 'relationship'      // "User's girlfriend's name is X"
  | 'achievement'       // "User completed 30-day streak"
  | 'struggle';         // "User can't focus past 3pm"

// ─── AI Conversation ────────────────────────────────────────────

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  summary: string | null;
  lastMessage: string | null;
}

// ─── AI Analysis ────────────────────────────────────────────────

export interface UserAnalysis {
  userId: string;
  generatedAt: string;
  personalityTraits: PersonalityTrait[];
  procrastinationTriggers: string[];
  peakProductivityHours: string[];
  energyPattern: EnergyPattern;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface PersonalityTrait {
  trait: string;
  score: number; // 0-100
  description: string;
}

export interface EnergyPattern {
  highEnergySlots: TimeSlotEnergy[];
  lowEnergySlots: TimeSlotEnergy[];
}

export interface TimeSlotEnergy {
  startHour: number;
  endHour: number;
  averageEnergy: number;
}
