export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  hub: {
    database: true,
    blob: true
  },

  nitro: {
    experimental: {
      openAPI: true
    }
  },

  routeRules: {
    '/admin': { redirect: '/admin/users' }
  },

  auth: {
    baseURL: '/api/auth',
    provider: {
      type: 'local',
      session: {
        dataType: {
          id: 'string',
          username: 'string',
          role: 'string'
        }
      },
      token: {
        maxAgeInSeconds: 31_556_952
      },
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/session', method: 'get' }
      }
    },
    globalAppMiddleware: true
  },

  build: {
    transpile: ['naive-ui', 'vueuc']
  },

  alias: {
    string_decoder: 'string_decoder/'
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
           @use "sass:math";
           @use "~/assets/styles/globals.scss" as globals;
          `
        }
      }
    }
  },

  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@sidebase/nuxt-auth',
    '@nuxthub/core',
    'nuxtjs-naive-ui'
  ]
})
