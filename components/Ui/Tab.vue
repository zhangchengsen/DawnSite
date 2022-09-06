<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>
<script setup></script>
<style scoped>
.tab {
  @apply w-full overflow-x-auto flex bg-white mb-4 rounded;
}
</style>
