export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Dev uses local SQLite/fs, production builds bind D1/R2 on Cloudflare
  hub: {
    db: 'sqlite',
    blob: { bucketName: 'serval' }
  },

  nitro: {
    experimental: {
      openAPI: true
    },
    cloudflare: {
      wrangler: {
        name: 'serval',
        compatibility_date: '2025-01-01',
        // The generated wrangler.json replaces the dashboard's plain-text vars on deploy
        vars: Object.fromEntries(
          ['NUXT_PUBLIC_LICENSE_NOTICE', 'NUXT_PUBLIC_LICENSE_TEXT']
            .filter((key) => process.env[key])
            .map((key) => [key, process.env[key]!])
        ),
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'serval',
            database_id: '99986f84-c749-4940-86fb-c22a9bc70190',
            // Relative to dist/_worker.js/wrangler.json, keeps the table used by NuxtHub v0.8
            migrations_dir: 'db/migrations',
            migrations_table: '_hub_migrations'
          }
        ]
      }
    }
  },

  $production: {
    nitro: {
      preset: 'cloudflare-pages'
    }
  },

  runtimeConfig: {
    public: {
      licenseNotice: '',
      licenseText: ''
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
    'nuxtjs-naive-ui',
    '@nuxtjs/mdc'
  ]
})
