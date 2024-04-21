module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    indent: 'off',
    'linebreak-style': 'off',
    'eol-last': 0,
    'max-len': 0,
    'spaced-comment': 0,
    'no-underscore-dangle': 'off',
    'object-curly-spacing': ['error', 'always'],
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-plusplus': 'off',
    'no-new': 'off',
    'no-undef': 'off',
    'no-bitwise': [
        'error',
        {
            allow: [
                '~',
            ],
        },
    ],
    'class-methods-use-this': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vue/require-valid-default-prop': 'warn',
    'vue/no-setup-props-destructure': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/valid-next-tick': 'warn',
    'vue/html-indent': ['error', 4, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
    }],
    'vue/script-indent': ['error', 4, {
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
    }],
    'vue/html-closing-bracket-spacing': ['error', {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never',
    }],
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off'
},
settings: {
  'import/resolver': {
    alias: {
      map: [
        ['@', './src'],
      ],
      extensions: ['.ts', '.js', '.vue'],
    },
  },
},
};
