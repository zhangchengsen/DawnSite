<template>
  <UiCard>
    <UiCardHeader>
      <span class="mb-2 text-xs text-gray-400">学习进度</span>
      <NProgress type="line" :show-indicator="item.progress" :percentage="10" />
    </UiCardHeader>
    <UiCardBody class="flex">
      <n-tag size="small" v-if="route.query.tab != 'column'">{{
        t[item.type]
      }}</n-tag>
      <span class="ml-3">{{ item.title }}</span>
      <NButton type="primary" size="medium" class="ml-auto" @click="open"
        >继续观看</NButton
      >
    </UiCardBody>
  </UiCard>
</template>
<script setup>
import { NProgress, NTag, NButton } from "naive-ui";
const props = defineProps({
  item: Object,
});
const route = useRoute();
const t = {
  audio: "音频",
  video: "视频",
  media: "图文",
  column: "专栏",
  book: "电子书",
  course: "课程",
};
function open() {
  navigateTo(`/detail/${route.query.tab}/${props.item.id}`);
}
</script>
<style scoped></style>
