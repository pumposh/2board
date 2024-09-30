<template>
  <main class="default-layout">
    <SideBar @update:isLocked="updateIsLocked" />
    <div class="default-layout__content-container" :class="appContentClasses">
      <div class="default-layout__content">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
/**
 * This layout is the default layout for the application.
 * It has a sidebar and a content area.
 * The sidebar is on the left and the content area is on the right.
 * The content area has a top padding if the sidebar is not locked.
 */
import SideBar from '@ui/SideBar/index.vue';

const includeTopPadding = ref<boolean>(false);

const updateIsLocked = (isLocked: boolean) => {
    includeTopPadding.value = !isLocked;
    console.log('includeTopPadding', includeTopPadding.value);
};

const appContentClasses = computed<string[]>(() => {
  const classNames: string[] = [];
  if (includeTopPadding.value) {
    classNames.push('default-layout__content-container--with-top-padding');
  }
  return classNames;
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
  width: calc(100% + $tb-border-radius);
  margin-left: -$tb-border-radius;
  z-index: 0;
  padding-left: $tb-border-radius;
  background-color: var(--background-color);
  transition: all var(--transition-speed) ease-in-out;
}

.default-layout__content {
  transition: all var(--transition-speed) ease-in-out;
  overflow: scroll;
  flex-grow: 1;
  padding: 12px 12px;
  transition: all var(--transition-speed) ease-in-out;
  @media (min-width: 768px) {
    padding: 24px 24px;
  }
}

.default-layout__content-container--with-top-padding {
  .default-layout__content {
    padding: 90px calc(12px + $tb-border-radius) 0;
    @media (min-width: 768px) {
      padding: 90px calc(24px + $tb-border-radius) 0;
    }
  }
}
</style>
