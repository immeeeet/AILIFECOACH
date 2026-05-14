/**
 * ═══════════════════════════════════════════════════════════════
 *  Shared Utility Types
 * ═══════════════════════════════════════════════════════════════
 */

// ─── API Response Wrappers ──────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  status: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ─── Generic ────────────────────────────────────────────────────

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ─── Navigation ─────────────────────────────────────────────────

export type TabRoute = 'index' | 'coach' | 'mirror' | 'stats' | 'feed';

export interface TabConfig {
  name: TabRoute;
  title: string;
  icon: string;
  iconFocused: string;
}
