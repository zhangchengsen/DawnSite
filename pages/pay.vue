<template>
  <div class="flex justify-center">
    <n-card class="w-[450px] mb-10">
      <ClientOnly>
        <n-alert v-if="isTimeOut" title="支付已超时" type="error" class="mb-2">
          请刷新页面重新支付
        </n-alert>
        <n-alert v-else-if="isPay" title="支付成功" type="success">
          正在跳转...</n-alert
        >
        <h4 class="text-xl">微信支付</h4>
        <p class="text-sm text-gray-500 flex" v-if="!isTimeOut">
          距离二维码过期还剩
          <TimeBox
            class="text-rose-500"
            @end="handleTimeout"
            :expire="30"
          ></TimeBox
          >,过期后请刷新页面重新获取
        </p>
        <h5 class="flex justify-center py-1 mb-3">
          支付总额:
          <Price :value="data.price"></Price>
        </h5>
        <!-- 二维码组件 -->
        <QrCode :data="data.code_url" v-if="data.code_url"></QrCode>
        <div class="flex justify-center items-center py-4 text-green-400">
          <NIcon size="30">
            <ScanCircleOutline />
          </NIcon>
          <div class="ml-3 text-gray-500 text-sm">
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
        </div>
      </ClientOnly>
    </n-card>
  </div>
</template>
<script setup>
import { NCard, NAlert, NIcon } from "naive-ui";
import { ScanCircleOutline } from "@vicons/ionicons5";
import QrCode from "~~/components/QrCode.vue";
const route = useRoute();
const { no } = route.query;
console.log("route", route);
//发起微信pc支付
const { data, error } = await useWxpayApi(no);
const isPay = ref(false);
const isTimeOut = ref(false);
const timer = ref(null);
function checkIsPay() {
  if (timer.value) clearInterval();
  timer.value = setInterval(() => {
    useGetWxpayApi(no).then((res) => {
      if (!res.error.value && res.data.value.trade_state == "SUCCESS") {
        handleSuccess();
      }
    });
  }, 2000);
}
if (!error.value) {
  checkIsPay();
}
function handleSuccess() {
  if (timer.value) clearInterval(timer.value);
  isPay.value = true;
  setTimeout(() => {
    navigateTo("/user/buy/1", { replace: true });
  }, 2000);
}
function handleTimeout() {
  console.log(233);
  isTimeOut.value = true;
}
onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value);
});
</script>
<style scoped></style>
