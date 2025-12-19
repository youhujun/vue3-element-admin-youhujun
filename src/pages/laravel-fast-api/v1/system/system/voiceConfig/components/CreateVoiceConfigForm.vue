<template>
  <div>
    <el-form
      ref="createFormRef"
      :model="createForm"
      :rules="createRules"
      label-width="150px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="
        width: 80%;
        padding: 30px 20px;
        margin-right: auto;
        margin-left: auto;
        text-align: center;
      "
    >
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="提示音标题" prop="voice_title">
            <el-input v-model="createForm.voice_title" placeholder="" clearable class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="提示音渠道名称" prop="channle_name">
            <el-input v-model="createForm.channle_name" placeholder="" clearable class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="提示音事件名称" prop="channle_event">
            <el-input
              v-model="createForm.channle_event"
              placeholder=""
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="提示音保存类型" prop="voice_save_type">
            <el-select v-model="createForm.voice_save_type" placeholder="请选择" class="select">
              <el-option
                v-for="item in chooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-show="createForm.voice_save_type == 10"
        type="flex"
        justify="center"
        :offset="-6"
        class="path-item"
      >
        <el-col :span="24">
          <el-form-item label="配置项路径" prop="replace_path">
            <YhUploadFile
              v-model:file-path="createForm.voice_path"
              file-name="file"
              action-url="uploadConfigFile"
              :upload-data="{ type: null, use_type: 10, file_type: '', save_path: 'config' }"
              type="excel"
              show-content="上传文件"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="createForm.voice_save_type == 10" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="本地地址" prop="voice_path">
            <el-input v-model="createForm.voice_path" disabled class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="createForm.voice_save_type == 20" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="云端地址" prop="voice_url">
            <el-input
              v-model="createForm.voice_url"
              placeholder="请输入云端地址"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="描述" prop="note">
            <el-input
              v-model="createForm.note"
              placeholder="描述"
              type="textarea"
              :rows="3"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加提示音</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button @click="resetForm(createFormRef)">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts">
//系统
import type { FormInstance, FormRules } from "element-plus";
//公共组件
import YhUploadFile from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadFile/index.vue";
//api和type
import type { AddVoiceConfig } from "@/api/laravel-fast-api/v1/system/system/voice/system-voice-type";
import SystemVoiceAPI from "@/api/laravel-fast-api/v1/system/system/voice/system-voice-api";

//定义组件名称
defineOptions({
  name: "CreateVoiceConfigForm",
});

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddVoiceConfig>({
  voice_title: "",
  channle_name: "",
  channle_event: "",
  voice_save_type: 10,
  voice_url: "",
  voice_path: "",
  note: "",
});

//选项
const chooseOptions = [
  { label: "本地", value: 10 },
  { label: "云端", value: 20 },
];

const createRules = reactive<FormRules<AddVoiceConfig>>({
  voice_save_type: [{ type: "number", required: true, message: "必须有值", trigger: "blur" }],
  channle_name: [{ type: "string", required: true, message: "", trigger: "blur" }],
  channle_event: [{ type: "string", required: true, message: "", trigger: "blur" }],
  voice_url: [{ type: "string", message: "", trigger: "blur" }],
  voice_path: [{ type: "string", message: "", trigger: "blur" }],
  note: [{ type: "string", required: true, message: "", trigger: "blur" }],
});

//初始化表单
const initCreateForm = () => {
  createForm.voice_title = "";
  createForm.channle_name = "";
  createForm.channle_event = "";
  createForm.voice_url = "";
  createForm.voice_path = "";
  createForm.note = "";
  createForm.voice_save_type = 10;
};

//emit
const emit = defineEmits(["close-dialog"]);

//提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    // 1. 表单校验（async/await 语法更简洁）
    const valid = await formEl.validate();
    // 2. 调用后端新增接口
    if (valid) {
      //console.log(createForm)
      const result = await SystemVoiceAPI.addVoiceConfig(createForm);
      // 3. 提交成功提示
      ElMessage.success(result.msg);
      // 4. 重置表单（可选，根据业务需求）
      resetForm(formEl);
      // 初始化表单
      initCreateForm();
      // 6. 关闭对话框（可选，根据业务需求）
      emit("close-dialog", false);
    }
  } catch (error) {
    // 5. 处理错误（校验失败或接口报错）
    const err = error as Error;
    ElMessage.error(`提交失败：${err.message || "未知错误"}`);
    //console.log('提交错误：', error);
  }
};

//重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style lang="scss" scoped>
/**表单 */
.content :deep(.el-form-item__label) {
  width: 100px;
}
.path-item {
  position: relative;
  left: -100px;
}
.select,
.input {
  width: 300px;
}
.yh-input {
  width: 300px;
}
</style>
