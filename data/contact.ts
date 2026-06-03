/**
 * @file contact.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Static contact data for the portfolio.
 *
 * @description
 * Static contact data for the portfolio. Defines the contact links displayed
 * in the Contact section email, LinkedIn, and GitHub. Each entry uses an
 * i18n key for its accessible label so the UI can localise the ARIA text
 * without re-importing this module.
 *
 * @since 12/05/2026
 * @updated 27/05/2026
 */
// ---------- INTERFACES
/**
 * A single contact method, combining a destination URL with the metadata
 * needed to render and announce it accessibly.
 */
export interface ContactLink {
  /** Stable identifier used as a Vue `:key` and for analytics. */
  id: string

  /** i18n key resolved to a human-readable accessible label (e.g. ARIA). */
  label: string

  /** Absolute URL or `mailto:` link. */
  href: string

  /** @nuxt/icon component name (e.g. `'i-heroicons-envelope'`). */
  icon: string
}

/**
 * Aggregate of all contact links shown on the portfolio.
 * Currently exposes email, LinkedIn, and GitHub.
 */
export interface ContactData {
  email: ContactLink
  github: ContactLink
}

// ---------- DATA
/**
 * The portfolio owner's contact information.
 * Import this in ContactSection and pass it down as a prop.
 */
export const contact: ContactData = {
  email: {
    id: 'email',
    label: 'contact.email',
    href: 'mailto:joao.coutinho08@gmail.com',
    icon: 'i-heroicons-envelope',
  },
  github: {
    id: 'github',
    label: 'contact.github',
    href: 'https://github.com/BleckWolf25',
    icon: 'i-simple-icons-github',
  },
}
