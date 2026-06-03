/**
 * @file imports.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @description
 * Source code module.
 *
 * @since 20/05/2026
 * @updated 02/06/2026
 */
// ---------- EXPORTS
export const useI18n = () => ({
  t: (key: string) => key,
  locale: { value: 'en' },
  setLocale: () => {},
})

export const useNuxtApp = () => ({
  $i18n: {
    locale: { value: 'en' },
    setLocale: () => {},
  },
})

export const useColorMode = () => ({
  value: 'dark',
  preference: 'dark',
})

export const useAppConfig = () => ({
  ui: {
    primary: 'emerald',
  },
})
