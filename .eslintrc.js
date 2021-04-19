module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['**/*.test.util.{ts,tsx}'],
      env: {
        jest: true,
      },
    },
  ],
};
