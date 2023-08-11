module.exports = {
    root: true,
    extends: [
      'airbnb',
      'plugin:react-hooks/recommended',
      'plugin:@tanstack/eslint-plugin-query/recommended',
    ],
    ignorePatterns: ['**/node_modules/*'],
    plugins: [
      'file-progress',
      '@tanstack/query',
    ],
    "settings": {
      "import/resolver": {
        "node": {
          "paths": ["src/"]
        }
      },
    },
    parserOptions: {
      ecmaVersion: 2022,
      ecmaFeatures: {
        jsx: true,
      },
      project: null,
    },
    env: {
      node: true,
      es6: true,
      browser: true,
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    rules: {
      'max-len': [2, {
        code: 160,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
      }],
      // Allow JSX inside of .tsx files for when we use Typescript
      'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],

      // Required for eslint-plugin-file-progress
      'file-progress/activate': 1,
      'linebreak-style': 'off',

      // Intentional Disables
      'comma-dangle': 0, // This is a personal preference, but I don't like dangling commas :D
      'no-debugger': 1, // I don't want this to error out the app, as CRA dies when that happens. Keep it a warning
      'react/prop-types': 0, // In my experience, proptypes don't offer much value but provide a lot of headache
      'import/prefer-default-export': 0, // Default exports require more refactoring when you want to add more exports so I tend to disable this
      'react/react-in-jsx-scope': 0, // no longer nessecary
      'jsx-a11y/no-autofocus': 0,
      'no-lone-blocks': 0, // This prevents jsx comments
      'react/jsx-props-no-spreading': 0, // Spreading makes passing props from model to view way less redundant
      'import/no-cycle': 0, // this is an expensive lint rule, so it's disabled by default. We might want to make a more strict lint config for the future
      'react/forbid-prop-types': 0, // typescript, no longer useful
    },
  };
