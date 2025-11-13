/**
 * AuthCallback Component
 * 
 * Handles OAuth redirect after successful authentication.
 * Processes the auth token and redirects user appropriately:
 * - New users → Profile completion
 * - Returning users with incomplete profile → Profile completion
 * - Returning users with complete profile → Original redirect destination
 */

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { ensureUserProfile, isProfileComplete } from '../lib/auth'

export default function AuthCallback({ locale = 'EN' }: { locale?: 'EN' | 'CN' }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [message, setMessage] = useState('')

  useEffect(() => {
    handleCallback()
  }, [])

  const handleCallback = async () => {
    try {
      // Extract auth code/token from URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      
      if (!accessToken) {
        throw new Error('No access token found in callback')
      }

      // Set the session
      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || '',
      })

      if (sessionError) throw sessionError

      setStatus('success')
      setMessage(locale === 'CN' ? '认证成功！正在重定向...' : 'Authentication successful! Redirecting...')

      // Ensure profile exists (should be auto-created by trigger)
      await ensureUserProfile()

      // Check if profile is complete
      const profileComplete = await isProfileComplete()

      // Determine redirect destination
      const redirectParam = searchParams.get('redirect')
      
      if (!profileComplete) {
        // New user or incomplete profile → Go to profile completion
        navigate(`/${locale}/profile/complete`)
      } else if (redirectParam) {
        // Returning user with complete profile → Go to original destination
        navigate(decodeURIComponent(redirectParam))
      } else {
        // Default: Go to pricing page
        navigate(`/${locale}/pricing`)
      }
    } catch (err: any) {
      console.error('Auth callback error:', err)
      setStatus('error')
      setMessage(
        locale === 'CN'
          ? `认证失败：${err.message}`
          : `Authentication failed: ${err.message}`
      )

      // Redirect to auth page after 3 seconds
      setTimeout(() => {
        navigate(`/${locale}/auth`)
      }, 3000)
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        {status === 'processing' && (
          <>
            <div className="mb-6 inline-block h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-gold"></div>
            <h2 className="text-2xl font-semibold text-white">
              {locale === 'CN' ? '正在处理您的登录...' : 'Processing your sign-in...'}
            </h2>
            <p className="mt-2 text-white/60">
              {locale === 'CN' ? '请稍候' : 'Please wait a moment'}
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-4xl text-green-400">
              ✓
            </div>
            <h2 className="text-2xl font-semibold text-white">{message}</h2>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-4xl text-red-400">
              ✕
            </div>
            <h2 className="text-2xl font-semibold text-white">{message}</h2>
            <p className="mt-4 text-white/60">
              {locale === 'CN'
                ? '正在重定向到登录页...'
                : 'Redirecting to sign-in page...'}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
