/**
 * ═══════════════════════════════════════════════════════════════
 *  Notification Service
 * ═══════════════════════════════════════════════════════════════
 */

import * as Notifications from 'expo-notifications';
import type { NotificationType } from '@/types';

// Configure default notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const notificationService = {
  /** Request notification permissions */
  async requestPermissions(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  /** Schedule a local notification */
  async scheduleLocal(
    title: string,
    body: string,
    type: NotificationType,
    triggerDate: Date,
    data?: Record<string, unknown>,
  ): Promise<string> {
    const id = await Notifications.scheduleNotificationAsync({
      content: { title, body, data: { type, ...data } },
      trigger: { date: triggerDate, type: Notifications.SchedulableTriggerInputTypes.DATE },
    });
    return id;
  },

  /** Cancel a scheduled notification */
  async cancel(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  },

  /** Cancel all scheduled notifications */
  async cancelAll(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  /** Get push token for remote notifications */
  async getPushToken(): Promise<string | null> {
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      return token.data;
    } catch {
      return null;
    }
  },
};
