<template>
  <LoadingGroup :error="error" :pending="pending" :isEmpty="rows.length === 0">
    <div class="p-3">
      <UserBuyList
        v-for="(item, index) in rows"
        :key="index"
        :item="item"
      ></UserBuyList>
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
  await usePage(({ page, limit }) => useOrderLisApi(page));
</script>
<style scoped></style>
