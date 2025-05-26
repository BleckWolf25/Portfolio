# Project Structure

This is my portfolio's website project structure, built with Nuxt 3, Vue.js, and Tailwind CSS.

```zsh
. # Root Directory
├── app.vue # Main App Component
├── assets # Static Assets
│   └── css # CSS Files
│       └── main.css # Main CSS File with Tailwind imports
├── components # Vue Components - Reusable UI building blocks
│   ├── animations # Animation Components - Dedicated components for various animation types
│   │   ├── hover # Hover-specific animations
│   │   │   ├── buttonHoverEffect.js # Button hover animation effect
│   │   │   └── cardLiftEffect.js # Card lift hover animation effect
│   │   ├── index.js # Main export module for the animation system
│   │   ├── modals # Modal-specific animations
│   │   │   └── modalFadeIn.js # Modal fade-in animation
│   │   ├── page # Page transition animations
│   │   │   └── heroLoadAnimation.js # Hero section load animation
│   │   └── scroll # Scroll-triggered animations
│       │   ├── counterUpOnScroll.js # Counter animation triggered by scroll
│       │   ├── fadeInOnScroll.js # Fade-in animation triggered by scroll
│       │   └── slideInOnScroll.js # Slide-in animation triggered by scroll
│   ├── common # Common/Shared Components - Highly reusable, generic UI elements
│   │   ├── Button.vue # Reusable Button Component
│   │   ├── Card.vue # Reusable Card Component
│   │   ├── Modal.vue # Reusable Modal Component
│   │   ├── SectionTitle.vue # Reusable Section Title Component
│   │   ├── SocialLink.vue # Reusable Social Media Link Component
│   │   ├── Spinner.vue # Reusable Spinner Component
│   │   └── SSRIcon.vue # Server-Side Rendered Icon Component
│   ├── GlobalA11yProvider.vue # Global component for accessibility announcements (e.g., screen reader)
│   ├── layout # Layout Components - Structure the overall page layout
│   │   ├── Footer.vue # Footer Layout Component
│   │   ├── Hero.vue # Hero Section Layout Component
│   │   └── Navbar.vue # Navbar Layout Component
│   ├── sections # Section Components - Represent distinct content sections of the portfolio
│   │   ├── About.vue # About Section Component
│   │   ├── Contact.vue # Contact Section Component
│   │   ├── Hobbies.vue # Hobbies Section Component
│   │   ├── Projects.vue # Projects Section Component
│   │   ├── SoftSkills.vue # Soft Skills Section Component
│   │   ├── Technologies.vue # Technologies Section Component
│   │   ├── Testimonials.vue # Testimonials Section Component
│   │   ├── WhatIDevelop.vue # What I Develop Section Component
│   │   └── WorkTimeline.vue # Work Timeline Section Component
│   └── specific # Specific/Unique Components - Less generic, often used in one or two places
│       ├── BackAtTop.vue # "Back to Top" Button Component
│       ├── ContactForm.vue # Contact Form Component
│       ├── HobbyCard.vue # Hobby Card Component for Hobbies section
│       ├── ProjectCard.vue # Project Card Component for Projects section
│       ├── SoftSkillCard.vue # Soft Skill Card Component for SoftSkills section
│       ├── TechnologyCategory.vue # Technology Category Component for Technologies section
│       ├── ThemeToggle.vue # Theme Toggle Component (light/dark mode)
│       └── WorkTimelineCard.vue # Work Timeline Card Component for WorkTimeline section
├── eslint.config.js # ESLint Configuration for code linting
├── layouts # Nuxt Layouts
│   └── default.vue # Default Layout for all pages
├── LICENSE # MIT License
├── nuxt.config.ts # Nuxt.js Configuration
├── package-lock.json # NPM package lock file
├── package.json # Project dependencies and scripts
├── pages # Pages - Top-level views of the application
│   └── index.vue # Single Page Application (Main page)
├── PORTFOLIO.md # Portfolio content in Markdown format
├── PROJECT_STRUCTURE.md # Project Structure Documentation (This file)
├── public # Public Assets - Directly served by the web server
│   ├── data # JSON data files for content
│   │   ├── about.json # About section data
│   │   ├── footer.json # Footer section data
│   │   ├── hobbies.json # Hobbies section data
│   │   ├── projects.json # Projects section data
│   │   ├── softSkills.json # Soft Skills section data
│   │   ├── technologies.json # Technologies section data
│   │   ├── testimonials.json # Testimonials section data
│   │   ├── whatIDevelop.json # What I Develop section data
│   │   └── workTimeline.json # Work Timeline section data
│   ├── favicon.ico # Website Favicon
│   ├── images # Image assets
│   │   ├── profile.png # Profile picture
│   │   ├── projects # Project images
│   │   └── testimonials # Testimonial profile images
│   └── robots.txt # Robots.txt for search engine crawling
├── README.md # Project README file
├── scripts # Utility scripts
│   └── Configuration.sh # TypeScript configuration fix script
├── server # Server-side code for API routes and server-side rendering
│   ├── api # API Endpoints
│   │   ├── data # Data API endpoints
│   │   │   ├── about.json.get.ts # About data API endpoint
│   │   │   ├── footer.json.get.ts # Footer data API endpoint
│   │   │   ├── hobbies.json.get.ts # Hobbies data API endpoint
│   │   │   ├── projects.json.get.ts # Projects data API endpoint
│   │   │   ├── softSkills.json.get.ts # Soft Skills data API endpoint
│   │   │   ├── technologies.json.get.ts # Technologies data API endpoint
│   │   │   ├── testimonials.json.get.ts # Testimonials data API endpoint
│   │   │   ├── whatIDevelop.json.get.ts # What I Develop data API endpoint
│   │   │   └── workTimeline.json.get.ts # Work Timeline data API endpoint
│   │   └── services # Server-side services
│   │   │   └── mail.ts # Mail service for sending emails
│   │   └── contact.post.ts # Contact form API endpoint
│   ├── middleware # Server Middleware
│   └── tsconfig.json # TypeScript Configuration for server-side code
├── tailwind.config.js # Tailwind CSS Configuration
├── tsconfig.json # TypeScript Configuration for the client-side
├── tsconfig.tsbuildinfo # TypeScript build information
├── types # TypeScript Types - Custom type definitions
│   └── contact.ts # Contact form TypeScript definitions
├── utils # Utility Functions - Helper functions and common logic
│   ├── easing.js # Easing Functions for animations
│   ├── observers.js # Intersection Observer related utilities
│   ├── timers.js # Animation Timers
│   └── useIntersectionObserver.js # Reusable Intersection Observer Hook
└── vercel.json # Vercel deployment configuration

28 directories, 93 files
```

## Architecture Overview

This portfolio website is built as a Single Page Application (SPA) using Nuxt 3, Vue.js, and Tailwind CSS. The architecture follows a modular component-based approach with clear separation of concerns:

### Key Architectural Components

1. **Content Management**: JSON data files in `/public/data/` store all content, making it easy to update without changing code.

2. **Component Hierarchy**:
   - **Layout Components**: Define the overall page structure
   - **Section Components**: Represent distinct content sections
   - **Common Components**: Reusable UI elements
   - **Specific Components**: Custom components for particular use cases

3. **Animation System**: Modular animation utilities in `/components/animations/` and `/utils/` provide scroll-triggered, hover, and page transition effects.

4. **API Layer**: Server endpoints in `/server/api/data/` serve content from JSON files.

5. **Styling**: Tailwind CSS with custom configuration for consistent design language.

6. **TypeScript Integration**: Strong typing throughout the application for better developer experience and code quality.

7. **Deployment**: Optimized for Vercel with production configurations in `vercel.json`.

This architecture enables easy maintenance, content updates, and future expansion of the portfolio website.
