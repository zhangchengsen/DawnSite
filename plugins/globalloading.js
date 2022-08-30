import { createDiscreteApi } from "naive-ui";
//蓝色加载条
export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref(null);
  nuxtApp.hook("app:mounted", (e) => {
    // console.log("mounted", e);
    if (!bar.value) {
      const { loadingBar } = createDiscreteApi(["loadingBar"]);
      bar.value = loadingBar;
    }
  });
  nuxtApp.hook("page:start", (e) => {
    bar.value?.start();
  });
  nuxtApp.hook("page:finish", (e) => {
    setTimeout(() => {
      bar.value?.finish();
    }, 150);
    // console.log("finish", e);
  });
  nuxtApp.hook("app:error", (e) => {
    // console.log("app error", e);
    if (process.client) {
      setTimeout(() => {
        bar.value?.finish();
      }, 150);
    }
  });
});
