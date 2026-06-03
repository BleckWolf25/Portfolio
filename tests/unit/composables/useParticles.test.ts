/**
 * @file useParticles.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Property-based tests for the `createParticle` factory function exported from
 *
 * @description
 * Property-based tests for the `createParticle` factory function exported from
 * `useParticles.ts`. Verifies that particle opacity is strictly within the
 * design constraint (0, 0.3] for arbitrary canvas dimensions.
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it } from 'vitest'
import * as fc from 'fast-check'
import { createParticle } from '../../../app/composables/useParticles'

// ---------- TESTS
describe('createParticle', () => {
  it('returns a particle with opacity > 0 and <= 0.3', () => {
    fc.assert(
      fc.property(fc.nat({ max: 4000 }), fc.nat({ max: 4000 }), (width, height) => {
        const particle = createParticle(width, height)
        return particle.opacity > 0 && particle.opacity <= 0.3
      }),
      { numRuns: 100 }
    )
  })
})
