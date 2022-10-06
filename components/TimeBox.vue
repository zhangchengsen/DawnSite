<template>
  <div class="text-center">{{ formatSeconds(time_out) }}</div>
</template>
<script setup>
import { NCard } from "naive-ui";
function formatSeconds(a) {
  var hh = parseInt(a / 3600);
  if (hh < 10) hh = "0" + hh;
  var mm = parseInt((a - hh * 3600) / 60);
  if (mm < 10) mm = "0" + mm;
  var ss = parseInt((a - hh * 3600) % 60);
  if (ss < 10) ss = "0" + ss;
  var length = hh + ":" + mm + ":" + ss;
  if (a > 0) {
    return length;
  } else {
    return "00:00:00";
  }
}
const emits = defineEmits(["end"]);
const props = defineProps({
  expire: {
    type: Number,
    default: 120,
  },
});
let timer = null;
const time_out = ref(0);
function initTimeBox() {
  if (timer) {
    clearInterval(timer);
  }
  time_out.value = props.expire * 60;
  if (time_out.value > 0) {
    timer = setInterval(() => handleTimeOut(), 1000);
  }
}
function handleTimeOut() {
  // 时间结束
  if (time_out.value <= 0) {
    emits("end");
    time_out.value = 0;
    return clearInterval(timer);
  }
  time_out.value--;
}
onMounted(() => initTimeBox());
onBeforeUnmount(() => clearInterval(timer));
</script>
<style scoped></style>
