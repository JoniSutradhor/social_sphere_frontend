import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
    globalIgnores([
        '**/package-lock.json',
        '**/dist',
        '**/public',
        '**/node_modules',
    ]),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            eslintConfigPrettier,
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'prettier/prettier': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            'no-script-url': 'error',
            'no-await-in-loop': 'error',
            'consistent-return': 'error',
            'no-cond-assign': ['error', 'always'],
            camelcase: ['error', { properties: 'never' }],
            'no-param-reassign': ['error', { props: true }],
            'no-nested-ternary': 'error',
        },
    },
    prettier,
]);
