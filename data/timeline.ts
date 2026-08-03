/**
 * @file timeline.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Static employment-history data for the portfolio.
 *
 * @description
 * Static employment-history data for the portfolio. Each entry represents a
 * role and is displayed as a card in the Timeline section.
 * Dates follow the European format (`DD/MM/YYYY`). Use the sentinel
 * value `'present'` for positions that are currently active; the
 * `TimelineEntry` component resolves this to a localised "Present" string.
 * The `TimelineSection` component sorts entries reverse-chronologically at
 * render time, so the order here is unimportant.
 *
 * @since 12/05/2026
 * @updated 03/08/2026
 */
// ---------- INTERFACES
/**
 * A single entry in the professional timeline.
 */
export interface TimelineItem {
  /** Stable identifier used as a Vue `:key`. */
  id: string

  /** Job title or role held during this period. */
  role: string

  /** Name of the employing organisation or client. */
  organisation: string

  /**
   * Start date in European format (e.g. `'01/01/2023'`).
   * Use `'present'` if the role began at an unknown time - though in practice
   * a concrete date is always preferred.
   */
  startDate: string

  /**
   * End date in European format (e.g. `'31/12/2023'`), or the sentinel value
   * `'present'` for roles that are currently active.
   */
  endDate: string

  /** Short prose description of responsibilities and accomplishments. */
  description: string
}

// ---------- DATA
/**
 * Chronological list of professional experience entries.
 * `TimelineSection` sorts these reverse-chronologically before rendering.
 */
export const timeline: TimelineItem[] = [
  {
    id: 'founder-selkira',
    role: 'Founder & Lead Developer',
    organisation: 'Selkira Inc',
    startDate: '23/08/2023',
    endDate: '01/01/2026',
    description:
      'Founded and led systems development for indie game projects, managing technical architecture and team workflows. Designed core gameplay mechanics and state management using C++ and modern tooling. Established Git version control standards, CI workflows, and technical documentation to keep multi-member development organized.',
  },
  {
    id: 'web-dev-antonio',
    role: 'Web Developer',
    organisation: 'Antonio Costa',
    startDate: '10/05/2023',
    endDate: '29/07/2023',
    description:
      'Developed custom web software for a workshop client, streamlining daily operations and client tracking. Conducted discovery sessions to map business requirements into clear technical specs, optimized performance bottlenecks for fast loading, and delivered a responsive, easy-to-maintain application on time.',
  },
]
