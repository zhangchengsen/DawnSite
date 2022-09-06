<template>
  <n-grid :x-gap="20" :cols="4" class="">
    <n-grid-item class="" v-for="i in 8" :key="i">
      <NCard class="mb-5">
        <template #cover>
          <n-skeleton height="150px" width="100%" />
        </template>
        <n-skeleton height="20px" width="50%" class="my-2" />
        <n-skeleton text style="width: 60%" />
      </NCard>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import { NCard, NSkeleton, NGrid, NGridItem } from "naive-ui";
</script>
<style scoped></style>
