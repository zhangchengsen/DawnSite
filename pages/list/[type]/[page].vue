<template>
  <div class="text-lg my-3">
    <n-breadcrumb class="mb-5">
      <n-breadcrumb-item> <nuxt-link to="/">首页</nuxt-link></n-breadcrumb-item>

      <n-breadcrumb-item> {{ title }}</n-breadcrumb-item>
    </n-breadcrumb>
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
import {
  NGrid,
  NGi,
  NPagination,
  NBreadcrumb,
  NBreadcrumbItem,
} from "naive-ui";
import { onBeforeUnmount } from "vue";
const route = useRoute();
const { type } = route.params;
const title = route.meta.title;
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

const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => {
    return useListApi(type, {
      page,
    });
  });
definePageMeta({
  middleware: ["list"],
});
</script>
<style scoped></style>
