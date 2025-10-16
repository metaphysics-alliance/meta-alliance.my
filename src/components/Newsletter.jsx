import { useState } from 'react'

import { useI18n } from '../i18n.jsx'

export default function Newsletter(){
  const { tt } = useI18n()
  const [ok, setOk] = useState(false)

  function submit(e){
    e.preventDefault()
    setOk(true)
  }

  return (
    <section className="container py-12">
      <div className="card-3d p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{tt('newsletter_title')}</h3>
        <p className="text-white/70 mb-4">{tt('newsletter_sub')}</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input type="email" required placeholder={tt('newsletter_placeholder')} className="flex-1 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 px-3 py-2 outline-none focus:border-gold/50" />
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold shadow-soft-xl hover:brightness-110">{tt('newsletter_button')}</button>
        </form>
        {ok && <div className="text-green-300/90 mt-3">订阅成功。</div>}
      </div>
    </section>
  )
}
