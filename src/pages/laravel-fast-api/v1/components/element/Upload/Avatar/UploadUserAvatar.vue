<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-30 01:47:20
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-08 17:11:24
 * @FilePath: \src\pages\laravel-fast-api\v1\components\element\Upload\Avatar\UploadUserAvatar.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
 使用示例:
 <UplaodUserAvatar
	:upload-data="{type:null, use_type:20, file_type: '', save_path: 'picture'}"
	type="image"
	v-model:upload-picture-url="uploadPicutreUrl"
	:user-id="12"
	/>
-->
<template>
  <div>
    <!-- 上传单图开始 -->
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      drag
      :data="{
        album_id: uploadAlbumId,
        use_type: 20,
        file_type: '',
        save_path: 'picture',
        user_id: userId,
      }"
      :headers="headers"
      accept="image/*"
      :limit="1"
      :on-exceed="handleExceed"
      :action="singlePicture"
      :before-upload="beforeUploadPicture"
      :http-request="uploadPicture"
      name="picture"
      :auto-upload="true"
      :show-file-list="false"
    >
      <el-avatar :size="size" :src="uploadPictureUrl" fit="cover">
        <!-- 图片加载失败时的默认图片 -->
        <img src="~@/assets/images/avatar.gif" />
      </el-avatar>
    </el-upload>
  </div>
</template>
<script setup lang="ts">
//系统
import type { UploadProps, UploadInstance, UploadRequestOptions } from "element-plus";
//store
import { useUserStore } from "@/store";
//api
import UploadPictureAPI from "@/api/laravel-fast-api/v1/upload/picture/upload-picture-api";

defineOptions({
  name: "UplaodUserAvatar",
});

const userStore = useUserStore();

//定义上传图片的id
const uploadPictureId = defineModel<number>("uploadPictureId", {
  default: 0,
});
//定义上传的图片
const uploadPictureUrl = defineModel<string>("uploadPictureUrl", {
  default: "",
});

// 声明upload的ref类型，用于获取组件实例
const uploadRef = ref<UploadInstance>();

// 1. 定义具体的上传数据类型
interface UploadExtraData {
  type?: string | null; // 允许传递 type 属性
  file_type?: string | number | null;
  use_type?: string | number | null;
  save_path?: string;
  user_id?: number;
}

// 2. 修正 props 定义，将 uploadData 类型改为 UploadExtraData
const props = withDefaults(
  defineProps<{
    userId?: number;
    albumId?: number;
    size?: number;
    uploadData?: UploadExtraData; // 这里从 object 改为具体接口
    type?: string;
  }>(),
  {
    userId: 0,
    albumId: 0,
    size: 120,
    uploadData: () => ({}), // 默认空对象，符合 UploadExtraData 类型
    type: "file",
  }
);

//请求头
const headers = ref({
  time: new Date().getTime(),
  type: props.type,
  "X-Token": userStore.token,
});

//上传url
const singlePicture = ref(import.meta.env.VITE_APP_API_URL + "/api/v1/admin/file/uploadUserAvatar");

//上传相册id
const uploadAlbumId = ref(0);

//上传限制
const beforeUploadPicture: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("图片格式不正确");
    return false;
  }
  const isLt5M = rawFile.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    ElMessage.error("上传文件大小不能超过 5MB!");
    return false;
  }
  return true;
};

//检查超出限制
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `一次最多上传1张图片，本次选择了${files.length}张，累计已选择${
      files.length + uploadFiles.length
    }张`
  );
};

// 自定义上传方法 - 修正参数类型和逻辑
const uploadPicture = async (options: UploadRequestOptions) => {
  //console.log('uploadPicture options', options)
  const formData = new FormData();
  const { file_type, use_type, type, save_path } = props.uploadData;
  formData.append("picture", options.file);
  // 追加其他参数（转字符串避免类型问题）
  formData.append("album_id", uploadAlbumId.value.toString());

  if (file_type) formData.append("file_type", String(file_type));
  if (use_type) formData.append("use_type", String(use_type));
  if (save_path) formData.append("save_path", save_path);
  if (type) formData.append("type", type);
  formData.append("user_id", String(props.userId));

  // 5. 调用接口上传
  try {
    //单图上传
    const result = await UploadPictureAPI.uploadUserAvatar(formData);
    ElMessage.success(result.msg);

    uploadPictureId.value = result.data.id;
    uploadPictureUrl.value = result.data.picture;
    //console.log('uploadPictureUrl',uploadPictureUrl.value)
  } catch (error) {
    console.log("上传报错:", error);
    ElMessage.error("上传失败");
  } finally {
    // 无论成功失败都清空文件列表
    if (uploadRef.value) {
      uploadRef.value.clearFiles();
    }
    // 初始化相册id
    uploadAlbumId.value = 0;
  }
};

onMounted(() => {
  if (props.albumId) {
    uploadAlbumId.value = props.albumId;
  }
});
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 200px;
  height: 200px;
}
</style>
