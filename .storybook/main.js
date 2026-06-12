const config = {
  stories: ['../components/**/*.stories.js'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/html-vite', options: {} },
  viteFinal: async (config) => {
    // On GitHub Actions the static site lives at /componentes-biblioteca/.
    // Setting base here ensures all chunk and asset URLs resolve correctly.
    if (process.env.GITHUB_ACTIONS) {
      config.base = '/componentes-biblioteca/';
    }
    return config;
  },
};

export default config;