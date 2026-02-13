import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      injectRegister: null,
    }),
  ],
  build: {
    target: 'es2021',
  },
});
