<template>
  <div class="border-b p-5">
    <div class="cursor-pointer text-gray-600" @click.stop="open">
      <n-tag v-if="item.is_top" size="small" type="success">置顶</n-tag>
      {{ item.desc.text }}
    </div>
    <div class="mt-3 cursor-pointer nax-w-[500px]" style="max-width: 500px">
      <n-image
        v-for="(img, imgI) in item.desc.images"
        :preview-disabled="false"
        :key="imgI"
        :src="img"
        :lazy="true"
        :width="item.desc.images.length == 1 ? 300 : 150"
        :height="item.desc.images.length == 1 ? 200 : 100"
        class="mr-3 mb-2 rounded"
      ></n-image>
    </div>
    <div class="flex mt-5">
      <n-button
        class="mr-3"
        secondary
        strong
        size="tiny"
        :type="item.issupport ? 'primary' : 'tertiary'"
        @click.stop="handleSupport(item)"
        :loading="supportLoading"
      >
        <template #icon>
          <n-icon>
            <ThumbsUpSharp />
          </n-icon>
        </template>
        点赞 {{ item.support_count || "" }}
      </n-button>
      <n-button class="mr-3" secondary strong size="tiny">
        <template #icon>
          <n-icon>
            <ChatboxEllipsesOutline />
          </n-icon>
        </template>
        评论 {{ item.comment_count || "" }}
      </n-button>
      <n-button class="mr-3" text size="tiny"
        >作者：{{ item.user.name }}</n-button
      >
      <n-button
        type="error"
        class="mr-3"
        size="tiny"
        v-if="showDel"
        @click="deleteItem"
      >
        删除
      </n-button>
    </div>
  </div>
</template>
<script setup>
import { NTag, NIcon, NButton, createDiscreteApi, NImage } from "naive-ui";
import { ThumbsUpSharp, ChatboxEllipsesOutline } from "@vicons/ionicons5";
const props = defineProps({
  item: Object,
  showDel: {
    type: Boolean,
    default: true,
  },
});
const { supportLoading, handleSupport } = useHandleSupport();
const emits = defineEmits(["delete"]);
const loading = ref(false);
function deleteItem(id) {
  const { dialog, message } = createDiscreteApi(["dialog", "message"]);
  dialog.warning({
    content: "是否要删除该帖子?",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      loading.value = true;
      //  await useLogout()

      emits("delete", {
        id: props.item.id,
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
const open = () => {
  navigateTo("/post_detail/" + props.item.id);
};
</script>
<style scoped></style>
