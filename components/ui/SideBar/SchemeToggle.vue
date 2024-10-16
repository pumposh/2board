<template>
  <form class="SchemeToggle" id="colorScheme">
    <label>
      <input
        type="radio"
        name="color-scheme"
        id="color-scheme-light"
        value="light"
        :checked="colorMode === 'light'"
        data-sr
        @change="setColorScheme('light')"
      >
      <i class="fa-regular fa-sun"></i>
    </label>
    <label>
      <input
        type="radio"
        name="color-scheme"
        value="auto"
        :checked="colorMode === 'auto'"
        data-sr
        @change="setColorScheme('auto')"
      >
      <i class="fa-solid fa-circle-dot"></i>
    </label>
    <label>
      <input
        type="radio"
        name="color-scheme"
        id="color-scheme-dark"
        value="dark"
        :checked="colorMode === 'dark'"
        data-sr
        @change="setColorScheme('dark')"
      >
      <i class="fa-solid fa-moon"></i>
    </label>
  </form>
</template>

<script setup lang="ts">
import { useCookie } from 'nuxt/app';

/**
 * `SchemeToggle.vue` is used to toggle the color scheme of the application.
 * It uses cookies to store the color scheme from the user's preference.
 * This method results in an entirely CSS-based solution for managing the color scheme.
 * Avoiding the need for JavaScript to set the color scheme.
 * 
 * @pumposh
 */
type Scheme = 'auto' | 'dark' | 'light';

const colorMode = useCookie<Scheme>('color-scheme', {
  default: () => 'auto',
});

const setColorScheme = (scheme: Scheme) => {
  colorMode.value = scheme;
};
</script>

<style scoped lang="scss">
.SchemeToggle {
  border: 2px solid var(--button-bg);
  border-radius: 24px;
  inline-size: fit-content;
  padding: 3px;
  transition: all var(--transition-speed) ease-in-out;
}

.SchemeToggle label {
  border-radius: 21px;
  cursor: pointer;
  display: inline-flex;
  padding: 4px 12px;
  text-align: center;
  user-select: none;
  color: color-mix(in sRGB, var(--text-color), transparent 40%);
}

.SchemeToggle label:has(input:checked) {
  background-color: var(--button-bg);
  color: var(--button-color);
  transition: all var(--transition-speed) ease-in-out;
}

[data-sr] {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
</style>