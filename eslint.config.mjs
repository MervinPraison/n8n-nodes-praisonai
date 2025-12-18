import n8nNodesBase from 'eslint-plugin-n8n-nodes-base';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['dist/**', 'node_modules/**', 'test/**'],
	},
	{
		files: ['**/*.ts'],
		plugins: {
			'n8n-nodes-base': n8nNodesBase,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		rules: {
			...n8nNodesBase.configs.community.rules,
		},
	},
];
