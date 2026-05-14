/**
 * ═══════════════════════════════════════════════════════════════
 *  useCountdown — For penalty timers and task deadlines
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef } from 'react';

interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formatted: string;
}

export function useCountdown(targetDate: Date | string): CountdownResult {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(new Date()), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const isExpired = diff === 0;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { hours, minutes, seconds, isExpired, formatted };
}
