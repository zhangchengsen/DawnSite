<template>
  <div class="border flex p-3 mb-5 items-center">
    <n-tag type="info" :bordered="false" size="small" class="mr-2">
      {{ t[item.type] }}</n-tag
    >
    <n-image :src="item.goods.cover" class="w-[40px] rounded mr-2"></n-image>
    <span class="text-gray-500 text-sm">{{ item.goods.title }}</span>
    <n-button class="ml-auto mr-3" type="primary" size="tiny" @click="open"
      >查看</n-button
    >
    <n-button type="error" size="tiny" @click="deleteItem" :loading="loading"
      >删除</n-button
    >
  </div>
</template>
<script setup>
import { NTag, NIcon, NButton, createDiscreteApi, NImage } from "naive-ui";

const emits = defineEmits(["delete"]);

const props = defineProps({
  item: Object,
});
const t = {
  course: "课程",
  book: "电子书",
  column: "专栏",
  live: "直播",
};
function deleteItem(id) {
  const { dialog, message } = createDiscreteApi(["dialog", "message"]);
  dialog.warning({
    content: "是否要取消该收藏?",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      loading.value = true;
      const { item } = props;
      //  await useLogout()

      emits("delete", {
        goods_id: item.goods.id,
        type: item.type,
        success() {
          message.success("删除成功");
          loading.value = false;
        },
        fail() {
          loading.value = false;
        },
      });
    },
  });
}
function open() {
  navigateTo(`/detail/${props.item.type}/${props.item.goods.id}`);
}
</script>
<style scoped></style>
