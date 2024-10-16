import { fileURLToPath } from "url";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      title: '2board',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  components: {
    global: true,
    dirs: ['~/components'],
  },

  css: ['~/assets/scss/main.scss'],

  devtools: { enabled: false },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/variables.scss";',
          api: 'modern-compiler',
        }
      }
    },
  },

  alias: {
    '@ui': fileURLToPath(new URL('./components/ui', import.meta.url)),
    '@components': fileURLToPath(new URL('./components', import.meta.url)),
    '@composables': fileURLToPath(new URL('./composables', import.meta.url)),
    '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
    '@extensions': fileURLToPath(new URL('./utils/extensions', import.meta.url)),
    '@types': fileURLToPath(new URL('./types', import.meta.url)),
    '@pages': fileURLToPath(new URL('./pages', import.meta.url)),
    '@layouts': fileURLToPath(new URL('./layouts', import.meta.url)),
    '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
  },

  plugins: [
    '~/plugins/firebase' // Register the Firebase plugin
  ],

  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY
    }
  },

  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        jsx: 'preserve',
        jsxImportSource: 'vue',
      },
    },
  },

  compatibilityDate: '2024-09-11',
  modules: ['@nuxt/fonts'],
  fonts: {
    families: [
      { name: 'Montserrat', provider: 'google' },
      { name: 'Quicksand', provider: 'google' },
    ]
  },
})
