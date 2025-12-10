import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store } from "@/store";
import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user-store";

import AfterLoginAPI from "@/api/laravel-fast-api/v1/login/afterlogin.api";
import type { RouteVO } from "@/api/laravel-fast-api/v1/system/menu/menu.type";

const modules = import.meta.glob([
  "../../views/**/**.vue",
  "../../pages/laravel-fast-api/v1/**/**.vue", // 新增目录的扫描规则
]);
const Layout = () => import("@/layouts/index.vue");

export const usePermissionStore = defineStore("permission", () => {
  // 所有路由（静态路由 + 动态路由）
  const routes = ref<RouteRecordRaw[]>([]);
  // 混合布局的左侧菜单路由
  const mixLayoutSideMenus = ref<RouteRecordRaw[]>([]);
  // 动态路由是否已生成
  const isDynamicRoutesGenerated = ref(false);

  /**
   * 生成动态路由
   */
  async function generateRoutes() {
    try {
      const result = await AfterLoginAPI.getTreePermission(); // 获取当前登录人拥有的菜单路由

      const { data } = result;

      //登录用户的角色
      const loginUserRoles = useUserStoreHook().roles;

      // 判断是否为开发或超级管理员角色
      const isDevelopOrSuper = loginUserRoles.some(
        (role) => role === "develop" || role === "super"
      );

      // 根据角色判断是否过滤路由
      const processedData = isDevelopOrSuper ? data : filterRoutesByRoles(data, loginUserRoles);

      const dynamicRoutes = parseDynamicRoutes(processedData);

      routes.value = [...constantRoutes, ...dynamicRoutes];

      isDynamicRoutesGenerated.value = true;

      return dynamicRoutes;
    } catch (error) {
      console.error("❌ Failed to generate routes:", error);
      isDynamicRoutesGenerated.value = false;
      throw error;
    }
  }

  /**
   * 根据用户角色过滤路由数据（递归处理嵌套路由）
   * @param {Array} routes - 路由数据数组
   * @param {Array} userRoles - 用户拥有的角色数组
   * @returns {Array} 过滤后的路由数组
   */
  function filterRoutesByRoles(routes: RouteVO[], userRoles: string[]) {
    return routes.filter((route) => {
      // 检查当前路由是否有权限访问
      const hasPermission = route.meta?.roles?.some((role) => userRoles.includes(role));

      // 如果有子路由，递归过滤子路由
      if (hasPermission && route.children && route.children.length) {
        route.children = filterRoutesByRoles(route.children, userRoles);
        // 如果子路由过滤后为空，当前路由也不保留
        return route.children.length > 0;
      }

      return hasPermission;
    });
  }
  /**
   * 设置混合布局的左侧菜单
   */
  const setMixLayoutSideMenus = (parentPath: string) => {
    const parentMenu = routes.value.find((item) => item.path === parentPath);
    mixLayoutSideMenus.value = parentMenu?.children || [];
  };

  /**
   * 重置路由状态
   */
  const resetRouter = async () => {
    // 移除动态路由
    const constantRouteNames = new Set(constantRoutes.map((route) => route.name).filter(Boolean));
    routes.value.forEach((route) => {
      if (route.name && !constantRouteNames.has(route.name)) {
        router.removeRoute(route.name);
      }
    });

    // 重置状态
    routes.value = [...constantRoutes];
    mixLayoutSideMenus.value = [];
    isDynamicRoutesGenerated.value = false;
    //重新导航
    await generateRoutes();
  };

  /**
   * 解析后端返回的路由数据并转换为 Vue Router 兼容的路由配置
   *
   * @param rawRoutes 后端返回的原始路由数据
   * @returns 解析后的路由集合
   */
  const parseDynamicRoutes = (rawRoutes: RouteVO[]): RouteRecordRaw[] => {
    const parsedRoutes: RouteRecordRaw[] = [];

    // 新增的组件目录，可根据实际需求修改路径
    const baseViewsPath = "../../pages/laravel-fast-api/v1/";
    // 原来的组件目录
    const originalViewsPath = "../../views/";

    rawRoutes.forEach((route) => {
      const normalizedRoute = { ...route } as RouteRecordRaw;

      // console.log("route.component:");
      // console.log(normalizedRoute);

      // 处理组件路径 - 先检查新目录，再检查原目录
      if (normalizedRoute.component?.toString() === "Layout") {
        normalizedRoute.component = Layout;
      } else {
        // 构建组件的路径
        const componentName = normalizedRoute.component?.toString();
        if (componentName) {
          // 优先从基础录查找
          normalizedRoute.component =
            modules[`${baseViewsPath}${componentName}.vue`] ||
            // 再从源目录查找
            modules[`${originalViewsPath}${componentName}.vue`] ||
            // 最后 fallback 到404页面
            modules["../../views/error-page/404.vue"];
        } else {
          // 如果没有指定组件，默认使用404
          normalizedRoute.component = modules["../../views/error-page/404.vue"];
        }
      }

      //处理redirect为空时的问题
      if (normalizedRoute.redirect === "") {
        // 重定向为空时，改为重定向到当前路由 path（或其他合理默认值）
        normalizedRoute.redirect = normalizedRoute.path;
      }

      // 递归解析子路由
      if (normalizedRoute.children) {
        normalizedRoute.children = parseDynamicRoutes(route.children);
      }

      parsedRoutes.push(normalizedRoute);
    });

    return parsedRoutes;
  };

  return {
    routes,
    mixLayoutSideMenus,
    isDynamicRoutesGenerated,
    generateRoutes,
    setMixLayoutSideMenus,
    resetRouter,
  };
});

/**
 * 导出此hook函数用于在非组件环境(如其他store、工具函数等)中获取权限store实例
 *
 * 在组件中可直接使用usePermissionStore()，但在组件外部需要传入store实例
 * 此函数简化了这个过程，避免每次都手动传入store参数
 */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
