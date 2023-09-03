module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': [
      'babel-jest',
      { configFile: `${__dirname}/babel.config.js` },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-branch|-reanimated|-maps|-android-location-enabler|-safe-area-context)?|@react-native(-community)?|p-retry)|@react-navigation/|@ctech/form-builder-ui-component/)',
    'jest-runner',
  ],
  testMatch: ['**/?*.+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.ts',
  ],
};
