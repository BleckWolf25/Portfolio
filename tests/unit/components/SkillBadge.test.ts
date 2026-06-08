/**
 * @file SkillBadge.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Unit tests for the SkillBadge UI component.
 */

// ---------- IMPORTS
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SkillBadge from '../../../app/components/ui/SkillBadge.vue'
import type { Skill } from '../../../data/skills'

// ---------- HELPERS
const globalOptions = {
  mocks: {
    $t: (key: string) => key,
  },
  stubs: {
    UIcon: {
      template: '<i :class="name"></i>',
      props: ['name'],
    },
    // We stub UTooltip component to easily assert on its props without resolving to a real Nuxt UI component
    UTooltip: {
      template: '<div class="utooltip"><slot /></div>',
      props: ['text', 'open'],
      name: 'UTooltip'
    }
  },
}

// ---------- TESTS
describe('SkillBadge', () => {
  it('renders skill name correctly', () => {
    const skill: Skill = { name: 'Vue', level: 'Proficient' }
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    expect(wrapper.text()).toContain('Vue')
  })

  it('renders skill icon when provided', () => {
    const skill: Skill = { name: 'Vue', icon: 'i-devicon-vuejs', level: 'Proficient' }
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    const icon = wrapper.find('i')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('i-devicon-vuejs')
  })

  it('does not render skill icon when not provided', () => {
    const skill: Skill = { name: 'Vue', level: 'Proficient' }
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    const icon = wrapper.find('i')
    expect(icon.exists()).toBe(false)
  })

  it('wraps with UTooltip and passes correct text when level is provided', () => {
    const skill: Skill = { name: 'Vue', level: 'Proficient' }
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    const tooltip = wrapper.findComponent({ name: 'UTooltip' })
    expect(tooltip.exists()).toBe(true)
    expect(tooltip.props('text')).toBe('skills.levels.proficient')
  })

  it('does not wrap with UTooltip when level is omitted', () => {
    const skill = { name: 'Vue' } as Skill
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    const tooltip = wrapper.findComponent({ name: 'UTooltip' })
    expect(tooltip.exists()).toBe(false)
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

  it('toggles tooltip on mouse enter and leave', async () => {
    const skill: Skill = { name: 'Vue', level: 'Proficient' }
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    const button = wrapper.find('button')
    const tooltip = wrapper.findComponent({ name: 'UTooltip' })

    // Initially closed
    expect(tooltip.props('open')).toBe(false)

    // Mouse enter opens tooltip
    await button.trigger('mouseenter')
    expect(tooltip.props('open')).toBe(true)

    // Mouse leave closes tooltip
    await button.trigger('mouseleave')
    expect(tooltip.props('open')).toBe(false)
  })

  it('toggles tooltip on focus and blur', async () => {
    const skill: Skill = { name: 'Vue', level: 'Proficient' }
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    const button = wrapper.find('button')
    const tooltip = wrapper.findComponent({ name: 'UTooltip' })

    // Initially closed
    expect(tooltip.props('open')).toBe(false)

    // Focus opens tooltip
    await button.trigger('focus')
    expect(tooltip.props('open')).toBe(true)

    // Blur closes tooltip
    await button.trigger('blur')
    expect(tooltip.props('open')).toBe(false)
  })

  it('opens tooltip and calls focus on click when level is provided', async () => {
    const skill: Skill = { name: 'Vue', level: 'Proficient' }
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    const button = wrapper.find('button')
    const buttonEl = button.element as HTMLElement
    const focusSpy = vi.spyOn(buttonEl, 'focus')
    const tooltip = wrapper.findComponent({ name: 'UTooltip' })

    expect(tooltip.props('open')).toBe(false)

    await button.trigger('click')

    expect(tooltip.props('open')).toBe(true)
    expect(focusSpy).toHaveBeenCalled()
  })

  it('calls focus on click when level is not provided', async () => {
    const skill = { name: 'Vue' } as Skill
    const wrapper = mount(SkillBadge, {
      props: { skill },
      global: globalOptions
    })

    const button = wrapper.find('button')
    const buttonEl = button.element as HTMLElement
    const focusSpy = vi.spyOn(buttonEl, 'focus')

    await button.trigger('click')

    expect(focusSpy).toHaveBeenCalled()
  })
})
