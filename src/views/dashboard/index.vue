<template>
  <div class="dashboard-container">
    <!-- github 角标 -->
    <github-corner class="github-corner" />

    <el-card shadow="never" class="mt-2">
      <div class="flex flex-wrap">
        <!-- 左侧问候语区域 -->
        <div class="flex-1 flex items-start">
          <img
            class="w80px h80px rounded-full"
            :src="userStore.userInfo.avatar + '?imageView2/1/w/80/h/80'"
          />
          <div class="ml-5">
            <p>{{ greetings }}</p>
            <p class="text-sm text-gray">今日天气晴朗，气温在15℃至25℃之间，东南风。</p>
          </div>
        </div>

        <!-- 右侧图标区域 - PC端 -->
        <div class="hidden sm:block">
          <div class="flex items-end space-x-6">
            <!-- 仓库 -->
            <div>
              <div class="font-bold color-#ff9a2e text-sm flex items-center">
                <el-icon class="mr-2px"><Folder /></el-icon>
                仓库
              </div>
              <div class="mt-3 whitespace-nowrap">
                <el-link href="https://gitee.com/youlaiorg/vue3-element-admin" target="_blank">
                  <div class="i-svg:gitee text-lg color-#F76560" />
                </el-link>
                <el-divider direction="vertical" />
                <el-link href="https://github.com/youlaitech/vue3-element-admin" target="_blank">
                  <div class="i-svg:github text-lg color-#4080FF" />
                </el-link>
                <el-divider direction="vertical" />
                <el-link href="https://gitcode.com/youlai/vue3-element-admin" target="_blank">
                  <div class="i-svg:gitcode text-lg color-#FF9A2E" />
                </el-link>
              </div>
            </div>

            <!-- 文档 -->
            <div>
              <div class="font-bold color-#4080ff text-sm flex items-center">
                <el-icon class="mr-2px"><Document /></el-icon>
                文档
              </div>
              <div class="mt-3 whitespace-nowrap">
                <el-link href="https://juejin.cn/post/7228990409909108793" target="_blank">
                  <div class="i-svg:juejin text-lg" />
                </el-link>
                <el-divider direction="vertical" />
                <el-link
                  href="https://youlai.blog.csdn.net/article/details/130191394"
                  target="_blank"
                >
                  <div class="i-svg:csdn text-lg" />
                </el-link>
                <el-divider direction="vertical" />
                <el-link href="https://www.cnblogs.com/haoxianrui/p/17331952.html" target="_blank">
                  <div class="i-svg:cnblogs text-lg" />
                </el-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 移动端图标区域 -->
        <div class="w-full sm:hidden mt-3">
          <div class="flex justify-end space-x-4 overflow-x-auto">
            <!-- 仓库图标 -->
            <el-link href="https://gitee.com/youlaiorg/vue3-element-admin" target="_blank">
              <div class="i-svg:gitee text-lg color-#F76560" />
            </el-link>
            <el-link href="https://github.com/youlaitech/vue3-element-admin" target="_blank">
              <div class="i-svg:github text-lg color-#4080FF" />
            </el-link>
            <el-link href="https://gitcode.com/youlai/vue3-element-admin" target="_blank">
              <div class="i-svg:gitcode text-lg color-#FF9A2E" />
            </el-link>

            <!-- 文档图标 -->
            <el-link href="https://juejin.cn/post/7228990409909108793" target="_blank">
              <div class="i-svg:juejin text-lg" />
            </el-link>
            <el-link href="https://youlai.blog.csdn.net/article/details/130191394" target="_blank">
              <div class="i-svg:csdn text-lg" />
            </el-link>
            <el-link href="https://www.cnblogs.com/haoxianrui/p/17331952.html" target="_blank">
              <div class="i-svg:cnblogs text-lg" />
            </el-link>

            <!-- 视频图标 -->
            <el-link href="https://www.bilibili.com/video/BV1eFUuYyEFj" target="_blank">
              <div class="i-svg:bilibili text-lg" />
            </el-link>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//api 和 type
import AfterLoginAPI from "@/api/laravel-fast-api/v1/login/afterlogin.api";
import type { SystemVoiceConfigItem } from "@/api/laravel-fast-api/v1/login/afterlogin.type";
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});
import LaravelSocket from "@/socket/laravel-socket";
import { useUserStore } from "@/store/modules/user-store";
import { useAudioPlayStore } from "@/store/modules/audio-play-store";
const userStore = useUserStore();
const audioPlayStore = useAudioPlayStore();

// 当前时间（用于计算问候语）
const currentDate = new Date();

// 问候语：根据当前小时返回不同问候语
const greetings = computed(() => {
  const hours = currentDate.getHours();
  const nickname = userStore.userInfo.nickname;
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return `上午好，${nickname}！`;
  } else if (hours >= 12 && hours < 18) {
    return `下午好，${nickname}！`;
  } else if (hours >= 18 && hours < 24) {
    return `晚上好，${nickname}！`;
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});

const getAllSystemVoiceConfig = async () => {
  // WebSocket监听事件中触发通知（带声音）
  // 单个调试示例
  // LaravelSocket.channel('yh_admin_test').listen('.AdminTest', (e: any) => {
  // 	console.log('success');
  // 	console.log(e);
  // 	const voiceUrl = 'https://qiniu.youhujun.com/config/file/voice/test_notice.mp3';
  // 	// 调用封装的播放方法（自动复用权限）
  // 	audioPlayStore.autoPlay(voiceUrl); // 触发就调这个，只弹一次框
  // });

  const result = await AfterLoginAPI.getAllSystemVoiceConfig();
  const voiceConfigArray = result.data;

  //console.log(import.meta.env.VITE_APP_SOCKET_USE)
  if (import.meta.env.VITE_APP_SOCKET_USE === "true") {
    voiceConfigArray.map((item: SystemVoiceConfigItem) => {
      LaravelSocket.channel(import.meta.env.VITE_APP_SOCKET_PREFIX + item.channle_name).listen(
        `.${item.channle_event}`,
        (e: any) => {
          console.log(e);
          const music = new Audio(item.voice_use_url);
          music.play();
        }
      );
    });
  }
};

// 组件挂载后加载访客统计数据和通知公告数据
onMounted(() => {
  audioPlayStore.checkPlayPermission();
  getAllSystemVoiceConfig();
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }

  .version-item {
    padding: 16px;
    margin-bottom: 12px;
    background: var(--el-fill-color-lighter);
    border-radius: 8px;
    transition: all 0.2s;

    &.latest-item {
      background: var(--el-color-primary-light-9);
      border: 1px solid var(--el-color-primary-light-5);
    }
    &:hover {
      transform: translateX(5px);
    }
    .version-content {
      margin-bottom: 12px;
      font-size: 13px;
      line-height: 1.5;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
