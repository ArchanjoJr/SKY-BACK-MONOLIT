module.exports = {
    "extends": [
        "airbnb-base",
    ],
    "env":{
        "es6":true
    },
    "overrides": [
    {
      "files": [
        "**/*.test.js"
      ],
      "env": {
        "mocha": true // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      "plugins": ["mocha"],
      "rules": {
        "mocha/no-exclusive-tests": "error",
        "no-unused-vars":0,
      }
    }
  ],
    "rules":{
        "no-console":0,
        'prefer-promise-reject-errors':0,
        'max-len':["error", {"code": 200,"comments":200}],
        'consistent-return':0,
        'no-restricted-syntax':0,
        'camelcase':0,
    },
    
};