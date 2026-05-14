/**
 * ═══════════════════════════════════════════════════════════════
 *  Database Service — CRUD operations via Supabase
 * ═══════════════════════════════════════════════════════════════
 */

import { supabase } from './client';
import type { ApiResponse, PaginatedResponse } from '@/types';

/**
 * Generic table query builder.
 * Every domain module (goals, tasks, habits) uses these primitives.
 */
export const db = {
  /** Fetch a single row by ID */
  async getById<T>(table: string, id: string): Promise<ApiResponse<T>> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return { data: null, error: { code: error.code, message: error.message }, status: 404 };
    return { data: data as T, error: null, status: 200 };
  },

  /** Fetch rows with pagination */
  async getMany<T>(
    table: string,
    options: {
      userId?: string;
      page?: number;
      pageSize?: number;
      orderBy?: string;
      ascending?: boolean;
      filters?: Record<string, any>;
    } = {},
  ): Promise<PaginatedResponse<T>> {
    const { userId, page = 1, pageSize = 20, orderBy = 'created_at', ascending = false, filters = {} } = options;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase.from(table).select('*', { count: 'exact' });

    if (userId) query = query.eq('user_id', userId);
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data, count, error } = await query
      .order(orderBy, { ascending })
      .range(from, to);

    return {
      data: (data ?? []) as T[],
      total: count ?? 0,
      page,
      pageSize,
      hasMore: (count ?? 0) > to + 1,
    };
  },

  /** Insert a new row */
  async insert<T>(table: string, row: Partial<T>): Promise<ApiResponse<T>> {
    const { data, error } = await supabase
      .from(table)
      .insert(row)
      .select()
      .single();

    if (error) return { data: null, error: { code: error.code, message: error.message }, status: 400 };
    return { data: data as T, error: null, status: 201 };
  },

  /** Update a row */
  async update<T>(table: string, id: string, updates: Partial<T>): Promise<ApiResponse<T>> {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return { data: null, error: { code: error.code, message: error.message }, status: 400 };
    return { data: data as T, error: null, status: 200 };
  },

  /** Delete a row */
  async remove(table: string, id: string): Promise<ApiResponse<null>> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) return { data: null, error: { code: error.code, message: error.message }, status: 400 };
    return { data: null, error: null, status: 204 };
  },

  /** Upsert a row */
  async upsert<T>(table: string, row: Partial<T>): Promise<ApiResponse<T>> {
    const { data, error } = await supabase
      .from(table)
      .upsert(row)
      .select()
      .single();

    if (error) return { data: null, error: { code: error.code, message: error.message }, status: 400 };
    return { data: data as T, error: null, status: 200 };
  },
};
