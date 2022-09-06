import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - 晨曦小站",
      title: "晨曦小站",
      charset: "utf-8",
      htmlAttrs: {
        lang: "zh-cn",
      },
      meta: [
        {
          name: "description",
          content: "晨曦小站描述",
        },
        {
          name: "keywords",
          content: "晨曦小站关键词",
        },
      ],
      script: [
        // {src:"http://"}
      ],
      link: [
        // {rel:"stylesheet", href:"http..."} 第三方cdn
      ],
    },
  },
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
  autoImports: {
    dirs: ["apis"],
  },
});
