import { navigateTo, useRouter } from "nuxt/app";
import { computed } from "vue";

type Router = ReturnType<typeof useRouter>;
type BaseRoute = ReturnType<Router['getRoutes']>[0];

export interface RouteWithNameAndIcon extends BaseRoute {
  name: string;
  meta: {
      navIcon: string;
  };
}

export const useNavigation = () => {
  const router = useRouter();

  const openPage = (route: RouteWithNameAndIcon) => {
      navigateTo(route);
  };

  const pages = computed<RouteWithNameAndIcon[]>(() => {

      const routes = router.getRoutes().filter(route => route.meta.navIcon);

      const isValidRoute = <T extends typeof routes[0]>(
          route: T,
      ): route is T & RouteWithNameAndIcon => {
          if (
            !route.meta?.navIcon
            || typeof route.meta.navIcon !== 'string'
          ) {
            return false;
          }
          return typeof route.name === 'string';
      };

      return routes.filter(isValidRoute);
  });

  const currentPage = computed(() => {
    return pages.value.find(page => page.path === router.currentRoute.value.path);
  });

  return {
    pages,
    currentPage,
    openPage,
  };
};
