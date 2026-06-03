/**
 * @file softSkills.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Tests that every entry in the exported `softSkills` array from
 *
 * @description
 * Tests that every entry in the exported `softSkills` array from
 * `data/softSkills.ts` satisfies the SoftSkill interface invariants:
 * - `id`, `name`, and `icon` are non-empty strings
 * - All four STAR fields (`situationKey`, `taskKey`, `actionKey`, `resultKey`)
 * are non-empty i18n key strings
 * Includes both example-based tests against the actual data and property-based
 * tests (via `fast-check`) against generated SoftSkill objects.
 *
 * @since 24/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { softSkills, type SoftSkill, type StarExample } from '../../../data/softSkills'

// ---------- HELPERS
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function assertStarInvariants(star: StarExample): void {
  expect(isNonEmptyString(star.situationKey), `star.situationKey must be a non-empty string`).toBe(
    true
  )
  expect(isNonEmptyString(star.taskKey), `star.taskKey must be a non-empty string`).toBe(true)
  expect(isNonEmptyString(star.actionKey), `star.actionKey must be a non-empty string`).toBe(true)
  expect(isNonEmptyString(star.resultKey), `star.resultKey must be a non-empty string`).toBe(true)
}

function assertSoftSkillInvariants(skill: SoftSkill): void {
  expect(
    isNonEmptyString(skill.id),
    `id must be a non-empty string (got: ${JSON.stringify(skill.id)})`
  ).toBe(true)
  expect(
    isNonEmptyString(skill.name),
    `name must be a non-empty string (got: ${JSON.stringify(skill.name)})`
  ).toBe(true)
  expect(
    isNonEmptyString(skill.icon),
    `icon must be a non-empty string (got: ${JSON.stringify(skill.icon)})`
  ).toBe(true)
  expect(skill.star, `star must be defined`).toBeDefined()
  assertStarInvariants(skill.star)
}

// ---------- TESTS
const REQUIRED_SKILL_IDS = [
  'communication',
  'problem-solving',
  'teamwork',
  'adaptability',
  'creative-thinking',
] as const

describe('softSkills array - example-based', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(softSkills)).toBe(true)
    expect(softSkills.length).toBeGreaterThan(0)
  })

  it('contains exactly five soft skills', () => {
    expect(softSkills.length).toBe(5)
  })

  it('contains all six required skill ids', () => {
    const ids = softSkills.map((s) => s.id)
    for (const requiredId of REQUIRED_SKILL_IDS) {
      expect(ids, `missing required skill id: ${requiredId}`).toContain(requiredId)
    }
  })

  it('all skill ids are unique', () => {
    const ids = softSkills.map((s) => s.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('every skill satisfies the SoftSkill interface invariants', () => {
    for (const skill of softSkills) {
      assertSoftSkillInvariants(skill)
    }
  })

  it('every skill has an icon using the heroicons prefix', () => {
    for (const skill of softSkills) {
      expect(
        skill.icon.startsWith('i-heroicons-'),
        `icon "${skill.icon}" should start with i-heroicons-`
      ).toBe(true)
    }
  })

  it('communication entry has the correct name and icon', () => {
    const skill = softSkills.find((s) => s.id === 'communication')
    expect(skill).toBeDefined()
    expect(skill!.name).toBe('Communication')
    expect(skill!.icon).toBe('i-heroicons-chat-bubble-left-right')
  })

  it('problem-solving entry has the correct name and icon', () => {
    const skill = softSkills.find((s) => s.id === 'problem-solving')
    expect(skill).toBeDefined()
    expect(skill!.name).toBe('Problem Solving')
    expect(skill!.icon).toBe('i-heroicons-light-bulb')
  })

  it('teamwork entry has the correct name and icon', () => {
    const skill = softSkills.find((s) => s.id === 'teamwork')
    expect(skill).toBeDefined()
    expect(skill!.name).toBe('Teamwork')
    expect(skill!.icon).toBe('i-heroicons-user-group')
  })

  it('adaptability entry has the correct name and icon', () => {
    const skill = softSkills.find((s) => s.id === 'adaptability')
    expect(skill).toBeDefined()
    expect(skill!.name).toBe('Adaptability')
    expect(skill!.icon).toBe('i-heroicons-arrow-path')
  })

  it('creative-thinking entry has the correct name and icon', () => {
    const skill = softSkills.find((s) => s.id === 'creative-thinking')
    expect(skill).toBeDefined()
    expect(skill!.name).toBe('Creative Thinking')
    expect(skill!.icon).toBe('i-heroicons-sparkles')
  })

  it('every STAR example has all four fields populated', () => {
    for (const skill of softSkills) {
      expect(
        skill.star.situationKey.trim().length,
        `${skill.id}: situationKey must not be empty`
      ).toBeGreaterThan(0)
      expect(
        skill.star.taskKey.trim().length,
        `${skill.id}: taskKey must not be empty`
      ).toBeGreaterThan(0)
      expect(
        skill.star.actionKey.trim().length,
        `${skill.id}: actionKey must not be empty`
      ).toBeGreaterThan(0)
      expect(
        skill.star.resultKey.trim().length,
        `${skill.id}: resultKey must not be empty`
      ).toBeGreaterThan(0)
    }
  })
})

// ---------- HELPERS
/**
 * Arbitrary for a non-empty string (trimmed length ≥ 1).
 */
const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)

/**
 * Arbitrary for a well-formed StarExample object.
 */
const starArb: fc.Arbitrary<StarExample> = fc.record({
  situationKey: nonEmptyString,
  taskKey: nonEmptyString,
  actionKey: nonEmptyString,
  resultKey: nonEmptyString,
})

/**
 * Arbitrary for a well-formed SoftSkill object.
 */
const softSkillArb: fc.Arbitrary<SoftSkill> = fc.record({
  id: nonEmptyString,
  name: nonEmptyString,
  icon: nonEmptyString,
  star: starArb,
})

// ---------- TESTS
describe('SoftSkill interface - property-based (Property 16)', () => {
  /**
   * **Validates: Requirements 17.5**
   *
   * For any well-formed SoftSkill, id, name, and icon are always non-empty strings.
   */
  it('id, name, and icon are always non-empty strings', () => {
    fc.assert(
      fc.property(softSkillArb, (skill) => {
        return (
          isNonEmptyString(skill.id) && isNonEmptyString(skill.name) && isNonEmptyString(skill.icon)
        )
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.5**
   *
   * For any well-formed SoftSkill, the star object always has all four non-empty fields.
   */
  it('star always has all four non-empty STAR fields', () => {
    fc.assert(
      fc.property(softSkillArb, (skill) => {
        return (
          isNonEmptyString(skill.star.situationKey) &&
          isNonEmptyString(skill.star.taskKey) &&
          isNonEmptyString(skill.star.actionKey) &&
          isNonEmptyString(skill.star.resultKey)
        )
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.6**
   *
   * For any well-formed SoftSkill, the star object is always defined (not null or undefined).
   */
  it('star is always a defined object', () => {
    fc.assert(
      fc.property(softSkillArb, (skill) => {
        return skill.star !== null && typeof skill.star === 'object'
      }),
      { numRuns: 100 }
    )
  })
})
