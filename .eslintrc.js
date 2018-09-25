module.exports = {
  'settings': {
    'react': {
      "version": "^16.2.0",
    },
    "import/core-modules": [ "body-parser" ]
  },
  "extends": [
    "airbnb-base",
    "plugin:react/recommended",
  ],
  "globals": {
    "document": true,
    "window": true,
    "React": true,
  },
  "env": {
    "mocha": true,
    "es6": true,
    "browser": true,
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "arrow-body-style": "off",
    "react/prop-types": 0,
    "no-console": 0,
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "should|expect|raf"
      }
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  
};