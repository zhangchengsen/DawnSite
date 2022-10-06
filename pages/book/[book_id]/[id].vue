<template>
  <LoadingGroup :pending="pending" :error="error">
    <div v-if="data" v-html="data.content"></div>
  </LoadingGroup>
</template>
<script setup>
const route = useRoute();
const { id, book_id } = route.params;
const { data, error, pending } = await useBookDetail(book_id, id);
const title = computed(() => (data.value ? data.value.title : "电子书详情页"));
useHead({ title });
definePageMeta({
  middleware(to, from) {
    //验证id
    const { id } = to.params;
    if (isNaN(+id)) {
      return abortNavigation("页面不存在");
    }
    return true;
  },
});
</script>
<style></style>
