<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-09 02:43:21
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 01:53:39
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Editor\Tinymce\TinyMceEditor.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div
    v-loading="tinymceLoad"
    element-loading-text="拼命加载中"
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(38, 38, 38, 0.8)"
  >
    <Editor
      :id="tinymceId"
      v-model="contentValue"
      :api-key="apiKey"
      :init="init"
      :disabled="disabled"
      initial-value="Welcome to TinyMCE!"
    />
    <!-- 上传多图开始 -->
    <UploadPictureDialog
      v-model:upload-picture-dialog-visible="uploadPictureDialogVisible"
      :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
      type="image"
      @update:upload-picture-with-editor="listenUploadPicture"
    ></UploadPictureDialog>
    <!-- 上传多图开始结束 -->
    <CallAlbumDialog
      v-model:call-album-dialog-visible="callAlbumDialogVisible"
      @update:select-pciture-with-editor="listenSelectPicture"
    ></CallAlbumDialog>
  </div>
</template>
<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";
import plugins from "./plugins";
import toolbar from "./toolbar";

//弹框
//上传图片弹窗
import UploadPictureDialog from "@/pages/laravel-fast-api/v1/components/element/Editor/Dialog/UploadPictureDialog.vue";
//调用相册弹窗
import CallAlbumDialog from "@/pages/laravel-fast-api/v1/components/element/Editor/Dialog/CallAlbumDialog.vue";
//api和type
import type { PictureListItem } from "@/api/laravel-fast-api/v1/picture/picture/picture-type";

//定义富文本编辑组件
defineOptions({
  name: "TinyMceEditor",
});
//定义的svg图标
const svg = `
	<path class="path" d="
		M 30 15
		L 28 17
		M 25.61 25.61
		A 15 15, 0, 0, 1, 15 30
		A 15 15, 0, 1, 1, 27.99 7.5
		L 15 15
	" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;
//定义传入参数
const { disabled } = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: () => {
      return false;
    },
  }
);

//是否开启上传图片弹框
const uploadPictureDialogVisible = ref(false);
//是否开启选择相册弹窗
const callAlbumDialogVisible = ref(false);
//定义内容
const contentValue = defineModel<string>("contentValue", {
  default: "",
});
//定义tinymce初始化状态是否完成
const tinymceLoad = ref(true);
//定义id
const tinymceId = ref("vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""));
//定义apiKey
const apiKey = ref(import.meta.env.VITE_APP_TINYMCE_API_KEY);
// 定义 TinyMCE 初始化配置
const init = ref({
  // Vue3 中不需要 selector（组件会自动绑定），如果需要可以保留但建议移除
  selector: `#${tinymceId.value}`, // 注意：Vue3 中 tinymceId 是 ref，需要 .value
  max_height: 1000,
  max_width: 1500,
  min_height: 400,
  min_width: 800,
  width: 1200,
  height: 800,
  language_url: "/static/tinymce/langs/zh_CN.js",
  language: "zh_CN", // 语言设置为中文（需要引入中文语言包）
  menu: {
    custom: { title: "图片", items: "pictureUpload albumSelect" },
    clear: { title: "清空", items: "clear" },
  },
  menubar: "file edit insert view format table tools help custom clear",
  setup: (editor: any) => {
    // 注册自定义菜单项 - 上传图片
    editor.ui.registry.addMenuItem("pictureUpload", {
      text: "上传图片",
      onAction: () => {
        //console.log('点击上传图片')
        uploadPictureDialogVisible.value = true;
      },
    });

    // 注册自定义菜单项 - 选择相册
    editor.ui.registry.addMenuItem("albumSelect", {
      text: "选择相册",
      onAction: () => {
        //console.log('点击选择相册')
        callAlbumDialogVisible.value = true;
      },
    });

    // 注册自定义菜单项 - 清空内容
    editor.ui.registry.addMenuItem("clear", {
      text: "清空内容",
      onAction: () => {
        contentValue.value = ""; // 直接修改响应式内容
        editor.setContent("");
      },
    });
    // 监听内容变化，同步到 contentValue
    /*  editor.on('change', () => {
      contentValue.value = editor.getContent()
    }) */
    // 初始化时设置初始内容
    editor.on("init", () => {
      //console.log('tinymce,加载完成!')
      tinymceLoad.value = false;
      if (contentValue.value) {
        editor.setContent(contentValue.value);
      }
    });
  },
  plugins, // 插件
  toolbar, // 工具栏
  branding: false, // 隐藏技术支持文字
  paste_data_images: true, // 允许粘贴图片
});
onMounted(() => {
  //打印api_key
  //console.log(import.meta.env.VITE_APP_TINYMCE_API_KEY)
  //contentValue.value = ''
});

onUnmounted(() => {
  //contentValue.value = ''
});

//监听上传图片成功
const listenUploadPicture = (param: PictureListItem[]) => {
  if (param.length > 0) {
    let content = "";
    param.forEach((element) => {
      const src = element.picture;
      content = content + `<p style="text-align: center;"><img src="${src}" /></p>`;
    });
    contentValue.value = contentValue.value + content;
    //关闭弹窗
    uploadPictureDialogVisible.value = false;
  }
};
//监听选择相册图片成功
const listenSelectPicture = (param: PictureListItem[]) => {
  if (param.length > 0) {
    let content = "";
    param.forEach((element) => {
      const src = element.picture;
      content = content + `<p style="text-align: center;"><img src="${src}" /></p>`;
    });
    contentValue.value = contentValue.value + content;
    //关闭弹窗
    callAlbumDialogVisible.value = false;
  }
};
</script>

<style lang="scss" scoped>
:deep(.tox-tinymce) {
  width: 1200px;
}
</style>
<style>
.tox-notifications-container {
  display: none;
}
.tox-tinymce-aux {
  z-index: 5000 !important;
}
</style>
