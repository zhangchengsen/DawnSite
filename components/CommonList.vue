<template>
  <div class="flex p-5">
    <n-avatar :size="40" :src="item.user.avatar"></n-avatar>
    <div class="ml-2 flex-1">
      <h4>{{ item.user.name }}</h4>
      <small class="text-gray-500">
        <n-time :time="new Date(item.created_time)" type="datetime"></n-time>
      </small>
      <p class="my-3">
        <n-tag
          size="small"
          style="opacity: 0.5"
          :bordered="false"
          v-if="item.reply_user"
        >
          @{{ item.reply_user.username }}
        </n-tag>

        {{ item.content }}
      </p>
      <n-button type="primary" size="small" @click="openInput" strong secondary
        >回复</n-button
      >
      <n-divider />
      <CommentInput
        v-if="showInput"
        :showCancel="showCancel"
        @cancel="showInput = false"
        :reply_id="item.reply_id ? item.reply_id : item.id"
        :reply_user="reply_user"
        :post_id="item.post_id"
        @success="emit('commentSuccess')"
      ></CommentInput>
      <slot />
    </div>
  </div>
</template>
<script setup>
import { NAvatar, NButton, NDivider, NTime, NTag } from "naive-ui";
const props = defineProps({
  item: Object,
});
const showCancel = ref(true);
const emit = defineEmits(["cancel", "commentSuccess"]);
const showInput = ref(false);
function openInput() {
  showInput.value = true;
}
const reply_user = computed(() => {
  return {
    id: props.item.user.id,
    username: props.item.user.name,
    avatar: props.item.user.avatar,
  };
});
</script>
<style scoped></style>
