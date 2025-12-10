/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-09 04:02:00
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-09 04:28:17
 * @FilePath: \src\store\modules\audio-play-store.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import { store } from "@/store";

export const useAudioPlayStore = defineStore("audioPlay", () => {
  const hasPlayPermission = ref(false);

  const checkPlayPermission = async () => {
    try {
      // 补try/catch，防止用户点取消报错
      await ElMessageBox.confirm("需要音频播放权限接收消息提示音", "权限申请", {
        confirmButtonText: "授权",
        cancelButtonText: "取消",
      });
      hasPlayPermission.value = true;
    } catch {
      ElMessage.warning("取消授权，将无法播放提示音");
    }
  };

  const autoPlay = async (audioUrl: string) => {
    if (hasPlayPermission.value) {
      const audio = new Audio(audioUrl);
      audio.currentTime = 0;
      audio.play().catch(() => ElMessage.error("提示音播放失败")); // 补play失败的catch
    } else {
      await checkPlayPermission();
      if (hasPlayPermission.value) {
        // 加判断，防止用户取消授权后还执行play
        const audio = new Audio(audioUrl);
        audio.currentTime = 0;
        audio.play().catch(() => ElMessage.error("提示音播放失败"));
      }
    }
  };

  return { hasPlayPermission, checkPlayPermission, autoPlay };
});

/**
 * 在组件外部使用UserStore的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useAudioPlayStoreHook() {
  return useAudioPlayStore(store);
}
