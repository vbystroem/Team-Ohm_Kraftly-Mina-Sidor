/** @type {import('@storybook/vue3-vite').StorybookConfig} */
export default {
  stories: ['../src/**/*.stories.@(js|mjs|ts)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
}
