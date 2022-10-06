<template>
  <div class="active-bar" v-show="!isEnd">
    <div class="top">
      <span>
        {{
          type == "group"
            ? `${data.group.p_num}拼团`
            : `${data.flashsale.used_num}人已抢/剩${data.flashsale.s_num}`
        }}
      </span>
      <span class="flex items-center">
        倒计时<CountDown
          @end="isEnd = true"
          :time="data[type].end_time"
        ></CountDown>
      </span>
    </div>
    <div class="bottom">
      <Price :value="data[type].price" class="text-xl"></Price>
      <Price :value="data.price" class="text-subtitle-2 ml-1" through></Price>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["data"]);
const type = computed(() => (props.data.group ? "group" : "flashsale"));
const isEnd = ref(false);
</script>
<style scoped>
.active-bar {
  @apply w-[350px] mb-5;
}
.active-bar .top {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  @apply bg-red-500 text-white flex justify-between text-xs px-3 py-2;
}
.active-bar .bottom {
  @apply px-3 py-2 border border-red-500;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
