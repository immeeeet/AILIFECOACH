/**
 * ═══════════════════════════════════════════════════════════════
 *  AI Memory Manager — RAG pipeline for personalization
 * ═══════════════════════════════════════════════════════════════
 *
 *  Manages the AI's "memory" — facts, preferences, patterns,
 *  and emotional states it has learned about the user.
 *  Uses vector embeddings for semantic search (RAG).
 * ═══════════════════════════════════════════════════════════════
 */

import { db } from '@/services/supabase';
import type { AIMemory, MemoryType } from '@/types';

const MEMORY_TABLE = 'ai_memories';

export const memoryManager = {
  /** Store a new memory */
  async storeMemory(
    userId: string,
    type: MemoryType,
    content: string,
    importance: number = 5,
    sourceMessageId?: string,
    tags: string[] = [],
  ): Promise<AIMemory | null> {
    const result = await db.insert<AIMemory>(MEMORY_TABLE, {
      userId,
      type,
      content,
      importance,
      sourceMessageId: sourceMessageId ?? null,
      tags,
      embedding: null, // Will be computed server-side
    } as any);

    return result.data;
  },

  /** Retrieve relevant memories for context (RAG) */
  async getRelevantMemories(
    userId: string,
    query: string,
    limit: number = 10,
  ): Promise<AIMemory[]> {
    // In production, this calls a vector similarity search via Supabase pgvector
    // For now, fallback to recency-based retrieval
    const result = await db.getMany<AIMemory>(MEMORY_TABLE, {
      userId,
      pageSize: limit,
      orderBy: 'importance',
      ascending: false,
    });

    return result.data;
  },

  /** Get memories by type */
  async getMemoriesByType(
    userId: string,
    type: MemoryType,
    limit: number = 20,
  ): Promise<AIMemory[]> {
    const result = await db.getMany<AIMemory>(MEMORY_TABLE, {
      userId,
      pageSize: limit,
      filters: { type },
    });

    return result.data;
  },

  /** Update memory importance (decay or boost) */
  async updateImportance(memoryId: string, importance: number): Promise<void> {
    await db.update(MEMORY_TABLE, memoryId, { importance });
  },

  /** Delete old, low-importance memories */
  async pruneMemories(userId: string, minImportance: number = 2): Promise<void> {
    // Implementation will use Supabase RPC for batch deletion
    // This prevents memory bloat at scale
  },
};
