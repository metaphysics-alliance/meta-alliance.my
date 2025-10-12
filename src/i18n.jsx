import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import sharedDictionary from '../shared/i18n/dictionary.js'

const dict = sharedDictionary

const I18nContext = createContext(null)

export function I18nProvider({ children }){
  const initial = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'EN'
  const [lang, setLang] = useState(initial === 'CN' ? 'CN' : 'EN')

  useEffect(() => {
    if (typeof window !== 'undefined'){
      localStorage.setItem('lang', lang)
    }
  }, [lang])

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (path) => {
      const parts = path.split('.')
      let cur = dict[lang]
      for (const segment of parts){
        if (cur && segment in cur){
          cur = cur[segment]
        } else {
          return path
        }
      }
      return cur
    },
    tt: (key) => dict[lang][key] ?? key,
    reviews: () => dict[lang].reviews,
  }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(){
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
