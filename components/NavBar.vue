<template>
  <div class="navBar">
    <div class="container flex items-center h-[60px]">
      <NButton text class="!text-xl !font-bold topic_color_hover"
        >晨曦小站</NButton
      >
      <UiMenu>
        <UiMenuItem
          v-for="(item, index) in menus"
          @click="handleOpen(item.path)"
          :active="isMenuItemActive(item)"
          :key="index"
        >
          {{ item.name }}
        </UiMenuItem>
      </UiMenu>
      <NButton circle class="ml-auto mr-3" @click="openSearchBar">
        <template #icon>
          <NIcon>
            <Search size="40" />
          </NIcon>
        </template>
      </NButton>

      <nuxt-link to="/login" v-if="!user">
        <NButton secondary strong> 登录 </NButton>
      </nuxt-link>
      <n-dropdown
        trigger="hover"
        :options="options"
        @select="handleSelect"
        v-else
      >
        <n-avatar
          size="small"
          circle
          :src="
            user.avatar ||
            'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
          "
        />
      </n-dropdown>
    </div>
  </div>
  <div class="w-[100%] h-[80px]"></div>
  <SearchBar ref="SearchBarRef"></SearchBar>
</template>
<script setup>
import { NButton, NDropdown, NAvatar, createDiscreteApi } from "naive-ui";
import { NIcon } from "naive-ui";
import { Search } from "@vicons/ionicons5";
const options = [
  {
    label: "用户中心",
    key: "user",
  },
  {
    label: "退出",
    key: "exit",
  },
];
const user = useUser();
const route = useRoute();
const menus = ref([
  {
    name: "首页",
    path: "/",
    match: [{ name: "index" }],
  },
  {
    name: "考试",
    path: "/paper/1",
    match: [{ name: "paper-page" }],
  },
  {
    name: "拼团",
    path: "/list/group/1",
    match: [{ name: "list-type-page", params: "group" }],
  },
  {
    name: "秒杀",
    path: "/list/flashsale/1",
    match: [{ name: "list-type-page", params: "flashsale" }],
  },
  {
    name: "直播",
    path: "/list/live/1",
    match: [{ name: "list-type-page", params: "live" }],
  },
  {
    name: "专栏",
    path: "/list/column/1",
    match: [{ name: "list-type-page", params: "column" }],
  },
  {
    name: "电子书",
    path: "/list/book/1",
    match: [{ name: "list-type-page", params: "book" }],
  },
  {
    name: "社区",
    path: "/bbs/0/1",
    match: [{ name: "bbs-bbs_id-page" }],
  },
  {
    name: "课程",
    path: "/list/course/1",
    match: [{ name: "list-type-page", params: "course" }],
  },
]);
function isMenuItemActive(item) {
  if (item.match) {
    let idx = item.match.findIndex((v) => {
      let res = true;
      if (v.params && typeof v.params === "string") {
        res = route.params.type === v.params;
      }
      return v.name === route.name && res;
    });
    return idx !== -1;
  }
  return false;
}
const SearchBarRef = ref(null);
function openSearchBar() {
  SearchBarRef.value.open();
}
function handleSelect(key) {
  if (key === "exit") {
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.warning({
      content: "是否要退出登录",
      positiveText: "退出",
      negativeText: "取消",
      onPositiveClick: async () => {
        await useLogout();
      },
    });
  } else {
    navigateTo({
      path: "/user/history/1",
    });
  }
}
function handleOpen(path) {
  navigateTo(path);
}
</script>
<style scoped>
.navBar {
  z-index: 1000;
  @apply bg-white fixed top-0 left-0 right-0 shadow-sm;
}
</style>
