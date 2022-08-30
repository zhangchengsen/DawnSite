<template>
  <div class="menu-item" :class="{ 'menu-item-active': active }">
    <slot />
  </div>
</template>
<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped>
.menu-item {
  cursor: pointer;
  transition: all 0.2s;
  @apply flex px-2 py-1 mx-1 hover:(bg-blue-50 text-blue-700) rounded active:(!bg-blue-100);
}
.menu-item-active {
  @apply !bg-blue-100 !text-blue-600;
}
</style>
