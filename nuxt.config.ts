import autoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import components from 'unplugin-vue-components/vite'

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
    plugins: [
      autoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),
      components({
        resolvers: [NaiveUiResolver()]
      })
    ],
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
