module.exports = {
  "env": { "es6": true, "node": true },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "parser": "babel-eslint",
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  'rules': {
    'no-unused-vars': ['error', { 'args': 'none' }],
    "semi": [ "error", "never" ],
    "no-console": "off"
  }
}
