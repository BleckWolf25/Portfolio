/**
 * @file PORTFOLIO.d.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * This file contains TypeScript interfaces for the portfolio data structure.
 * It defines the structure of the data used in the portfolio application.
 * The interfaces include information about the portfolio, projects, skills, and work history.
 * The data is used to display the portfolio information in a structured way.
 */

// ------------ WORK HISTORY ITEM INTERFACE
export interface WorkHistoryItem {
	company: string
	position: string
	period: string
	description: string
	technologies: string[]
}

// ------------ PROEJECT INTERFACE
export interface Project {
	title: string
	description: string
	image: string
	url: string
	github: string
	techStack: string[]
}

// ------------ SKILL INTERFACE
export interface Skill {
	name: string
	level: string
}
