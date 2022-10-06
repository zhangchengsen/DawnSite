<template>
  <div>
    <div class="px-5 pb-5">
      <h4>精彩评论</h4>
    </div>
    <n-grid :x-gap="20">
      <n-grid-item :span="24">
        <LoadingGroup
          :error="error"
          :pending="pending"
          :is-empty="rows.length === 0"
        >
          <CommonList
            v-for="(item, index) in rows"
            :key="index"
            :item="item"
            @commentSuccess="refresh"
          >
            <CommonList
              v-for="(item2, index2) in item.post_comments"
              :key="index2"
              :item="item2"
              @commentSuccess="refresh"
            ></CommonList>
          </CommonList>
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
    </n-grid>
  </div>
</template>
<script setup>
import { NButton, NGrid, NGridItem, NPagination } from "naive-ui";
const props = defineProps(["post_id"]);
const page = ref(1);
defineExpose({
  handlePageChange,
});
const limit = ref(5);

const { total, rows, pending, error, refresh } = await usePage(() => {
  return usePostCommentApi(() => {
    return {
      page: page.value,
      limit: limit.value,
      post_id: props.post_id,
    };
  });
});
console.log(rows);
function handlePageChange(p) {
  page.value = p;
  refresh();
}
</script>
<style scoped></style>
