import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useI18n } from '../i18n.jsx'
import CTAButton from './CTAButton.jsx'

export default function Newsletter(){
  const { tt, lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  async function submit(e){
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')

    try {
      // Insert into newsletter_subscriptions table
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email.toLowerCase().trim(),
            source: 'homepage',
            preferred_language: locale,
            consent_given: true,
          }
        ])
        .select()

      if (error) {
        // Check if email already exists
        if (error.code === '23505') {
          setStatus('success')
          setMessage(locale === 'CN' ? '您已订阅我们的简报！' : 'You are already subscribed!')
        } else {
          throw error
        }
      } else {
        setStatus('success')
        setMessage(locale === 'CN' ? '订阅成功！' : 'Successfully subscribed!')
        setEmail('')
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err)
      setStatus('error')
      setMessage(locale === 'CN' ? '订阅失败，请稍后重试。' : 'Subscription failed. Please try again.')
    }
  }

  return (
    <section className="container py-12">
      <div className="card-3d p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{tt('newsletter_title')}</h3>
        <p className="text-white/70 mb-4">{tt('newsletter_sub')}</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            placeholder={tt('newsletter_placeholder')} 
            className="flex-1 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 px-3 py-2 outline-none focus:border-gold/50 disabled:opacity-50" 
          />
          <CTAButton
            onClick={submit}
            disabled={status === 'loading'}
            size="md"
          >
            {status === 'loading' 
              ? (locale === 'CN' ? '订阅中...' : 'Subscribing...') 
              : tt('newsletter_button')
            }
          </CTAButton>
        </form>
        {status === 'success' && (
          <div className="text-green-300/90 mt-3">{message}</div>
        )}
        {status === 'error' && (
          <div className="text-red-300/90 mt-3">{message}</div>
        )}
      </div>
    </section>
  )
}
