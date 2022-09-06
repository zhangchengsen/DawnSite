<template>
  <div>
    <div>考试列表{{ $route.params.page }}</div>
    <NButton @click="test">测试</NButton>
  </div>
</template>
<script setup>
import { NButton } from "naive-ui";
const route = useRoute();
console.log(route.params.page);

useHead({
  title: "考试列表",
});
function test() {
  useHashAuth(() => {
    console.log("测试通过");
  });
}
</script>
