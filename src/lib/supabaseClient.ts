import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Use a stable, project-specific storage key to avoid clashes across apps/tabs
    storageKey: 'ma-auth',
  },
})
