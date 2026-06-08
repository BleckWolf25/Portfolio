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
 * Unit tests for the InfiniteMarquee component. Covers:
 * - Rendering: Checks if the correct number of skill pills are rendered (twice the array length).
 * - Prop Binding: Checks if `speed`, `direction`, and `pauseOnHover` map to CSS/classes correctly.
 * - Interactions: Checks if clicking and hovering badges correctly update tooltip state.
 */
// ---------- IMPORTS
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InfiniteMarquee from '../../../app/components/ui/InfiniteMarquee.vue'
import type { Skill } from '../../../data/skills'

// ---------- DATA
const mockSkills: Skill[] = [
  { name: 'TypeScript', icon: 'i-devicon-typescript', level: 'Proficient' },
  { name: 'Vue.js', icon: 'i-devicon-vuejs', level: 'Proficient' },
]

// ---------- HELPERS
const globalOptions = {
  mocks: {
    $t: (key: string) => key,
  },
  stubs: {
    UIcon: true,
    UTooltip: {
      template: `<div class="mock-tooltip"><slot /></div>`,
      props: ['open', 'text', 'delayDuration'],
    },
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

  it('updates tooltip state on hover and focus', async () => {
    const wrapper = mount(InfiniteMarquee, {
      props: {
        skills: mockSkills,
      },
      global: globalOptions,
    })

    const firstPill = wrapper.findAll('.skill-pill')[0]

    // Initially activeTooltipIndex is null
    expect((wrapper.vm as any).activeTooltipIndex).toBe(null)

    // Mouse enter triggers tooltip open
    await firstPill.trigger('mouseenter')
    expect((wrapper.vm as any).activeTooltipIndex).toBe('a-0')

    // Mouse leave triggers tooltip close
    await firstPill.trigger('mouseleave')
    expect((wrapper.vm as any).activeTooltipIndex).toBe(null)

    // Focus triggers tooltip open
    await firstPill.trigger('focus')
    expect((wrapper.vm as any).activeTooltipIndex).toBe('a-0')

    // Blur triggers tooltip close
    await firstPill.trigger('blur')
    expect((wrapper.vm as any).activeTooltipIndex).toBe(null)
  })

  it('updates tooltip state and calls focus on click', async () => {
    const wrapper = mount(InfiniteMarquee, {
      props: {
        skills: mockSkills,
      },
      global: globalOptions,
    })

    const firstPill = wrapper.findAll('.skill-pill')[0]

    // Setup a spy on the element's focus method
    const focusSpy = vi.spyOn(firstPill.element, 'focus')

    // Click triggers both updating state and focusing element
    await firstPill.trigger('click')

    expect(focusSpy).toHaveBeenCalled()
    expect((wrapper.vm as any).activeTooltipIndex).toBe('a-0')
  })
})
