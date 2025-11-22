/**
 * Supabase Authentication & Profile Management
 * 
 * Handles:
 * - OAuth sign-in (Google, Facebook/Meta)
 * - Email/password authentication
 * - Magic link (passwordless)
 * - User profile creation & updates
 * - Session management
 */

import { Session, User } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

// ============================================================================
// TYPES
// ============================================================================

export interface UserProfile {
  user_id: string
  full_name?: string | null
  preferred_name?: string | null
  email?: string | null
  phone?: string | null
  avatar_url?: string | null
  timezone?: string | null
  country?: string | null
  city?: string | null
  state?: string | null
  profile_state?: string | null
  completion_pct?: number | null
  preferred_language?: 'EN' | 'CN'
  created_at?: string
  updated_at?: string
}

export interface ProfileUpdateData {
  full_name?: string
  phone?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state_province?: string
  postcode?: string
  country?: string
  preferred_language?: 'EN' | 'CN'
  preferred_currency?: 'MYR' | 'USD'
  profile_completed?: boolean
  onboarding_step?: number
  marketing_consent?: boolean
  newsletter_subscribed?: boolean
  profile_state?: string
  completion_pct?: number
}

// ============================================================================
// OAUTH PROVIDERS
// ============================================================================

/**
 * Sign in with Google
 */
export async function signInWithGoogle(redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
  
  if (error) throw error
  return data
}

/**
 * Sign in with Facebook (Meta)
 */
export async function signInWithFacebook(redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      scopes: 'email,public_profile',
    },
  })
  
  if (error) throw error
  return data
}

/**
 * Sign in with Apple
 */
export async function signInWithApple(redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
    },
  })

  if (error) throw error
  return data
}

// ============================================================================
// EMAIL AUTHENTICATION
// ============================================================================

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  
  if (error) throw error
  return data
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

/**
 * Send magic link (passwordless authentication)
 */
export async function sendMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  
  if (error) throw error
  return data
}

/**
 * Reset password
 */
export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  
  if (error) throw error
  return data
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  
  if (error) throw error
  return data
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

/**
 * Get current session
 */
export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Refresh session
 */
export async function refreshSession() {
  const { data, error } = await supabase.auth.refreshSession()
  if (error) throw error
  return data.session
}

// ============================================================================
// USER PROFILE OPERATIONS
// ============================================================================

/**
 * Get user profile
 */
export async function getUserProfile(userId?: string): Promise<UserProfile | null> {
  const user = userId || (await getCurrentUser())?.id
  
  if (!user) throw new Error('No authenticated user')
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user)
    .maybeSingle()
  
  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    throw error
  }
  
  return data
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  updates: ProfileUpdateData,
  userId?: string
): Promise<UserProfile> {
  const user = userId || (await getCurrentUser())?.id
  
  if (!user) throw new Error('No authenticated user')
  
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', user)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Complete profile (mark as completed)
 */
export async function completeProfile(profileData: ProfileUpdateData): Promise<UserProfile> {
  return updateUserProfile({
    ...profileData,
    // Align to current schema fields
    profile_state: 'complete' as any,
    completion_pct: 100 as any,
  })
}

/**
 * Check if profile is complete
 */
export async function isProfileComplete(): Promise<boolean> {
  const profile = await getUserProfile()
  
  if (!profile) return false
  
  // Required fields for a complete profile
  if (profile.profile_state === 'complete') return true
  if (typeof profile.completion_pct === 'number' && profile.completion_pct >= 100) return true
  return false
}

/**
 * Get or create user profile
 * Useful for ensuring profile exists after OAuth sign-in
 */
export async function ensureUserProfile(): Promise<UserProfile> {
  let profile = await getUserProfile()
  
  if (!profile) {
    const user = await getCurrentUser()
    if (!user) throw new Error('No authenticated user')
    
    // Profile should be auto-created by trigger, but just in case...
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        user_id: user.id,
        email: user.email!,
        full_name: user.user_metadata.full_name || user.user_metadata.name,
        avatar_url: user.user_metadata.avatar_url,
      })
      .select()
      .single()
    
    if (error) throw error
    profile = data
  }
  
  return profile
}

// ============================================================================
// AUTHENTICATION STATE LISTENER
// ============================================================================

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
) {
  return supabase.auth.onAuthStateChange(callback)
}

// ============================================================================
// UTILITY HELPERS
// ============================================================================

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}

/**
 * Get user's email
 */
export async function getUserEmail(): Promise<string | null> {
  const user = await getCurrentUser()
  return user?.email || null
}

/**
 * Get user's display name
 */
export async function getDisplayName(): Promise<string | null> {
  const profile = await getUserProfile()
  return profile?.display_name || profile?.full_name || null
}
