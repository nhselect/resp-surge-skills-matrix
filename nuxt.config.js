export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'LTLC Respiratory Surge in Children Searchable Index',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://cdn.counter.dev/script.js',
        'data-id': '4207b5f4-18b4-4844-9000-51dbeb9fe9c9',
        'data-utcoffset': 0,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/to-readable-time.js' },
    { src: '~/plugins/pwa-update.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/localforage',
    '@nuxtjs/pwa',
  ],

  styleResources: {
    scss: [
      '~assets/scss/_variables.scss',
      'nhsuk-frontend/packages/core/all.scss',
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: ['nuxt-buefy', '@nuxt/content'],
  modules: ['@nuxt/content'],

  content: {},

  pwa: {
    icon: {
      fileName: 'icon_ltlc.png',
    },
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: 'default',
      name: 'LTLCRespSurgeSearchableIndex',
    },
    manifest: {
      name: 'LTLC Respiratory Surge in Children Searchable Index',
    },
  },

  hooks: {
    // Doc: https://content.nuxtjs.org/advanced#contentfilebeforeinsert
    'content:file:beforeInsert': async (document, database) => {
      // search for markdown
      if (document.extension === '.md' && document.profile) {
        // Replace Markdown string in database
        // with the JSON ATS version
        document.profile = await database.markdown.toJSON(document.profile)

        if (document.additionalResources) {
          for (let i = 0; i < document.additionalResources.length; i++) {
            if (document.additionalResources[i].description) {
              document.additionalResources[i].description =
                await database.markdown.toJSON(
                  document.additionalResources[i].description
                )
            }
          }
        }
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },
}
