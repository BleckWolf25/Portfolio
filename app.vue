<!--
	- @file: APP.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This is the main entry point for the Nuxt.js application.
		- It renders the NuxtPage component which is responsible for rendering the current page.
		- It also renders the NuxtRouteAnnouncer component for accessibility.
		- The GlobalA11yProvider component provides a global screen reader announcer.
-->

<!-- Template Section -->
<template>
	<div>
		<GlobalA11yProvider>
			<NuxtRouteAnnouncer />
			<NuxtPage />
		</GlobalA11yProvider>
		<Analytics />
	</div>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import GlobalA11yProvider from './components/GlobalA11yProvider.vue';
import { Analytics } from '@vercel/analytics/nuxt'
</script>
