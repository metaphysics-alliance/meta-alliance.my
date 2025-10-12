module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src', 'app'],
      },
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'jsx-a11y', 'import', 'tailwindcss'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/order': ['error', {
      groups: [
        ['builtin', 'external'],
        ['internal'],
        ['parent', 'sibling', 'index'],
        ['type'],
      ],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/enforces-shorthand': 'off',
  },
  overrides: [
    {
      files: ['*.config.{js,cjs,mjs,ts}', 'scripts/**/*.{js,ts}', 'vite.config.mjs'],
      env: {
        node: true,
      },
    },
    {
      files: ['tests/**/*.{js,jsx,ts,tsx}'],
      env: {
        node: true,
      },
    },
  ],
}
