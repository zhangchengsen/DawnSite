<template>
  <div class="body">
    <NavBar></NavBar>
    <main class="container">
      <slot />
    </main>
    <PageFooter></PageFooter>
  </div>
</template>
<style scoped>
.body {
  min-width: 1000px;
  @apply bg-gray-100 flex flex-col min-h-screen;
}
</style>
