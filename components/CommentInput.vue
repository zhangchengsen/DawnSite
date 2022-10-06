<template>
  <div class="p-5">
    <ClientOnly>
      <n-form :model="form" ref="formRef" :rules="rules" :showLabel="false">
        <n-form-item path="content">
          <n-input
            v-model:value="form.content"
            type="textarea"
            placeholder="说两句吧~"
          />
        </n-form-item>
        <n-form-item>
          <div class="flex justify-end w-full">
            <n-button
              type="primary"
              size="small"
              @click="submit"
              :loading="loading"
              >回复</n-button
            >
            <n-button
              v-if="showCancel"
              @click="emit('cancel')"
              size="small"
              class="ml-2"
              >取消</n-button
            >
          </div>
        </n-form-item>
      </n-form>
    </ClientOnly>
  </div>
</template>
<script setup>
import { NForm, NFormItem, NInput, NButton, createDiscreteApi } from "naive-ui";
const form = reactive({
  content: "",
});
const props = defineProps(["post_id", "showCancel", "reply_id", "reply_user"]);
const formRef = ref(null);
const emit = defineEmits(["success", "cancel"]);
const rules = {
  content: [
    {
      required: true,
      message: "评论内容必填",
    },
  ],
};
const loading = ref(false);
function submit() {
  formRef.value.validate((errors) => {
    if (errors) return;
    useHashAuth(async () => {
      loading.value = true;
      let d = {
        post_id: parseInt(props.post_id), //帖子ID
        content: form.content, //评论内容
        reply_id: 0, //被回复评论id，等于0时为一级评论
      };
      if (props.reply_id != 0) {
        d.reply_id = props.reply_id;
        d.reply_user = props.reply_user;
      }
      const { data, error } = await useReplyPostApi(d);
      loading.value = false;
      if (error.value) return;
      //成功
      const { message } = createDiscreteApi(["message"]);
      if (props.showCancel) {
        emit("cancel");
      }
      emit("success", data.value);

      message.success("评论成功");
      form.content = "";
    });
  });
}
</script>
<style scoped></style>
