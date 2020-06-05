module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "func-names": "off",
    "no-console": "off",
    "max-len": ["error", 120],
    "newline-before-return": "error",
    "linebreak-style":0
  },
};
