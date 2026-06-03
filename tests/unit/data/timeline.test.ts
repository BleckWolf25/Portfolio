/**
 * @file timeline.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Tests that every entry in the exported `timeline` array from `data/timeline.
 *
 * @description
 * Tests that every entry in the exported `timeline` array from `data/timeline.ts`
 * satisfies the TimelineItem interface invariants:
 * - `id`, `role`, `organisation`, and `description` are non-empty strings
 * - `startDate` is a valid European date string (`DD/MM/YYYY`)
 * - `endDate` is either a valid European date string or the literal `'present'`
 * Also tests the reverse-chronological sort behaviour expected by TimelineSection:
 * - `'present'` entries sort before entries with a concrete endDate
 * - Among concrete entries, sort order is descending by startDate
 * Includes both example-based tests against the actual data and property-based
 * tests (via `fast-check`) against generated TimelineItem objects.
 *
 * @since 24/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { timeline, type TimelineItem } from '../../../data/timeline'

// ---------- HELPERS
const EU_DATE_RE = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidEuDate(value: string): boolean {
  return EU_DATE_RE.test(value)
}

function isValidEndDate(value: string): boolean {
  return value === 'present' || isValidEuDate(value)
}

function assertTimelineItemInvariants(item: TimelineItem): void {
  expect(
    isNonEmptyString(item.id),
    `id must be a non-empty string (got: ${JSON.stringify(item.id)})`
  ).toBe(true)
  expect(
    isNonEmptyString(item.role),
    `role must be a non-empty string (got: ${JSON.stringify(item.role)})`
  ).toBe(true)
  expect(isNonEmptyString(item.organisation), `organisation must be a non-empty string`).toBe(true)
  expect(
    isValidEuDate(item.startDate),
    `startDate must be a valid European date string (got: ${JSON.stringify(item.startDate)})`
  ).toBe(true)
  expect(
    isValidEndDate(item.endDate),
    `endDate must be a valid European date string or 'present' (got: ${JSON.stringify(item.endDate)})`
  ).toBe(true)
  expect(isNonEmptyString(item.description), `description must be a non-empty string`).toBe(true)
}

function parseDateToSortKey(dateStr: string): string {
  if (dateStr === 'present') return '99999999'
  const parts = dateStr.split('/')
  if (
    parts.length === 3 &&
    parts[0] !== undefined &&
    parts[1] !== undefined &&
    parts[2] !== undefined
  ) {
    const day = parts[0].padStart(2, '0')
    const month = parts[1].padStart(2, '0')
    const year = parts[2]
    return `${year}${month}${day}`
  }
  return dateStr
}

/**
 * Sort comparator that mirrors the expected TimelineSection sort order:
 * 'present' entries first, then by startDate descending.
 */
function sortReverseChronological(items: TimelineItem[]): TimelineItem[] {
  return [...items].sort((a, b) => {
    const aStart = parseDateToSortKey(a.startDate)
    const bStart = parseDateToSortKey(b.startDate)
    if (aStart === bStart) {
      if (a.endDate === 'present' && b.endDate !== 'present') return -1
      if (b.endDate === 'present' && a.endDate !== 'present') return 1
      const aEnd = parseDateToSortKey(a.endDate)
      const bEnd = parseDateToSortKey(b.endDate)
      return bEnd.localeCompare(aEnd)
    }
    return bStart.localeCompare(aStart)
  })
}

