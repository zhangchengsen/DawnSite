<template>
  <n-card class="mb-5" v-if="rows.length">
    <template #header>
      <div class="text-gray-500 text-sm">
        {{ rows.length }}人正在拼团，可直接参与
      </div>
    </template>
    <NScrollbar style="height: 60px">
      <div
        v-for="(item, index) in rows"
        class="flex items-center h-[60px] px-4"
        :key="index"
      >
        <n-avatar :size="45" :src="item.users[0].avatar" round></n-avatar>
        <span class="ml-2">{{
          item.users[0].nickname || item.users[0].username
        }}</span>
        <div class="ml-auto">
          <p>
            还差
            <span class="text-red-500">{{ item.total - item.num }}人 </span>
            拼成
          </p>
          <div class="text-xs text-gray-500 mt-1 flex items-center">
            剩余<CountDown :time="item.end_time" @end="handleTimeUp(index)" />
          </div>
        </div>
        <NButton
          type="primary"
          size="small"
          class="ml-2"
          @click="handleGroup(item)"
          :loading="item.loading"
          >去拼团</NButton
        >
      </div>
    </NScrollbar>
  </n-card>
</template>
<script setup>
import {
  NCard,
  NScrollbar,
  NButton,
  NAvatar,
  createDiscreteApi,
} from "naive-ui";
const props = defineProps({
  group_id: {
    type: Number,
    default: 0,
  },
});
let { data, error } = await useGetUsableUserCouponApi(props.group_id);
const rows = ref([]);
if (!error.value) {
  console.log("data", data.value);
  rows.value = data.value.rows.map((o) => {
    o.end_time = new Date(o.created_time).getTime() + 24 * 60 * 60 * 1000;
    o.loading = false;
    return o;
  });
}
function handleTimeUp(index) {
  rows.value.splice(index, 1);
  data.value.count--;
}
function handleGroup(item) {
  useHashAuth(() => {
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.success({
      title: "提示",
      content: "是否要参与此次拼单？",
      positiveText: "确定",
      negativeText: "取消",
      maskCloseable: false,
      onPositiveClick: () => {
        console.log("click确定");
        item.loading = true;
        console.log("group_id", props.group_id, "group_work_id", item.id);
        useCreateOrderApi(
          {
            group_id: props.group_id,
            group_work_id: item.id,
          },
          "group"
        )
          .then((res) => {
            if (!res?.error?.value) {
              navigateTo("/pay?no=" + res.data.value.no);
            }
          })
          .catch((err) => {
            console.log("err", err);
          })
          .finally(() => {
            item.loading = false;
          });
      },
      onEsc: () => {},
    });
  });
}
console.log("group data", data);
</script>
<style scoped></style>
