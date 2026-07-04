/**
 * @file skills.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Static technical-skills catalogue for the portfolio.
 *
 * @description
 * Static technical-skills catalogue for the portfolio. Skills are grouped into
 * named categories (e.g. "Programming Languages", "Frameworks & Libraries").
 *
 * @since 12/05/2026
 * @updated 27/05/2026
 */
// ---------- TYPES
/**
 * Self-assessed proficiency level for a skill, used to colour-code tooltips
 * and provide a quick at-a-glance signal to visitors.
 */
export type SkillLevel = 'Proficient' | 'Familiar' | 'Learning'

// ---------- INTERFACES
/**
 * A single technology or tool with optional display and proficiency metadata.
 */
export interface Skill {
  /** Display name rendered inside the badge. */
  name: string

  /**
   * Optional @nuxt/icon component name (e.g. `'i-devicon-typescript'`).
   * When absent, only the text name is shown.
   */
  icon?: string

  /**
   * Self-assessed proficiency level shown in the tooltip.
   */
  level: SkillLevel
}

/**
 * A named group of related skills displayed under a single heading in the
 * Technologies section.
 */
export interface SkillCategory {
  /** Stable identifier used as a Vue `:key`. */
  id: string

  /**
   * i18n key resolved to the visible category heading.
   */
  label: string

  /** Ordered list of skills belonging to this category. */
  skills: Skill[]
}

