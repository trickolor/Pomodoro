module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        'no-undef': 0,
        '@typescript-eslint/no-var-requires': 0,
        'react/no-children-prop': 0
    }
};