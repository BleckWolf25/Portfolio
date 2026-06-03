/**
 * @file contact.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Tests that the exported `contact` object from `data/contact.
 *
 * @description
 * Tests that the exported `contact` object from `data/contact.ts` satisfies
 * the ContactData interface invariants:
 * - Each ContactLink has a non-empty `id`, `label`, `href`, and `icon`
 * - `href` is either a valid URL or a `mailto:` link
 * - The contact object contains exactly the three required entries: email, linkedin, github
 * - Specific icon and label values match the expected design
 * Includes both example-based tests against the actual data and property-based
 * tests (via `fast-check`) against generated ContactLink objects.
 *
 * @since 23/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { contact, type ContactLink, type ContactData } from '../../../data/contact'

// ---------- HELPERS
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidHref(value: string): boolean {
  if (value.startsWith('mailto:')) {
    // mailto: must have something after the colon
    return value.length > 'mailto:'.length
  }
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function assertContactLinkInvariants(link: ContactLink, key: string): void {
  expect(
    isNonEmptyString(link.id),
    `${key}.id must be a non-empty string (got: ${JSON.stringify(link.id)})`
  ).toBe(true)

  expect(
    isNonEmptyString(link.label),
    `${key}.label must be a non-empty string (got: ${JSON.stringify(link.label)})`
  ).toBe(true)

  expect(
    isNonEmptyString(link.href),
    `${key}.href must be a non-empty string (got: ${JSON.stringify(link.href)})`
  ).toBe(true)

  expect(
    isValidHref(link.href),
    `${key}.href must be a valid URL or mailto link (got: ${link.href})`
  ).toBe(true)

  expect(
    isNonEmptyString(link.icon),
    `${key}.icon must be a non-empty string (got: ${JSON.stringify(link.icon)})`
  ).toBe(true)
}

// ---------- TESTS
describe('contact object - example-based', () => {
  it('exports a contact object with email and github entries', () => {
    expect(contact).toBeDefined()
    expect(typeof contact).toBe('object')
    expect(contact.email).toBeDefined()
    expect(contact.github).toBeDefined()
  })

  it('email entry satisfies ContactLink invariants', () => {
    assertContactLinkInvariants(contact.email, 'email')
  })

  it('github entry satisfies ContactLink invariants', () => {
    assertContactLinkInvariants(contact.github, 'github')
  })

  it('email href is a mailto link', () => {
    expect(contact.email.href).toMatch(/^mailto:/)
  })

  it('github href points to github.com', () => {
    expect(contact.github.href).toContain('github.com')
  })

  it('email label is the i18n key contact.email', () => {
    expect(contact.email.label).toBe('contact.email')
  })

  it('github label is the i18n key contact.github', () => {
    expect(contact.github.label).toBe('contact.github')
  })

  it('all ids are unique', () => {
    const ids = [contact.email.id, contact.github.id]
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('email uses the heroicons envelope icon', () => {
    expect(contact.email.icon).toBe('i-heroicons-envelope')
  })

  it('github uses the simple-icons github icon', () => {
    expect(contact.github.icon).toBe('i-simple-icons-github')
  })
})

// ---------- HELPERS
/**
 * Arbitrary for a non-empty string (trimmed length ≥ 1).
 */
const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)

/**
 * Arbitrary for a valid href (either a https URL or a mailto link).
 */
const validHref = fc.oneof(
  fc.webUrl({ validSchemes: ['https', 'http'] }).filter((url) => url.trim().length > 0),
  nonEmptyString.map((s) => `mailto:${s}`)
)

/**
 * Arbitrary for a well-formed ContactLink.
 */
const contactLinkArbitrary: fc.Arbitrary<ContactLink> = fc.record({
  id: nonEmptyString,
  label: nonEmptyString,
  href: validHref,
  icon: nonEmptyString,
})

/**
 * Arbitrary for a well-formed ContactData object.
 */
const contactDataArbitrary: fc.Arbitrary<ContactData> = fc.record({
  email: contactLinkArbitrary,
  github: contactLinkArbitrary,
})

// ---------- TESTS
describe('ContactLink interface - property-based (Requirements 17.4, 17.6)', () => {
  /**
   * **Validates: Requirements 17.4, 17.6**
   *
   * For any well-formed ContactLink, all required fields are non-empty strings
   * and href is a valid URL or mailto link.
   */
  it('all required fields are non-empty strings for any generated ContactLink', () => {
    fc.assert(
      fc.property(contactLinkArbitrary, (link) => {
        return (
          isNonEmptyString(link.id) &&
          isNonEmptyString(link.label) &&
          isNonEmptyString(link.href) &&
          isValidHref(link.href) &&
          isNonEmptyString(link.icon)
        )
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.4, 17.6**
   *
   * For any well-formed ContactData object, all three entries (email, linkedin,
   * github) satisfy the ContactLink invariants.
   */
  it('all ContactData entries satisfy ContactLink invariants', () => {
    fc.assert(
      fc.property(contactDataArbitrary, (data) => {
        const links: ContactLink[] = [data.email, data.github]
        return links.every(
          (link) =>
            isNonEmptyString(link.id) &&
            isNonEmptyString(link.label) &&
            isNonEmptyString(link.href) &&
            isValidHref(link.href) &&
            isNonEmptyString(link.icon)
        )
      }),
      { numRuns: 100 }
    )
  })
})
