<template>
  <!-- 弹窗内容开始 -->
  <YhDialog
    v-model="uploadPictureDialogVisible"
    :dialog-width="dialogWidth"
    :dialog-title="dialogTitle"
    :dialog-type="dialogType"
  >
    <template #showContent>
      <!-- 选择相册 -->
      <SelectAlbum v-if="hasEitherRole" v-model:select-album-id="uploadAlbumId"></SelectAlbum>
      <!-- 选择相册结束 -->
      <el-divider v-if="hasEitherRole">
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <!-- 上传多图开始 -->
      <el-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        class="upload-demo"
        drag
        :data="{ album_id: uploadAlbumId, use_type: 20, file_type: '', save_path: 'picture' }"
        :headers="headers"
        accept="image/*"
        :limit="10"
        :on-exceed="handleExceed"
        :action="multiplePicture"
        :before-upload="beforeUploadPicture"
        :http-request="uploadPicture"
        name="picture"
        :auto-upload="false"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            支持Jpg、Gif、Png格式,大小不超过5MB的图片上传；
            浏览文件时可以按住ctrl或shift键多选;最多同时上传10张图片
          </div>
        </template>
      </el-upload>
      <div class="upload-button">
        <el-button type="primary" @click="submitUpload()">上传到服务器</el-button>
      </div>
    </template>
  </YhDialog>
  <!-- 弹窗内容结束 -->
</template>
<script setup lang="ts">
//系统
import type {
  UploadProps,
  UploadInstance,
  UploadRequestOptions,
  UploadRawFile,
  UploadUserFile,
} from "element-plus";
//公共组件
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import SelectAlbum from "@/pages/laravel-fast-api/v1/components/element/Album/SelectAlbum.vue";
//store
import { useUserStore } from "@/store";
//api
import UploadPictureAPI from "@/api/laravel-fast-api/v1/upload/picture/upload-picture-api";

const userStore = useUserStore();

defineOptions({
  name: "UploadPictureDialog",
});

//定义emit
const emit = defineEmits(["update:uploadPictureWithEditor"]);

// 1. 用 v-model 绑定的文件列表（主动维护，不受组件版本影响）
const fileList = ref<UploadUserFile[]>([]);
// 2. 收集待上传的原始文件（UploadRawFile 是可用于 FormData 的文件类型）
const pendingFiles = ref<UploadRawFile[]>([]);
// 声明upload的ref类型，用于获取组件实例
const uploadRef = ref<UploadInstance>();
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
  }>(),
  {
    showFileList: false,
    uploadData: () => ({}), // 默认空对象，符合 UploadExtraData 类型
    type: "file",
  }
);

//是否是开发者或者超级管理员
const hasEitherRole = computed(() => {
  const roles = userStore.roles;
  if (!Array.isArray(roles)) return false;
  // 包含任意一个就返回true
  return roles.includes("develop") || roles.includes("super");
});

//请求头
const headers = ref({
  time: new Date().getTime(),
  type: props.type,
  "X-Token": userStore.token,
});

//上传url
const multiplePicture = ref(import.meta.env.VITE_APP_API_URL + "/file/uploadMultiplePicture");

//上传相册id
const uploadAlbumId = ref(1);
//弹窗标题
const dialogTitle = ref("上传图片");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(30);
//弹窗宽度
const dialogWidth = ref("80%");

//定义弹窗是否开启
const uploadPictureDialogVisible = defineModel<boolean>("uploadPictureDialogVisible", {
  default: false,
});

// 监听dialogVisible的变化
watch(uploadPictureDialogVisible, (newVal) => {
  //关闭的时候初始化
  if (!newVal) {
    uploadAlbumId.value = 0;
    fileList.value = [];
    pendingFiles.value = [];
  }
});

//上传限制
const beforeUploadPicture: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("图片格式不正确");
    return false;
  }
  const isLt5M = rawFile.size / 1024 / 1024 < 50;
  if (!isLt5M) {
    ElMessage.error("上传文件大小不能超过 5MB!");
    return false;
  }
  return true;
};

//检查超出限制
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `一次最多上传10张图片，本次选择了${files.length}张，累计已选择${
      files.length + uploadFiles.length
    }张`
  );
};

// 自定义上传方法 - 修正参数类型和逻辑
const uploadPicture = async (options: UploadRequestOptions) => {
  //console.log('uploadPicture options', options)
  // 将原始文件存入 pendingFiles（后续统一上传）
  pendingFiles.value.push(options.file);
};

//上传到服务器
const submitUpload = async () => {
  //console.log('手动上传服务器')
  //console.log(uploadAlbumId.value)

  // 1. 校验是否有选中文件
  if (fileList.value.length === 0) {
    ElMessage.warning("请先选择图片");
    return;
  }

  // 2. 从 fileList 中提取原始文件（关键：UploadUserFile.raw 是原始文件）
  const rawFiles: UploadRawFile[] = [];
  fileList.value.forEach((item) => {
    if (item.raw) {
      // 确保 raw 存在（选中的文件一定有）
      rawFiles.push(item.raw);
    }
  });

  // 3. 构造 FormData（批量追加文件）
  const formData = new FormData();
  const { file_type, use_type, type, save_path } = props.uploadData;

  // 追加所有原始文件（后端用 picture[] 接收多文件）
  rawFiles.forEach((file) => {
    formData.append("picture[]", file);
  });

  // 追加其他参数（转字符串避免类型问题）
  formData.append("album_id", uploadAlbumId.value.toString());
  if (file_type) formData.append("file_type", String(file_type));
  if (use_type) formData.append("use_type", String(use_type));
  if (save_path) formData.append("save_path", save_path);
  if (type) formData.append("type", type);

  // 5. 调用接口上传
  try {
    const result = await UploadPictureAPI.uploadMultiplePicture(formData);
    ElMessage.success(result.msg);
    //通知上传成功的图片
    emit("update:uploadPictureWithEditor", result.data);
    // 上传成功后清空列表
    fileList.value = [];
    pendingFiles.value = [];
  } catch {
    ElMessage.error("上传失败");
  }
  //关闭弹窗
  uploadPictureDialogVisible.value = false;
};

// 组件卸载时移除监听,防止内存泄漏
onUnmounted(() => {
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
