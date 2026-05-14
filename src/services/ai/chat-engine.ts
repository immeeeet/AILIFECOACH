/**
 * ═══════════════════════════════════════════════════════════════
 *  AI Chat Engine — Handles conversation with the AI Coach
 * ═══════════════════════════════════════════════════════════════
 *
 *  This is the core intelligence layer. It:
 *  1. Manages conversation context
 *  2. Sends messages to the LLM API
 *  3. Extracts insights from responses
 *  4. Manages the memory/RAG pipeline
 * ═══════════════════════════════════════════════════════════════
 */

import { AI_CONFIG } from '@/constants';
import type { ChatMessage, ExtractedInsight, SuggestedAction } from '@/types';

const AI_API_URL = process.env.EXPO_PUBLIC_AI_API_URL!;

export interface ChatRequest {
  messages: ChatMessage[];
  userId: string;
  context?: {
    currentGoals?: string[];
    todaysTasks?: string[];
    recentInsights?: string[];
    userPreferences?: Record<string, unknown>;
  };
}

export interface ChatResponse {
  reply: string;
  insights: ExtractedInsight[];
  suggestedActions: SuggestedAction[];
  emotionalTone: string;
}

export const chatEngine = {
  /** Send a message and get AI response */
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${AI_API_URL}/v1/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_CONFIG.SYSTEM_PERSONA,
        messages: request.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature: AI_CONFIG.TEMPERATURE,
        max_tokens: AI_CONFIG.MAX_TOKEN_RESPONSE,
        context: request.context,
        user_id: request.userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    return response.json();
  },

  /** Generate a task plan from a goal */
  async generatePlan(goalDescription: string, userContext: Record<string, unknown>): Promise<any> {
    const response = await fetch(`${AI_API_URL}/v1/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        goal: goalDescription,
        context: userContext,
      }),
    });

    return response.json();
  },

  /** Analyze user patterns from chat history */
  async analyzePatterns(userId: string): Promise<any> {
    const response = await fetch(`${AI_API_URL}/v1/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    });

    return response.json();
  },
};
