<template>
  <div>
    <template v-if="loading">
      <slot name="loading"><LoadingSkeletion></LoadingSkeletion></slot>
    </template>
    <template v-else-if="error"
      ><div class="mt-10">
        <n-result
          class=""
          status="500"
          title="
          错误提示"
          :description="error?.data?.data + '' || '页面走丢了~'"
        >
          <template #footer>
            <n-button @click="$router.go(-1)">返回上一页</n-button>
          </template>
        </n-result>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
<script setup>
import { NResult, NButton } from "naive-ui";
import { onBeforeUnmount } from "vue";
const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  error: {
    default: "",
  },
});
const loading = ref(false);
//页面进来的时候就会加载一次
const stop = watchEffect(() => {
  if (props.pending && !loading.value) {
    loading.value = true;
  } else {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  }
});
onBeforeUnmount(() => stop());
</script>
<style scoped></style>
