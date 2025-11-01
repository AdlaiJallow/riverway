import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are not set
let supabase;

if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'https://your-project-id.supabase.co' || 
    supabaseAnonKey === 'your-anon-key-here') {
  // Mock Supabase client for development without proper configuration
  supabase = {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => Promise.resolve({ error: null }),
    }),
  };
  console.warn('Supabase not configured properly. Using mock client.');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
