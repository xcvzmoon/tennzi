const DEFAULT_HOST = '0.0.0.0';
const host = process.env.TAURI_HOST;

export default defineNuxtConfig({
  compatibilityDate: '2026-08-24',
  experimental: {
    typedPages: true,
  },
  devtools: {
    enabled: false,
  },
  devServer: {
    host: host ?? DEFAULT_HOST,
  },
  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true,
      ws: host
        ? {
            protocol: 'ws',
            port: 3001,
            host,
          }
        : undefined,
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {
      compilerOptions: {
        rootDir: '..',
      },
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  app: {
    head: {
      title: 'Tennzi',
      charset: 'utf8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'format-detection',
          content: 'no',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
  nitro: {
    preset: 'bun',
  },
  dir: {
    modules: 'app/modules',
  },
  runtimeConfig: {
    public: {
      cache: {
        url: '',
      },
    },
  },
  ssr: false,
  ignore: ['**/src-tauri/**'],
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/hints', '@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt'],
});
