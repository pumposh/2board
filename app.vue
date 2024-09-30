<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
/** Load font-awesome icons */
useHead({
  script: [
    {
      src: 'https://kit.fontawesome.com/aaef78e0d5.js',
      crossorigin: 'anonymous'
    }
  ]
})
</script>

<style>
/** Transition between pages */
.page-enter-active,
.page-leave-active {
  transition: all calc(var(--transition-speed));
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>