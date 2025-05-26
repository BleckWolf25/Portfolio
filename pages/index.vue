<!--
	- @file: INDEX.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This is the main entry point for the Nuxt.js application.
		- It imports and renders various components that make up the homepage.
		- Each section of the homepage is represented by a dedicated component.
-->

<!-- Template Section -->
<template>
	<div>
		<!-- Structured Data for SEO -->

		<Head>
			<!-- Canonical URL -->
			<link rel="canonical" href="https://bleckwolf25.vercel.app/" />

			<!-- Meta Tags -->
			<meta name="description"
				content="BleckWolf25's portfolio - Full Stack Developer, projects, skills, and contact information. Explore my work, technologies, and professional journey." />
			<meta property="og:description"
				content="Explore BleckWolf25's professional portfolio. Discover projects, skills, and contact details for a Full Stack Developer." />
			<meta property="og:url" content="https://bleckwolf25.vercel.app/" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="BleckWolf25 - Portfolio" />
			<meta name="twitter:description" content="Full Stack Developer portfolio, projects, skills, and contact." />
			<meta name="twitter:image" content="https://bleckwolf25.vercel.app/images/profile.png" />
		</Head>

		<!-- Navbar -->
		<Navbar />

		<!-- Hero Section -->
		<Hero />

		<!-- About Section -->
		<About />

		<!-- What I Develop Section -->
		<WhatIDevelop />

		<!-- Technologies I've Worked With Section -->
		<Technologies />

		<!-- Projects Section -->
		<Projects />

		<!-- Testimonials Section -->
		<Testimonials />

		<!-- Work Timeline Section -->
		<WorkTimeline />

		<!-- Soft Skills Section -->
		<SoftSkills />

		<!-- Hobbies Section -->
		<Hobbies />

		<!-- Contact Section-->
		<Contact />

		<!-- Footer -->
		<Footer />

	</div>
</template>

<!-- Script Setup Section -->
<script setup lang="ts">

definePageMeta({
	layout: 'default'
})

// ------------ IMPORTS
import Navbar from '../components/layout/Navbar.vue';
import Hero from '../components/layout/Hero.vue';
import Footer from '../components/layout/Footer.vue';
import About from '../components/sections/About.vue';
import WhatIDevelop from '../components/sections/WhatIDevelop.vue';
import Technologies from '../components/sections/Technologies.vue';
import Projects from '../components/sections/Projects.vue';
import WorkTimeline from '../components/sections/WorkTimeline.vue';
import SoftSkills from '../components/sections/SoftSkills.vue';
import Testimonials from '../components/sections/Testimonials.vue';
import Hobbies from '../components/sections/Hobbies.vue';
import Contact from '../components/sections/Contact.vue';
import { useHead } from 'nuxt/app';

// ------------ STRUCTURED DATA

// Person Schema
useScript({
	type: 'application/ld+json',
	innerHTML: JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "BleckWolf25",
		"jobTitle": "Full-Stack Developer",
		"url": "https://bleckwolf25.vercel.app",
		"sameAs": [
			"https://github.com/bleckwolf25",
			"https://linkedin.com/in/bleckwolf25"
		],
		"worksFor": {
			"@type": "Organization",
			"name": "BleckWolf25"
		},
		"description": "Professional full-stack developer specializing in modern web technologies"
	}),
	src: 'data:text/javascript;base64,' // dummy src for TS type
})

// Organization Schema
useScript({
	type: 'application/ld+json',
	innerHTML: JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "BleckWolf25",
		"url": "https://bleckwolf25.vercel.app",
		"logo": "https://bleckwolf25.vercel.app/images/profile.png",
		"description": "Professional web development services and portfolio"
	}),
	src: 'data:text/javascript;base64,'
})

// WebSite Schema
useScript({
	type: 'application/ld+json',
	innerHTML: JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		"url": "https://bleckwolf25.vercel.app/",
		"name": "BleckWolf25 Portfolio",
		"description": "Professional portfolio showcasing web development expertise and projects",
		"author": {
			"@type": "Person",
			"name": "BleckWolf25"
		}
	}),
	src: 'data:text/javascript;base64,'
})
</script>
