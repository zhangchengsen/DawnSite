<template>
  <n-card
    @click="open(item.id)"
    class="!cursor-pointer mb-5 shadow-md !border-0"
    footer-style="padding:0;"
  >
    <template #cover>
      <UiImage :src="item.cover" class="w-[100%] h-[150px]" />
    </template>
    <div class="pt-2">
      <span class="font-bold w-full truncate font-semibold">{{
        item.title
      }}</span>
    </div>
    <div class="mt-2 flex items-end">
      <Price :value="item.price"></Price>
      <Price :value="item.t_price" through class="ml-2"></Price>
    </div>
    <template #footer>
      <ClientOnly>
        <div
          v-if="item.group_id || item.flashsale_id"
          class="bg-yellow-500 text-white p-3 text-xs flex items-center rounded-b"
        >
          {{ item.group_id ? "拼团中" : "秒杀中" }}
          <div class="ml-auto flex items-center">
            倒计时
            <CountDown :time="item.end_time"></CountDown>
          </div>
        </div>
      </ClientOnly>
    </template>
  </n-card>
</template>
<script setup>
import { NCard } from "naive-ui";
const props = defineProps({
  item: Object,
});
function open(id) {
  let path = "";
  console.log("props type", props.item);
  if (["course", "media", "audio", "video"].includes(props.item.type)) {
    path = `/detail/course/${props.item.id}`;
  } else if (props.item.type == "column") {
    path = `/detail/column/${props.item.id}`;
  }

  navigateTo(path);
}
</script>
<style scoped></style>
