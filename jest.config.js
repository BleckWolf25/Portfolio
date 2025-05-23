// @ts-check
export default {
	testEnvironment: 'node',
	transform: {},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	testMatch: ['**/tests/**/*.test.js'],
	collectCoverageFrom: [],
	setupFiles: ['<rootDir>/tests/helpers/testSetup.js'],
};
