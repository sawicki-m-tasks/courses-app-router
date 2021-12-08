module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ['index.js', 'index.jsx', 'reportWebVitals.js'],
  rules: {
    'linebreak-style': 0,
    'arrow-parens': ['error', 'as-needed'],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
      },
    ],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/destructuring-assignment': ['error', 'never'],
    'keyword-spacing': ['error', {
      before: true,
      after: true,
    }],
    'import/prefer-default-export': 'off',
  },
};
