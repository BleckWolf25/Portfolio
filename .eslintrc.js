export const rules = {
  semi: ['warn', 'always'],
  // Rule settings for specific files
  overrides: [
    {
      files: ['vite.config.js'],
      rules: {
        'import/no-default-export': 'on',
      },
    },
  ],
};