/**
 * @file TimelineEntry.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Property-based tests for the TimelineEntry UI component.
 *
 * @description
 * Property-based tests for the TimelineEntry UI component. Covers:
 * - Property 1: No `<img>` elements or inline background-image styles are rendered
 * - Property 8: All required fields (role, organisation, description) are visible
 * All tests use `fast-check` to generate arbitrary TimelineItem objects.
 * `useI18n` is mocked so the component can be tested without a full Nuxt context.
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import TimelineEntry from '../../../app/components/ui/TimelineEntry.vue'

// ---------- MOCKS
vi.mock('#imports', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}))

// ---------- HELPERS
const globalOptions = {
  mocks: {
    $t: (key: string) => key,
  },
}

const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => /^\S+$/.test(s))

// ---------- TESTS
describe('TimelineEntry', () => {
  it('renders no images (Property 1)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: nonEmptyString,
          role: nonEmptyString,
          organisation: nonEmptyString,
          startDate: nonEmptyString,
          endDate: nonEmptyString,
          description: nonEmptyString,
        }),
        (entry) => {
          const wrapper = mount(TimelineEntry, { props: { entry }, global: globalOptions })
          expect(wrapper.findAll('img').length).toBe(0)

          const elementsWithBgImage = wrapper.findAll('*').filter((w) => {
            const el = w.element as HTMLElement
            return !!el.style?.backgroundImage
          })
          expect(elementsWithBgImage.length).toBe(0)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('renders all required fields (Property 8)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: nonEmptyString,
          role: nonEmptyString,
          organisation: nonEmptyString,
          startDate: nonEmptyString,
          endDate: fc.constant('present'),
          description: nonEmptyString,
        }),
        (entry) => {
          const wrapper = mount(TimelineEntry, { props: { entry }, global: globalOptions })
          expect(wrapper.text()).toContain(entry.role)
          expect(wrapper.text()).toContain(entry.organisation)
          expect(wrapper.text()).toContain(entry.description)
        }
      ),
      { numRuns: 100 }
    )
  })
})
