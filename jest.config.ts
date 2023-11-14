import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,
	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',
	// An array of regexp pattern strings used to skip coverage collection
	// coveragePathIgnorePatterns: ['\\\\mock\\\\'],
	// coveragePathIgnorePatterns: [
	//   "\\\\node_modules\\\\"
	// ],
	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',
	// A list of paths to modules that run some code to configure or set up the testing framework before each test
	// setupFilesAfterEnv: [],
	setupFilesAfterEnv: ['./src/__mock__/setup-jest.ts'],
	// The glob patterns Jest uses to detect test files
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	// A map from regular expressions to paths to transformers
};

export default config;
