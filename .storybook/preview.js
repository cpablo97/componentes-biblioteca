import '../tokens/index.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: 'crema',
      values: [
        { name: 'crema',  value: '#F7F6F0' },
        { name: 'blanco', value: '#FCFBFA' },
        { name: 'negro',  value: '#191916' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
};

export default preview;