/**
 * @file skills.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Tests that every entry in the exported `skillCategories` array from
 * `data/skills.ts` satisfies the SkillCategory interface invariants.
 *
 * @since 24/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { skillCategories } from '../../../data/skills'

// ---------- HELPERS
const REQUIRED_CATEGORY_IDS = [
  'programming-languages',
  'automation-scripting',
  'frameworks-libraries',
  'design-styling',
  'databases-backend',
  'runtimes-environments',
  'dev-tools',
  'ides',
  'agentic-dev-environments',
  'game-dev',
  'os',
] as const

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function assertSkillInvariants(skill: Skill): void {
  expect(
    isNonEmptyString(skill.name),
    `skill.name must be a non-empty string (got: ${JSON.stringify(skill.name)})`
  ).toBe(true)
  if (skill.icon !== undefined) {
    expect(
      isNonEmptyString(skill.icon),
      `skill.icon must be a non-empty string when defined (got: ${JSON.stringify(skill.icon)})`
    ).toBe(true)
  }
  expect(
    ['Proficient', 'Familiar', 'Learning'].includes(skill.level),
    `skill.level must be one of Proficient, Familiar, or Learning (got: ${skill.level})`
  ).toBe(true)
}

function assertSkillCategoryInvariants(category: SkillCategory): void {
  expect(
    isNonEmptyString(category.id),
    `id must be a non-empty string (got: ${JSON.stringify(category.id)})`
  ).toBe(true)
  expect(
    isNonEmptyString(category.label),
    `label must be a non-empty string (got: ${JSON.stringify(category.label)})`
  ).toBe(true)
  expect(Array.isArray(category.skills), `skills must be an array`).toBe(true)
  expect(category.skills.length, `skills must be non-empty`).toBeGreaterThan(0)
  for (const skill of category.skills) {
    assertSkillInvariants(skill)
  }
}

// ---------- TESTS
describe('skillCategories array - example-based', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(skillCategories)).toBe(true)
    expect(skillCategories.length).toBeGreaterThan(0)
  })

  it('contains exactly eleven categories', () => {
    expect(skillCategories.length).toBe(11)
  })

  it('contains all eleven required category ids', () => {
    const ids = skillCategories.map((c) => c.id)
    for (const requiredId of REQUIRED_CATEGORY_IDS) {
      expect(ids, `missing required category id: ${requiredId}`).toContain(requiredId)
    }
  })

  it('all category ids are unique', () => {
    const ids = skillCategories.map((c) => c.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('every category satisfies the SkillCategory interface invariants', () => {
    for (const category of skillCategories) {
      assertSkillCategoryInvariants(category)
    }
  })

  it('programming-languages category has the expected skills', () => {
    const category = skillCategories.find((c) => c.id === 'programming-languages')
    expect(category).toBeDefined()
    const names = category!.skills.map((s) => s.name)
    expect(names).toContain('TypeScript')
    expect(names).toContain('JavaScript')
    expect(names).toContain('Python')
    expect(names).toContain('C++')
    expect(names).toContain('Lua')
    expect(names).toContain('C#')
    expect(names).toContain('Rust')
  })

  it('automation-scripting category has the expected skills', () => {
    const category = skillCategories.find((c) => c.id === 'automation-scripting')
    expect(category).toBeDefined()
    const names = category!.skills.map((s) => s.name)
    expect(names).toContain('Bash Script')
    expect(names).toContain('Batch Script')
  })

  it('frameworks-libraries category has the expected skills', () => {
    const category = skillCategories.find((c) => c.id === 'frameworks-libraries')
    expect(category).toBeDefined()
    const names = category!.skills.map((s) => s.name)
    expect(names).toContain('Vue.js')
    expect(names).toContain('Nuxt.js')
    expect(names).toContain('React')
  })

  it('design-styling category has the expected skills', () => {
    const category = skillCategories.find((c) => c.id === 'design-styling')
    expect(category).toBeDefined()
    const names = category!.skills.map((s) => s.name)
    expect(names).toContain('CSS3')
    expect(names).toContain('HTML5')
    expect(names).toContain('Tailwind CSS')
  })

  it('runtimes-environments category has the expected skills', () => {
    const category = skillCategories.find((c) => c.id === 'runtimes-environments')
    expect(category).toBeDefined()
    const names = category!.skills.map((s) => s.name)
    expect(names).toContain('Docker')
    expect(names).toContain('Node.js')
    expect(names).toContain('pnpm')
  })

  it('dev-tools category has the expected skills', () => {
    const category = skillCategories.find((c) => c.id === 'dev-tools')
    expect(category).toBeDefined()
    const names = category!.skills.map((s) => s.name)
    expect(names).toContain('Git')
    expect(names).toContain('Vite')
    expect(names).toContain('Vitest')
  })

  it('agentic-dev-environments category has the expected skills', () => {
    const category = skillCategories.find((c) => c.id === 'agentic-dev-environments')
    expect(category).toBeDefined()
    const names = category!.skills.map((s) => s.name)
    expect(names).toContain('Antigravity IDE')
    expect(names).toContain('Cursor')
  })

  it('game-dev category has the expected skills', () => {
    const category = skillCategories.find((c) => c.id === 'game-dev')
    expect(category).toBeDefined()
    const names = category!.skills.map((s) => s.name)
    expect(names).toContain('Godot')
    expect(names).toContain('Unity')
    expect(names).toContain('Unreal Engine')
  })

  it('all skills with an icon have a non-empty icon string', () => {
    for (const category of skillCategories) {
      for (const skill of category.skills) {
        if (skill.icon !== undefined) {
          expect(typeof skill.icon).toBe('string')
          expect(skill.icon.trim().length).toBeGreaterThan(0)
        }
      }
    }
  })
})

// ---------- HELPERS
const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)

const skillArb: fc.Arbitrary<Skill> = fc.record(
  {
    name: nonEmptyString,
    icon: nonEmptyString,
    level: fc.constantFrom('Proficient', 'Familiar', 'Learning' as const),
  },
  { requiredKeys: ['name', 'level'] }
)

const skillCategoryArb: fc.Arbitrary<SkillCategory> = fc.record({
  id: nonEmptyString,
  label: nonEmptyString,
  skills: fc.array(skillArb, { minLength: 1, maxLength: 20 }),
})

// ---------- TESTS
describe('SkillCategory interface - property-based', () => {
  it('id and label are always non-empty strings', () => {
    fc.assert(
      fc.property(skillCategoryArb, (category) => {
        return isNonEmptyString(category.id) && isNonEmptyString(category.label)
      }),
      { numRuns: 100 }
    )
  })

  it('skills is always a non-empty array', () => {
    fc.assert(
      fc.property(skillCategoryArb, (category) => {
        return Array.isArray(category.skills) && category.skills.length > 0
      }),
      { numRuns: 100 }
    )
  })

  it('every skill in a category has a non-empty name', () => {
    fc.assert(
      fc.property(skillCategoryArb, (category) => {
        return category.skills.every((skill) => isNonEmptyString(skill.name))
      }),
      { numRuns: 100 }
    )
  })

  it('skill icon, when present, is always a non-empty string', () => {
    fc.assert(
      fc.property(skillCategoryArb, (category) => {
        return category.skills.every((skill) => {
          if (skill.icon !== undefined) {
            return isNonEmptyString(skill.icon)
          }
          return true
        })
      }),
      { numRuns: 100 }
    )
  })
})