// ---------- DATA
/**
 * Ordered list of skill categories displayed in the Technologies section.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'programming-languages',
    label: 'programming-languages',
    skills: [
      { name: 'C', icon: 'i-devicon-c', level: 'Familiar' },
      { name: 'C#', icon: 'i-devicon-csharp', level: 'Familiar' },
      { name: 'C++', icon: 'i-devicon-cplusplus', level: 'Proficient' },
      { name: 'Java', icon: 'i-devicon-java', level: 'Learning' },
      { name: 'JavaScript', icon: 'i-devicon-javascript', level: 'Proficient' },
      { name: 'Lua', icon: 'i-devicon-lua', level: 'Proficient' },
      { name: 'PHP', icon: 'i-devicon-php', level: 'Familiar' },
      { name: 'Python', icon: 'i-devicon-python', level: 'Proficient' },
      { name: 'Rust', icon: 'i-devicon-rust', level: 'Learning' },
      { name: 'Svelte', icon: 'i-devicon-svelte', level: 'Learning' },
      { name: 'Swift', icon: 'i-devicon-swift', level: 'Learning' },
      { name: 'TypeScript', icon: 'i-devicon-typescript', level: 'Proficient' },
    ],
  },
  {
    id: 'automation-scripting',
    label: 'automation-scripting',
    skills: [
      { name: 'Bash Script', icon: 'i-devicon-bash', level: 'Proficient' },
      { name: 'Batch Script', icon: 'i-devicon-powershell', level: 'Familiar' },
    ],
  },
  {
    id: 'frameworks-libraries',
    label: 'frameworks-libraries',
    skills: [
      { name: '.NET', icon: 'logos-dotnet', level: 'Familiar' },
      { name: 'Angular', icon: 'i-devicon-angular', level: 'Familiar' },
      { name: 'AnimeJS', icon: 'simple-icons-animedotjs', level: 'Familiar' },
      { name: 'Capacitor', icon: 'simple-icons-capacitor', level: 'Learning' },
      { name: 'Django', icon: 'material-icon-theme-django', level: 'Familiar' },
      { name: 'Electron', icon: 'i-devicon-electron', level: 'Familiar' },
      { name: 'Expo', icon: 'i-devicon-expo', level: 'Familiar' },
      { name: 'Express', icon: 'i-devicon-express', level: 'Familiar' },
      { name: 'Framer Motion', icon: 'i-devicon-framermotion', level: 'Familiar' },
      { name: 'GSAP', icon: 'simple-icons-gsap', level: 'Learning' },
      { name: 'NestJS', icon: 'i-devicon-nestjs', level: 'Familiar' },
      { name: 'Next.js', icon: 'i-devicon-nextjs', level: 'Proficient' },
      { name: 'Nuxt.js', icon: 'i-devicon-nuxtjs', level: 'Proficient' },
      { name: 'React', icon: 'i-devicon-react', level: 'Proficient' },
      { name: 'Tauri', icon: 'i-devicon-tauri', level: 'Familiar' },
      { name: 'Vue.js', icon: 'i-devicon-vuejs', level: 'Proficient' },
    ],
  },
  {
    id: 'design-styling',
    label: 'design-styling',
    skills: [
      { name: 'Bootstrap', icon: 'i-devicon-bootstrap', level: 'Familiar' },
      { name: 'CSS3', icon: 'i-devicon-css3', level: 'Proficient' },
      { name: 'HTML5', icon: 'i-devicon-html5', level: 'Proficient' },
      { name: 'React Bits', icon: 'i-devicon-react', level: 'Proficient' },
      { name: 'React-Spring', icon: 'logos-react-spring', level: 'Proficient' },
      { name: 'Sass', icon: 'i-devicon-sass', level: 'Familiar' },
      { name: 'shadcn/ui', icon: 'simple-icons-shadcnui', level: 'Familiar' },
      { name: 'Tailwind CSS', icon: 'i-devicon-tailwindcss', level: 'Proficient' },
    ],
  },
  {
    id: 'databases-backend',
    label: 'databases-backend',
    skills: [
      { name: 'Appwrite', icon: 'i-devicon-appwrite', level: 'Familiar' },
      { name: 'DBeaver', icon: 'i-devicon-dbeaver', level: 'Familiar' },
      { name: 'Firebase', icon: 'i-devicon-firebase', level: 'Proficient' },
      { name: 'MongoDB', icon: 'i-devicon-mongodb', level: 'Familiar' },
      { name: 'MySQL', icon: 'i-devicon-mysql', level: 'Familiar' },
      { name: 'MySQL Workbench', icon: 'i-devicon-mysql-wordmark', level: 'Familiar' },
      { name: 'Neon Serveless', icon: 'simple-icons-neon', level: 'Familiar' },
      { name: 'PostgreSQL', icon: 'i-devicon-postgresql', level: 'Proficient' },
      { name: 'Prisma', icon: 'i-devicon-prisma', level: 'Proficient' },
      { name: 'Redis', icon: 'i-devicon-redis', level: 'Learning' },
      { name: 'SQLite', icon: 'i-devicon-sqlite', level: 'Familiar' },
      { name: 'Stack Auth', icon: 'simple-icons-stackbit', level: 'Familiar' },
      { name: 'Supabase', icon: 'i-devicon-supabase', level: 'Learning' },
    ],
  },
  {
    id: 'runtimes-environments',
    label: 'runtimes-environments',
    skills: [
      { name: 'Apache', icon: 'i-devicon-apache', level: 'Familiar' },
      { name: 'Docker', icon: 'i-devicon-docker', level: 'Proficient' },
      { name: 'Node.js', icon: 'i-devicon-nodejs', level: 'Proficient' },
      { name: 'npm', icon: 'i-devicon-npm', level: 'Proficient' },
      { name: 'pnpm', icon: 'i-devicon-pnpm', level: 'Proficient' },
      { name: 'Vercel', icon: 'i-devicon-vercel', level: 'Proficient' },
      { name: 'yarn', icon: 'i-devicon-yarn', level: 'Proficient' },
    ],
  },
  {
    id: 'dev-tools',
    label: 'dev-tools',
    skills: [
      { name: 'CMake', icon: 'i-devicon-cmake', level: 'Familiar' },
      { name: 'EditorConfig', icon: 'i-material-icon-theme-editorconfig', level: 'Proficient' },
      { name: 'ESLint', icon: 'i-devicon-eslint', level: 'Proficient' },
      { name: 'Gradle', icon: 'i-devicon-gradle', level: 'Learning' },
      { name: 'Git', icon: 'i-devicon-git', level: 'Proficient' },
      { name: 'GitHub', icon: 'i-devicon-github', level: 'Proficient' },
      { name: 'GitLab', icon: 'i-devicon-gitlab', level: 'Familiar' },
      { name: 'Mendix', icon: 'heroicons-code-bracket-16-solid', level: 'Learning' },
      { name: 'packwiz', icon: 'tabler:book-filled', level: 'Learning' },
      { name: 'Prettier', icon: 'i-logos-prettier', level: 'Proficient' },
      { name: 'Replit', icon: 'i-devicon-replit', level: 'Familiar' },
      { name: 'Turbo Repo', icon: 'i-material-icon-theme-turborepo', level: 'Familiar' },
      { name: 'Vite', icon: 'i-devicon-vite', level: 'Proficient' },
      { name: 'Vitest', icon: 'i-devicon-vitest', level: 'Proficient' },
      { name: 'Webpack', icon: 'i-devicon-webpack', level: 'Familiar' },
    ],
  },
  {
    id: 'ides',
    label: 'ides',
    skills: [
      { name: 'JetBrains', icon: 'i-devicon-jetbrains', level: 'Familiar' },
      { name: 'VS Code', icon: 'i-devicon-vscode', level: 'Proficient' },
      { name: 'Visual Studio', icon: 'i-devicon-visualstudio', level: 'Familiar' },
      { name: 'Replit IDE', icon: 'i-devicon-replit', level: 'Familiar' },
      { name: 'Zed', icon: 'i-devicon-zed', level: 'Proficient' },
    ],
  },
  {
    id: 'agentic-dev-environments',
    label: 'agentic-dev-environments',
    skills: [
      { name: 'Antigravity IDE', icon: 'i-devicon-google', level: 'Proficient' },
      { name: 'Cursor', icon: 'i-devicon-cursor', level: 'Familiar' },
      { name: 'Kiro', icon: 'i-devicon-amazonwebservices', level: 'Proficient' },
    ],
  },
  {
    id: 'game-dev',
    label: 'game-dev',
    skills: [
      { name: 'Godot', icon: 'i-devicon-godot', level: 'Learning' },
      { name: 'Unity', icon: 'i-devicon-unity', level: 'Familiar' },
      { name: 'Unreal Engine', icon: 'i-devicon-unrealengine', level: 'Familiar' },
      { name: 'Roblox Studio', icon: 'i-material-icon-theme-roblox', level: 'Proficient' },
    ],
  },
  {
    id: 'os',
    label: 'os',
    skills: [
      { name: 'Linux', icon: 'i-devicon-linux', level: 'Familiar' },
      { name: 'macOS', icon: 'i-devicon-apple', level: 'Proficient' },
      { name: 'Windows', icon: 'i-devicon-windows8', level: 'Proficient' },
    ],
  },
]
