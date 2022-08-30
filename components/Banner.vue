<template>
  <n-carousel show-arrow>
    <img
      v-for="(item, index) in data"
      :key="index"
      class="carousel-img"
      :src="item.src"
    />
  </n-carousel>
</template>
<script setup>
import { NCarousel } from "naive-ui";
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>
<style scoped>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
