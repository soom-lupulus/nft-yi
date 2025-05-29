import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})
/**
 * @doc https://nextjs.org/docs/app/api-reference/config/eslint
 */
const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
    ...compat.config({
        extends: ['next'],
        settings: {
            next: {
                rootDir: 'packages/frontend/',
            },
        },
        rules: {
            '@next/next/no-html-link-for-pages': 'off', // 禁用 no-html-link-for-pages 规则
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn', // 启用 @typescript-eslint/no-unused-vars 规则
        },
        ignorePatterns: ['generated/**', 'node_modules/**'],
        // overrides: [
        //     {
        //         files: [
        //             '**/*.ts',
        //             '**/*.tsx',
        //             'views/**/*.ts',
        //             'views/**/*.tsx',
        //         ], // 包含 views 文件夹
        //     },
        // ],
    }),
]

export default eslintConfig
