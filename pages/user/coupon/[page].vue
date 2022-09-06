<template>
  <LoadingGroup :error="error" :pending="pending" :isEmpty="rows.length === 0">
    <div class="p-3">
      <n-grid :x-gap="20" :cols="2" v-for="(item, index) in rows" :key="index">
        <n-grid-item v-for="(item, index) in rows" :key="index">
          <UserCouponList :item="item"></UserCouponList>
        </n-grid-item>
      </n-grid>
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
import { NPagination, NGrid, NGridItem } from "naive-ui";
useHead({ title: "优惠券记录" });
const { page, limit, data, pending, error, rows, total, handlePageChange } =
  await usePage(({ page, limit }) => useUserCouponApi(page));
</script>
<style scoped></style>
