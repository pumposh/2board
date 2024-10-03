<template>
  <main class="default-layout">
    <SideBar @update:isLocked="updateIsLocked" />
    <div class="default-layout__content-container">
      <div class="default-layout__content-spacer" :style="{ height: spacerHeight }" />
      <div class="default-layout__content" :class="contentClasses">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
/**
 * This layout is the default layout for the application.
 * It has a sidebar and a content area.
 * The content area has a spacer above the content which displays if the sidebar is not locked.
 */
import SideBar from '@/components/ui/SideBar/index.vue';
import { useMediaQuery } from '~/utils/extensions/dom';

const includeTopPadding = ref<boolean>(false);

const updateIsLocked = (isLocked: boolean) => {
    /** Restrictions denying locked sidebar on mobile are handled in SideBar.vue */
    includeTopPadding.value = !isLocked;
};

const spacerHeight = computed<string>(() => {
  return includeTopPadding.value ? '90px' : '0px';
});

const contentClasses = computed<string[]>(() => {
  const classes = [''];
  if (includeTopPadding.value) {
    classes.push('default-layout__content--with-padding');
  }
  return classes;
});

onMounted(() => {
  /**
   * This is to primarily cover the potential case where the sidebar
   * is locked on initial load.
   */
  const isSidebarLocked = useCookie<boolean>('isLocked', {
    default: () => false,
  });

  const { matches: isMobile } = useMediaQuery('mobile');

  const initialPaddingRequired = isMobile.value || !isSidebarLocked.value;

  includeTopPadding.value = initialPaddingRequired;
});

</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: row;
  height: 100dvh;
  width: 100dvw;
  overflow: hidden;
  position: relative;
}

.default-layout__content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  width: calc(100% + var(--tb-border-radius));
  margin-left: calc(-1 * var(--tb-border-radius));
  z-index: 0;
  padding-left: var(--tb-border-radius);
  background-color: var(--background-color);
  transition: all var(--transition-speed) ease-in-out;
}

.default-layout__content {
  overflow: scroll;
  flex-grow: 1;
  padding: 12px 12px;
  transition: all var(--transition-speed) ease-in-out;
  @media (min-width: 768px) {
    padding: 24px 24px;
  }
}

.default-layout__content--with-padding {
  padding: 0 calc(12px + var(--tb-border-radius));  
  @media (min-width: 768px) {
    padding: 0 calc(24px + var(--tb-border-radius));
  }
}

.default-layout__content-spacer {
  height: 90px;
  width: 100%;
  transition: all var(--transition-speed) ease-in-out;
}
</style>
