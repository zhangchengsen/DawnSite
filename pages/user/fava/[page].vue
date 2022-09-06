<template>
  <LoadingGroup :error="error" :pending="pending" :isEmpty="rows.length === 0">
    <div class="p-3">
      <UserFavaList
        v-for="(item, index) in rows"
        :key="index"
        :item="item"
        @delete="handleDeleteItem"
      ></UserFavaList>
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
useHead({ title: "购买记录" });
const { page, limit, data, pending, error, rows, total, handlePageChange } =
  await usePage(({ page, limit }) => useMyFavaListApi(page));
console.log(data);
async function handleDeleteItem({ goods_id, type, success, fail }) {
  let {
    page,
    limit,
    data,
    pending,
    error,
    rows,
    total,
    handlePageChange,
    refresh,
  } = await useUnCollectApi({
    goods_id,
    type,
  });
  if (error.value) {
    fail();
  } else {
    success();
    refresh();
  }
}
</script>
<style scoped></style>
