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

      // If no credentials provided, skip login and rely on anon policies
      if (!email || !password) {
        return null;
      }

      // Attempt service login, but do not throw if it fails (avoid noisy 400s)
      try {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.warn('[supabaseAuth] Service login failed; continuing as anon:', signInError.message);
          return null;
        }

        return signInData.session ?? null;
      } catch (err: any) {
        console.warn('[supabaseAuth] Service login error; continuing as anon:', err?.message || err);
        return null;
      }
    })().catch((err) => {
      sessionPromise = undefined;
      throw err;
    });
  }

  return sessionPromise;
}
