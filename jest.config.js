const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  // Use v8 coverage provider for better Next.js compatibility
  // This prevents the babel-plugin-istanbul compatibility issues
  coverageProvider: 'v8',
  // Transform ignore patterns to prevent Next.js from transforming files during coverage
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'app/api/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!app/layout.tsx',
    '!app/page.tsx',
    '!app/ClientLayout.tsx',
    '!app/loading.tsx',
    '!app/not-found.tsx',
    '!app/manifest.ts',
    '!app/robots.ts',
    '!app/sitemap.ts',
    '!app/blog/**', // Exclude blog pages
    '!components/ui/**', // Exclude UI components from coverage
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
    '/__tests__/',
    '/__mocks__/',
    '/components/ui/',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// Wrap the config to ensure coverageProvider is always set to v8
const baseJestConfig = createJestConfig(customJestConfig)
module.exports = async () => {
  const config = await baseJestConfig()
  // Explicitly set coverage provider to v8 to override any defaults from next/jest
  // This prevents babel-plugin-istanbul compatibility issues with Next.js
  config.coverageProvider = 'v8'
  return config
}









