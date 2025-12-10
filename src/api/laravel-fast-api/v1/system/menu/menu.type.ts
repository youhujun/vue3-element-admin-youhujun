/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-08-03 15:49:51
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-16 12:40:21
 * @FilePath: \src\api\laravel-fast-api\v1\system\menu\menu.type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { MenuTypeEnum } from "@/enums/system/menu-enum";

/** Meta，路由属性 */
export interface Meta {
  /** 【目录】只有一个子路由是否始终显示 */
  alwaysShow?: boolean;
  /** 是否隐藏(true-是 false-否) */
  hidden?: boolean;
  /** ICON */
  icon?: string;
  /** 【菜单】是否开启页面缓存 */
  keepAlive?: boolean;
  /** 路由title */
  title?: string;
  roles?: string[];
}

/** RouteVO，路由对象 */
export interface RouteVO {
  id: number;
  parent_id: number;
  deep: number;
  /** 子路由列表 */
  children: RouteVO[];
  /** 组件路径 */
  component?: string;
  /** 路由属性 */
  meta?: Meta;
  /** 路由名称 */
  name?: string;
  /** 路由路径 */
  path?: string;
  /** 跳转链接 */
  redirect?: string;
}

/** 菜单查询参数 */
export interface MenuQuery {
  /** 搜索关键字 */
  keywords?: string;
}

/** 菜单视图对象 */
export interface TreeMenuItem {
  /** 子菜单 */
  children?: TreeMenuItem[];
  /** 组件路径 */
  component?: string;
  /** ICON */
  icon?: string;
  /** 菜单ID */
  id: string | number;
  deep?: number;
  /** 菜单名称 */
  title?: string;
  /** 父菜单ID */
  parent_id: string | number;
  /** 按钮权限标识 */
  perm?: string;
  /** 跳转路径 */
  redirect?: string;
  /** 路由名称 */
  route_name?: string;
  /** 路由相对路径 */
  route_path?: string;
  /** 菜单排序(数字越小排名越靠前) */
  sort?: number;
  /** 菜单 */
  type?: MenuTypeEnum;
  /** 菜单是否可见(1:显示;0:隐藏) */
  hidden?: number;
  always_show?: number;
  switch?: number;
  affix?: number;
  breadcrumb?: number;
  active_menu?: string;
  cache?: number;
  /** 参数 */
  params?: KeyValue[];
}

/** 菜单表单对象 */
export interface MenuForm {
  /** 菜单ID */
  id?: string | number;
  /** 父菜单ID */
  parent_id?: string | number;
  //菜单级别
  deep?: number;
  /** 菜单 */
  type?: MenuTypeEnum;
  /** 路由名称 */
  route_name?: string;
  /** 路由路径 */
  route_path?: string;
  /** 组件路径 */
  component?: string;
  /** 菜单是否可见(1-是 0-否) */
  hidden: number;
  /** 【目录】只有一个子路由是否始终显示 */
  always_show?: number;
  /** 权限标识 */
  perm?: string;
  //是否启用
  switch?: number;
  /** ICON */
  icon?: string;
  /** 排序 */
  sort?: number;
  /** 菜单名称 */
  title?: string;
  /** 【菜单】是否开启页面缓存 */
  cache?: number;
  // 是否固定
  affix?: number;
  //是否在面包屑中显示
  breadcrumb?: number;
  //动态路由
  active_menu?: string;
  /** 跳转路由路径 */
  redirect?: string;
  /** 参数 */
  params?: KeyValue[];
}

interface KeyValue {
  key: string;
  value: string;
}
