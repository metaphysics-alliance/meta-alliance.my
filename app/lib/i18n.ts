import dictionaryDefault, { getDictionary as baseGetDictionary, resolvePath, locales as rawLocales } from '../../shared/i18n/dictionary.js'

export type Dictionary = typeof dictionaryDefault
export type Locale = Extract<keyof Dictionary, string>

export const locales = rawLocales as Locale[]

export function getDict(locale: Locale){
  return baseGetDictionary(locale) as Dictionary[Locale]
}

export function pick(dict: Dictionary[Locale], path: string){
  return resolvePath(dict, path)
}

export const dictionary = dictionaryDefault
