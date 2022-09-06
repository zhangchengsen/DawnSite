<template>
  <div class="footer">
    <div class="flex item-center justify-center">
      <a href="#" v-for="i in 5" :key="i" class="p-3">友情链接</a>
    </div>
    <div
      class="container border-t border-gray-700 flex justify-center items-center py-5"
    >
      <small>Copyright © 2022 dishait.cn 粤ICP备2020100536号</small>
    </div>
  </div>
</template>
<style scoped>
.footer {
  @apply mt-auto bg-dark-400 text-gray-100;
}
</style>
