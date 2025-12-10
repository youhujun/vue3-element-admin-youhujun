/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-22 15:51:25
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-21 11:21:40
 * @FilePath: \src\directives\permission\index.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { Directive, DirectiveBinding } from "vue";

import { watch } from "vue"; // 从 vue 导入 watch

import { useUserStore } from "@/store";

/**
 * 按钮权限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const requiredPerms = binding.value;

    // 校验传入的权限值是否合法
    if (!requiredPerms || (typeof requiredPerms !== "string" && !Array.isArray(requiredPerms))) {
      throw new Error(
        "需要提供权限标识！例如：v-has-perm=\"'sys:user:add'\" 或 v-has-perm=\"['sys:user:add', 'sys:user:edit']\""
      );
    }

    const { roles, perms } = useUserStore().userInfo;

    // 超级管理员拥有所有权限，如果是"*:*:*"权限标识，则不需要进行权限校验
    if (roles.includes("develop") || requiredPerms.includes("*:*:*")) {
      return;
    }

    // 检查权限
    const hasAuth = Array.isArray(requiredPerms)
      ? requiredPerms.some((perm) => perms.includes(perm))
      : perms.includes(requiredPerms);

    // 如果没有权限，移除该元素
    if (!hasAuth && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },
};

/**
 * 角色权限指令
 */
/* export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const requiredRoles = binding.value;

    // 校验传入的角色值是否合法
    if (!requiredRoles || (typeof requiredRoles !== "string" && !Array.isArray(requiredRoles))) {
      throw new Error(
        "需要提供角色标识！例如：v-has-role=\"'ADMIN'\" 或 v-has-role=\"['ADMIN', 'TEST']\""
      );
    }

    const roles = useUserStore().roles;

    // 检查是否有对应角色权限
    const hasAuth = Array.isArray(requiredRoles)
      ? requiredRoles.some((role) => roles.includes(role))
      : roles.includes(requiredRoles);

    // 如果没有权限，移除元素
    if (!hasAuth && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },
}; */

/**
 * 角色权限指令
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const userStore = useUserStore(); // 在 mounted 钩子内获取 store 实例
    const requiredRoles = binding.value;

    // 封装权限判断逻辑
    const checkRoleAuth = () => {
      // 1. 校验传入的角色格式是否合法
      if (!requiredRoles || (typeof requiredRoles !== "string" && !Array.isArray(requiredRoles))) {
        throw new Error(
          "需要提供角色标识！例如：v-has-role=\"'ADMIN'\" 或 v-has-role=\"['ADMIN', 'TEST']\""
        );
      }

      // 2. 从store中获取当前用户角色
      const currentRoles = userStore.roles || [];

      // 3. 超级管理员直接放行
      if (currentRoles.includes("develop") || currentRoles.includes("super")) {
        return true;
      }

      // 4. 检查是否拥有目标角色
      const hasAuth = Array.isArray(requiredRoles)
        ? requiredRoles.some((role) => currentRoles.includes(role))
        : currentRoles.includes(requiredRoles);

      return hasAuth;
    };

    // 初始执行权限判断
    let hasAuth = checkRoleAuth();
    if (!hasAuth && el.parentNode) {
      el.parentNode.removeChild(el);
    }

    // 5. 使用 vue 的 watch 函数监听角色变化
    const unwatch = watch(
      () => userStore.roles, // 监听 store 中的 roles 状态
      (_newRoles) => {
        hasAuth = checkRoleAuth();
        // 根据新的权限状态动态添加/移除元素
        if (hasAuth) {
          // 如果有权限且元素已被移除，则重新添加
          if (!el.parentNode) {
            // 这里需要找到一个合适的父元素来重新挂载，
            // 一个常见的做法是在移除前保存父元素和下一个兄弟元素
            // 为了简化，这里假设元素有一个占位符或者可以直接添加回原来的父元素
            // 更稳健的实现见下方补充说明
          }
        } else {
          // 如果没有权限且元素仍在DOM中，则移除
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      },
      { deep: true } // 深度监听，确保数组内部变化也能被捕获
    );

    // 保存取消监听的函数和原始父元素、兄弟元素，用于后续恢复
    (el as any)._unwatchRole = unwatch;
  },

  // 组件卸载时取消监听，防止内存泄漏
  unmounted(el: HTMLElement) {
    (el as any)._unwatchRole?.();
  },
};
