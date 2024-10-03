<template>
  <div>
    <NuxtLayout :class="{ 'layout-hidden': isLoading }">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { asyncTimeout } from './utils/extensions/timeout';

const baseHue = useCookie<number>('base-hue', {
    default: () => 203,
});

const baseSaturation = useCookie<number>('base-saturation', {
    default: () => 22,
});

const isLoading = ref(true);

const restoreTransition = async () => {
  await asyncTimeout(200);
  document.documentElement.style.setProperty('--transition-speed', '0.2s');
}

onMounted(() => {
  document.documentElement.style.setProperty('--transition-speed', '0s');
  document.documentElement.style.setProperty('--base-hue', baseHue.value.toString());
  document.documentElement.style.setProperty('--base-saturation', `${baseSaturation.value}%`);
  isLoading.value = false;
  restoreTransition();
});
/** Load font-awesome icons */
useHead({
  title: '2Board',
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

.layout-hidden {
  opacity: 0;
}
</style>