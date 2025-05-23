/**
 * @file ICON MAP.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * This file contains a mapping of icon names to their corresponding iconify icons.
 * It provides a function to get the icon component based on the icon name.
 * The icons are used in the portfolio data to represent different skills and technologies.
 * The function returns a Vue component that can be rendered in the template.
 * The icons are imported from the @iconify/vue package.
 */

// ------------ IMPORTS
import { h } from 'vue'
import { Icon } from '@iconify/vue'

// ------------ ICON MAP
const iconMap: Record<string, string> = {
	javascript: 'logos:javascript',
	typescript: 'logos:typescript-icon',
	python: 'logos:python',
	react: 'logos:react',
	nextjs: 'logos:nextjs-icon',
	nodejs: 'logos:nodejs-icon',
	communication: 'mdi:message-text-outline',
	'problem-solving': 'mdi:lightbulb-on-outline',
	teamwork: 'mdi:account-group-outline',
	adaptability: 'mdi:shuffle-variant',
	leadership: 'mdi:account-tie',
	creativity: 'mdi:palette-outline',
}

// ------------ GET ICON COMPONENT
export function getIconComponent(iconName: string, size = 32) {
	// If iconName is in iconMap, use it; otherwise, use iconName directly
	const icon = iconMap[iconName] || iconName || 'mdi:help-circle-outline'
	return h(Icon, { icon, width: size, height: size })
}
