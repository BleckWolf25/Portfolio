/**
 * @file ContactSection.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Property-based tests for the ContactSection component.
 *
 * @description
 * Property-based tests for the ContactSection component.
 * Uses `fast-check` to generate arbitrary ContactData objects and verifies
 * that every contact link in the rendered output has the required
 * accessibility attributes (`target`, `rel`, and `aria-label`).
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import ContactSection from '../../../app/components/sections/ContactSection.vue'

// ---------- HELPERS
const globalOptions = {
  mocks: {
    $t: (key: string) => key,
  },
  stubs: {
    UIcon: true,
  },
}

// ---------- TESTS
describe('ContactSection', () => {
  it('contact links have required accessibility attributes (Property 10) and interactive elements have accessible names (Property 11)', () => {
    fc.assert(
      fc.property(
        fc.record({
          email: fc.record({
            id: fc.constant('email'),
            label: fc.string({ minLength: 1 }),
            href: fc.webUrl(),
            icon: fc.string({ minLength: 1 }),
          }),
          github: fc.record({
            id: fc.constant('github'),
            label: fc.string({ minLength: 1 }),
            href: fc.webUrl(),
            icon: fc.string({ minLength: 1 }),
          }),
        }),
        (contact) => {
          const wrapper = mount(ContactSection, { props: { contact }, global: globalOptions })
          const links = wrapper.findAll('a')
          expect(links.length).toBe(2)

          links.forEach((link) => {
            expect(link.attributes('target')).toBe('_blank')
            expect(link.attributes('rel')).toContain('noopener')
            expect(link.attributes('rel')).toContain('noreferrer')
            expect(link.attributes('aria-label')).toBeTruthy()
          })
        }
      ),
      { numRuns: 100 }
    )
  })
})
