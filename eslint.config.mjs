import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import autofix from 'eslint-plugin-autofix';
import _import from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  eslintPluginPrettierRecommended,
  {
    ignores: [
      'eslint.config.mjs',
      'webpack.config.js',
      '**/.lintstagedrc.json',
      '**/update-env.js',
      'apps/*/src/database/migrations/*',
      'node_modules/',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:import/typescript',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:unicorn/recommended',
      'plugin:import/recommended',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'simple-import-sort': simpleImportSort,
      autofix,
      import: fixupPluginRules(_import),
      unicorn: fixupPluginRules(unicorn),
      sonarjs,
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        projectService: true,
        project: [
          'tsconfig.json',
          'apps/*/tsconfig.app.json',
          'libs/*/tsconfig.lib.json',
        ],
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      'unused-imports/no-unused-imports': 'warn',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-static-only-class': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/expiring-todo-comments': 'off',
      'sonarjs/no-duplicate-string': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          vars: 'all',
          args: 'after-used',
        },
      ],

      '@typescript-eslint/adjacent-overload-signatures': 'error',

      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
        },
      ],

      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          overrides: {
            constructors: 'off',
          },
        },
      ],

      '@typescript-eslint/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },

          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],

      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],

      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'error',
      'keyword-spacing': 'off',
      '@typescript-eslint/keyword-spacing': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-use-before-declare': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',

      '@typescript-eslint/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],

      '@typescript-eslint/semi': ['error', 'always'],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],

          filter: {
            regex: '^_.*$',
            match: false,
          },
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
      ],

      '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-await-in-loop': 'error',
      'prettier/prettier': 'off',

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'try',
        },
        {
          blankLine: 'always',
          prev: 'try',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'block-like',
        },
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'throw',
        },
        {
          blankLine: 'always',
          prev: 'var',
          next: '*',
        },
      ],

      'arrow-body-style': 'error',
      'arrow-parens': ['error', 'always'],
      complexity: 'off',

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'rxjs/Rx',
              message: "Please import directly from 'rxjs' instead",
            },
          ],
        },
      ],

      'object-curly-spacing': ['error', 'always'],
      'no-multi-spaces': 'error',
      'no-useless-return': 'error',
      'no-else-return': 'error',
      'no-implicit-coercion': 'error',
      'constructor-super': 'error',
      yoda: 'error',
      strict: ['error', 'never'],
      curly: 'error',
      'dot-notation': 'error',
      'eol-last': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-match': 'error',
      'max-classes-per-file': ['error', 5],
      'max-len': 'off',

      'new-parens': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-dupe-else-if': 'error',
      'lines-between-class-members': ['error', 'always'],

      'no-console': [
        'error',
        {
          allow: [
            'info',
            'dirxml',
            'warn',
            'error',
            'dir',
            'timeLog',
            'assert',
            'clear',
            'count',
            'countReset',
            'group',
            'groupCollapsed',
            'groupEnd',
            'table',
            'Console',
            'markTimeline',
            'profile',
            'profileEnd',
            'timeline',
            'timelineEnd',
            'timeStamp',
            'context',
          ],
        },
      ],

      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'off',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-extra-bind': 'error',
      'no-fallthrough': 'error',
      'no-invalid-this': 'error',
      'no-irregular-whitespace': 'error',

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],

      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-return-await': 'error',
      'no-sequences': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-shadow': 'off',
      'no-throw-literal': 'error',
      'no-trailing-spaces': 'error',
      'no-undef-init': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'quote-props': ['error', 'consistent-as-needed'],
      radix: 'error',
      'use-isnan': 'error',
      'valid-typeof': 'off',
      'space-before-function-paren': 'off',
    },
  },
];
