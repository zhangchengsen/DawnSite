<template>
  <n-drawer
    v-model:show="drawer"
    placement="top"
    :on-after-enter="addKeyDownEvent"
    :on-after-leave="removeKeyDownEvent"
  >
    <div class="h-full flex justify-center items-center">
      <n-input-group class="flex justify-center">
        <n-input
          v-model:value="keyword"
          placeholder="请输入关键词"
          size="large"
          :style="{ width: '500px' }"
        />
        <n-button
          type="primary"
          ghost
          :disabled="!keyword"
          size="large"
          @click="handleSearch"
        >
          搜索
        </n-button>
      </n-input-group>
    </div>
  </n-drawer>
</template>
<script setup>
import { NDrawer, NInputGroup, NInput, NButton } from "naive-ui";
defineExpose({
  open,
});
const keyword = ref("");
const drawer = ref(false);
const close = () => (drawer.value = false);
function open() {
  keyword.value = "";
  drawer.value = true;
}
function handleEnterEvent(e) {
  if (e.key === "Enter" && keyword.value) handleSearch();
}
const addKeyDownEvent = () =>
  document.addEventListener("keydown", handleEnterEvent);
const removeKeyDownEvent = () =>
  document.removeEventListener("keydown", handleEnterEvent);

function handleSearch() {
  setTimeout(() => {
    drawer.value = false;
  }, 100);
  navigateTo({
    name: "search-type-page",
    params: {
      type: "course",
      page: 1,
    },
    query: {
      keyword: keyword.value,
    },
  });
}
</script>

<style scoped></style>
