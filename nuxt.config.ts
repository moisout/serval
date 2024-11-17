export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'serval',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  future: {
    compatibilityVersion: 4
  },

  hub: {
    database: true
  },

  nitro: {
    experimental: {
      openAPI: true
    }
  },

  auth: {
    baseURL: '/api/auth',
    provider: {
      type: 'local',
      session: {
        dataType: {
          id: 'string',
          username: 'string'
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

  modules: ['@nuxt/icon', '@nuxt/fonts', '@sidebase/nuxt-auth', '@nuxthub/core']
})
