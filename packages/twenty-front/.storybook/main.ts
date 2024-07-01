import { StorybookConfig } from '@storybook/react-vite';

const computeStoriesGlob = () => {
  if (process.env.STORYBOOK_SCOPE === 'pages') {
    return [
      '../src/pages/**/*.stories.@(js|jsx|ts|tsx)',
      '../src/__stories__/*.stories.@(js|jsx|ts|tsx)',
      '../src/pages/**/*.docs.mdx',
      '../src/__stories__/*.docs.mdx',
    ];
  }

  if (process.env.STORYBOOK_SCOPE === 'modules') {
    return [
      '../src/modules/**/!(perf)/*.stories.@(js|jsx|ts|tsx)',
      '../src/modules/**/*.docs.mdx',
    ];
  }

  if (process.env.STORYBOOK_SCOPE === 'performance') {
    return ['../src/modules/**/perf/*.perf.stories.@(js|jsx|ts|tsx)'];
  }

  if (process.env.STORYBOOK_SCOPE === 'ui-docs') {
    return ['../src/modules/ui/**/*.docs.mdx'];
  }

  return ['../src/**/*.docs.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'];
};

const config: StorybookConfig = {
  stories: computeStoriesGlob(),
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-coverage',
    'storybook-dark-mode',
    'storybook-addon-cookie',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
