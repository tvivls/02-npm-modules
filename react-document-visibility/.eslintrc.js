module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'unicorn'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
    ],
    settings: {
        'import/resolver': {
            alias: {
                map: [['~', './src/']],
                extensions: ['.ts', '.js'],
            },
        },
    },
    rules: {
        'quotes': ['error', 'single'],

        'object-curly-newline': ['off'],
        'prefer-destructuring': ['off'],
        'global-require': ['off'],
        'quote-props': ['error', 'consistent-as-needed'],
        'no-plusplus': ['off'],
        'arrow-body-style': ['off'],
        'consistent-return': ['off'],
        'no-param-reassign': ['error', { props: false }],
        'no-useless-return': ['off'],
        'arrow-parens': ['off'],
        'eqeqeq': ['warn', 'always', { null: 'ignore' }],
        'space-before-function-paren': ['off'],
        'func-names': ['error', 'never'],

        'linebreak-style': ['off'],
        'no-trailing-spaces': ['error'],
        'eol-last': ['error'],

        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

        'no-debugger': ['error'],
        'no-unused-vars': ['warn', { args: 'none' }],

        'prefer-const': ['off'],
        'max-len': ['off'],
        'space-infix-ops': ['off'],
        'import/extensions': ['off'],
        'import/no-unresolved': ['off'],
        'no-restricted-syntax': ['off'],
        'no-else-return': ['off'],
        'no-lonely-if': ['off'],

        'semi': ['off'],
        'comma-dangle': ['error', 'always-multiline'],
        'brace-style': ['off', 'stroustrup', { allowSingleLine: true }],

        // @NOTE: TS
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: false,
            },
        }],

        // @NOTE: Too TS
        '@typescript-eslint/ban-types': ['off'], // @TODO: Disable only baning {}
        '@typescript-eslint/no-namespace': ['off'],
        '@typescript-eslint/ban-ts-comment': ['off'],

        // @NOTE: imports
        'import/prefer-default-export': ['off'],
        'import/no-cycle': ['warn'],
        'import/namespace': ['off'],
    },
    overrides: [
        // TS/JS
        {
            files: ['src/**/*.ts', 'src/**/*.js'],
            excludedFiles: ['src/types/**/*.ts', 'src/types/**/*.js'],
            rules: {
                'unicorn/filename-case': [
                    'error',
                    {
                        cases: {
                            camelCase: true,
                            pascalCase: true,
                        },
                    },
                ],
            },
        },
        // TS Types/Enums/Constants
        {
            files: ['src/types/**/*.ts', 'src/constants/**/*.ts'],
            excludedFiles: ['src/types/**/*.d.ts', 'src/types/generated/**/*.ts'],
            rules: {
                'unicorn/filename-case': [
                    'error',
                    {
                        cases: {
                            pascalCase: true,
                        },
                    },
                ],
            },
        },
        // @types
        {
            files: ['@types/**/*.d.ts'],
            rules: {
                'unicorn/filename-case': [
                    'error',
                    {
                        cases: {
                            kebabCase: true,
                        },
                    },
                ],
            },
        },
    ],
};
