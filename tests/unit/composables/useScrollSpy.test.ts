/**
 * @file useScrollSpy.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Property-based tests for the `getActiveSection` pure function exported from
 *
 * @description
 * Property-based tests for the `getActiveSection` pure function exported from
 * `useScrollSpy.ts`.
 * Property 2 - Active section tracking correctness:
 * For any array of section vertical offsets and any scroll position, the
 * active section returned by `getActiveSection` must be the section whose
 * top offset is the greatest value ≤ the current scroll position.
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it } from 'vitest'
import * as fc from 'fast-check'
import { getActiveSection } from '../../../app/composables/useScrollSpy'

// ---------- TESTS
describe('useScrollSpy', () => {
  it('returns the section whose top is the greatest offset ≤ scroll position', () => {
    fc.assert(
      fc.property(
        fc.array(fc.nat({ max: 10000 }), { minLength: 1, maxLength: 9 }),
        fc.nat({ max: 10000 }),
        (offsets, scrollY) => {
          const sorted = [...offsets].sort((a, b) => a - b)
          const activeIndex = getActiveSection(sorted, scrollY)
          const expected = sorted.filter((o) => o <= scrollY).length - 1
          const expectedIndex = expected >= 0 ? expected : 0
          return activeIndex === expectedIndex
        }
      ),
      { numRuns: 100 }
    )
  })
})
