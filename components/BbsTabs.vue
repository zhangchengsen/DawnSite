<template>
  <UiTab>
    <UiTabItem
      v-for="(item, index) in tabs"
      @click="handleClick(item.id)"
      :key="index"
      :active="item.id === bbs_id"
      >{{ item.title }}</UiTabItem
    >
  </UiTab>
</template>
<script setup>
const route = useRoute();
const { data } = await useBbsListApi();
const bbs_id = ref(parseInt(route.params.bbs_id));
const tabs = computed(() => {
  return [
    {
      id: 0,
      title: "全部",
    },
    ...(data.value ? data.value.rows : []),
  ];
});
console.log(data);
function handleClick(id) {
  navigateTo({
    params: {
      ...route.params,
      page: 1,
      bbs_id: id,
    },
    query: {
      ...route.query,
    },
  });
}
</script>
