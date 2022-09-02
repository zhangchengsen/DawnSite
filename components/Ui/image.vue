<template>
  <!-- <ClientOnly></ClientOnly> -->
  <img
    :src="src"
    v-bind="$attrs"
    @error="handleError"
    :style="{ 'object-fit': objectFit }"
  />
</template>
<script setup>
defineProps({
  src: String,
  objectFit: {
    type: String,
    default: "cover",
  },
});
function handleError(e) {
  console.log("image fail", e);
  e.target.src = "/fail.png";
}
</script>
<style scoped></style>
