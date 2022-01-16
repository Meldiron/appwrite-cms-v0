const title = 'AppwriteCMS | Headless Admin Panel'
const description =
  'Prepare admin panels for your projects rapidly using AppwriteCMS, a headless CMS for any Appwrite project.'
const cover =
  'https://raw.githubusercontent.com/Meldiron/appwrite-cms/master/static/cover.png'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  env: {
    APPVERSION: '0.1.0',
    CONFIG_PATH:
      process.env.IS_DEVELOPMENT === 'true' ? 'dev_config.json' : 'config.json',
  },

  router: {
    middleware: 'loadConfig',
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: title,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },

      { hid: 'og:title', name: 'og:title', content: title },
      { hid: 'description', name: 'description', content: description },
      // { hid: 'og:url', name: 'og:url', content: url },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:description', name: 'og:description', description },
      { hid: 'og:image', name: 'og:image', content: cover },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      // {
      //   hid: 'twitter:domain',
      //   name: 'twitter:domain',
      //   content: url
      //     .split('http://')
      //     .join('')
      //     .split('https://')
      //     .join('')
      //     .split('/')
      //     .join(''),
      // },
      // { hid: 'twitter:url', name: 'twitter:url', content: url },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
      { hid: 'twitter:image', name: 'twitter:image', content: cover },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  axios: {
    baseURL: '/', // Used as fallback if no runtime config is provided
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/assets/js/script.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', 'vue2-editor/nuxt'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
