<!-- 使用示例:
<UploadSinglePicture 
	:upload-data="{type:null, use_type:20, file_type: '', save_path: 'picture'}"
	type="image"
	show-content="轮播图片"
	:is-show-button="true"
	v-model:upload-picture-id="createForm.album_picture_id"
	v-model:upload-picture-url="uploadPicutreUrl"
	/>
  -->
<template>
  <div>
    <el-button v-if="isShowButton" type="primary" @click="handleToOpenDialog()">
      {{ showContent }}
    </el-button>
    <!-- 弹窗内容开始 -->
    <YhDialog
      v-model="dialogVisible"
      :dialog-width="dialogWidth"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
    >
      <template #showContent>
        <!-- 选择相册 -->
        <SelectAlbum v-if="isShowSelectAlbum" v-model:select-album-id="uploadAlbumId"></SelectAlbum>
        <!-- 选择相册结束 -->
        <el-divider vf-if="isShowSelectAlbum">
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <!-- 上传单图开始 -->
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          drag
          :data="{ album_id: uploadAlbumId, use_type: 20, file_type: '', save_path: 'picture' }"
          :headers="headers"
          accept="image/*"
          :limit="1"
          :on-exceed="handleExceed"
          :action="singlePicture"
          :before-upload="beforeUploadPicture"
          :http-request="uploadPicture"
          name="picture"
          :auto-upload="true"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">支持Jpg、Gif、Png格式,大小不超过5MB的图片上传；</div>
          </template>
        </el-upload>
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
//系统
import type { UploadProps, UploadInstance, UploadRequestOptions } from "element-plus";
//公共组件
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import SelectAlbum from "@/pages/laravel-fast-api/v1/components/element/Album/SelectAlbum.vue";
//store
import { useUserStore } from "@/store";
//api
import UploadPictureAPI from "@/api/laravel-fast-api/v1/upload/picture/upload-picture-api";
import { UploadResetPicture } from "@/api/laravel-fast-api/v1/picture/picture/picture-type";

const userStore = useUserStore();

//通信
import bus from "@/utils/eventBus";

//定义上传单图组件
defineOptions({
  name: "UploadSinglePicture",
});
//定义emit
// const emit = defineEmits(["update:uploadFinish"]);

//定义上传图片的id
const uploadPictureId = defineModel<number | null>("uploadPictureId", {
  default: 0,
});
//定义上传的图片
const uploadPictureUrl = defineModel<string | null>("uploadPictureUrl", {
  default: "",
});

// 声明upload的ref类型，用于获取组件实例
const uploadRef = ref<UploadInstance>();
//是否显示选择相册
const isShowSelectAlbum = ref(true);
//10单图上传 20替换上传
const uploadType = ref(10);

// 1. 定义具体的上传数据类型
interface UploadExtraData {
  type?: string | null; // 允许传递 type 属性
  file_type?: string | number | null;
  use_type?: string | number | null;
  save_path?: string;
}

// 2. 修正 props 定义，将 uploadData 类型改为 UploadExtraData
const props = withDefaults(
  defineProps<{
    showFileList?: boolean;
    uploadData?: UploadExtraData; // 这里从 object 改为具体接口
    type?: string;
    showContent?: string;
    isShowButton?: boolean;
  }>(),
  {
    showFileList: false,
    uploadData: () => ({}), // 默认空对象，符合 UploadExtraData 类型
    type: "file",
    showContent: "上传图片",
    isShowButton: false,
  }
);

//请求头
const headers = ref({
  time: new Date().getTime(),
  type: props.type,
  "X-Token": userStore.token,
});

//上传url
const singlePicture = ref(import.meta.env.VITE_APP_API_URL + "/file/uploadSinglePicture");

//上传相册id
const uploadAlbumId = ref(1);

//替换上传图片容器
const resetPictureId = ref(0);

//打开弹窗
const handleToOpenDialog = () => {
  dialogVisible.value = true;
  dialogType.value = 30;
  dialogTitle.value = props.showContent;
  //上传图片的相册id
  uploadAlbumId.value = 0;
  //单图上传显示
  isShowSelectAlbum.value = false;
};

//监听替换上传
const handleToUploadResetPicture = (param: UploadResetPicture) => {
  //console.log('上传多图')
  dialogVisible.value = true;
  dialogType.value = 30;
  dialogTitle.value = "替换图片";
  //上传图片的相册id
  uploadAlbumId.value = param.album_id;
  //替换图片id
  resetPictureId.value = param.picture_id;
  //替换上传不显示
  if (param.type === 20) {
    //是否显示选择相册
    isShowSelectAlbum.value = false;
  } else {
    //单图上传显示
    isShowSelectAlbum.value = true;
  }
  //改为替换上传
  uploadType.value = 20;
  //改为替换上传的路径
  singlePicture.value = import.meta.env.VITE_APP_API_URL + "/file/uuploadResetPicture";
};

//监听替换上传
bus.on("uploadResetPicture", handleToUploadResetPicture);

//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(30);
//弹窗宽度
const dialogWidth = ref("80%");

// 监听dialogVisible的变化
watch(dialogVisible, (newVal) => {
  //关闭的时候初始化
  if (!newVal) {
    isShowSelectAlbum.value = false;
    uploadAlbumId.value = 0;
  }
});

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
  //如果是替换上传
  if (uploadType.value === 20) {
    //添加picture_id
    formData.append("picture_id", resetPictureId.value.toString());
  }
  if (file_type) formData.append("file_type", String(file_type));
  if (use_type) formData.append("use_type", String(use_type));
  if (save_path) formData.append("save_path", save_path);
  if (type) formData.append("type", type);

  // 5. 调用接口上传
  try {
    //替换上传
    if (uploadType.value === 20) {
      const result = await UploadPictureAPI.uploadResetPicture(formData);
      ElMessage.success(result.msg);
      //通知上传图片完成
      bus.emit("uploadResetPictureFinish", true);
    }

    //单图上传
    if (uploadType.value === 10) {
      const result = await UploadPictureAPI.uploadSinglePicture(formData);
      ElMessage.success(result.msg);
      //通知上传图片完成
      bus.emit("uploadSinglePictureFinish", true);
      uploadPictureId.value = result.data.id;
      uploadPictureUrl.value = result.data.picture;
      //console.log('uploadPictureUrl',uploadPictureUrl.value)
    }
  } catch {
    ElMessage.error("上传失败");
  }
  //关闭弹窗
  dialogVisible.value = false;

  //初始化相册id
  uploadAlbumId.value = 0;
};

// 组件卸载时移除监听,防止内存泄漏
onUnmounted(() => {
  bus.off("uploadResetPicture", handleToUploadResetPicture);
  isShowSelectAlbum.value = true;
  //初始化相册id
  uploadAlbumId.value = 0;
});
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 40%;
  height: auto;
  margin: auto;
  text-align: center;
}
.upload-button {
  width: 100%;
  text-align: center;
}
</style>
