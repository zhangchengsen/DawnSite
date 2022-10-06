<template>
  <n-card class="coupon" :class="{ 'coupon-disabled': isgetcoupon }">
    <h4>￥{{ item.price }}</h4>
    <p>适用{{ o[item.type] + " : " + item.value.title }}</p>
    <p class="!text-xs mt-3">
      有效期：
      <n-time :time="new Date(item.start_time)"></n-time>~
      <n-time :time="new Date(item.end_time)"></n-time>
    </p>
    <template #footer>
      <div class="flex justify-end">
        <n-button
          size="small"
          :type="btn !== '立即使用' ? '' : 'warning'"
          :disable="isgetcoupon"
          @click="submit"
          :loading="loading"
          >{{ isgetcoupon ? "已领取" : "立即领取" }}</n-button
        >
      </div>
    </template>
  </n-card>
</template>
<script setup>
import { NCard, NButton, NTime, createDiscreteApi } from "naive-ui";
const props = defineProps({
  item: Object,
});
const o = {
  course: "课程",
  column: "专栏",
};
const loading = ref(false);
const isgetcoupon = ref(props.item.isgetcoupon);
function submit() {
  const { message } = createDiscreteApi(["message"]);
  if (isgetcoupon.value) {
    return message.error("你已经领取过了");
  }
  useHashAuth(async () => {
    loading.value = true;
    const { data, error } = await useGainCouponApi({
      coupon_id: props.item.id,
    });
    loading.value = false;
    if (error?.value) return;
    message.success("领取成功");
    isgetcoupon.value = true;
  });
}
const btn = computed(() => {
  const v = props.item;
  v.expired = new Date(v.end_time).getTime() < new Date().getTime();
  return v.used ? "已使用" : v.expired ? "已过期" : "立即使用";
});
</script>
<style scoped>
.coupon {
  @apply mb-5 bg-orange-500 !border-0;
}
.coupon h4 {
  @apply text-2xl mb-2 font-bold text-white;
}
.coupon p {
  @apply text-sm text-light-300;
}
.coupon-disabled {
  @apply !bg-gray-300;
}
</style>
