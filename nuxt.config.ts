import { fileURLToPath } from 'url';

const customComponents: Record<string, string> = {
  'input': '~/components/ui/Input.vue',
}

export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components'],
  },

  css: ['~/assets/scss/main.scss'],

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
    '@': '/',
    '@ui': '/components/ui',
    '@components': '/components',
    '@composables': '/composables',
    '@assets': '/assets',
    '@utils': '/utils',
    '@types': '/types',
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
      perplexityApiKey: process.env.PERPLEXITY_API_KEY
    }
  },

  compatibilityDate: '2024-09-11',
  modules: ['@nuxt/fonts'],
  fonts: {
    families: [
      { name: 'Montserrat', provider: 'google' },
      { name: 'Quicksand', provider: 'google' },
    ]
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})
