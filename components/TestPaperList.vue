<template>
  <section class="bg-white shadow p-5 rounded mb-5">
    <div class="flex justify-between">
      <h4>{{ item.title }}</h4>
      <small>时长： {{ item.expire }}分钟</small>
    </div>
    <p class="py-5 text-gray-500 text-sm">
      题目总数：{{ item.question_count }} 总分数：{{
        item.total_score
      }}
      及格分：{{ item.pass_score }}
    </p>
    <div class="flex justify-end">
      <n-button type="primary" @click="test(item)" :disabled="item.is_test">
        {{ item.is_test ? "考完了" : "立即考试" }}</n-button
      >
    </div>
  </section>
</template>
<script setup>
import { NButton, createDiscreteApi } from "naive-ui";
const props = defineProps(["item"]);
function test(item) {
  useHashAuth(() => {
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.success({
      title: "提示",
      content: "是否要参加该场考试",
      positiveText: "立即考试",
      negativeText: "取消",
      maskCloseable: false,
      onPositiveClick() {
        navigateTo("/paper_test/" + props.item.id);
      },
      onEsc: () => {},
    });
  });
}
</script>
<style scoped></style>
