<template>
  <div class="text-lg my-3">
    <UiTab>
      <UiTabItem
        v-for="(item, index) in tabs"
        :key="index"
        :active="type === item.value"
        @click="handleClick(item.value)"
        >{{ item.label }}</UiTabItem
      >
    </UiTab>
    <LoadingGroup
      :error="error"
      :pending="pending"
      :isEmpty="rows.length === 0"
    >
      <div class="px-3">
        <UserHistoryList
          v-for="(item, index) in rows"
          :key="index"
          :item="item"
        ></UserHistoryList>
      </div>

      <div class="flex justify-center items-center mt-5 pb-10">
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
const route = useRoute();
const type = ref(route.query.tab || "course");

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
useHead({ title: "学习记录  " });
function handleClick(value) {
  navigateTo({
    params: {
      ...route.params,
      page: 1,
    },
    query: {
      ...route.query,
      tab: value,
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
  useUserHistoryApi(() => ({
    page,
    type: type.value,
  }))
);
</script>
<style scoped></style>
