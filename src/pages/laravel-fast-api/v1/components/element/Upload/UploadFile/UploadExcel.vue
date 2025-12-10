<template>
  <div>
    <el-upload
      class="upload-demo"
      :show-file-list="showFileList"
      :before-upload="beforeUpload"
      :http-request="uploadFile"
      :headers="headers"
      :data="uploadData"
      :accept="accept"
      :action="actionUrl"
      :name="fileName"
    >
      <el-button type="primary">{{ showContent }}</el-button>
    </el-upload>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store";
import UploadFileAPI from "@/api/laravel-fast-api/v1/upload/file/upload-file-api";

const userStore = useUserStore();

const emit = defineEmits(["update:filePath"]);

//定义上传文件组件
defineOptions({
  name: "YhUploadExcel",
});

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
    accept?: string;
    actionUrl?: string;
    fileName?: string;
    type?: string;
    showContent?: string;
  }>(),
  {
    showFileList: false,
    uploadData: () => ({}), // 默认空对象，符合 UploadExtraData 类型
    accept: "",
    actionUrl: "uploadFile",
    fileName: "file",
    type: "file",
    showContent: "导入", // 明确默认值
  }
);

//请求头
const headers = ref({
  time: new Date().getTime(),
  type: props.type,
  "X-Token": userStore.token,
});

//上传前检测文件大小
const beforeUpload = (file: File) => {
  //console.log('beforeUpload', file)
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isLt5M) {
    ElMessage.error("上传文件大小不能超过 5MB!");
  }
  return isLt5M;
};

// 自定义上传方法 - 修正参数类型和逻辑
const uploadFile = async (options: any) => {
  // element-plus的http-request参数是一个对象
  // console.log('uploadFile options', options)

  // 从props获取上传数据
  const { file_type, use_type, type, save_path } = props.uploadData as any;
  const formData = new FormData();

  formData.append("file", options.file); // 文件从options.file获取
  if (file_type) formData.append("file_type", file_type);
  if (use_type) formData.append("use_type", use_type);
  if (save_path) formData.append("save_path", save_path);
  if (type) formData.append("type", type);

  const result = await UploadFileAPI.uploadExcel(formData);

  ElMessage.success(result.msg);

  emit("update:filePath", result.data);
};

onMounted(() => {
  //console.log('onMounted')
  //console.log(import.meta.env.VITE_APP_API_URL)
});
</script>
<style lang="scss" scoped></style>
