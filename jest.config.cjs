// jest.config.cjs
module.exports = {
 testEnvironment: 'jest-fixed-jsdom', // Required for React components
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Prevents errors with CSS imports
  },
   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
