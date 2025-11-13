/**
 * AuthPage Component
 * 
 * Unified authentication page with:
 * - OAuth providers (Google, Facebook)
 * - Email/password sign-up and sign-in
 * - Magic link (passwordless)
 * - Responsive design matching Meta Alliance brand
 */

import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmail,
  signUpWithEmail,
  sendMagicLink,
} from '../lib/auth'

type AuthMode = 'signin' | 'signup' | 'magic'

export default function AuthPage({ locale = 'EN' }: { locale?: 'EN' | 'CN' }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || `/${locale}/profile/complete`
  
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleOAuthSignIn = async (provider: 'google' | 'facebook') => {
    setLoading(true)
    setError(null)
    
    try {
      const redirectUrl = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`
      
      if (provider === 'google') {
        await signInWithGoogle(redirectUrl)
      } else {
        await signInWithFacebook(redirectUrl)
      }
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`)
      setLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password)
        navigate(redirectTo)
      } else if (mode === 'signup') {
        const result = await signUpWithEmail(email, password, fullName)
        if (result.user?.email_confirmed_at) {
          navigate(redirectTo)
        } else {
          setSuccess(
            locale === 'CN'
              ? '注册成功！请检查您的电子邮件以确认您的帐户。'
              : 'Sign up successful! Please check your email to confirm your account.'
          )
        }
      } else {
        await sendMagicLink(email)
        setSuccess(
          locale === 'CN'
            ? `魔术链接已发送至 ${email}。请检查您的收件箱。`
            : `Magic link sent to ${email}. Please check your inbox.`
        )
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const copy = {
    EN: {
      title: mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Sign In Easily',
      subtitle:
        mode === 'signin'
          ? 'Sign in to access your subscriptions'
          : mode === 'signup'
          ? 'Join Meta Alliance to unlock metaphysics insights'
          : 'We will send you a magic link to sign in',
      googleBtn: 'Continue with Google',
      facebookBtn: 'Continue with Facebook',
      orDivider: 'OR',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      fullNameLabel: 'Full Name',
      submitBtn: mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Magic Link',
      switchToSignup: "Don't have an account?",
      switchToSignin: 'Already have an account?',
      switchToMagic: 'Prefer passwordless?',
      switchLink: mode === 'signin' ? 'Sign up' : mode === 'signup' ? 'Sign in' : 'Use password',
    },
    CN: {
      title: mode === 'signin' ? '欢迎回来' : mode === 'signup' ? '创建账户' : '轻松登录',
      subtitle:
        mode === 'signin'
          ? '登录以访问您的订阅'
          : mode === 'signup'
          ? '加入玄域联盟，解锁玄学洞察'
          : '我们将向您发送魔术链接以登录',
      googleBtn: '使用 Google 继续',
      facebookBtn: '使用 Facebook 继续',
      orDivider: '或',
      emailLabel: '电子邮件地址',
      passwordLabel: '密码',
      fullNameLabel: '全名',
      submitBtn: mode === 'signin' ? '登录' : mode === 'signup' ? '注册' : '发送魔术链接',
      switchToSignup: '没有账户？',
      switchToSignin: '已有账户？',
      switchToMagic: '更喜欢无密码？',
      switchLink: mode === 'signin' ? '注册' : mode === 'signup' ? '登录' : '使用密码',
    },
  }

  const t = copy[locale]

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-r from-gold to-[#4169e1] bg-clip-text text-4xl font-bold text-transparent">
            {t.title}
          </h1>
          <p className="text-white/70">{t.subtitle}</p>
        </div>

        {/* Main Form Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-sm text-green-300">
              {success}
            </div>
          )}

          {/* OAuth Buttons */}
          {mode !== 'magic' && (
            <>
              <button
                onClick={() => handleOAuthSignIn('google')}
                disabled={loading}
                className="mb-3 flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white px-4 py-3 font-medium text-gray-900 transition hover:bg-gray-100 disabled:opacity-50"
              >
                <FcGoogle className="text-xl" />
                {t.googleBtn}
              </button>

              <button
                onClick={() => handleOAuthSignIn('facebook')}
                disabled={loading}
                className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg border border-[#1877f2] bg-[#1877f2] px-4 py-3 font-medium text-white transition hover:bg-[#166fe5] disabled:opacity-50"
              >
                <FaFacebook className="text-xl" />
                {t.facebookBtn}
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#0a1025] px-4 text-white/50">{t.orDivider}</span>
                </div>
              </div>
            </>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-2 block text-sm text-white/70">{t.fullNameLabel}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder={locale === 'CN' ? '输入您的全名' : 'Enter your full name'}
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-white/70">{t.emailLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                placeholder={locale === 'CN' ? '您的电子邮件' : 'your@email.com'}
              />
            </div>

            {mode !== 'magic' && (
              <div>
                <label className="mb-2 block text-sm text-white/70">{t.passwordLabel}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder={locale === 'CN' ? '至少 6 个字符' : 'At least 6 characters'}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-gold to-[#4169e1] px-4 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-gold/50 disabled:opacity-50"
            >
              {loading
                ? locale === 'CN'
                  ? '处理中...'
                  : 'Processing...'
                : t.submitBtn}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 text-center text-sm text-white/60">
            {mode === 'magic' ? (
              <button
                onClick={() => setMode('signin')}
                className="text-gold hover:underline"
              >
                {t.switchLink}
              </button>
            ) : (
              <>
                {mode === 'signin' ? t.switchToSignup : t.switchToSignin}{' '}
                <button
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-gold hover:underline"
                >
                  {t.switchLink}
                </button>
                <br />
                <button
                  onClick={() => setMode('magic')}
                  className="mt-2 text-gold hover:underline"
                >
                  {t.switchToMagic}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Legal Notice */}
        <p className="mt-6 text-center text-xs text-white/50">
          {locale === 'CN'
            ? '继续即表示您同意我们的'
            : 'By continuing, you agree to our'}{' '}
          <a href={`/${locale}/legal/terms`} className="text-gold hover:underline">
            {locale === 'CN' ? '服务条款' : 'Terms of Service'}
          </a>{' '}
          {locale === 'CN' ? '和' : 'and'}{' '}
          <a href={`/${locale}/legal/privacy`} className="text-gold hover:underline">
            {locale === 'CN' ? '隐私政策' : 'Privacy Policy'}
          </a>
        </p>
      </div>
    </div>
  )
}
