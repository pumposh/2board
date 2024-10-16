<template>
  <div v-for="page in pages" :key="page.name">
      <TwoButton
          class="SideBar__menu-button"
          :icon="page.meta.navIcon"
          iconPosition="left"
          fullWidth
          :variant="currentPage?.name === page.name ? 'primary' : 'ghost'"
          @click="handleClick(page)"
      >
          <div class="SideBar__menu-button-text">{{ page.name }}</div>
      </TwoButton>
  </div>
</template>

<script setup lang="ts">
/**
 * `Routes.vue` is used to display the routes in the sidebar.
 * It uses the useNavigation composable to get the pages and the current page.
 * It also uses the TwoButton component to display the routes.
 * It emits a click event with the page as payload.
 * 
 * @pumposh
 */
import TwoButton from '@ui/TwoButton.vue';
import { useNavigation, type RouteWithNameAndIcon } from './useNavigation';

const { pages, currentPage, openPage } = useNavigation();

const emit = defineEmits<{
    (event: 'click', page: RouteWithNameAndIcon): void;
}>();

const handleClick = (page: RouteWithNameAndIcon) => {
    emit('click', page);
    openPage(page);
};
</script>