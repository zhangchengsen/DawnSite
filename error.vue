<template>
  <div class="pt-[100px]">
    <n-result
      class=""
      status="500"
      :title="'500 服务器错误  ' + error.message"
      description="服务器出错可能说明该雇更多程序员了"
    >
      <template #footer>
        <n-button @click="handleError">散财消灾</n-button>
      </template>
    </n-result>
  </div>
</template>
<script setup>
import { NResult, NButton } from "naive-ui";
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>
<style scoped lang="less"></style>
