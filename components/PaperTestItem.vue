<template>
  <div class="test-item">
    <div class="title">第{{ index + 1 }}题 {{ typeOptions[item.type] }}</div>
    <div class="p-4">
      <!--  题目内容 -->
      <p class="mb-5" v-html="item.title"></p>
      <!-- 题目选项 -->
      <div
        v-if="
          item.type === 'radio' ||
          item.type === 'trueOrfalse' ||
          item.type === 'checkbox'
        "
      >
        <p class="tip">答案：</p>
        <ul>
          <li
            @click="handleChooseOptions(qI)"
            class="option"
            v-for="(q, qI) in item.options"
            :key="qI"
            :class="{
              active: isActive(qI),
            }"
          >
            <span class="mr-2">{{ en[qI] }}</span>
            <div v-html="q"></div>
          </li>
        </ul>
      </div>
      <!-- 填空 -->
      <div v-else-if="item.type == 'completion'">
        <div
          class="mb-3 border rounded p-3"
          v-for="(uv, uvI) in modelValue"
          :key="uvI"
        >
          <div class="flex items-center justify-between mb-3">
            <h5 class="text-sm">填空 {{ uvI + 1 }}</h5>
            <NIcon v-if="uvI > 0" @click="remove(uvI)">
              <Close />
            </NIcon>
          </div>
          <n-input
            type="textarea"
            v-model:value="modelValue[uvI]"
            :placeholder="'填空' + (uvI + 1)"
          ></n-input>
        </div>
        <n-button type="primary" dashed class="w-full my-3" @click="add"
          >添加填空</n-button
        >
      </div>
      <!-- 问答 -->
      <div v-else>
        <div class="mb-3 border rounded p-3">
          <n-input
            type="textarea"
            v-model:value="modelValue[0]"
            placeholder="请填写内容"
          ></n-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { NIcon, NInput, NButton, createDiscreteApi } from "naive-ui";
import { Close } from "@vicons/ionicons5";
const props = defineProps({
  item: Object,
  index: Number,
});
//单选多选是否选中
const modelValue = ref(props.item.user_value);

//题目类型
const typeOptions = {
  answer: "问答题",
  completion: "填空题",
  trueOrfalse: "判断题",
  checkbox: "多选题",
};
function isActive(v) {
  const { item } = props;
  if (item.type === "radio" || item.type == "trueOrfalse") {
    return modelValue.value == v;
  }
  return modelValue.value.includes(v);
}
function handleChooseOptions(val) {
  const { item } = props;
  if (item.type === "radio" || item.type == "trueOrfalse") {
    modelValue.value = modelValue.value == val ? -1 : val;
  } else {
    let i = modelValue.value.findIndex((v) => v === val);
    if (i == -1) {
      modelValue.value.push(val);
    } else {
      modelValue.value.splice(i, 1);
    }
  }
}
function remove(i) {
  const { dialog } = createDiscreteApi(["dialog"]);
  dialog.warning({
    content: "是否要删除该填空",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick() {
      modelValue.value.splice(i, 1);
    },
  });
}
//监听值的变化
const emit = defineEmits(["change"]);
watch(
  modelValue,
  (newVal) => {
    // 不具备响应式 unRef
    emit("change", unref(newVal));
  },
  {
    deep: true,
  }
);
function add() {
  modelValue.value.push("");
}
// 选项转化
const en = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
};
</script>
<style scoped>
.test-item {
  @apply shadow rounded mb-5;
}
.test-item .title {
  @apply bg-gray-100 p-4 border-b text-sm;
}
.test-item .tip {
  @apply text-xs mb-3 text-gray-500;
}
.test-item .option {
  transition: all 0.2s;
  @apply flex border p-2 rounded text-sm mb-2 cursor-pointer hover:(!border-light-blue-500 !bg-light-50 text-light-blue-600) active:(!bg-light-blue-200);
}
.test-item .active {
  @apply !border-light-blue-500 !bg-light-50 text-light-blue-600;
}
</style>
