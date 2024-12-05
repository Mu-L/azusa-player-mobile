module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'expo',
    // './node_modules/gts/',
  ],
  parserOptions: {
    ecmaVersion: 2017, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['prettier'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    // RN does require to load local src
    '@typescript-eslint/no-require-imports': 'off',
    // HACK: i'm too lazy to build bilibili data types so off it goes
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-definitions': 'error',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    // HACK: this is purely for noxplayer ts compatibility.
    // do NOT use ts-ignore for anything else
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  settings: {
    react: { version: 'detect' },
    // 'import/ignore': ['node_modules/react-native/index\\.js$'], doesnt work anymore..?
    'import/ignore': ['react-native'],
    'import/resolver': {
      'babel-module': {},
    },
  },
  env: {
    node: true,
  },
};
