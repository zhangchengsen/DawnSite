<template>
  <LoadingGroup :pending="pending" :error="error">
    <n-card size="medium" class="createorder">
      <h4>产品信息</h4>
      <div class="flex mb-5">
        <NImage
          :src="data.cover"
          class="rounded flex-shrink-0"
          :class="
            type === 'book' ? 'w-[100px] h-[140px]' : 'w-[180px] h-[100px]'
          "
        ></NImage>
        <div class="flex flex-1 ml-4 flex-col">
          <h5 class="flex text-gray-600 text-xl">
            {{ data.title }}
            <Price :value="data.price" class="ml-auto"></Price>
          </h5>
          <div class="mt-auto" v-if="type == 'course'">
            <n-tag
              type="default"
              size="small"
              class="mt-auto"
              :bordered="false"
              >{{ t[data.type] }}</n-tag
            >
          </div>
        </div>
      </div>
      <h4>优惠券</h4>
      <n-grid
        :x-gap="20"
        :cols="4"
        class="mb-3"
        v-if="couponData?.rows && couponData.count"
      >
        <n-grid-item v-for="(item, index) in couponData.rows" :key="index">
          <n-button
            @click="chooseCoupon(item)"
            :type="user_coupon_id === item.id ? 'warning' : 'tertiary'"
            size="medium"
            strong
            secondary
            >￥{{ item.price }} 优惠券</n-button
          >
        </n-grid-item>
      </n-grid>

      <div v-else class="text-gray-400 text-sm mb-5">暂无优惠券</div>
      <h4>支付方式</h4>
      <div class="flex mb-5">
        <span class="wxpay">
          <n-icon>
            <LogoWechat></LogoWechat>
          </n-icon>
          <b class="ml-1">微信支付</b>
        </span>
      </div>
      <div class="flex items-center mb-5">
        <small class="text-red-500">请在30分钟内完成支付</small>
        <span v-if="coupon_price" class="ml-auto"
          >优惠券已抵扣<b class="text-red-500">{{ coupon_price }}</b
          >元，需支付</span
        >
        <Price :value="price" :class="{ 'ml-auto': !coupon_price }"></Price>
      </div>
      <div class="flex justify-end">
        <n-button type="primary" @click="submit" :loading="loading"
          >确认支付</n-button
        >
      </div>
    </n-card>
  </LoadingGroup>
</template>
<script setup>
import {
  NCard,
  NTag,
  NImage,
  NIcon,
  NButton,
  NGrid,
  NGridItem,
} from "naive-ui";
import { LogoWechat } from "@vicons/ionicons5";
const route = useRoute();
const t = {
  media: "图文",
  audio: "音频",
  video: "视频",
  column: "专栏",
  book: "电子书",
  course: "课程",
};
const { id, type } = route.query;
const user_coupon_id = ref(0);
const { pending, error, data } = await useGetGoodsInfoApi(id, type);
definePageMeta({
  middleware: ["auth", "createorder"],
});
const { data: couponData } = await useGetUsableCouponApi(id, type);
//选中优惠券
const loading = ref(false);
function chooseCoupon(item) {
  user_coupon_id.value = user_coupon_id.value === item.id ? 0 : item.id;
}

// 创建订单 发起支付
async function submit() {
  loading.value = true;
  let d = {};
  if (type === "course" || type === "column" || type === "book") {
    d = {
      goods_id: data.value.id,
      type,
    };
    if (user_coupon_id.value) {
      d.user_coupon_id = user_coupon_id.value;
    }
  } else if (type == "flashsale") {
    d = {
      flashsale_id: id,
    };
  }
  let { data: createOrderResult, error: createOrderError } =
    await useCreateOrderApi(d, type);
  loading.value = false;
  if (createOrderError?.value) return;
  navigateTo("/pay?no=" + createOrderResult.value.no, { replace: true });
}
const coupon_price = computed(() => {
  if (user_coupon_id.value == 0) return 0;
  let c = couponData.value.rows.find((o) => o.id == user_coupon_id.value);
  return c ? c.price : 0;
});
const price = computed(
  () => {
    let p = (
      (data.value.price * 1000 - coupon_price.value * 1000) /
      1000
    ).toFixed(2);
    return p <= 0 ? 0 : p;
  } //解决小数点计算进度缺失
);
</script>
<style>
.createorder {
  @apply mb-5;
}
.createorder h4 {
  @apply font-semibold mb-3 text-gray-600;
}
.createorder .wxpay {
  @apply flex items-center justify-center border border-green-500 rounded py-3 text-sm text-green-600 w-[120px];
}
</style>
