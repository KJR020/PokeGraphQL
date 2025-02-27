import vuetify from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  plugins: ["@/plugins/vuetify"],
  modules: ["@nuxt/test-utils/module", "@pinia/nuxt"],
  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins!.push(vuetify());
    },
  },
});
