import globals from 'globals';

/**
 * Tek bir ESLint yapılandırması
 *
 * @type {import("eslint").Linter.Config}
 */
export default {
  root: true,
  // JS Temel kurallar
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'turbo', 'onlyWarn', 'unicorn'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    ...globals.serviceworker,
    ...globals.browser,
  },
  rules: {
    // React kuralları
    'react/react-in-jsx-scope': 'off',

    // React Hook kuralları
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Turbo kuralları
    'turbo/no-undeclared-env-vars': 'warn',

    // Console.log uyarıları
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

    // TypeScript için özel kurallar
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

    // Dosya adı kuralları (kebab-case)
    'unicorn/filename-case': [
      'warn',
      {
        cases: {
          kebabCase: true,
        },
        // .d.ts dosyaları ve özel dosyalar için istisna ekle
        ignore: ['\\.d\\.ts$', 'README\\.md$', 'LICENSE$'],
      },
    ],
  },
  ignorePatterns: ['dist/**', 'node_modules/**', '.turbo/**', 'build/**'],
};