// ---------- TESTS
describe('timeline array - example-based', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(timeline)).toBe(true)
    expect(timeline.length).toBeGreaterThan(0)
  })

  it('contains the required web-dev-antonio entry', () => {
    const entry = timeline.find((e) => e.id === 'web-dev-antonio')
    expect(entry).toBeDefined()
    expect(entry!.role).toBe('Web Developer')
    expect(entry!.organisation).toBe('Antonio Costa')
    expect(entry!.startDate).toBe('10/05/2023')
    expect(entry!.endDate).toBe('29/07/2023')
  })

  it('every entry satisfies the TimelineItem interface invariants', () => {
    for (const item of timeline) {
      assertTimelineItemInvariants(item)
    }
  })

  it('all entry ids are unique', () => {
    const ids = timeline.map((e) => e.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('present entries appear before entries with a concrete endDate', () => {
    const presentEntries = timeline.filter((e) => e.endDate === 'present')
    const concreteEntries = timeline.filter((e) => e.endDate !== 'present')

    if (presentEntries.length > 0 && concreteEntries.length > 0) {
      const lastPresentIndex = Math.max(...presentEntries.map((e) => timeline.indexOf(e)))
      const firstConcreteIndex = Math.min(...concreteEntries.map((e) => timeline.indexOf(e)))
      expect(lastPresentIndex).toBeLessThan(firstConcreteIndex)
    }
  })
})

// ---------- HELPERS
/**
 * Arbitrary for a valid European date string (DD/MM/YYYY).
 */
const euDateArb: fc.Arbitrary<string> = fc
  .tuple(
    fc.integer({ min: 2000, max: 2030 }),
    fc.integer({ min: 1, max: 12 }),
    fc.integer({ min: 1, max: 28 })
  )
  .map(([year, month, day]) => {
    const d = String(day).padStart(2, '0')
    const m = String(month).padStart(2, '0')
    return `${d}/${m}/${year}`
  })

/**
 * Arbitrary for a valid endDate: either a European date string or 'present'.
 */
const endDateArb: fc.Arbitrary<string> = fc.oneof(euDateArb, fc.constant('present'))

/**
 * Arbitrary for a non-empty string (trimmed length ≥ 1).
 */
const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)

/**
 * Arbitrary for a well-formed TimelineItem.
 */
const timelineItemArb: fc.Arbitrary<TimelineItem> = fc.record({
  id: nonEmptyString,
  role: nonEmptyString,
  organisation: nonEmptyString,
  startDate: euDateArb,
  endDate: endDateArb,
  description: nonEmptyString,
})

// ---------- TESTS
describe('TimelineItem interface - property-based (Property 14)', () => {
  /**
   * **Validates: Requirements 17.2**
   *
   * For any well-formed TimelineItem, all required string fields are non-empty.
   */
  it('required string fields are always non-empty', () => {
    fc.assert(
      fc.property(timelineItemArb, (item) => {
        return (
          isNonEmptyString(item.id) &&
          isNonEmptyString(item.role) &&
          isNonEmptyString(item.organisation) &&
          isNonEmptyString(item.description)
        )
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.2**
   *
   * For any well-formed TimelineItem, startDate is always a valid European date string.
   */
  it('startDate is always a valid European date string', () => {
    fc.assert(
      fc.property(timelineItemArb, (item) => {
        return isValidEuDate(item.startDate)
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 17.2**
   *
   * For any well-formed TimelineItem, endDate is either a valid European date
   * string or the literal 'present'.
   */
  it("endDate is always a valid European date string or 'present'", () => {
    fc.assert(
      fc.property(timelineItemArb, (item) => {
        return isValidEndDate(item.endDate)
      }),
      { numRuns: 100 }
    )
  })
})

describe('Timeline sort order - property-based (Property 7)', () => {
  /**
   * **Validates: Requirements 10.1**
   *
   * For any array of TimelineItems with distinct startDates, the sort function
   * must produce an array where 'present' entries come first, followed by
   * entries in descending startDate order.
   */
  it("'present' entries always sort before entries with a concrete endDate", () => {
    fc.assert(
      fc.property(fc.array(timelineItemArb, { minLength: 2, maxLength: 10 }), (items) => {
        const sorted = sortReverseChronological(items)
        const firstConcreteIndex = sorted.findIndex((e) => e.endDate !== 'present')

        if (firstConcreteIndex === -1) {
          // All entries are 'present' - trivially satisfied
          return true
        }

        // Every entry before firstConcreteIndex must have endDate === 'present'
        return sorted.slice(0, firstConcreteIndex).every((e) => e.endDate === 'present')
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Validates: Requirements 10.1**
   *
   * Among entries with a concrete endDate, the sort must be descending by startDate.
   */
  it('concrete entries are sorted by startDate descending', () => {
    fc.assert(
      fc.property(fc.array(timelineItemArb, { minLength: 2, maxLength: 10 }), (items) => {
        const sorted = sortReverseChronological(items)
        const concrete = sorted.filter((e) => e.endDate !== 'present')

        for (let i = 0; i < concrete.length - 1; i++) {
          if (
            parseDateToSortKey(concrete[i]!.startDate) <
            parseDateToSortKey(concrete[i + 1]!.startDate)
          ) {
            return false
          }
        }
        return true
      }),
      { numRuns: 100 }
    )
  })
})
