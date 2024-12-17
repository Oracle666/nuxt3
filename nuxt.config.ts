// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  css: [
    '~/assets/scss/main.scss'
  ],
  app: {
    baseURL: process.env.NODE_ENV === 'development' ? '' : '/nuxt3/'
  },
  srcDir: 'src/',
  compatibilityDate: '2024-11-01',
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      }
    }
  }
})