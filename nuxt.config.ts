import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/main.css"], // ~代表根目录
  buildModules: ["nuxt-windicss"],
  build: {
    transpile: [
      "naive-ui",
      "vueuc",
      "@css-render/vue3-ssr",
      "@juggle/resize-observer",
    ],
  },
  vite: {
    optimizeDeps: {
      include: ["date-fns-tz/esm/formatInTimeZone"],
    },
  },
});
