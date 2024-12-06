import tseslint from 'typescript-eslint';
import tsparser from '@typescript-eslint/parser';
import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsparser
    },
    plugins: {},
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts']
        },
        typescript: {
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
);
