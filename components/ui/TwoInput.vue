<template>
  <div class="TwoInput" :class="containerClass">
    <input
      v-bind="$attrs"
      class="TwoInput__input"
      :class="inputClass"
      :value="value"
      @input="handleInput"
      @keydown.enter="handleSubmit"
    />
    <TwoButton
      class="TwoInput__button"
      v-if="buttonIcon"
      :disabled="!value"
      :icon="buttonIcon"
      :loading="loading"
      :variant="!value ? 'ghost' : undefined"
      @click="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Use `TwoInput.vue` to create an input element. This will
 * allow for v-model binding and optionally rendering a button
 * to the right side of the input with an icon.
 * 
 * @pumposh
 */
import { computed } from 'vue';
import TwoButton from './TwoButton.vue';

const props = defineProps({
  buttonIcon: {
    type: String,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const value = defineModel({
    type: String,
    default: '',
});

const containerClass = computed<string[]>(() => {
  const classes: string[] = [];
  if (props.fullWidth) {
    classes.push('TwoInput__container--full-width');
  }
  return classes;
});

const inputClass = computed<string[]>(() => {
  const classes: string[] = [];
  if (props.buttonIcon) {
    classes.push('TwoInput__input--with-button');
  }
  if (props.fullWidth) {
    classes.push('TwoInput__input--full-width');
  }
  return classes;
});

const emit = defineEmits(['update:value', 'submit']);

/** Text input event handler */
const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.value || typeof input.value !== 'string') return;
  value.value = input.value;
};

/** Submit event handler */
const handleSubmit = () => {
  emit('submit', value.value);
};
</script>

<style scoped lang="scss">
.TwoInput {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
}

.TwoInput__container--full-width {
  width: 100%;
}

.TwoInput__button {
  height: 100%;
  position: absolute;
  right: 0;
}

.TwoInput__input--with-button {
  padding-right: 40px;
}

.TwoInput__input--full-width {
  width: 100%;
}
</style>