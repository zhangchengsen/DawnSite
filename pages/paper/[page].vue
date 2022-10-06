<template>
  <n-grid :x-gap="20">
    <n-grid-item :span="18">
      <LoadingGroup
        :error="error"
        :pending="pending"
        :is-empty="rows.length === 0"
      >
        <test-paper-list
          v-for="(item, index) in rows"
          :key="index"
          :item="item"
        ></test-paper-list>
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
    </n-grid-item>
    <n-grid-item :span="6"><HotCourseList /></n-grid-item>
  </n-grid>
</template>
<script setup>
import { NButton, NGrid, NGridItem, NPagination } from "naive-ui";
const route = useRoute();
console.log(route.params.page);
const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => {
    return useListApi("testpaper", { page });
  });
useHead({
  title: "考试列表",
});
function test() {
  useHashAuth(() => {
    console.log("测试通过");
  });
}
</script>
