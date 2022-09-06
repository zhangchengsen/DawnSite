<template>
  <div class="p-5">
    <n-form
      :model="form"
      ref="formRef"
      :rules="rule"
      label-width="80"
      :inline="false"
    >
      <n-form-item label="原密码" path="opassword">
        <n-input v-model:value="form.opassword" placeholder="旧密码" />
      </n-form-item>

      <n-form-item label="新密码" path="password">
        <n-input
          v-model:value="form.password"
          placeholder="密码"
          type="password"
        />
      </n-form-item>
      <n-form-item label="确认密码" path="repassword">
        <n-input
          v-model:value="form.repassword"
          type="password"
          placeholder="确认密码"
        />
      </n-form-item>

      <div class="flex justify-end">
        <n-button type="primary" :loading="loading" @click="onSubmit"
          >立即修改</n-button
        >
      </div>
    </n-form>
  </div>
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
  title: "修改密码",
});
useHead({
  title: title.value,
});
const formRef = ref({});
const form = reactive({
  opassword: "",
  passowrd: "",
  repassword: "",
});

const rule = {
  opassword: [
    {
      required: true,
      message: "原密码必填",
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
    let { data, error } = await useUpdateUserPasswordApi(form);

    loading.value = false;
    if (error?.value) return;
    const { message } = createDiscreteApi(["message"]);

    message.success("修改密码成功");
    await useLogout();
  });
}
useEnterEvent(() => onSubmit());
</script>
<style scoped></style>
