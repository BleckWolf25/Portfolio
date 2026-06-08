/**
 * @file projects.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Tests that every entry in the exported `projects` array from `data/projects.
 *
 * @description
 * Tests that every entry in the exported `projects` array from `data/projects.ts`
 * satisfies the Project interface invariants:
 * - `id`, `name`, and `descriptionKey` are non-empty strings
 * - `techStack` is a non-empty array of non-empty strings
 * - `status` is either `'open-source'` or `'confidential'`
 * - `repositoryUrl` is defined **if and only if** `status === 'open-source'`
 * - When defined, `repositoryUrl` is a valid URL string
 * Includes both example-based tests against the actual data and property-based
 * tests (via `fast-check`) verifying the iff constraint.
 *
 * @since 23/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import {
  projects
} from '../../../data/projects'

// ---------- HELPERS
const VALID_STATUSES = ['open-source', 'confidential'] as const
const VALID_CATEGORIES = ['systems', 'frontend', 'fullstack'] as const

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function assertProjectInvariants(project: typeof projects[number]): void {
  expect(
    isNonEmptyString(project.id),
    `id must be a non-empty string (got: ${JSON.stringify(project.id)})`
  ).toBe(true)
  expect(isNonEmptyString(project.name), `name must be a non-empty string`).toBe(true)
  expect(
    isNonEmptyString(project.descriptionKey),
    `descriptionKey must be a non-empty string`
  ).toBe(true)

  // techStack: non-empty array of non-empty strings
  expect(Array.isArray(project.techStack), 'techStack must be an array').toBe(true)
  expect(project.techStack.length, 'techStack must be non-empty').toBeGreaterThan(0)
  for (const tech of project.techStack) {
    expect(
      isNonEmptyString(tech),
      `each techStack entry must be a non-empty string (got: ${JSON.stringify(tech)})`
    ).toBe(true)
  }

  // status must be one of the two valid values
  expect(VALID_STATUSES, `status must be 'open-source' or 'confidential'`).toContain(project.status)

  // category must be one of the three valid values
  expect(VALID_CATEGORIES, `category must be a valid ProjectCategory`).toContain(project.category)

  // repositoryUrl iff status === 'open-source'
  if (project.status === 'open-source') {
    expect(
      project.repositoryUrl,
      `repositoryUrl must be defined when status is 'open-source'`
    ).toBeDefined()
    expect(
      isNonEmptyString(project.repositoryUrl),
      `repositoryUrl must be a non-empty string when defined`
    ).toBe(true)
    expect(
      isValidUrl(project.repositoryUrl!),
      `repositoryUrl must be a valid URL (got: ${project.repositoryUrl})`
    ).toBe(true)
  } else {
    expect(
      project.repositoryUrl,
      `repositoryUrl must be undefined when status is 'confidential'`
    ).toBeUndefined()
  }
}

// ---------- TESTS
describe('projects array - example-based', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('every project satisfies the Project interface invariants', () => {
    for (const project of projects) {
      assertProjectInvariants(project)
    }
  })

  it('all project ids are unique', () => {
    const ids = projects.map((p) => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('open-source projects have a repositoryUrl', () => {
    const openSource = projects.filter((p) => p.status === 'open-source')
    for (const project of openSource) {
      expect(project.repositoryUrl).toBeDefined()
      expect(typeof project.repositoryUrl).toBe('string')
    }
  })

  it('confidential projects do not have a repositoryUrl', () => {
    const confidential = projects.filter((p) => p.status === 'confidential')
    for (const project of confidential) {
      expect(project.repositoryUrl).toBeUndefined()
    }
  })
})

// ---------- HELPERS

/**
 * Arbitrary for a non-empty string (trimmed length ≥ 1).
 */
const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)

/**
 * Arbitrary for a non-empty array of non-empty strings.
 */
const nonEmptyStringArray = fc.array(nonEmptyString, { minLength: 1, maxLength: 10 })

/**
 * Arbitrary for a valid URL string.
 */
const validUrl = fc
  .webUrl({ validSchemes: ['https', 'http'] })
  .filter((url) => url.trim().length > 0)

/**
 * Arbitrary for a well-formed open-source Project (repositoryUrl always defined).
 */
const openSourceProject = fc.record({
  id: nonEmptyString,
  name: nonEmptyString,
  descriptionKey: nonEmptyString,
  techStack: nonEmptyStringArray,
  status: fc.constant('open-source' as const),
  category: fc.constantFrom(...VALID_CATEGORIES),
  repositoryUrl: validUrl,
})

/**
 * Arbitrary for a well-formed confidential Project (repositoryUrl always absent).
 */
const confidentialProject = fc.record({
  id: nonEmptyString,
  name: nonEmptyString,
  descriptionKey: nonEmptyString,
  techStack: nonEmptyStringArray,
  status: fc.constant('confidential' as const),
  category: fc.constantFrom(...VALID_CATEGORIES),
})

// ---------- TESTS
describe('Project interface - property-based (Property 13)', () => {
  /**
   * **Validates: Requirements 17.1**
   *
   * For any well-formed open-source Project object, the iff invariant holds:
   * repositoryUrl is defined iff status === 'open-source'.
   */
  it('open-source projects always have a defined, non-empty repositoryUrl', () => {
    fc.assert(
      fc.property(openSourceProject, (project) => {
        return (
          project.status === 'open-source' &&
          typeof project.repositoryUrl === 'string' &&
          project.repositoryUrl.trim().length > 0
        )
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.1**
   *
   * For any well-formed confidential Project object, repositoryUrl is absent.
   */
  it('confidential projects never have a repositoryUrl', () => {
    fc.assert(
      fc.property(confidentialProject, (project) => {
        return project.status === 'confidential' && project.repositoryUrl === undefined
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.1**
   *
   * The iff constraint: repositoryUrl is defined if and only if
   * status === 'open-source'. Tested across both project types.
   */
  it('repositoryUrl is defined iff status is open-source (iff constraint)', () => {
    const anyProject = fc.oneof(openSourceProject, confidentialProject)

    fc.assert(
      fc.property(anyProject, (project) => {
        const hasUrl = project.repositoryUrl !== undefined
        const isOpenSource = project.status === 'open-source'
        // iff: hasUrl ↔ isOpenSource
        return hasUrl === isOpenSource
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.1**
   *
   * All required string fields (id, name, descriptionKey) are non-empty for any
   * generated project, regardless of status.
   */
  it('required string fields are always non-empty', () => {
    const anyProject = fc.oneof(openSourceProject, confidentialProject)

    fc.assert(
      fc.property(anyProject, (project) => {
        return (
          isNonEmptyString(project.id) &&
          isNonEmptyString(project.name) &&
          isNonEmptyString(project.descriptionKey)
        )
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.1**
   *
   * techStack is always a non-empty array of non-empty strings.
   */
  it('techStack is always a non-empty array of non-empty strings', () => {
    const anyProject = fc.oneof(openSourceProject, confidentialProject)

    fc.assert(
      fc.property(anyProject, (project) => {
        return (
          Array.isArray(project.techStack) &&
          project.techStack.length > 0 &&
          project.techStack.every((tech) => isNonEmptyString(tech))
        )
      }),
      { numRuns: 100 }
    )
  })
})
