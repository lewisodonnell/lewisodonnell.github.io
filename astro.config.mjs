// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// `site` is the single source of truth for the production URL. The sitemap,
// RSS feed, canonical URLs, OG tags, robots.txt and JSON-LD all derive from
// it — when moving to a custom domain, change only this value (see README).
export default defineConfig({
  site: 'https://lewisodonnell.github.io',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: { theme: 'css-variables' },
  },
  vite: {
    plugins: [yaml()],
  },
});
