"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { 
  i18nConfig, 
  translations, 
  type Locale, 
  type TranslationKeys,
  localeNames,
  localeFlags 
} from '@/i18n/config'

const LOCALE_STORAGE_KEY = 'portfolio.locale'

export function useI18n() {
  const [locale, setLocaleState] = useState<Locale>(i18nConfig.defaultLocale)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize locale from storage or browser
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null
    
    if (savedLocale && i18nConfig.locales.includes(savedLocale)) {
      setLocaleState(savedLocale)
    } else if (i18nConfig.localeDetection) {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Locale
      if (i18nConfig.locales.includes(browserLang)) {
        setLocaleState(browserLang)
      }
    }
    
    setIsLoading(false)
  }, [])

  // Set locale and persist to storage
  const setLocale = useCallback((newLocale: Locale) => {
    if (i18nConfig.locales.includes(newLocale)) {
      setLocaleState(newLocale)
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
      
      // Update document language
      document.documentElement.lang = newLocale
    }
  }, [])

  // Translation function
  const t = useCallback((
    key: keyof TranslationKeys,
    params?: Record<string, string | number>
  ): string => {
    let translation = translations[locale]?.[key] || translations.en[key] || String(key)
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value))
      })
    }
    
    return translation
  }, [locale])

  // Get all available locales
  const availableLocales = useMemo(() => 
    i18nConfig.locales.map(loc => ({
      code: loc,
      name: localeNames[loc],
      flag: localeFlags[loc],
    })),
    []
  )

  return {
    locale,
    setLocale,
    t,
    availableLocales,
    isLoading,
    isDefaultLocale: locale === i18nConfig.defaultLocale,
  }
}

// Locale Switcher Component
export function LocaleSwitcher() {
  const { locale, setLocale, availableLocales } = useI18n()

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="rounded-lg px-3 py-2 text-sm font-medium"
      style={{
        backgroundColor: 'hsl(var(--surface))',
        color: 'hsl(var(--text-primary))',
        border: '1px solid hsl(var(--border))',
      }}
    >
      {availableLocales.map(({ code, name, flag }) => (
        <option key={code} value={code}>
          {flag} {name}
        </option>
      ))}
    </select>
  )
}


