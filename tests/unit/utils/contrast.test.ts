/**
 * @file contrast.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Property 3: Text/background contrast ratio compliance
 *
 * @description
 * Property 3: Text/background contrast ratio compliance
 * Validates: Requirements 3.7, 15.1
 * Asserts that every design-token colour pair used in the portfolio yields a
 * WCAG 2.1 contrast ratio ≥ 4.5:1 (Level AA for normal text).
 * Also verifies the mathematical invariant that the ratio is always ≥ 1.0
 * for any pair of valid hex colours.
 *
 * @since 30/05/2026
 * @updated 26/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { getContrastRatio } from '../../../app/utils/contrast'

// ---------- TESTS
describe('getContrastRatio - design token pairs', () => {
  it('text-primary (#E8E8F0) on background (#0A0A0F) meets AA (≥ 4.5)', () => {
    const ratio = getContrastRatio('#E8E8F0', '#0A0A0F')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('accent (#00D4FF) on background (#0A0A0F) meets AA (≥ 4.5)', () => {
    const ratio = getContrastRatio('#00D4FF', '#0A0A0F')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('text-primary (#E8E8F0) on surface (#12121A) meets AA (≥ 4.5)', () => {
    const ratio = getContrastRatio('#E8E8F0', '#12121A')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })
})

// ---------- HELPERS
// Mathematical invariant: ratio is always a positive number ≥ 1.0
const hexColour = fc
  .integer({ min: 0, max: 0xffffff })
  .map((n) => `#${n.toString(16).padStart(6, '0').toUpperCase()}`)

// ---------- TESTS
describe('getContrastRatio - property: ratio is always ≥ 1.0 (mathematical invariant)', () => {
  /**
   * **Validates: Requirements 3.7, 15.1**
   *
   * For any pair of valid hex colours the contrast ratio must be a finite
   * positive number ≥ 1.0.  A ratio of exactly 1.0 means identical colours;
   * the maximum possible value is 21.0 (black on white).
   */
  it('returns a finite number ≥ 1.0 for any hex colour pair', () => {
    fc.assert(
      fc.property(hexColour, hexColour, (fg, bg) => {
        const ratio = getContrastRatio(fg, bg)
        return Number.isFinite(ratio) && ratio >= 1.0
      }),
      { numRuns: 100 }
    )
  })
})
