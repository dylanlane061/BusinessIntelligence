module.exports = {
  root: true,

  extends: '@react-native-community',

  plugins: ['@typescript-eslint'],

  // TS specific linting
  overrides: [
    {
      files: ['*.ts', '*.tsx'],

      parser: '@typescript-eslint/parser',

      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        project: ['./tsconfig.json'],
      },

      rules: {
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
};
