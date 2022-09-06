<template>
  <div class="text-lg my-3">
    <h5>{{ title }}的搜索结果</h5>
    <UiTab>
      <UiTabItem
        v-for="(item, index) in tabs"
        :key="index"
        :active="type === item.value"
        @click="handleClick(item.value)"
        >{{ item.label }}</UiTabItem
      >
    </UiTab>
    <LoadingGroup :error="error" :pending="pending">
      <template #loading>
        <LoadingCourseSkeletion></LoadingCourseSkeletion>
      </template>
      <n-grid x-gap="20" :cols="4">
        <n-gi v-for="(item, index) in rows" :key="index">
          <CourseList :item="item"></CourseList>
        </n-gi>
      </n-grid>
      <div class="flex justify-center items-center mt-5 mb-10">
        <n-pagination
          size="large"
          :item-count="total"
          :page="page"
          :page-size="limit"
          :on-update:page="handlePageChange"
        />
      </div>
    </LoadingGroup>
  </div>
</template>
<script setup>
import { NGrid, NGi, NPagination } from "naive-ui";
import { onBeforeUnmount } from "vue";
const route = useRoute();
const title = ref(route.query.keyword);
const tabs = ref([
  {
    label: "课程",
    value: "course",
  },
  {
    label: "专栏",
    value: "column",
  },
]);
const type = ref(route.params.type);

useHead(title);
function handleClick(value) {
  navigateTo({
    params: {
      ...route.params,
      type: value,
    },
    query: {
      ...route.query,
    },
  });
}

const {
  page,
  limit,
  data,
  pending,
  error,
  refresh,
  rows,
  total,
  handlePageChange,
} = await usePage(({ page, limit }) =>
  useSearchListApi(() => ({
    page,
    keyword: encodeURIComponent(title.value),
    type: type.value,
  }))
);
const stop = watch(
  () => route.query.keyword,
  (newVal) => {
    console.log(newVal);
    title.value = newVal;
    refresh();
  }
);
onBeforeUnmount(() => stop());
</script>
<style scoped></style>
