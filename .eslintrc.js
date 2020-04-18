module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 0,
    'no-unused-vars': [0, {'args': 'none'}],
    'semi': [2, 'never'],
    'object-curly-spacing': [2, 'never'],
    'comma-dangle': [2, 'never'],
    'no-unused-expressions': [0, {'allowShortCircuit': true, 'allowTernary': true}],
    'prefer-const': 0,
    'prefer-template': 0,
    'prefer-arrow-callback': 0,
    'max-len': [0, 120],
    'space-before-function-paren': [2, {'anonymous': 'ignore', 'named': 'always' }],
    'object-shorthand': [2, 'always', { 'avoidQuotes': true }],
    'no-param-reassign': [2, { "props": false }],
    'global-require': 0,
    'brace-style': [2, 'stroustrup', {'allowSingleLine': true }],
    'arrow-body-style': [2, 'always'],
    'func-names': [2, 'never'],
    'default-case': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'camelcase': 0,
    'quote-props': 0,
    'no-undef': 0,
    'no-else-return': 0,
    'no-underscore-dangle': 0,
    'prefer-rest-params': 0,
    'indent': 0,
    'semi': 0,
    'quotes': 0
  }
}
