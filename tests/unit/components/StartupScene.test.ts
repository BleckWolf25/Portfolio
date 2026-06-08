/**
 * @file StartupScene.test.ts
 *
 * @summary Unit tests for the StartupScene UI component.
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StartupScene from '../../../app/components/ui/StartupScene.vue'
import { nextTick } from 'vue'

// Mock animejs
vi.mock('animejs', () => {
  return {
    createTimeline: vi.fn(() => ({
      add: vi.fn(),
      then: (cb: () => void) => {
        cb()
        return { then: (innerCb: () => void) => innerCb() }
      },
    })),
    animate: vi.fn(() => ({
      then: (cb: () => void) => {
        cb()
        return { then: (innerCb: () => void) => innerCb() }
      },
    })),
  }
})

describe('StartupScene', () => {
  it('renders correctly initially', () => {
    const wrapper = mount(StartupScene)
    expect(wrapper.find('.startup-overlay').exists()).toBe(true)
    expect(wrapper.find('.char-j').exists()).toBe(true)
    expect(wrapper.find('.char-c').exists()).toBe(true)
    expect(wrapper.find('.char-dot').exists()).toBe(true)
  })

  it('completes animation, hides overlay and emits finished event', async () => {
    const wrapper = mount(StartupScene)

    // Because we mocked animejs to execute synchronously, the onMounted hook
    // will immediately trigger the finished logic.
    await nextTick()

    // Since the component sets isVisible to false, .startup-overlay shouldn't exist
    // Or we should check if the wrapper emitted the finished event.
    expect(wrapper.emitted('finished')).toBeTruthy()

    // Check if isVisible condition removed the overlay from the DOM
    expect(wrapper.find('.startup-overlay').exists()).toBe(false)
  })
})
