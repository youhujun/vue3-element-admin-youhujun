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
          <el-form-item label="轮播图片" prop="album_picture_id">
            <div class="yh-input">
              <UploadSinglePicture
                v-model:upload-picture-id="createForm.album_picture_id"
                v-model:upload-picture-url="uploadPicutreUrl"
                :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
                type="image"
                show-content="轮播图片"
                :is-show-button="true"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="uploadPicutreUrl" type="flex" justify="center">
        <el-col :span="24">
          <el-image
            style="width: 200px; height: auto"
            :src="uploadPicutreUrl"
            fit="fill"
          ></el-image>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="跳转链接" prop="redirect_url">
            <el-input
              v-model="createForm.redirect_url"
              placeholder="请输入跳转链接"
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
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="createForm.sort" placeholder="排序" clearable class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加轮播图</el-button>
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

// 公共组件
import UploadSinglePicture from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadPicture/UplaodSinglePicture.vue";
//api和type
import PhoneBannerAPI from "@/api/laravel-fast-api/v1/business/platform/banner/banner-api";
import type { AddPhoneBanner } from "@/api/laravel-fast-api/v1/business/platform/banner/banner-type";

//定义组件名称
defineOptions({
  name: "CreatePhoneBannerForm",
});
//定义上传图片的rurl
const uploadPicutreUrl = ref<string>("");

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddPhoneBanner>({
  album_picture_id: 0,
  redirect_url: "",
  note: "",
  sort: 100,
});

const createRules = reactive<FormRules<AddPhoneBanner>>({
  redirect_url: [{ type: "string", message: "字符串", trigger: "blur" }],
  album_picture_id: [{ type: "number", required: true, message: "必须有值", trigger: "blur" }],
  note: [{ type: "string", message: "字符串", trigger: "blur" }],
});

//初始化表单
const initCreateForm = () => {
  createForm.album_picture_id = 0;
  createForm.redirect_url = "";
  createForm.note = "";
  createForm.sort = 0;
};

//emit
const emit = defineEmits(["update:CloseDialog"]);

//提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    // 1. 表单校验（async/await 语法更简洁）
    const valid = await formEl.validate();
    // 2. 调用后端新增接口
    if (valid) {
      //console.log(createForm)
      const result = await PhoneBannerAPI.addPhoneBanner(createForm);
      // 3. 提交成功提示
      ElMessage.success(result.msg);
      // 4. 重置表单（可选，根据业务需求）
      resetForm(formEl);
      // 初始化表单
      initCreateForm();
      // 6. 关闭对话框（可选，根据业务需求）
      emit("update:CloseDialog", false);
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
