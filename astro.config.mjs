import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
export default defineConfig({site:'https://code.rydgex.com', build:{format:'file'}, integrations:[react(),tailwind({applyBaseStyles:false}),...(process.env.NODE_ENV !== 'production' ? [keystatic()] : [])]});
