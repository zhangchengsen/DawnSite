<template>
  <n-button
    type="primary"
    ghost=""
    @click="sendCode"
    :loading="loading"
    :disabled="!phone || time > 0"
    >{{ text }}</n-button
  >
</template>
<script setup>
import { NButton, createDiscreteApi } from "naive-ui";
const props = defineProps(["phone"]);
const loading = ref(false);
const time = ref(0);
const timer = ref(null);
async function sendCode() {
  loading.value = true;
  let { data, error } = await useGetCaptchaApi(props.phone);
  loading.value = false;
  if (error.value) return;
  console.log(data);
  time.value = 60;

  const msg =
    data.value == "ok"
      ? "发送成功"
      : "当前为演示模式，你的验证码是" + data.value;
  const { message } = createDiscreteApi(["message"]);
  if (timer.value) clearInterval(timer.value);
  timer.value = setInterval(() => {
    time.value--;
    if (time.value <= 0) clearInterval(timer.value);
  }, 1000);
  message.success(msg);
}
const text = computed(() => {
  if (loading.value) {
    return "发送中";
  }
  if (time.value > 0) {
    return `${time.value} s`;
  }
  return "发送验证码";
});
</script>
<style scoped></style>
