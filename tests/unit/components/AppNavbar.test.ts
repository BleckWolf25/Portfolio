/**
 * @file AppNavbar.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Unit tests for the AppNavbar component.
 *
 * @description
 * Unit tests for the AppNavbar component. Covers:
 * - Rendering all 9 navigation links in the desktop nav
 * - Language toggle button switching between EN and PT
 * - Mobile menu visibility toggling via the hamburger button
 * i18n and scroll-spy are mocked to isolate the component under test.
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNavbar from '../../../app/components/AppNavbar.vue'

// ---------- MOCKS
const setLocaleMock = vi.fn()
const activeSectionRef = { value: 0 }

vi.mock('#imports', () => ({
  useI18n: () => ({
    locale: { value: 'en' },
    setLocale: setLocaleMock,
    t: (key: string) => key,
  }),
}))

vi.stubGlobal('useNuxtApp', () => ({
  $i18n: {
    locale: { value: 'en' },
    setLocale: setLocaleMock,
    t: (key: string) => key,
  },
}))

vi.stubGlobal('useColorMode', () => ({
  value: 'dark',
  preference: 'dark',
}))

vi.stubGlobal('useAppConfig', () => ({
  ui: { primary: 'emerald' },
}))

vi.stubGlobal('updateAppConfig', vi.fn())

vi.mock('../../app/composables/useScrollSpy', () => ({
  useScrollSpy: () => ({
    activeSection: activeSectionRef,
  }),
}))

// ---------- HELPERS
const globalOptions = {
  mocks: {
    $t: (key: string) => key,
  },
  stubs: {
    UIcon: true,
    UDropdown: true,
    UDropdownMenu: true,
    UNavigationMenu: true,
    ClientOnly: true,
  },
}

// ---------- TESTS
describe('AppNavbar', () => {
  it('renders all 9 anchor links in desktop nav', () => {
    const wrapper = mount(AppNavbar, { global: globalOptions })
    const desktopNav = wrapper.find('nav[aria-label="nav.mainNavigation"]')
    const links = desktopNav.findAll('a')
    expect(links.length).toBe(9)
  })

  it('toggles language when language button is clicked', async () => {
    const wrapper = mount(AppNavbar, { global: globalOptions })
    const langBtn = wrapper.find('button[aria-label="nav.toggleLanguage"]')
    await langBtn.trigger('click')
    await vi.waitFor(() => {
      expect(setLocaleMock).toHaveBeenCalledWith('pt')
    })
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    const wrapper = mount(AppNavbar, { global: globalOptions })
    const menuBtn = wrapper.find('button[aria-label="nav.toggleMenu"]')
    const mobileMenu = wrapper.find('#mobile-menu')

    await menuBtn.trigger('click')
    expect((mobileMenu.element as HTMLElement).style.display).not.toBe('none')
  })
})
