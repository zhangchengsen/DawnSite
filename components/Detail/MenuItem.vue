<template>
  <li
    class="detail-menu-item"
    @click="emits('click')"
    :class="{ active: active }"
  >
    <n-tag
      v-if="item.type"
      type="info"
      :bordered="false"
      size="small"
      class="mr-3"
      >{{ o[item.type] }}</n-tag
    >
    章节{{ index + 1 }}.{{ item.title }}
    <n-tag
      v-if="item.price == 0 || item.isfree"
      type="success"
      :bordered="false"
      size="small"
      class="ml-auto"
    >
      免费
    </n-tag>
  </li>
</template>
<script setup>
import { NTag } from "naive-ui";
const emits = defineEmits(["click"]);
const props = defineProps({
  item: Object,
  index: Number,
  active: {
    default: false,
    type: Boolean,
  },
});
const o = {
  media: "图文",
  video: "视频",
  audio: "音频",
};
</script>
<style>
.detail-menu-item {
  @apply flex p-5 border-b cursor-pointer text-sm  hover:(!bg-gray-100) active:(!bg-gray-200);
}
.active {
  @apply bg-gray-200;
}
</style>
