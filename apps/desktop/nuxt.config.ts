export default defineNuxtConfig({
  compatibilityDate: '2026-08-24',
  devtools: {
    enabled: false,
  },
  typescript: {
    typeCheck: false,
    strict: true,
    tsConfig: {
      compilerOptions: {
        rootDir: '..',
      },
    },
  },
  experimental: {
    typedPages: true,
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
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/hints', '@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt'],
});
