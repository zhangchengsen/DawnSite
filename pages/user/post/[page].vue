<template>
  <LoadingGroup :error="error" :pending="pending" :isEmpty="rows.length === 0">
    <div class="p-3">
      <PostList
        v-for="(item, index) in rows"
        :key="index"
        :item="item"
        @delete="handleDeleteItem"
      ></PostList>
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
</template>
<script setup>
import { NPagination } from "naive-ui";
useHead({ title: "我的帖子" });
const {
  page,
  limit,
  data,
  pending,
  error,
  rows,
  refresh,
  total,
  handlePageChange,
} = await usePage(({ page, limit }) => usePostListApi(page));
async function handleDeleteItem({ id, success, fail }) {
  let { error } = await useDeletePostApi(id);
  if (error.value) {
    fail();
  } else {
    success();
    refresh();
  }
}
</script>
<style scoped></style>
