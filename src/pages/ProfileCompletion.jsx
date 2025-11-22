/**
 * Profile Completion Wizard
 * Multi-step form for new users to complete their profile after account creation
 * 
 * Route: /profile/complete
 * 
 * Steps:
 * 1. Welcome - Introduction
 * 2. Basic Info - Name, phone (pre-filled)
 * 3. Preferences - Language, currency, timezone
 * 4. Marketing - Newsletter consent
 * 5. Complete - Success message
 */

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useI18n } from '../i18n'

const STEPS = {
  WELCOME: 0,
  BASIC_INFO: 1,
  PREFERENCES: 2,
  MARKETING: 3,
  COMPLETE: 4,
}

const TIMEZONES = [
  'Asia/Kuala_Lumpur (GMT+8)',
  'Asia/Singapore (GMT+8)',
  'Asia/Hong_Kong (GMT+8)',
  'Asia/Shanghai (GMT+8)',
  'Asia/Bangkok (GMT+7)',
  'UTC (GMT+0)',
]

export default function ProfileCompletion() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'

  const [currentStep, setCurrentStep] = useState(STEPS.WELCOME)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    preferredLanguage: 'EN',
    preferredCurrency: 'MYR',
    timezone: 'Asia/Kuala_Lumpur (GMT+8)',
    newsletter: true,
  })

  // ========================================================================
  // Load User and Profile
  // ========================================================================
  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      // Get current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()

      if (userError || !currentUser) {
        navigate('/pricing')
        return
      }

      setUser(currentUser)

      // Get user profile
      const { data: userProfile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .maybeSingle()

      if (profileError) throw profileError
      if (!userProfile) {
        // Create a minimal profile if missing
        const { data: createdProfile, error: createErr } = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: currentUser.id,
              full_name: currentUser.email,
              profile_state: 'draft',
              completion_pct: 0,
            },
          ])
          .select()
          .maybeSingle()
        if (createErr) throw createErr
        setProfile(createdProfile)
      } else {
        setProfile(userProfile)
      }

      // Pre-fill form (best-effort; some columns may not exist in DB)
      const profileData = userProfile || {}
      setFormData({
        fullName: profileData.full_name || '',
        phone: profileData.phone || '',
        preferredLanguage: profileData.report_language || profileData.preferred_language || 'EN',
        preferredCurrency: profileData.preferred_currency || 'MYR',
        timezone: profileData.timezone || 'Asia/Kuala_Lumpur (GMT+8)',
        newsletter: true,
      })

      // If profile already completed, redirect to dashboard
      if (
        profileData.profile_state === 'complete' ||
        (typeof profileData.completion_pct === 'number' &&
          profileData.completion_pct >= 100)
      ) {
        navigate('/dashboard')
        return
      }

      setLoading(false)
    } catch (err) {
      console.error('Failed to load profile:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  // ========================================================================
  // Form Handlers
  // ========================================================================
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.COMPLETE))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, STEPS.WELCOME))
  }

  const saveAndNext = async () => {
    setSaving(true)
    setError(null)

    try {
      // Validate current step
      if (currentStep === STEPS.BASIC_INFO) {
        if (!formData.fullName.trim()) {
          throw new Error(locale === 'CN' ? '请输入您的全名' : 'Please enter your full name')
        }
      }

      // Save to database
      const updatePayload = {
        full_name: formData.fullName,
        // Store language in available column if present in DB
        report_language: formData.preferredLanguage,
        timezone: formData.timezone,
        profile_state: 'in_progress',
      }

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update(updatePayload)
        .eq('user_id', user.id)

      if (updateError) throw updateError

      // Update language preference in app
      if (formData.preferredLanguage !== lang) {
        setLang(formData.preferredLanguage)
      }

      nextStep()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const completeProfile = async () => {
    setSaving(true)
    setError(null)

    try {
      // Mark profile as completed
      const { error: completeError } = await supabase
        .from('user_profiles')
        .update({
          profile_state: 'complete',
          completion_pct: 100,
          report_language: formData.preferredLanguage,
          timezone: formData.timezone,
        })
        .eq('user_id', user.id)

      if (completeError) throw completeError

      // If newsletter opted in, ensure subscription exists
      if (formData.newsletter) {
        await supabase
          .from('newsletter_subscriptions')
          .insert([
            {
              email: user.email,
              full_name: formData.fullName,
              source: 'profile_completion',
              preferred_language: formData.preferredLanguage,
              consent_given: true,
            },
          ])
          .select()
          // Ignore duplicate errors
          .then(({ error }) => {
            if (error && error.code !== '23505') {
              console.warn('Newsletter subscription warning:', error)
            }
          })
      }

      nextStep()

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // ========================================================================
  // Loading State
  // ========================================================================
  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-gold" />
      </div>
    )
  }

  // ========================================================================
  // Render Current Step
  // ========================================================================
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between text-sm text-white/70">
            <span>
              {locale === 'CN' ? '步骤' : 'Step'} {currentStep + 1} / 5
            </span>
            <span>{Math.round(((currentStep + 1) / 5) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          {/* STEP 0: Welcome */}
          {currentStep === STEPS.WELCOME && (
            <div className="text-center">
              <div className="mb-6 text-6xl">👋</div>
              <h1 className="mb-4 text-3xl font-bold text-white">
                {locale === 'CN' ? '欢迎来到 Metaphysics Alliance！' : 'Welcome to Metaphysics Alliance!'}
              </h1>
              <p className="mb-8 text-lg text-white/70">
                {locale === 'CN'
                  ? `您好 ${location.state?.userName || ''}！让我们花一点时间来完成您的个人资料。`
                  : `Hi ${location.state?.userName || ''}! Let's take a moment to complete your profile.`}
              </p>
              <button
                onClick={nextStep}
                className="rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 px-8 py-4 font-bold text-black shadow-lg transition hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]"
              >
                {locale === 'CN' ? '开始' : "Let's Start"}
              </button>
            </div>
          )}

          {/* STEP 1: Basic Info */}
          {currentStep === STEPS.BASIC_INFO && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">
                {locale === 'CN' ? '基本信息' : 'Basic Information'}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '全名' : 'Full Name'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '电话号码' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-300">
                  {error}
                </div>
              )}

              <div className="mt-8 flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 rounded-full border border-white/20 px-6 py-3 font-medium text-white/80 transition hover:bg-white/5"
                >
                  {locale === 'CN' ? '返回' : 'Back'}
                </button>
                <button
                  onClick={saveAndNext}
                  disabled={saving}
                  className="flex-1 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 px-6 py-3 font-bold text-black transition hover:shadow-lg disabled:opacity-50"
                >
                  {saving ? (locale === 'CN' ? '保存中...' : 'Saving...') : (locale === 'CN' ? '继续' : 'Continue')}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Preferences */}
          {currentStep === STEPS.PREFERENCES && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">
                {locale === 'CN' ? '偏好设置' : 'Preferences'}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '首选语言' : 'Preferred Language'}
                  </label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  >
                    <option value="EN" className="bg-[#0a1025]">English</option>
                    <option value="CN" className="bg-[#0a1025]">简体中文</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '首选货币' : 'Preferred Currency'}
                  </label>
                  <select
                    value={formData.preferredCurrency}
                    onChange={(e) => handleChange('preferredCurrency', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  >
                    <option value="MYR" className="bg-[#0a1025]">MYR (Malaysian Ringgit)</option>
                    <option value="USD" className="bg-[#0a1025]">USD (US Dollar)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    {locale === 'CN' ? '时区' : 'Timezone'}
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz} className="bg-[#0a1025]">
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 rounded-full border border-white/20 px-6 py-3 font-medium text-white/80 transition hover:bg-white/5"
                >
                  {locale === 'CN' ? '返回' : 'Back'}
                </button>
                <button
                  onClick={saveAndNext}
                  disabled={saving}
                  className="flex-1 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 px-6 py-3 font-bold text-black transition hover:shadow-lg disabled:opacity-50"
                >
                  {saving ? (locale === 'CN' ? '保存中...' : 'Saving...') : (locale === 'CN' ? '继续' : 'Continue')}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Marketing */}
          {currentStep === STEPS.MARKETING && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">
                {locale === 'CN' ? '保持联系' : 'Stay Connected'}
              </h2>

              <div className="space-y-6">
                <label className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) => handleChange('newsletter', e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-white/20 bg-white/10 text-gold focus:ring-gold"
                  />
                  <div>
                    <div className="mb-1 font-semibold text-white">
                      {locale === 'CN' ? '订阅新闻简报' : 'Subscribe to Newsletter'}
                    </div>
                    <div className="text-sm text-white/70">
                      {locale === 'CN'
                        ? '接收有关新服务、独家优惠和元宇宙智慧的更新。'
                        : 'Receive updates about new services, exclusive offers, and metaphysical wisdom.'}
                    </div>
                  </div>
                </label>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  {locale === 'CN'
                    ? '您可以随时在账户设置中更改您的通信偏好。'
                    : 'You can change your communication preferences anytime in your account settings.'}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 rounded-full border border-white/20 px-6 py-3 font-medium text-white/80 transition hover:bg-white/5"
                >
                  {locale === 'CN' ? '返回' : 'Back'}
                </button>
                <button
                  onClick={completeProfile}
                  disabled={saving}
                  className="flex-1 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 px-6 py-3 font-bold text-black transition hover:shadow-lg disabled:opacity-50"
                >
                  {saving ? (locale === 'CN' ? '完成中...' : 'Completing...') : (locale === 'CN' ? '完成设置' : 'Complete Setup')}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Complete */}
          {currentStep === STEPS.COMPLETE && (
            <div className="text-center">
              <div className="mb-6 text-6xl">🎉</div>
              <h2 className="mb-4 text-3xl font-bold text-white">
                {locale === 'CN' ? '全部完成！' : 'All Set!'}
              </h2>
              <p className="mb-8 text-lg text-white/70">
                {locale === 'CN'
                  ? '您的个人资料已完成。正在重定向到您的仪表板...'
                  : 'Your profile is complete. Redirecting to your dashboard...'}
              </p>
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-gold" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
