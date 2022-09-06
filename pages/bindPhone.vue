<template>
  <n-form
    :model="form"
    ref="formRef"
    :rules="rule"
    label-width="80"
    :inline="false"
    size="large"
    class="w-[340px]"
  >
    <n-form-item :show-label="false" path="phone">
      <n-input v-model:value="form.phone" placeholder="手机号" />
    </n-form-item>
    <n-form-item :show-label="false" path="code">
      <NInputGroup>
        <n-input
          v-model:value="form.code"
          :style="{ width: '75%' }"
          placeholder="验证码"
        />
        <SendCode :phone="form.phone"></SendCode>
      </NInputGroup>
    </n-form-item>

    <div>
      <n-button
        type="primary"
        class="w-full"
        :loading="loading"
        @click="onSubmit"
        >绑 定</n-button
      >
    </div>
  </n-form>
</template>
<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  createDiscreteApi,
  NInputGroup,
} from "naive-ui";
const title = ref("绑定手机号");
const route = useRoute();
definePageMeta({
  layout: "login",
  title: "绑定手机号",
});
useHead({
  title: title.value,
});
const formRef = ref({});
const form = reactive({
  phone: "",
  code: "",
});
const rule = {
  phone: [
    {
      required: true,
      message: "手机号必填",
    },
  ],
  code: [
    {
      required: true,
      message: "验证码必填",
    },
  ],
};

const loading = ref(false);
function onSubmit() {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    loading.value = true;
    let { data, error } = useBindPhoneApi(form);
    loading.value = false;
    if (error?.value) return;
    const { message } = createDiscreteApi(["message"]);

    message.success("绑定成功");
    setTimeout(() => {
      navigateTo(route.query.from || "/", { replace: true });
    }, 1000);
  });
}
useEnterEvent(() => onSubmit());
</script>
<style scoped></style>
