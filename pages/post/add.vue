<template>
  <div class="flex justify-center">
    <client-only>
      <n-form
        :model="form"
        ref="formRef"
        :rules="rules"
        :show-label="false"
        style="width: 600px"
      >
        <n-form-item path="bbs_id">
          <!-- <n-input v-model="form.bbs_id" /> -->
          <n-select
            v-model:value="form.bbs_id"
            size="medium"
            :options="options"
            placeholder="请选择社区"
            class="w-full"
            clearable
            value-field="id"
            label-field="title"
          />
        </n-form-item>
        <div
          class="bg-white rounded p-5 mb-5 shadow"
          v-for="(item, index) in form.content"
          :key="index"
        >
          <div v-if="index > 0" class="flex justify-end mb-2">
            <n-button type="primary" size="small" @click="removeBlock(index)">
              <n-icon :size="20">
                <Close></Close>
              </n-icon>
            </n-button>
          </div>
          <n-form-item>
            <NInput
              v-model:value="item.text"
              type="textarea"
              placeholder="请填写帖子内容"
            ></NInput>
          </n-form-item>
          <n-form-item>
            <uploader v-model="item.images" :max="9"></uploader>
          </n-form-item>
        </div>
        <!-- <n-form-item>
          <n-button type="info" class="w-full" dashed @click="addBlock"
            >添加区块</n-button
          >
        </n-form-item> -->
        <n-form-item>
          <n-button
            type="primary"
            size="medium"
            :loading="loading"
            class="ml-auto"
            @click="onSubmit"
            >发布</n-button
          >
        </n-form-item>
        <!-- <n-button type="primary" @click="onSubmit">立即创建</n-button> -->
        <!-- <n-button class="ml-2">取消</n-button> -->
      </n-form>
    </client-only>
  </div>
</template>
<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NIcon,
  NButton,
  createDiscreteApi,
} from "naive-ui";
import { Close } from "@vicons/ionicons5";
definePageMeta({
  middleware: ["auth"],
});
const formRef = ref(null);
const loading = ref(false);
const { data: bbsData } = await useBbsListApi();
const options = computed(() => (bbsData.value ? bbsData.value.rows : []));
const form = reactive({
  bbs_id: null,
  content: [
    {
      text: "",
      images: [],
    },
  ],
});
const rules = {
  bbs_id: [
    {
      required: true,
      message: "请选择社区",
    },
  ],
};

function addBlock() {
  form.content.push({
    text: "",
    images: [],
  });
}
function onSubmit() {
  const { message } = createDiscreteApi(["message"]);

  formRef.value.validate(async (errors) => {
    if (errors || form.content.filter((o) => o.text.trim() === "").length > 0) {
      return message.warning("请检查帖子内容是否为空");
    }
    loading.value = true;
    const { data, error } = await useAddPostApi(form);
    loading.value = false;
    if (error.value) return;
    message.success("发帖成功");
    navigateTo("/bbs/0/1");
  });
}
function removeBlock(index) {
  const { dialog, message } = createDiscreteApi(["dialog", "message"]);
  dialog.warning({
    content: "是否要删除该区块?",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick() {
      form.content.splice(index, 1);
      message.success("删除成功");
    },
  });
}
</script>
<style scoped></style>
