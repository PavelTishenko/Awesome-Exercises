module.exports = {
  root: true,
  extends: ['@react-native', 'airbnb', 'airbnb-typescript', 'prettier'],
  plugins: ['import'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
    },
  },
  rules: {
    // General

    // https://eslint.org/docs/rules/no-restricted-exports
    'no-restricted-exports': ['error', {restrictedNamedExports: ['then']}],

    // https://eslint.org/docs/rules/consistent-return
    'consistent-return': ['error', {treatUndefinedAsUnspecified: false}],

    // https://eslint.org/docs/latest/rules/no-void
    'no-void': ['error', {allowAsStatement: false}],

    // https://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': 'off',

    // https://eslint.org/docs/latest/rules/no-console
    'no-console': ['warn', {allow: ['warn', 'error']}],

    // Typescript Plugin

    // disabling to allow define styles after component defining
    // https://typescript-eslint.io/rules/no-use-before-define/
    '@typescript-eslint/no-use-before-define': 'off',

    // https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],

    // https://typescript-eslint.io/rules/consistent-type-imports/
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {prefer: 'type-imports', fixStyle: 'inline-type-imports'},
    ],

    // https://typescript-eslint.io/rules/no-import-type-side-effects/
    '@typescript-eslint/no-import-type-side-effects': 'error',

    // React Plugin

    // https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/function-component-definition.md
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],

    // https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/require-default-props.md
    'react/require-default-props': 'off',

    // https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/jsx-props-no-spreading.md
    'react/jsx-props-no-spreading': 'off',

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'back'],
      },
    ],

    // Import Plugin

    // https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/no-duplicates.md
    'import/no-duplicates': ['error', {'prefer-inline': true}],

    // https://github.com/import-js/eslint-plugin-import/blob/3a5ad34ca69a5c3239fff56241eb7e353d87274c/docs/rules/no-cycle.md
    'import/no-cycle': 'off',

    // React-Native Plugin

    // https://github.com/Intellicode/eslint-plugin-react-native/blob/HEAD/docs/rules/no-unused-styles.md
    'react-native/no-unused-styles': 'error',

    // https://github.com/Intellicode/eslint-plugin-react-native/blob/HEAD/docs/rules/no-inline-styles.md
    'react-native/no-inline-styles': 'warn',

    // https://github.com/Intellicode/eslint-plugin-react-native/blob/HEAD/docs/rules/no-color-literals.md
    'react-native/no-color-literals': 'error',

    // https://github.com/Intellicode/eslint-plugin-react-native/blob/HEAD/docs/rules/no-single-element-style-arrays.md
    'react-native/no-single-element-style-arrays': 'warn',
  },
};
