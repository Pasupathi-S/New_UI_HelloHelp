import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
      },
    },
    plugins: {
      react,
      prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'es5',
          tabWidth: 2,
          semi: true,
          endOfLine: 'auto',
        },
      ],
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'default-param-last': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-props-no-spreading': [
        1,
        {
          custom: 'ignore',
        },
      ],
      'react/jsx-curly-spacing': [2, 'never'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
