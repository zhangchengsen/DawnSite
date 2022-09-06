<template>
  <LoadingGroup :pending="pending" :error="error">
    <template v-for="(item, index) in data" :key="index">
      <Banner :data="item.data" v-if="item.type === 'swiper'"></Banner>
      <ImageNav v-else-if="item.type === 'icons'" :data="item.data"></ImageNav>
      <ImageAD :data="item.data" v-else-if="item.type === 'imageAD'"></ImageAD>
      <ListCard
        v-else-if="item.type === 'list'"
        :title="item.title"
        :data="item.data"
      ></ListCard>
      <ListCard
        v-else-if="item.type === 'promotion'"
        :title="item.title"
        :data="item.data"
        :type="item.listType"
      ></ListCard>
    </template>
  </LoadingGroup>
</template>
<script setup>
//lifeCircle
//      数据 状态 刷新 错误信息
useHead({
  title: "晨曦小站",
  meta: [
    {
      name: "description",
      content: "晨曦小站首页描述",
    },
    {
      name: "keywords",
      content: "晨曦小站首页关键字",
    },
  ],
});
const { data, error, pending } = await useIndexData();
// console.log(data);
//如果是服务端时直接报错
if (process.server && error.value) {
  throwError(error.value?.data?.data);
}
//function
</script>
<style scoped></style>
