/**
 * ═══════════════════════════════════════════════════════════════
 *  Payment Service — Stripe integration for penalties & subscriptions
 * ═══════════════════════════════════════════════════════════════
 */

import { SUBSCRIPTION } from '@/constants';

export const paymentService = {
  /** Initialize Stripe */
  async initialize(): Promise<void> {
    // TODO: Initialize Stripe SDK with publishable key
  },

  /** Create a subscription */
  async createSubscription(userId: string): Promise<{ clientSecret: string }> {
    // TODO: Call backend to create Stripe subscription
    throw new Error('Not implemented');
  },

  /** Charge a penalty */
  async chargePenalty(userId: string, amount: number, taskId: string): Promise<boolean> {
    // TODO: Call backend to charge via saved payment method
    throw new Error('Not implemented');
  },

  /** Add payment method */
  async addPaymentMethod(userId: string): Promise<boolean> {
    // TODO: Present Stripe payment sheet
    throw new Error('Not implemented');
  },

  /** Check subscription status */
  async checkSubscription(userId: string): Promise<{
    active: boolean;
    expiresAt: string | null;
    tier: string;
  }> {
    // TODO: Query backend for subscription status
    return { active: false, expiresAt: null, tier: 'free_trial' };
  },

  /** Cancel subscription */
  async cancelSubscription(userId: string): Promise<void> {
    // TODO: Call backend to cancel Stripe subscription
  },
};
