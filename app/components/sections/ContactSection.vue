<template>
  <!--
    ContactSection (§08) - call-to-action and contact links.

    Renders a centred layout with a CTA heading, a short description, and
    a row of contact link buttons (email, GitHub). LinkedIn is omitted until
    the profile is ready.
  -->
  <section
    id="contact"
    aria-labelledby="contact-heading"
    class="py-32 flex flex-col items-center justify-center text-center"
  >
    <div ref="contactRef" class="w-full max-w-2xl mx-auto px-6 lg:px-8">
      <!-- Section label -->
      <p class="contact-element text-accent font-mono mb-4 text-sm tracking-widest uppercase">
        08. {{ $t('contact.subtitle') }}
      </p>

      <!-- Section heading -->
      <h2
        id="contact-heading"
        class="contact-element text-4xl md:text-5xl font-bold text-text-primary font-mono mb-6"
      >
        {{ $t('contact.title') }}
      </h2>

      <!-- Description paragraph -->
      <p class="contact-element text-text-secondary mb-12 text-lg leading-relaxed">
        {{ $t('contact.description') }}
      </p>

      <!-- Contact link buttons -->
      <div class="contact-element flex flex-wrap justify-center gap-6">
        <!-- Primary CTA: email -->
        <a
          :href="contact.email.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-medium font-mono rounded-md hover:bg-cyan-400 transition-colors duration-(--duration-base) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :aria-label="$t(contact.email.label)"
        >
          <UIcon :name="contact.email.icon" class="w-5 h-5" aria-hidden="true" />
          {{ $t('contact.emailBtn') }}
        </a>

        <!-- Secondary CTA: GitHub -->
        <a
          :href="contact.github.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-primary font-medium font-mono rounded-md hover:border-accent hover:text-accent transition-colors duration-(--duration-base) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :aria-label="$t(contact.github.label)"
        >
          <UIcon :name="contact.github.icon" class="w-5 h-5" aria-hidden="true" />
          {{ $t('contact.github') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file ContactSection.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Contact section with call-to-action and outbound links.
 *
 * @description
 * Final page section presenting a call-to-action and outbound contact links.
 * Receives the `contact` data object as a prop so the section is decoupled
 * from the data module and can be tested in isolation.
 *
 * @since 22/05/2026
 * @updated 22/05/2026
 */
// ---------- IMPORTS
import { ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import type { ContactData } from '~~/data/contact'

// ---------- PROPS
defineProps<{
  /** Contact link data used to populate the button hrefs and ARIA labels. */
  contact: ContactData
}>()

// ---------- REFS
const contactRef = ref<HTMLElement | null>(null)

// ---------- ANIMATIONS
useScrollAnimation(contactRef, {
  stagger: 150,
  staggerElements: '.contact-element',
  translateY: 30,
})
</script>
