<template>
  <n-grid :x-gap="20">
    <n-grid-item :span="18">
      <n-card>
        <template #header>
          <h3 class="text-center font-bold">{{ data.title }}</h3>
          <n-divider></n-divider>
          <p class="space-x-5 text-center">
            <span>题目总数：{{ data.total_score }}</span>

            <span>总分数：{{ data.testpaper_questions.length }}</span>
            <span>时间：{{ data.expire }}分钟</span>
          </p>
        </template>
        <PaperTestItem
          v-for="(item, index) in testpaper_questions"
          :item="item"
          :index="index"
          :key="index"
          :id="'question_' + index"
          @change="handleUserValueChange(item, $event)"
        ></PaperTestItem>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="6">
      <n-card title="" size="medium">
        <template #header>
          <div class="flex flex-col items-center justify-center">
            <small class="text-gray-500 mb-1">剩余时间</small>
            <TimeBox
              @end="autoSubmit"
              :expire="5"
              class="text-3xl text-blue-600"
            />
          </div>
        </template>

        <n-grid :x-gap="12" :cols="4">
          <n-grid-item
            v-for="(item, index) in testpaper_questions"
            :key="index"
          >
            <n-tag
              @click="scrollToDom(index)"
              class="mb-2 w-full cursor-pointer flex items-center justify-center"
              :type="item.isTest ? 'success' : ''"
              >{{ index + 1 }}</n-tag
            >
          </n-grid-item>
        </n-grid>
        <n-divider />
        <div>
          <n-button
            type="primary"
            size="medium"
            class="w-full"
            @click="submit"
            :loading="loading"
            >交卷</n-button
          >
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import { onBeforeRouteLeave } from "vue-router";
import {
  NButton,
  NGrid,
  NGridItem,
  NPagination,
  NCard,
  NTag,
  NDivider,
  createDiscreteApi,
} from "naive-ui";
const route = useRoute();
let { data } = await useReadTestpaperApi(route.params.id);
// 题目列表
const testpaper_questions = computed(() => {
  return data.value
    ? data.value.testpaper_questions.map((o) => {
        o.isTest = false;
        return o;
      })
    : [];
});
function scrollToDom(index) {
  const dom = document.getElementById("question_" + index);
  window.scrollTo(0, dom.offsetTop);
}
console.log("testpaper_questions", testpaper_questions.value);
useHead({
  title: "考试列表",
});
function handleUserValueChange(item, val) {
  item.user_value = val;
  updateIsTest();
  console.log(val);
}
//检查题目是否填写
function updateIsTest() {
  let t = false;
  testpaper_questions.value.forEach((item) => {
    //问答题和填空
    if (item.type == "answer" || item.type === "completion") {
      t = !!item.user_value[0];
    } else if (item.type == "radio" || item.type == "trueOrfalse") {
      t = item.user_value != -1;
    } else {
      t = item.user_value.length > 0;
    }
    item.isTest = t;
  });
}
//阻止切换其他页面
const disableBack = ref(true);
onBeforeRouteLeave((to, from, next) => {
  if (!disableBack.value) {
    next();
  } else {
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.warning({
      content: "是否要放弃考试？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick() {
        disableBack.value = false;
        navigateTo(to.fullPath || "/", { replace: true });
      },
    });
    next(false);
  }
});
const loading = ref(false);
async function submit() {
  const { message } = createDiscreteApi(["message"]);
  let l = testpaper_questions.value.filter((v) => !v.isTest);

  if (l > 0) {
    return message.warning("还有题目未完成，请检查");
  }
  loading.value = true;
  const { data: submitData, error: submitError } = await useSubmitTestApi({
    user_test_id: data.value.user_test_id,
    value: testpaper_questions.value.map((o) => o.user_value),
  });
  loading.value = false;
  if (submitError.value) return;
  disableBack.value = false;
  message.success("交卷成功");
  navigateTo("/paper/1", { replace: true });
}
//自动交卷
function autoSubmit() {
  const {} = createDiscreteApi(["dialog"]);
  dialog.success({
    content: "考试时间到, 试卷已强制提交",
    positiveText: "确认",
    closeable: false,
    onPositiveClick() {
      disableBack.value = false;
      navigateTo("/paper/1", { replace: true });
    },
  });
}
definePageMeta({
  middleware: ["auth"],
});
</script>
