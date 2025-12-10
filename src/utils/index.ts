/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-07-27 14:54:11
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-01 00:07:35
 * @FilePath: \src\utils\index.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
// 防抖函数
export const debounce = <T extends (...args: any[]) => any, This = unknown>(
  func: T,
  wait: number
): ((this: This, ...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: This, ...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    // 直接使用箭头函数访问外部的 this，无需别名
    timeout = setTimeout(() => {
      func.apply(this, args); // 这里的 this 就是外部函数的 this
    }, wait);
  };
};

// 节流函数
export const throttle = <T extends (...args: any[]) => any, This = unknown>(
  fn: T,
  wait: number
): ((this: This, ...args: Parameters<T>) => void) => {
  let canRun = true;

  return function (this: This, ...args: Parameters<T>): void {
    if (!canRun) return;

    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, wait);
  };
};

/**
 * 对数组结构数据分组
 * @param array
 * @param subGroupLength
 * @returns
 */
export function group<T>(array: T[], subGroupLength: number): T[][] {
  let index = 0;
  const newArray: T[][] = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * 判断是否是外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

/**
 * 格式化增长率，保留两位小数 ，并且去掉末尾的0  取绝对值
 *
 * @param growthRate
 * @returns
 */
export function formatGrowthRate(growthRate: number) {
  if (growthRate === 0) {
    return "-";
  }

  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
}
