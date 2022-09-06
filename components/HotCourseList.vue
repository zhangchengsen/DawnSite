<template>
  <section class="bg-white shadow rounded mb-5">
    <div class="p-3 border-b">
      <h4>精品推荐</h4>
    </div>
    <div class="p-3">
      <CourseList v-for="(item, index) in data" :key="index" :item="item" />
    </div>
  </section>
</template>
<script setup>
let { data, error, pending } = await useHotListApi();
</script>
<style scoped></style>
