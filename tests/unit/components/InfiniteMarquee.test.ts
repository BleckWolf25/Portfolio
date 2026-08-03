/**
 * @file InfiniteMarquee.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Unit tests for the InfiniteMarquee component.
 *
 * @description
 * Unit tests for the InfiniteMarquee component.
 * Verifies that the component correctly renders the double skills list,
 * binds speed and direction props to CSS custom properties, and conditionally adds the pause-on-hover class based on the prop value.
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfiniteMarquee from '../../../app/components/ui/InfiniteMarquee.vue'
import type { Skill } from '../../../data/skills'

// ---------- DATA
const mockSkills: Skill[] = [
  { name: 'TypeScript', icon: 'i-devicon-typescript' },
  { name: 'Vue.js', icon: 'i-devicon-vuejs' },
]

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
describe('InfiniteMarquee', () => {
  it('renders correctly the double skills list', () => {
    const wrapper = mount(InfiniteMarquee, {
      props: {
        skills: mockSkills,
      },
      global: globalOptions,
    })

    const skillPills = wrapper.findAll('.skill-pill')
    // Should render twice the mock skills (one for Set 1 and one for Set 2)
    expect(skillPills.length).toBe(mockSkills.length * 2)
  })

  it('binds speed and direction props to CSS custom properties', () => {
    const speed = 15
    const wrapper = mount(InfiniteMarquee, {
      props: {
        skills: mockSkills,
        speed: speed,
        direction: 'reverse',
      },
      global: globalOptions,
    })

    const marqueeWrapper = wrapper.find('.marquee-wrapper')
    const el = marqueeWrapper.element as HTMLElement

    // Verify CSS variables applied to the wrapper
    expect(el.style.getPropertyValue('--marquee-duration')).toBe(`${speed}s`)
    expect(el.style.getPropertyValue('--marquee-dir')).toBe('reverse')
  })

  it('adds pause-on-hover class when prop is true', () => {
    const wrapperWithPause = mount(InfiniteMarquee, {
      props: {
        skills: mockSkills,
        pauseOnHover: true,
      },
      global: globalOptions,
    })
    expect(wrapperWithPause.find('.marquee-track').classes()).toContain('pause-on-hover')

    const wrapperWithoutPause = mount(InfiniteMarquee, {
      props: {
        skills: mockSkills,
        pauseOnHover: false,
      },
      global: globalOptions,
    })
    expect(wrapperWithoutPause.find('.marquee-track').classes()).not.toContain('pause-on-hover')
  })
})
