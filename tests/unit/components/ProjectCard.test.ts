/**
 * @file ProjectCard.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Property-based tests for the ProjectCard UI component.
 *
 * @description
 * Property-based tests for the ProjectCard UI component. Covers three properties:
 * - Property 1: No `<img>` elements or inline background-image styles are rendered
 * - Property 5: All required fields (name, description, tech stack, status) are visible
 * - Property 6: The repository link is shown iff the project status is 'open-source'
 * All tests use `fast-check` to generate arbitrary Project objects.
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import ProjectCard from '../../../app/components/ui/ProjectCard.vue'

// ---------- HELPERS
const globalOptions = {
  mocks: {
    $t: (key: string) => key,
  },
  stubs: {
    UIcon: true,
  },
}

const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => /^\S+$/.test(s))

// ---------- TESTS
describe('ProjectCard', () => {
  it('renders no images (Property 1)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: nonEmptyString,
          name: nonEmptyString,
          descriptionKey: nonEmptyString,
          techStack: fc.array(nonEmptyString),
          status: fc.constantFrom('open-source', 'confidential'),
          category: fc.constantFrom('systems', 'frontend', 'fullstack'),
          liveUrl: fc.option(fc.webUrl(), { nil: undefined }),
          repositoryUrl: fc.option(fc.webUrl(), { nil: undefined }),
        }),
        (project) => {
          const wrapper = mount(ProjectCard, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props: { project: project as any },
            global: globalOptions,
          })
          expect(wrapper.findAll('img').length).toBe(0)

          const elementsWithBgImage = wrapper.findAll('*').filter((w) => {
            const el = w.element as HTMLElement
            return !!el.style?.backgroundImage
          })
          expect(elementsWithBgImage.length).toBe(0)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('renders all required fields (Property 5)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: nonEmptyString,
          name: nonEmptyString,
          descriptionKey: nonEmptyString,
          techStack: fc.array(nonEmptyString, { minLength: 1 }),
          status: fc.constantFrom('open-source', 'confidential'),
          category: fc.constantFrom('systems', 'frontend', 'fullstack'),
          liveUrl: fc.option(fc.webUrl(), { nil: undefined }),
          repositoryUrl: fc.option(fc.webUrl(), { nil: undefined }),
        }),
        (project) => {
          const wrapper = mount(ProjectCard, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props: { project: project as any },
            global: globalOptions,
          })
          expect(wrapper.text()).toContain(project.name)
          expect(wrapper.text()).toContain(project.descriptionKey)
          project.techStack.forEach((tech) => {
            expect(wrapper.text()).toContain(tech)
          })
          expect(wrapper.text()).toMatch(/project\.openSource|project\.confidential/)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('exposes repository link only for open-source (Property 6)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: nonEmptyString,
          name: nonEmptyString,
          descriptionKey: nonEmptyString,
          techStack: fc.array(nonEmptyString),
          status: fc.constantFrom('open-source', 'confidential'),
          category: fc.constantFrom('systems', 'frontend', 'fullstack'),
          liveUrl: fc.option(fc.webUrl(), { nil: undefined }),
          repositoryUrl: fc.option(fc.webUrl(), { nil: undefined }),
        }),
        (project) => {
          const wrapper = mount(ProjectCard, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props: { project: project as any },
            global: globalOptions,
          })
          const links = wrapper.findAll('a')
          const hasLiveLink = !!project.liveUrl
          const hasRepoLink = project.status === 'open-source' && !!project.repositoryUrl
          const expectedLinks = (hasLiveLink ? 1 : 0) + (hasRepoLink ? 1 : 0)
          expect(links.length).toBe(expectedLinks)
          if (hasRepoLink) {
            const repoLink = links.find((l) => l.attributes('href') === project.repositoryUrl)
            expect(repoLink).toBeDefined()
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})
