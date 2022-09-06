<template>
  <n-button
    size="tiny"
    :loading="loading"
    :type="is_fava ? 'primary' : 'tertiary'"
    @click="handleFava"
    >收藏</n-button
  >
</template>
<script setup>
import { NButton, createDiscreteApi } from "naive-ui";
const props = defineProps({
  isfava: {
    type: Boolean,
    default: false,
  },
  goods_id: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: "course",
  },
});
const is_fava = ref(props.isfava);
const loading = ref(false);
function handleFava() {
  //登录之后才能收藏/取消收藏
  useHashAuth(async () => {
    let data = {
      goods_id: props.goods_id,
      type: props.type,
    };
    loading.value = true;
    let { error } = is_fava.value
      ? await useUnCollectApi(data)
      : await useCollectApi(data);
    if (error?.value) return;
    const { message } = createDiscreteApi(["message"]);
    message.success((is_fava.value ? "取消收藏" : "收藏") + "成功");
    is_fava.value = !is_fava.value;
    loading.value = false;
  });
}
</script>
<style scoped></style>
