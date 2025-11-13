/**
 * ProfileCompletionForm Component
 * 
 * Multi-step form for collecting detailed user information
 * after initial OAuth or email sign-up.
 * 
 * Steps:
 * 1. Basic Info (name, phone)
 * 2. Address Details
 * 3. Preferences (language, currency)
 * 4. Marketing Consent
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getUserProfile,
  updateUserProfile,
  completeProfile,
  type UserProfile,
  type ProfileUpdateData
} from '../lib/auth'

const MALAYSIAN_STATES = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Malacca',
  'Negeri Sembilan',
  'Pahang',
  'Penang',
  'Perak',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
  'Federal Territory of Kuala Lumpur',
  'Federal Territory of Labuan',
  'Federal Territory of Putrajaya',
]

interface Step {
  id: number
  title: string
  titleCN: string
}

const STEPS: Step[] = [
  { id: 1, title: 'Basic Information', titleCN: '基本信息' },
  { id: 2, title: 'Address Details', titleCN: '地址详情' },
  { id: 3, title: 'Preferences', titleCN: '偏好设置' },
  { id: 4, title: 'Confirmation', titleCN: '确认信息' },
]

export default function ProfileCompletionForm({ locale = 'EN' }: { locale?: 'EN' | 'CN' }) {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<ProfileUpdateData>({
    full_name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state_province: '',
    postcode: '',
    country: 'Malaysia',
    preferred_language: locale,
    preferred_currency: 'MYR',
    marketing_consent: false,
    newsletter_subscribed: false,
  })

  useEffect(() => {
    loadExistingProfile()
  }, [])

  const loadExistingProfile = async () => {
    try {
      const profile = await getUserProfile()
      if (profile) {
        setFormData(prev => ({
          ...prev,
          full_name: profile.full_name || '',
          phone: profile.phone || '',
          address_line1: profile.address_line1 || '',
          address_line2: profile.address_line2 || '',
          city: profile.city || '',
          state_province: profile.state_province || '',
          postcode: profile.postcode || '',
          country: profile.country || 'Malaysia',
          preferred_language: profile.preferred_language || locale,
          preferred_currency: profile.preferred_currency || 'MYR',
        }))
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
    }
  }

  const handleChange = (field: keyof ProfileUpdateData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.full_name?.trim()) {
          setError(locale === 'CN' ? '请输入姓名' : 'Please enter your full name')
          return false
        }
        if (!formData.phone?.trim()) {
          setError(locale === 'CN' ? '请输入电话号码' : 'Please enter your phone number')
          return false
        }
        break
      case 2:
        if (!formData.address_line1?.trim()) {
          setError(locale === 'CN' ? '请输入地址' : 'Please enter your address')
          return false
        }
        if (!formData.city?.trim()) {
          setError(locale === 'CN' ? '请输入城市' : 'Please enter your city')
          return false
        }
        if (!formData.state_province?.trim()) {
          setError(locale === 'CN' ? '请选择州/省' : 'Please select your state/province')
          return false
        }
        if (!formData.postcode?.trim()) {
          setError(locale === 'CN' ? '请输入邮编' : 'Please enter your postcode')
          return false
        }
        break
    }
    return true
  }

  const handleNext = async () => {
    if (!validateStep(currentStep)) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Save progress to database
      await updateUserProfile({
        ...formData,
        onboarding_step: currentStep,
      })
      
      if (currentStep < STEPS.length) {
        setCurrentStep(prev => prev + 1)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    
    try {
      await completeProfile(formData)
      
      // Redirect to pricing/subscription page
      navigate(`/${locale}/pricing`)
    } catch (err: any) {
      setError(err.message || 'Failed to complete profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'border-gold bg-gold text-black'
                    : 'border-white/30 bg-transparent text-white/50'
                }`}
              >
                {step.id}
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${
                    currentStep > step.id ? 'bg-gold' : 'bg-white/20'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold text-white">
            {locale === 'CN' ? STEPS[currentStep - 1].titleCN : STEPS[currentStep - 1].title}
          </h2>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Form Steps */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-white/70">
                {locale === 'CN' ? '全名' : 'Full Name'} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.full_name || ''}
                onChange={(e) => handleChange('full_name', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                placeholder={locale === 'CN' ? '输入您的全名' : 'Enter your full name'}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                {locale === 'CN' ? '电话号码' : 'Phone Number'} <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                placeholder={locale === 'CN' ? '+60 12-345 6789' : '+60 12-345 6789'}
              />
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-white/70">
                {locale === 'CN' ? '地址第一行' : 'Address Line 1'} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.address_line1 || ''}
                onChange={(e) => handleChange('address_line1', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                placeholder={locale === 'CN' ? '街道地址' : 'Street address'}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                {locale === 'CN' ? '地址第二行' : 'Address Line 2'}
              </label>
              <input
                type="text"
                value={formData.address_line2 || ''}
                onChange={(e) => handleChange('address_line2', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                placeholder={locale === 'CN' ? '单元/楼层（可选）' : 'Apt, suite, etc. (optional)'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {locale === 'CN' ? '城市' : 'City'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {locale === 'CN' ? '邮编' : 'Postcode'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.postcode || ''}
                  onChange={(e) => handleChange('postcode', e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                {locale === 'CN' ? '州/省' : 'State / Province'} <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.state_province || ''}
                onChange={(e) => handleChange('state_province', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
              >
                <option value="">{locale === 'CN' ? '选择州' : 'Select state'}</option>
                {MALAYSIAN_STATES.map(state => (
                  <option key={state} value={state} className="bg-[#0a1025] text-white">
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                {locale === 'CN' ? '国家' : 'Country'}
              </label>
              <input
                type="text"
                value={formData.country || 'Malaysia'}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-white/70">
                {locale === 'CN' ? '首选语言' : 'Preferred Language'}
              </label>
              <select
                value={formData.preferred_language || 'EN'}
                onChange={(e) => handleChange('preferred_language', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
              >
                <option value="EN" className="bg-[#0a1025]">English</option>
                <option value="CN" className="bg-[#0a1025]">中文</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                {locale === 'CN' ? '首选货币' : 'Preferred Currency'}
              </label>
              <select
                value={formData.preferred_currency || 'MYR'}
                onChange={(e) => handleChange('preferred_currency', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
              >
                <option value="MYR" className="bg-[#0a1025]">MYR (RM)</option>
                <option value="USD" className="bg-[#0a1025]">USD ($)</option>
              </select>
            </div>

            <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.marketing_consent || false}
                  onChange={(e) => handleChange('marketing_consent', e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-white/10 text-gold focus:ring-gold"
                />
                <span className="text-sm text-white/80">
                  {locale === 'CN'
                    ? '我同意接收有关服务更新和特别优惠的营销通讯。'
                    : 'I agree to receive marketing communications about service updates and special offers.'}
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.newsletter_subscribed || false}
                  onChange={(e) => handleChange('newsletter_subscribed', e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-white/10 text-gold focus:ring-gold"
                />
                <span className="text-sm text-white/80">
                  {locale === 'CN'
                    ? '订阅我们的月度新闻简报，获取玄学洞见和行业趋势。'
                    : 'Subscribe to our monthly newsletter for metaphysics insights and industry trends.'}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-white/80">
              <h3 className="mb-4 text-lg font-semibold text-white">
                {locale === 'CN' ? '请确认您的信息' : 'Please confirm your information'}
              </h3>
              <dl className="space-y-3">
                <div><dt className="font-semibold">Name:</dt><dd>{formData.full_name}</dd></div>
                <div><dt className="font-semibold">Phone:</dt><dd>{formData.phone}</dd></div>
                <div><dt className="font-semibold">Address:</dt><dd>{formData.address_line1}{formData.address_line2 && `, ${formData.address_line2}`}</dd></div>
                <div><dt className="font-semibold">City:</dt><dd>{formData.city}, {formData.postcode}</dd></div>
                <div><dt className="font-semibold">State:</dt><dd>{formData.state_province}</dd></div>
                <div><dt className="font-semibold">Country:</dt><dd>{formData.country}</dd></div>
              </dl>
            </div>
            
            <p className="text-center text-sm text-white/60">
              {locale === 'CN'
                ? '点击完成后，您将被重定向到订阅页面。'
                : 'After completing, you will be redirected to the subscription page.'}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              disabled={loading}
              className="rounded-lg border border-white/20 px-6 py-3 text-white transition hover:border-white/40 disabled:opacity-50"
            >
              {locale === 'CN' ? '返回' : 'Back'}
            </button>
          )}

          <div className="ml-auto">
            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                disabled={loading}
                className="rounded-lg bg-gradient-to-r from-gold to-[#4169e1] px-8 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-gold/50 disabled:opacity-50"
              >
                {loading ? (locale === 'CN' ? '保存中...' : 'Saving...') : (locale === 'CN' ? '下一步' : 'Next')}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-lg bg-gradient-to-r from-gold to-[#4169e1] px-8 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-gold/50 disabled:opacity-50"
              >
                {loading ? (locale === 'CN' ? '提交中...' : 'Submitting...') : (locale === 'CN' ? '完成并继续' : 'Complete & Continue')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
