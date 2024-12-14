import vuetify from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  plugins: ["@/plugins/vuetify"],
  css: ["vuetify/styles"],
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
});
