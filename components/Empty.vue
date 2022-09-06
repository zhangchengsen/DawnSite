<template>
  <NEmpty :description="desc" size="large" class="py-10"> </NEmpty>
</template>
<script setup>
import { NEmpty } from "naive-ui";
defineProps({
  desc: {
    type: String,
    default: "暂无数据",
  },
});
</script>
<style scoped></style>
