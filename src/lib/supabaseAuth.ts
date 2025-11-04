import type { Session } from '@supabase/supabase-js';

import { supabase } from './supabaseClient';

let sessionPromise: Promise<Session | null> | undefined;

export async function ensureSupabaseSession(): Promise<Session | null> {
  if (!sessionPromise) {
    sessionPromise = (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }

      if (data.session) {
        return data.session;
      }

      const email = import.meta.env.VITE_SUPABASE_EMAIL;
      const password = import.meta.env.VITE_SUPABASE_PASSWORD;

      if (!email || !password) {
        throw new Error('Supabase email/password environment variables are missing.');
      }

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      return signInData.session ?? null;
    })().catch((err) => {
      sessionPromise = undefined;
      throw err;
    });
  }

  return sessionPromise;
}

