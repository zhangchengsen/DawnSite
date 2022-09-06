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
    <n-form-item :show-label="false" path="username">
      <n-input
        v-model:value="form.username"
        :placeholder="type === 'login' ? '用户名/手机/邮箱' : '用户名'"
      />
    </n-form-item>
    <n-form-item :show-label="false" path="password">
      <n-input
        v-model:value="form.password"
        placeholder="密码"
        type="password"
      />
    </n-form-item>
    <n-form-item v-if="type !== 'login'" :show-label="false" path="repassword">
      <n-input
        v-model:value="form.repassword"
        type="password"
        placeholder="确认密码"
      />
    </n-form-item>
    <div class="flex justify-between w-full mb-2">
      <NButton quaternary type="primary" @click="changeType">{{
        type !== "login" ? "登录" : "注册"
      }}</NButton>
      <nuxt-link to="/forget">
        <NButton
          @click="forget"
          quaternary
          type="primary"
          class="text-gray-500"
          size="tiny"
          >忘记密码?</NButton
        >
      </nuxt-link>
    </div>
    <div>
      <n-button
        type="primary"
        class="w-full"
        :loading="loading"
        @click="onSubmit"
        >{{ type === "login" ? "登录" : "注册" }}</n-button
      >
    </div>
    <div
      class="flex justify-center items-center w-full text-xs mt-5 text-gray-600"
    >
      注册同意<NButton quaternary type="primary" size="small">服务协议</NButton
      >和
      <NButton quaternary type="primary" size="small">隐私政策</NButton>
    </div>
  </n-form>
</template>
<script setup>
import { NForm, NFormItem, NInput, NButton, createDiscreteApi } from "naive-ui";
import { useRegApi } from "~~/apis/user";
definePageMeta({
  layout: "login",
  middleware: ["only-visitor"],
});

const formRef = ref({});
const form = reactive({
  username: "",
  password: "",
  repassword: "",
});
const type = ref("login");
const title = ref("登录");
useHead({
  title: title.value,
});
const route = useRoute();
const rule = computed(() => {
  let r = {
    username: [
      {
        required: true,
        message:
          type.value === "login" ? "用户名/手机号/邮箱必填" : "用户名必填",
      },
    ],
    password: [
      {
        required: true,
        message: "密码必填",
      },
    ],
  };
  if (type.value === "reg") {
    r.repassword = [
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
    ];
  }

  return r;
});
const loading = ref(false);
function onSubmit() {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    console.log("验证通过");
    loading.value = true;
    let { data, error, pending } =
      type.value === "login" ? await useLoginApi(form) : await useRegApi(form);
    loading.value = false;
    if (error.value) return;
    const { message } = createDiscreteApi(["message"]);

    if (type.value === "login") {
      message.success("登录成功");
      //token存储在cookie中
      const token = useCookie("token");
      token.value = data.value.token;
      const user = useUser();
      user.value = data.value;
      //如果有跳转来的地址
      navigateTo(route.query.from || "/", { replace: true });
    } else {
      //注册成功 切换回登录页
      message.success("注册成功");
      changeType();
    }
  });
}
function changeType() {
  type.value = type.value === "login" ? "reg" : "login";
  title.value = type.value === "login" ? "登录" : "注册";
  route.meta.title = title.value;
  formRef.value.restoreValidation();
  form.username = "";
  form.password = "";
  form.repassword = "";
}
useEnterEvent(() => onSubmit());
</script>
<style scoped></style>
