<template>
    <button
        v-bind="$attrs"
        class="TwoButton"
        :class="buttonClass"
        :disabled="disabled || loading"
    >
        <i v-if="icon && !loading" :class="icon" />
        <slot v-if="!loading" />
        <span v-if="loading" class="TwoButton__loading-icon">
            <i class="fa-solid fa-circle-notch TwoButton__spin" />
        </span>
    </button>
</template>

<script setup lang="ts">
/**
 * Use `TwoButton.vue` to create a button with some additional
 * features like an icon, a loading state, a full width state,
 * a ghost state, an outline state and a disabled state.
 * 
 * @pumposh
 */
import { computed } from 'vue';

enum ButtonVariant {
    DEFAULT = 'default',
    GHOST = 'ghost',
    OUTLINE = 'outline',
}

const props = defineProps({
    icon: {
        type: String,
        required: false,
    },
    iconPosition: {
        type: String,
        required: false,
        default: 'right',
    },
    fullWidth: {
        type: Boolean,
        required: false,
        default: false,
    },
    variant: {
        type: String,
        required: false,
        default: ButtonVariant.DEFAULT,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    loading: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const buttonClass = computed<string[]>(() => {
    const classes: string[] = ['TwoButton'];
    if (props.iconPosition === 'left') {
        classes.push('TwoButton--icon-left');
    }
    if (props.fullWidth) {
        classes.push('TwoButton--full-width');
    }
    if (props.variant === ButtonVariant.GHOST) {
        classes.push('TwoButton--ghost');
    }
    if (props.variant === ButtonVariant.OUTLINE) {
        classes.push('TwoButton--outline');
    }
    if (props.loading) {
        classes.push('TwoButton--loading');
    }
    return classes;
});

</script>

<style lang="scss">
.TwoButton {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.TwoButton--icon-left {
    flex-direction: row-reverse;
}

.TwoButton--full-width {
    width: 100%;
}

.TwoButton--ghost {
    background-color: transparent;
    border: none;
    outline: 0px solid transparent;
}

.TwoButton--outline {
    border: 1px solid var(--tb-primary-500);
    background-color: transparent;
}

.TwoButton__loading-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.TwoButton__spin {
    animation: spin 1s ease-in-out infinite;
}
</style>