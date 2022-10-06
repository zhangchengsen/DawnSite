<template>
  <div class="flex justify-center">
    <NImage :src="src" class="border" width="280" height="280px"></NImage>
  </div>
</template>
<script setup>
import QRCode from "qrcode";
import { NImage } from "naive-ui";
const props = defineProps(["data"]);
const src = ref(null);
QRCode.toDataURL(props.data, { width: 280, height: 280, margin: 2 })
  .then((url) => {
    src.value = url;
  })
  .catch((err) => {});
</script>
<style scoped></style>
