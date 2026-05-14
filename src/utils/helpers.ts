/**
 * ═══════════════════════════════════════════════════════════════
 *  Utility Functions
 * ═══════════════════════════════════════════════════════════════
 */

/** Format a number with commas */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

/** Format currency (INR) */
export function formatINR(amount: number): string {
  return `₹${formatNumber(amount)}`;
}


/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Generate a unique ID */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
}

/** Get greeting based on time of day */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return 'Still up?';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Night owl mode';
}

/** Calculate streak status */
export function getStreakStatus(streak: number): 'cold' | 'warming' | 'hot' | 'blazing' {
  if (streak < 3) return 'cold';
  if (streak < 7) return 'warming';
  if (streak < 30) return 'hot';
  return 'blazing';
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/** Get relative time string */
export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}
