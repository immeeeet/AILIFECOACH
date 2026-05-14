/**
 * ═══════════════════════════════════════════════════════════════
 *  Chat Store — Zustand
 *  Manages AI conversation state
 * ═══════════════════════════════════════════════════════════════
 */

import { create } from 'zustand';
import { chatEngine } from '@/services/ai';
import type { ChatMessage, Conversation, LoadingState } from '@/types';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  isTyping: boolean;
  loadingState: LoadingState;

  // Actions
  sendMessage: (content: string, userId: string) => Promise<void>;
  loadConversation: (conversationId: string) => Promise<void>;
  createConversation: (userId: string) => Promise<string>;
  setActiveConversation: (id: string | null) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  isTyping: false,
  loadingState: 'idle',

  sendMessage: async (content, userId) => {
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId: get().activeConversationId ?? '',
      role: 'user',
      content,
      contentType: 'text',
      timestamp: new Date().toISOString(),
      metadata: null,
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }));

    try {
      const response = await chatEngine.sendMessage({
        messages: [...get().messages],
        userId,
      });

      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_ai`,
        conversationId: get().activeConversationId ?? '',
        role: 'assistant',
        content: response.reply,
        contentType: 'text',
        timestamp: new Date().toISOString(),
        metadata: {
          extractedInsights: response.insights,
          suggestedActions: response.suggestedActions,
          emotionalTone: response.emotionalTone as any,
        },
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isTyping: false,
      }));
    } catch (error) {
      set({ isTyping: false });
      // TODO: Handle error state
    }
  },

  loadConversation: async (conversationId) => {
    set({ loadingState: 'loading', activeConversationId: conversationId });
    // TODO: Load messages from Supabase
    set({ loadingState: 'success' });
  },

  createConversation: async (userId) => {
    const id = `conv_${Date.now()}`;
    set({ activeConversationId: id, messages: [] });
    return id;
  },

  setActiveConversation: (id) => set({ activeConversationId: id }),
  clearMessages: () => set({ messages: [], activeConversationId: null }),
}));
