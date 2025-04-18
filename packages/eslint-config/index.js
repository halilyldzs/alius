import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import turboPlugin from 'eslint-plugin-turbo';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Tek bir ESLint yapılandırması
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  // JS Temel kurallar
  js.configs.recommended,
  eslintConfigPrettier,

  // TypeScript kuralları
  ...tseslint.configs.recommended,

  // React kuralları
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Next.js kuralları
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Turbo kuralları
  {
    plugins: {
      turbo: turboPlugin,
      onlyWarn,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },

  // Özel proje kuralları
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      unicorn: unicornPlugin,
    },
    rules: {
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

      // React Hook kuralları
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

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
  },

  // Genel olarak görmezden gelinecek dosyalar
  {
    ignores: ['dist/**', 'node_modules/**', '.turbo/**', 'build/**'],
  },
];

export default config;
