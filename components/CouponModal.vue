<template>
  <ClientOnly>
    <n-popover :width="450" trigger="hover" placement="right-start">
      <template #trigger>
        <n-button
          style="width: 100px"
          type="warning"
          strong
          secondary
          size="tiny"
          @click="submit"
          >领取优惠券</n-button
        >
      </template>
      <div class="p-2">
        <h4>可用优惠券({{ data.length }})</h4>
        <NScrollbar style="height: 400px">
          <CouponList
            v-for="(item, index) in data"
            :key="index"
            :item="item"
          ></CouponList>
        </NScrollbar>
      </div>
    </n-popover>
  </ClientOnly>
</template>
<script setup>
import { NPopover, NScrollbar, NButton } from "naive-ui";
const { data, error } = await useCouponListApi();
const loading = ref(false);
</script>
<style scoped></style>
