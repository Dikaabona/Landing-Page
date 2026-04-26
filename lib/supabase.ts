
import { createClient } from '@supabase/supabase-js';

let supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (supabaseUrl) {
  // Bersihkan trailing slash
  if (supabaseUrl.endsWith('/')) {
    supabaseUrl = supabaseUrl.slice(0, -1);
  }
  // Jika user menyertakan /rest/v1 secara tidak sengaja, hapus bagian itu
  if (supabaseUrl.includes('/rest/v1')) {
    supabaseUrl = supabaseUrl.replace('/rest/v1', '');
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
