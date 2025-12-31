const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
	{
		ignores: ['node_modules', 'dist', 'coverage', 'eslint.config.cjs', '.eslintrc.cjs']
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
				ecmaFeatures: {
					jsx: true
				},
				sourceType: 'module'
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2024
			}
		},
		settings: {
			react: {
				version: 'detect'
			},
			'import/resolver': {
				typescript: {
					project: './tsconfig.json'
				}
			}
		},
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'jsx-a11y': jsxA11yPlugin,
			import: importPlugin
		},
		rules: {
			...prettier.rules,
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/prop-types': 'off',
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					pathGroups: [
						{
							pattern: '@/**',
							group: 'internal',
							position: 'before'
						}
					],
					pathGroupsExcludedImportTypes: ['builtin'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					}
				}
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					disallowTypeAnnotations: false
				}
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],
			'@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'jsx-a11y/anchor-is-valid': [
				'error',
				{
					components: ['Link'],
					specialLink: ['to']
				}
			]
		}
	},
	{
		files: ['**/*.test.{ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.vitest
			}
		}
	},
	{
		files: ['vite.config.ts'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.node.json',
				tsconfigRootDir: __dirname
			}
		}
	}
);
