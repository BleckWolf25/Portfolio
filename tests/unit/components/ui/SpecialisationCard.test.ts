/**
 * @file SpecialisationCard.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Property-based tests for the SpecialisationCard UI component.
 *
 * @description
 * Property-based tests for the SpecialisationCard UI component. Covers:
 * - Property 1: No `<img>` elements or inline background-image styles are rendered
 * - Property 8: All required fields (title, description) are visible
 * All tests use `fast-check` to generate arbitrary properties.
 *
 * @since 02/06/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import SpecialisationCard from '../../../../app/components/ui/SpecialisationCard.vue'

// ---------- HELPERS
const globalOptions = {
  stubs: {
    UIcon: true,
  },
}

const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => /^\S+$/.test(s))

// ---------- TESTS
describe('SpecialisationCard', () => {
  it('renders no images (Property 1)', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: nonEmptyString,
          description: nonEmptyString,
          icon: nonEmptyString,
        }),
        (props) => {
          const wrapper = mount(SpecialisationCard, { props, global: globalOptions })
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

  it('renders all required fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: nonEmptyString,
          description: nonEmptyString,
          icon: nonEmptyString,
        }),
        (props) => {
          const wrapper = mount(SpecialisationCard, { props, global: globalOptions })
          expect(wrapper.text()).toContain(props.title)
          expect(wrapper.text()).toContain(props.description)
        }
      ),
      { numRuns: 100 }
    )
  })
})
