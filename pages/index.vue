<!--
	- @file: index.vue
	- @author: BleckWolf25
	- @license: MIT

	- @description:
	- This is the main entry point for the Nuxt.js application.
	- It imports and uses various components to build the homepage of a portfolio website.
-->

<!-- Script Part -->
<script setup lang="ts">

// ------------ IMPORTS
import AboutMe from '~/components/AboutMe.vue';
import Developments from '~/components/Developments.vue';
import FeaturedProjects from '~/components/FeaturedProjects.vue';
import Hero from '~/components/Hero.vue';
import SoftSkills from '~/components/SoftSkills.vue';
import Technologies from '~/components/Technologies.vue';
import WorkTimeline from '~/components/WorkTimeline.vue';
import Contact from '~/components/Contact.vue';
</script>

<!-- Template Part -->
<template>
	<div>

		<!-- Organize components to be displayed in this order-->
		<Hero />
		<AboutMe />
		<Technologies />
		<FeaturedProjects />
		<WorkTimeline />
		<Developments />
		<SoftSkills />
		<Contact />

	</div>
</template>
