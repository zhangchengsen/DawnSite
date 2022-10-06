<template>
  <div>
    <BbsTabs></BbsTabs>
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <LoadingGroup
          :error="error"
          :pending="pending"
          :is-empty="rows.length === 0"
        >
          <div class="bg-white rounded">
            <UiTab>
              <UiTabItem
                v-for="(t, i) in ts"
                :key="i"
                :active="is_top === i"
                @click="handleIsTop(i)"
                >{{ t }}</UiTabItem
              >
            </UiTab>
            <PostList
              v-for="(item, index) in rows"
              :key="index"
              :item="item"
              :show-del="false"
            ></PostList>
          </div>
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
      <n-grid-item :span="6">
        <NuxtLink to="/post/add">
          <NButton type="primary" class="mb-5 w-full">发布帖子</NButton>
        </NuxtLink>
        <HotCourseList></HotCourseList>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script setup>
import { NGrid, NGridItem, NButton, NPagination } from "naive-ui";

const route = useRoute();

useHead({
  title: "社区问答列表",
});
definePageMeta({
  middleware(to, from) {
    const { bbs_id, page } = to.params;
    if (!isNaN(+bbs_id) && !isNaN(+page)) {
      useHead({
        title: "社区问答列表",
      });
      return true;
    }
    return abortNavigation("页面不存在");
  },
});
const bbs_id = ref(route.params.bbs_id);
const tabs = ref(["最新", "置顶"]);
const is_top = ref(route.params.is_top);
// const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
//   await usePage(({ page, limit }) => {
//     return useListApi("testpaper", { page });
//   });
const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => {
    return usePostListsApi(() => {
      return {
        page,
        bbs_id: bbs_id.value,
        is_top: is_top.value,
      };
    });
  });

const handleIsTop = (i) => {
  navigateTo({
    params: {
      ...route.params,
      page: 1,
    },
    query: {
      is_top: i,
    },
  });
  is_top.value = i;
  refresh();
};
</script>
