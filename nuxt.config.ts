export default defineNuxtConfig({
  app: {
    head: {
      title: "Base Nuxt Setup",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
      // lang: "en",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@nuxtjs/device",
    "@nuxt/image",
  ],
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  css: ["~/assets/scss/main.scss"],
  image: {
    screens: {
      md: 481,
      lg: 1100,
      xl: 1441,
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/scss/element/index.scss" as *;
          @use "@/assets/scss/typography.scss" as *;
          @use "@/assets/scss/vars.scss" as *;
        `,
        },
      },
    },
  },
  elementPlus: {
    importStyle: "scss",
  },
  runtimeConfig: {
    apiKey: import.meta.env.NUXT_API_KEY,
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  routeRules: {},
});
