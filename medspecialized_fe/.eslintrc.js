module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',  // Vue-specific parser
  parserOptions: {
    parser: '@babel/eslint-parser', // Babel parser for JS files
    requireConfigFile: false, // Allow parsing without needing babel.config.js explicitly
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
