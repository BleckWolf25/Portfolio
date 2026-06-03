/**
 * @file SoftSkillCard.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Property-based tests for the SoftSkillCard UI component.
 *
 * @description
 * Property-based tests for the SoftSkillCard UI component. Covers:
 * - Property 1: No `<img>` elements or inline background-image styles are rendered
 * - Property 9: All four STAR fields (situation, task, action, result) are rendered
 * All tests use `fast-check` to generate arbitrary SoftSkill objects.
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import SoftSkillCard from '../../../app/components/ui/SoftSkillCard.vue'

// ---------- HELPERS
const globalOptions = {
  mocks: {
    $t: (key: string) => key,
  },
  stubs: {
    UIcon: true,
  },
}

const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => /^\S+$/.test(s))

// ---------- TESTS
describe('SoftSkillCard', () => {
  it('renders no images (Property 1)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: nonEmptyString,
          name: nonEmptyString,
          icon: nonEmptyString,
          star: fc.record({
            situationKey: nonEmptyString,
            taskKey: nonEmptyString,
            actionKey: nonEmptyString,
            resultKey: nonEmptyString,
          }),
        }),
        (skill) => {
          const wrapper = mount(SoftSkillCard, { props: { skill }, global: globalOptions })
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

  it('renders all four STAR components (Property 9)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: nonEmptyString,
          name: nonEmptyString,
          icon: nonEmptyString,
          star: fc.record({
            situationKey: nonEmptyString,
            taskKey: nonEmptyString,
            actionKey: nonEmptyString,
            resultKey: nonEmptyString,
          }),
        }),
        (skill) => {
          const wrapper = mount(SoftSkillCard, { props: { skill }, global: globalOptions })
          expect(wrapper.text()).toContain(skill.star.situationKey)
          expect(wrapper.text()).toContain(skill.star.taskKey)
          expect(wrapper.text()).toContain(skill.star.actionKey)
          expect(wrapper.text()).toContain(skill.star.resultKey)
        }
      ),
      { numRuns: 100 }
    )
  })
})
