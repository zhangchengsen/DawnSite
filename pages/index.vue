<template>
  <div>
    <template v-if="pending"> 加载中... </template>
    <template v-else-if="error"> 错误信息{{ error?.data }} </template>
    <template v-else>
      <template v-for="(item, index) in data" :key="index">
        <Banner :data="item.data" v-if="item.type === 'swiper'"></Banner>
      </template>
    </template>
  </div>
</template>
<script setup>
//lifeCircle
//      数据 状态 刷新 错误信息
const { data, pending, refresh, error } = await useFetch(
  "http://demonuxtapi.dishait.cn/pc/index",
  {
    key: "indexData",
    headers: { appid: "bd9d01ecc75dbbaaefce" },
    transform: (res) => res.data, //相当于响应拦截器
    initialCache: false,
    lazy: true,
  }
);
//如果是服务端时直接报错
if (process.server && error.value) {
  throwError(error.value?.data?.data);
}
//function
</script>
<style scoped lang="less"></style>
