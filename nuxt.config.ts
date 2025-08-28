// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  runtimeConfig: {
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
  },
  components: [
    {
      path: "~/components/HelperComponents",
      pathPrefix: true,
      prefix: "helper",
      ignore: ["/View"],
    },
    { path: "~/components/HelperComponents/View", pathPrefix: true, prefix: "view" },
    { path: "~/components/PlatformComponents", pathPrefix: false },
  ],
  css: [
    "@/assets/css/colors.css",
    "@/assets/css/general.css",
    "@/assets/css/cool-gradient-hover.scss",
  ],

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],
});
