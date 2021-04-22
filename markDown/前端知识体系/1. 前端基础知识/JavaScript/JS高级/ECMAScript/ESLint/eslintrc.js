module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    $: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 5,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  plugins: ['prettier'],
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //强制使用单引号
    quotes: ['error', 'single'],
    //强制不使用分号结尾
    semi: ['error', 'never'],
  },
}
