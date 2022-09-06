<template>
  <UiCard>
    <UiCardHeader class="flex">
      <span>订单时间: {{ item.create_time }}</span>
      <span>订单号: {{ item.no }}</span>
    </UiCardHeader>
    <UiCardBody>{{ item.goods }} </UiCardBody>
    <UiCardFooter class="flex justify-start">
      <span v-if="item.type != 'default'">[{{ title[item.type] }}]</span>
      <Price :value="item.price"></Price>
      <span
        :class="{ 'text-green-600': item.status === 'success' }"
        class="ml-auto"
        >{{ status[item.status] }}</span
      >
      <NButton
        type="primary"
        size="small"
        class="ml-3"
        v-if="item.status === 'pendding'"
        @click="pay"
        >立即支付</NButton
      >
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
