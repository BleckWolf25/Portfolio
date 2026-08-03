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
// ---------- INTERFACES
/**
 * A single technology or tool with optional display metadata.
 */
export interface Skill {
  /** Display name rendered inside the badge. */
  name: string

  /**
   * Optional @nuxt/icon component name (e.g. `'i-devicon-typescript'`).
   * When absent, only the text name is shown.
   */
  icon?: string
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
      { name: 'C', icon: 'i-devicon-c' },
      { name: 'C#', icon: 'i-devicon-csharp' },
      { name: 'C++', icon: 'i-devicon-cplusplus' },
      { name: 'Java', icon: 'i-devicon-java' },
      { name: 'JavaScript', icon: 'i-devicon-javascript' },
      { name: 'Lua', icon: 'i-devicon-lua' },
      { name: 'PHP', icon: 'i-devicon-php' },
      { name: 'Python', icon: 'i-devicon-python' },
      { name: 'Rust', icon: 'i-devicon-rust' },
      { name: 'Svelte', icon: 'i-devicon-svelte' },
      { name: 'Swift', icon: 'i-devicon-swift' },
      { name: 'TypeScript', icon: 'i-devicon-typescript' },
    ],
  },
  {
    id: 'automation-scripting',
    label: 'automation-scripting',
    skills: [
      { name: 'Bash Script', icon: 'i-devicon-bash' },
      { name: 'Batch Script', icon: 'i-devicon-powershell' },
    ],
  },
  {
    id: 'frameworks-libraries',
    label: 'frameworks-libraries',
    skills: [
      { name: '.NET', icon: 'logos-dotnet' },
      { name: 'Angular', icon: 'i-devicon-angular' },
      { name: 'AnimeJS', icon: 'simple-icons-animedotjs' },
      { name: 'Capacitor', icon: 'simple-icons-capacitor' },
      { name: 'Django', icon: 'material-icon-theme-django' },
      { name: 'Electron', icon: 'i-devicon-electron' },
      { name: 'Expo', icon: 'i-devicon-expo' },
      { name: 'Express', icon: 'i-devicon-express' },
      { name: 'Framer Motion', icon: 'i-devicon-framermotion' },
      { name: 'GSAP', icon: 'simple-icons-gsap' },
      { name: 'NestJS', icon: 'i-devicon-nestjs' },
      { name: 'Next.js', icon: 'i-devicon-nextjs' },
      { name: 'Nuxt.js', icon: 'i-devicon-nuxtjs' },
      { name: 'React', icon: 'i-devicon-react' },
      { name: 'Tauri', icon: 'i-devicon-tauri' },
      { name: 'Vue.js', icon: 'i-devicon-vuejs' },
    ],
  },
  {
    id: 'design-styling',
    label: 'design-styling',
    skills: [
      { name: 'Bootstrap', icon: 'i-devicon-bootstrap' },
      { name: 'CSS3', icon: 'i-devicon-css3' },
      { name: 'HTML5', icon: 'i-devicon-html5' },
      { name: 'React Bits', icon: 'i-devicon-react' },
      { name: 'React-Spring', icon: 'logos-react-spring' },
      { name: 'Sass', icon: 'i-devicon-sass' },
      { name: 'shadcn/ui', icon: 'simple-icons-shadcnui' },
      { name: 'Tailwind CSS', icon: 'i-devicon-tailwindcss' },
    ],
  },
  {
    id: 'databases-backend',
    label: 'databases-backend',
    skills: [
      { name: 'Appwrite', icon: 'i-devicon-appwrite' },
      { name: 'DBeaver', icon: 'i-devicon-dbeaver' },
      { name: 'Firebase', icon: 'i-devicon-firebase' },
      { name: 'MongoDB', icon: 'i-devicon-mongodb' },
      { name: 'MySQL', icon: 'i-devicon-mysql' },
      { name: 'MySQL Workbench', icon: 'i-devicon-mysql-wordmark' },
      { name: 'Neon Serveless', icon: 'simple-icons-neon' },
      { name: 'PostgreSQL', icon: 'i-devicon-postgresql' },
      { name: 'Prisma', icon: 'i-devicon-prisma' },
      { name: 'Redis', icon: 'i-devicon-redis' },
      { name: 'SQLite', icon: 'i-devicon-sqlite' },
      { name: 'Stack Auth', icon: 'simple-icons-stackbit' },
      { name: 'Supabase', icon: 'i-devicon-supabase' },
    ],
  },
  {
    id: 'runtimes-environments',
    label: 'runtimes-environments',
    skills: [
      { name: 'Apache', icon: 'i-devicon-apache' },
      { name: 'Docker', icon: 'i-devicon-docker' },
      { name: 'Node.js', icon: 'i-devicon-nodejs' },
      { name: 'npm', icon: 'i-devicon-npm' },
      { name: 'pnpm', icon: 'i-devicon-pnpm' },
      { name: 'Vercel', icon: 'i-devicon-vercel' },
      { name: 'yarn', icon: 'i-devicon-yarn' },
    ],
  },
  {
    id: 'dev-tools',
    label: 'dev-tools',
    skills: [
      { name: 'CMake', icon: 'i-devicon-cmake' },
      { name: 'EditorConfig', icon: 'i-material-icon-theme-editorconfig' },
      { name: 'ESLint', icon: 'i-devicon-eslint' },
      { name: 'Gradle', icon: 'i-devicon-gradle' },
      { name: 'Git', icon: 'i-devicon-git' },
      { name: 'GitHub', icon: 'i-devicon-github' },
      { name: 'GitLab', icon: 'i-devicon-gitlab' },

      { name: 'packwiz', icon: 'tabler:book-filled' },
      { name: 'Prettier', icon: 'i-logos-prettier' },
      { name: 'Replit', icon: 'i-devicon-replit' },
      { name: 'Turbo Repo', icon: 'i-material-icon-theme-turborepo' },
      { name: 'Vite', icon: 'i-devicon-vite' },
      { name: 'Vitest', icon: 'i-devicon-vitest' },
      { name: 'Webpack', icon: 'i-devicon-webpack' },
    ],
  },
  {
    id: 'ides',
    label: 'ides',
    skills: [
      { name: 'JetBrains', icon: 'i-devicon-jetbrains' },
      { name: 'Mendix', icon: 'heroicons-code-bracket-16-solid' },
      { name: 'VS Code', icon: 'i-devicon-vscode' },
      { name: 'VS Codium', icon: 'i-devicon-vscodium' },
      { name: 'Visual Studio', icon: 'i-devicon-visualstudio' },
      { name: 'Replit IDE', icon: 'i-devicon-replit' },
      { name: 'Zed', icon: 'i-devicon-zed' },
    ],
  },
  {
    id: 'agentic-dev-environments',
    label: 'agentic-dev-environments',
    skills: [
      { name: 'Antigravity IDE', icon: 'i-devicon-google' },
      { name: 'Cursor', icon: 'i-devicon-cursor' },
      { name: 'Devin', icon: 'simple-icons-robotframework' },
      { name: 'Kiro', icon: 'i-devicon-amazonwebservices' },
    ],
  },
  {
    id: 'game-dev',
    label: 'game-dev',
    skills: [
      { name: 'Godot', icon: 'i-devicon-godot' },
      { name: 'Unity', icon: 'i-devicon-unity' },
      { name: 'Unreal Engine', icon: 'i-devicon-unrealengine' },
      { name: 'Roblox Studio', icon: 'i-material-icon-theme-roblox' },
    ],
  },
  {
    id: 'os',
    label: 'os',
    skills: [
      { name: 'Linux', icon: 'i-devicon-linux' },
      { name: 'macOS', icon: 'i-devicon-apple' },
      { name: 'Windows', icon: 'i-devicon-windows8' },
    ],
  },
]
