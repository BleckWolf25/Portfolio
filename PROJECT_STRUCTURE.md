# Project Structure

This is my portfolio's website project structure.

```zsh
. # Root Directory
├── app.vue # Main App Component
├── assets # Static Assets
│ ├── css # CSS Files
│ │ └── main.css # Main CSS File
│ ├── data # Data Files (e.g., JSON, mock data)
│ └── images # Images
├── components # Vue Components - Reusable UI building blocks
│ ├── animations # Animation Components - Dedicated components for various animation types
│ │ ├── hover # Hover-specific animations
│ │ ├── index.js # Main export module for the animation system
│ │ ├── modals # Modal-specific animations
│ │ ├── page # Page transition animations
│ │ └── scroll # Scroll-triggered animations
│ ├── common # Common/Shared Components - Highly reusable, generic UI elements
│ │ ├── Button.vue # Reusable Button Component
│ │ ├── Card.vue # Reusable Card Component
│ │ ├── Modal.vue # Reusable Modal Component
│ │ ├── SectionTitle.vue # Reusable Section Title Component
│ │ ├── SocialLink.vue # Reusable Social Media Link Component
│ │ ├── Spinner.vue # Reusable Spinner Component
│ │ └── Tooltip.vue # Reusable Tooltip Component
│ ├── GlobalA11yProvider.vue # Global component for accessibility announcements (e.g., screen reader)
│ ├── layout # Layout Components - Structure the overall page layout
│ │ ├── Footer.vue # Footer Layout Component
│ │ ├── Hero.vue # Hero Section Layout Component
│ │ └── Navbar.vue # Navbar Layout Component
│ ├── sections # Section Components - Represent distinct content sections of the portfolio
│ │ ├── About.vue # About Section Component
│ │ ├── Contact.vue # Contact Section Component
│ │ ├── Hobbies.vue # Hobbies Section Component
│ │ ├── Projects.vue # Projects Section Component
│ │ ├── SoftSkills.vue # Soft Skills Section Component
│ │ ├── Technologies.vue # Technologies Section Component
│ │ ├── Testimonials.vue # Testimonials Section Component
│ │ ├── WhatIDevelop.vue # What I Develop Section Component
│ │ └── WorkTimeline.vue # Work Timeline Section Component
│ └── specific # Specific/Unique Components - Less generic, often used in one or two places
│ ├── BackAtTop.vue # "Back to Top" Button Component
│ ├── ContactForm.vue # Contact Form Component
│ ├── ProjectCard.vue # Project Card Component (likely used within the Projects section)
│ └── ThemeToggle.vue # Theme Toggle Component (light/dark mode)
├── eslint.config.js # ESLint Configuration for code linting
├── LICENSE # MIT License
├── main.ts # Main Entry Point of the application
├── nuxt.config.ts # Nuxt.js Configuration
├── options.vite # Vite Configuration
├── package.json # Project dependencies and scripts
├── pages # Pages - Top-level views of the application
│ └── index.vue # Single Page Application (Main page)
├── PROJECT_STRUCTURE.md # Project Structure Documentation (This file)
├── public # Public Assets - Directly served by the web server
│ ├── .well-known # Well-Known Assets (e.g., for domain verification)
│ │ └── discord # Discord Domain Verification Code
│ ├── favicon.ico # Website Favicon
│ └── robots.txt # Robots.txt for search engine crawling
├── README.md # Project README file
├── server # Server-side code (if applicable, for API routes or server-side rendering)
│ ├── api # API Endpoints
│ ├── middleware # Server Middleware
│ └── tsconfig.json # TypeScript Configuration for server-side code
├── tailwind.config.js # Tailwind CSS Configuration
├── tsconfig.json # TypeScript Configuration for the client-side
├── types # TypeScript Types - Custom type definitions
└── utils # Utility Functions - Helper functions and common logic
    ├── cursor.js # Custom Cursor System
    ├── easing.js # Easing Functions for animations
    ├── observers.js # Intersection Observer related utilities
    ├── timers.js # Animation Timers
    └── useIntersectionObserver.js # Reusable Intersection Observer Hook

22 directories, 57 files```
