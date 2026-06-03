# João Costa - Portfolio

> **Software Engineer** · Full-Stack · Game Dev · Technical Lead  
> 🌐 [joaoccosta.vercel.app](https://joaoccosta.vercel.app) · 📧 [joao.coutinho08@gmail.com](mailto:joao.coutinho08@gmail.com) · 🐙 [GitHub](https://github.com/BleckWolf25)

---

## About This Project

Personal portfolio website built with **Nuxt 4** and **Vue 3**. Used as a living showcase of work, skills, and engineering philosophy, and as always a playground for learning and experimenting with modern web technologies.

### Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Framework  | Nuxt 4 + Vue 3 (Composition API) |
| Styling    | Tailwind CSS v4 + Nuxt UI        |
| Rendering  | SSR + static pre-render (Vercel) |
| i18n       | @nuxtjs/i18n (EN / PT)           |
| Animations | anime.js                         |
| PWA        | @vite-pwa/nuxt + Workbox         |
| Testing    | Vitest + @vue/test-utils         |
| Linting    | ESLint + Prettier                |
| CI/CD      | Vercel (auto-deploy on push)     |

### Live Demo

**[https://joaoccosta.vercel.app](https://joaoccosta.vercel.app)**

---

## Project Structure

```zsh
Portfolio/
├── app/
│   ├── app.vue                  # Root shell - startup scene, navbar, layout
│   ├── app.config.ts            # Runtime app config (theme primary colour)
│   ├── pages/
│   │   └── index.vue            # Single-page entry point
│   ├── components/
│   │   ├── AppNavbar.vue        # Fixed nav with scroll-spy + language toggle
│   │   ├── AppSkipLink.vue      # Keyboard a11y skip link
│   │   ├── ParticleBackground.client.vue
│   │   ├── sections/            # One component per page section
│   │   │   ├── HeroSection.vue
│   │   │   ├── AboutSection.vue
│   │   │   ├── WhatIBuildSection.vue
│   │   │   ├── TechnologiesSection.vue
│   │   │   ├── ProjectsSection.vue
│   │   │   ├── TimelineSection.vue
│   │   │   ├── SoftSkillsSection.vue
│   │   │   ├── HobbiesSection.vue
│   │   │   └── ContactSection.vue
│   │   └── ui/                  # Reusable UI primitives
│   │       ├── StartupScene.vue
│   │       ├── SkillBadge.vue
│   │       ├── InfiniteMarquee.vue
│   │       ├── ProjectCard.vue
│   │       ├── SoftSkillCard.vue
│   │       ├── SpecialisationCard.vue
│   │       └── TimelineEntry.vue
│   ├── composables/
│   │   ├── useScrollAnimation.ts
│   │   ├── useScrollSpy.ts
│   │   ├── useReducedMotion.ts
│   │   └── useParticles.ts
│   └── assets/css/main.css      # Global design tokens + base styles
├── data/                        # Static data (imported at build time)
│   ├── contact.ts
│   ├── projects.ts
│   ├── skills.ts
│   ├── softSkills.ts
│   └── timeline.ts
├── i18n/locales/
│   ├── en.json                  # English translations
│   └── pt.json                  # Portuguese translations
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   └── fonts/
└── tests/                       # Vitest unit tests
```

---

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) ≥ 20.0.0
- [pnpm](https://pnpm.io/) ≥ 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/BleckWolf25/portfolio.git
cd portfolio

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev        # Start dev server at http://localhost:3000
```

### Production

```bash
pnpm build      # Build for production
pnpm preview    # Preview the production build locally
```

### Testing

```bash
pnpm test       # Run Vitest in watch mode
pnpm test run   # Run all tests once
```

---

## Features

- **SSR + static pre-render** - SEO-optimised, fast first paint
- **PWA / Offline** - Workbox service worker caches all assets
- **Dark / Light mode** - persisted across sessions via cookie
- **Theme colour picker** - 5 accent colours (Emerald, Blue, Indigo, Rose, Amber)
- **EN / PT localisation** - full i18n, zero hardcoded display strings
- **WCAG 2.1 AA** - skip link, semantic headings, ARIA labels, keyboard nav
- **Startup scene** - anime.js logo animation on first visit (cookie-gated)
- **Scroll animations** - IntersectionObserver stagger reveals
- **Infinite marquee** - hardware-accelerated CSS ticker
- **90 unit tests** - components, composables, data, build

---

## Deployment

Deployed automatically on **[Vercel](https://vercel.com)** on every push to `main`.

---

## Contributing

1. Fork the repository
2. Create a feature branch - `git checkout -b feature/your-feature`
3. Commit your changes - `git commit -m 'feat: add your feature'`
4. Push the branch - `git push origin feature/your-feature`
5. Open a Pull Request

> Please follow [Conventional Commits](https://www.conventionalcommits.org/) and run `pnpm lint` before opening a PR.

---

## My Portfolio (Markdown)

For the full portfolio content in Markdown format, see **[PORTFOLIO.md](PORTFOLIO.md)**.

---

## License

[MIT](LICENSE) © João Costa
