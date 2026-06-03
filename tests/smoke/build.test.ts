/**
 * @file build.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Smoke test that verifies the presence of expected static output files after
 *
 * @description
 * Smoke test that verifies the presence of expected static output files after
 * a production build. The test skips gracefully when `.output/public` does not
 * exist so it does not block development-time runs.
 * Reminder: Run `pnpm build` before executing this test to generate the expected output.
 *
 * @since 21/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

// ---------- TESTS
describe('Build outputs', () => {
  it('generates the expected static files', () => {
    // Output directory for Nuxt generate is typically .output/public
    // For Vercel preset, it is .vercel/output/static
    const distPath = path.resolve(__dirname, '../../.output/public')
    const vercelPath = path.resolve(__dirname, '../../.vercel/output/static')
    const targetPath = fs.existsSync(distPath)
      ? distPath
      : fs.existsSync(vercelPath)
        ? vercelPath
        : null

    // Check only if the directory exists (to prevent dev-time failures)
    if (targetPath) {
      expect(fs.existsSync(path.join(targetPath, 'index.html'))).toBe(true)
    } else {
      console.log(
        'Skipping build test because neither .output/public nor .vercel/output/static exists yet.'
      )
    }
  })
})
