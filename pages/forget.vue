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
    <n-form-item :show-label="false" path="password">
      <n-input
        v-model:value="form.password"
        placeholder="密码"
        type="password"
      />
    </n-form-item>
    <n-form-item :show-label="false" path="repassword">
      <n-input
        v-model:value="form.repassword"
        type="password"
        placeholder="确认密码"
      />
    </n-form-item>
    <nuxt-link to="/login">
      <NButton quaternary type="primary" class="mb-1">登录</NButton>
    </nuxt-link>
    <div>
      <n-button
        type="primary"
        class="w-full"
        :loading="loading"
        @click="onSubmit"
        >重置密码</n-button
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
const title = ref("忘记密码");
const route = useRoute();
definePageMeta({
  layout: "login",
  title: "忘记密码",
});
useHead({
  title: title.value,
});
const formRef = ref({});
const form = reactive({
  phone: "",
  code: "",
  passowrd: "",
  repassword: "",
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
  password: [
    {
      required: true,
      message: "密码必填",
    },
  ],
  repassword: [
    {
      required: true,
      message: "确认密码必填",
    },
    {
      validator(rule, value) {
        return value === form.password;
      },
      message: "两次密码输入不一致",
      trigger: ["input", "blur"],
    },
  ],
};
const loading = ref(false);
function onSubmit() {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    loading.value = true;
    let { data, error } = await useForgetApi(form);

    loading.value = false;
    if (error?.value) return;
    const { message } = createDiscreteApi(["message"]);

    message.success("重置密码成功");
    router.go(-1);
  });
}
useEnterEvent(() => onSubmit());
</script>
<style scoped></style>
