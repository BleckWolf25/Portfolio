/**
 * @file projects.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Static project data for the portfolio.
 *
 * @description
 * Static project data for the portfolio. Each entry maps to a card displayed
 * in the Projects section. Descriptions are stored as i18n keys so they can
 * be localised without modifying this module.
 *
 * @since 12/05/2026
 * @updated 03/08/2026
 */
// ---------- TYPES
/**
 * Visibility status of a project.
 *
 * - `'open-source'`: Source is public; a `repositoryUrl` should be provided.
 * - `'confidential'`: Source is private; no repository link is shown.
 */
export type ProjectStatus = 'open-source' | 'confidential'

/**
 * Filter category for a project.
 */
export type ProjectCategory = 'systems' | 'frontend' | 'fullstack'

// ---------- INTERFACES
/**
 * A single portfolio project with all the metadata required to render its card.
 */
export interface Project {
  /** Stable slug used as a Vue `:key`. */
  id: string

  /** Display name of the project. */
  name: string

  /**
   * i18n key resolved to a paragraph-length description.
   * Convention: `projects.list.<id>.description`
   */
  descriptionKey: string

  /** List of technology names shown as badge labels. */
  techStack: string[]

  /** Visibility status - controls badge colour and repository link visibility. */
  status: ProjectStatus

  /**
   * Category group - controls filtering behavior in Projects section.
   */
  category: ProjectCategory

  /**
   * Absolute URL to the live demo / deployed application.
   * Optional - shown as a "Live Demo" link when present.
   */
  liveUrl?: string

  /**
   * Absolute URL to the public repository.
   * Only present (and only displayed) when `status === 'open-source'`.
   */
  repositoryUrl?: string
}

// ---------- DATA
/**
 * Ordered list of projects displayed in the Projects section.
 * Add new entries here; they will be picked up automatically by the page.
 */
export const projects: Project[] = [
  {
    id: 'task-titan',
    name: 'TaskTitan',
    descriptionKey: 'projects.list.task-titan.description',
    techStack: [
      'Next.js',
      'Electron',
      'Tailwind CSS',
      'CSS3',
      'Prisma',
      'NestJS',
      'PostgreSQL',
      'Docker',
      'Node.js',
      'Express.js',
      'TypeScript',
      'Turborepo',
    ],
    status: 'confidential',
    category: 'systems',
  },

  {
    id: 'antonio-costa-workshop',
    name: 'Antonio Costa Workshop Software',
    descriptionKey: 'projects.list.antonio-costa-workshop.description',
    techStack: ['Angular', 'Rust', 'Typescript', 'HTML', 'CSS', 'Tauri', 'Docker'],
    status: 'confidential',
    category: 'fullstack',
  },

  {
    id: 'aitoolkit',
    name: 'AI Toolkit',
    descriptionKey: 'projects.list.aitoolkit.description',
    techStack: ['Python', 'LiteLLM'],
    status: 'open-source',
    category: 'systems',
    repositoryUrl: 'https://github.com/BleckWolf25/AIToolkit',
  },

  {
    id: 'code-pulse-v2',
    name: 'Code Pulse v2',
    descriptionKey: 'projects.list.code-pulse-v2.description',
    techStack: ['TypeScript', 'VSCode'],
    status: 'open-source',
    category: 'fullstack',
    repositoryUrl: 'https://github.com/BleckWolf25/CodePulse',
  },

  {
    id: 'portfolio-v3',
    name: 'Portfolio Website v3',
    descriptionKey: 'projects.list.portfolio-v3.description',
    techStack: ['Nuxt', 'Vue 3', 'Tailwind CSS', 'TypeScript', 'Vercel', 'CSS3'],
    status: 'open-source',
    category: 'frontend',
    liveUrl: 'https://joaoccosta.vercel.app',
    repositoryUrl: 'https://github.com/BleckWolf25/portfolio',
  },

  {
    id: 'daily-dash',
    name: 'DailyDash',
    descriptionKey: 'projects.list.daily-dash.description',
    techStack: ['JavaFX', 'Java', 'Gradle', 'Maven'],
    status: 'open-source',
    category: 'systems',
    repositoryUrl: 'https://github.com/BleckWolf25/DailyDash',
  },

  {
    id: 'freechatium',
    name: 'FreeChatium',
    descriptionKey: 'projects.list.freechatium.description',
    techStack: [
      'TypeScript',
      'React',
      'Next.js',
      'Puter.js',
      'OpenRouter API',
      'Vercel',
      'Tailwind CSS',
      'assistant-ui',
      'shadcn/ui',
    ],
    status: 'open-source',
    category: 'fullstack',
    repositoryUrl: 'https://github.com/BleckWolf25/FreeChatium',
  },

  {
    id: 'evara-ui',
    name: 'Evara-UI',
    descriptionKey: 'projects.list.evara-ui.description',
    techStack: ['TypeScript', 'pnpm', 'Turborepo'],
    status: 'open-source',
    category: 'frontend',
    repositoryUrl: 'https://github.com/BleckWolf25/Evara-UI',
  },

  {
    id: 'beaudyshell',
    name: 'BeaudyShell',
    descriptionKey: 'projects.list.beaudyshell.description',
    techStack: ['Rust', 'CLI', 'REPL', 'Shell', 'Terminal UI'],
    status: 'open-source',
    category: 'systems',
    repositoryUrl: 'https://github.com/BleckWolf25/BeaudyShell',
  },

  {
    id: 'great-calculator',
    name: 'The Great Calculator v4',
    descriptionKey: 'projects.list.great-calculator.description',
    techStack: ['Next.js', 'React', 'TailwindCSS', 'Typescript', 'Math.js', 'Vercel'],
    status: 'open-source',
    category: 'frontend',
    liveUrl: 'https://thegreatcalculator.vercel.app/',
    repositoryUrl: 'https://github.com/BleckWolf25/TheGreatCalculator',
  },
]
