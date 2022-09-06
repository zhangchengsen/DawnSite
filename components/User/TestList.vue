<template>
  <UiCard>
    <UiCardHeader class="flex">
      <span> {{ item.testpaper.title }}</span>
      <span
        class="ml-auto"
        :class="item.answer_status ? 'text-green-600' : 'text-rose-600'"
        >{{ item.answer_status ? "考试完成" : "考试中" }}</span
      >
    </UiCardHeader>
    <UiCardBody>
      <small class="mr-3">题目总数：{{ item.testpaper.question_count }}</small>
      <small class="mr-3">总分：{{ item.testpaper.total_score }}</small>
      <small class="mr-3">及格分：{{ item.testpaper.pass_score }}</small>
    </UiCardBody>
    <UiCardFooter class="flex justify-start">
      <span>{{ item.created_time }}</span>
      <span class="ml-auto">
        最终得分：<span
          :class="item.read_status ? 'text-green-600' : 'text-rose-600'"
          >{{ item.read_status ? item.score : "正在阅卷" }}</span
        >
      </span>
    </UiCardFooter>
  </UiCard>
</template>
<script setup>
import { NButton } from "naive-ui";
const props = defineProps({
  item: Object,
});
const status = {
  closed: "已关闭",
  success: "支付成功",
  pendding: "等待支付",
  grouping: "拼团中",
};
const title = {
  group: "拼团",
  flashsale: "秒杀",
};
function pay() {
  navigateTo("/pay?no=" + props.item.no);
}
</script>
<style scoped></style>
