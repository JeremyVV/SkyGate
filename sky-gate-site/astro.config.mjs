import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://skygatecommunity.home.lab',
  integrations: [tailwind()],
  output: 'static',
});
