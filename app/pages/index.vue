<template>
  <!--
    index.vue - Main Portfolio Page

    Renders all the semantic sections of the portfolio sequentially.
    Data is imported statically from the data directory and passed as props
    to the respective sections.
  -->
  <div>
    <HeroSection />
    <AboutSection />
    <WhatIBuildSection />
    <TechnologiesSection :categories="skillCategories" />
    <ProjectsSection :projects="projects" />
    <TimelineSection :entries="timeline" />
    <SoftSkillsSection :skills="softSkills" />
    <HobbiesSection />
    <ContactSection :contact="contact" />
  </div>
</template>

<script setup lang="ts">
/**
 * @file index.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Entry point for the portfolio single-page application.
 *
 * @description
 * The primary entry point for the portfolio single-page application.
 * Imports static data structures and renders the component tree.
 *
 * @since 10/05/2026
 * @updated 29/05/2026
 */
// ---------- DATA IMPORTS
import { skillCategories } from '~~/data/skills'
import { projects } from '~~/data/projects'
import { timeline } from '~~/data/timeline'
import { softSkills } from '~~/data/softSkills'
import { contact } from '~~/data/contact'

// ---------- COMPONENT IMPORTS
import HeroSection from '~/components/sections/HeroSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import WhatIBuildSection from '~/components/sections/WhatIBuildSection.vue'
import TechnologiesSection from '~/components/sections/TechnologiesSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import TimelineSection from '~/components/sections/TimelineSection.vue'
import SoftSkillsSection from '~/components/sections/SoftSkillsSection.vue'
import HobbiesSection from '~/components/sections/HobbiesSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
</script>
