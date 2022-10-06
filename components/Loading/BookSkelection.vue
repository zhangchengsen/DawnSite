<template>
  <n-grid :x-gap="20" :cols="2">
    <n-grid-item v-for="i in 2" :key="i">
      <section class="bg-white shadow rounded p-5 flex item-stretch mb-5">
        <n-skeleton text width="108px" height="138px" class="rounded" />

        <div class="flex flex-col flex-1 ml-2">
          <n-skeleton text width="50%" height="30px" class="my-2" />

          <div class="mt-auto flex items-center">
            <div class="flex items-end">
              <n-skeleton text width="30px" class="my-1" />
              <n-skeleton text width="30px" class="ml-2" />
            </div>
            <n-skeleton
              text
              width="100px"
              round
              size="medium"
              class="ml-auto"
            />
          </div>
        </div>
      </section>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import { NCard, NGrid, NGridItem, NSkeleton } from "naive-ui";
</script>
<style scoped lang="less"></style>
