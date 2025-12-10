<template>
  <div>
    <el-form
      ref="updateFormRef"
      :model="updateForm"
      :rules="updateRules"
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
          <el-form-item label="级别名称" prop="level_name">
            <el-input
              v-model="updateForm.level_name"
              placeholder="请输入名称"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="级别编码" prop="level_code">
            <el-input
              v-model="updateForm.level_code"
              placeholder="请输入编码"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="金额" prop="amount">
            <el-input
              v-model="updateForm.amount"
              placeholder="请输入金额"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="级别logo" prop="goods_class_picture_id">
            <div class="yh-input">
              <UploadSinglePicture
                v-model:upload-picture-id="updateForm.background_id"
                v-model:upload-picture-url="uploadPicutreUrl"
                :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
                type="image"
                show-content="级别图片"
                :is-show-button="true"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="uploadPicutreUrl" type="flex" justify="center">
        <el-col :span="24">
          <el-image style="width: 100px; height: 100px" :src="uploadPicutreUrl"></el-image>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="描述" prop="note">
            <el-input
              v-model="updateForm.note"
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
            <el-input v-model="updateForm.sort" placeholder="排序" clearable class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm(updateFormRef)">编辑用户级别</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button @click="resetForm(updateFormRef)">重置</el-button>
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
import type { UpdateUserLevel } from "@/api/laravel-fast-api/v1/business/level/userLevel/user-level-type";
import UserLevelAPI from "@/api/laravel-fast-api/v1/business/level/userLevel/user-level-api";

//定义组件名称
defineOptions({
  name: "UpdateUserLevelForm",
});

//上传图片的url
const uploadPicutreUrl = ref("");

const updateFormRef = ref<FormInstance>();
const updateForm = reactive<UpdateUserLevel>({
  id: 0,
  level_name: "",
  level_code: "",
  amount: 0,
  background_id: 0,
  note: "",
  sort: 100,
});

const updateRules = reactive<FormRules<UpdateUserLevel>>({
  level_name: [{ type: "string", required: true, message: "必须有名称", trigger: "blur" }],
  level_code: [{ type: "string", message: "字符串", trigger: "blur" }],
  amount: [{ type: "string", message: "数值", trigger: "blur" }],
  note: [{ type: "string", message: "字符串", trigger: "blur" }],
});

//初始化表单
const initUpdateForm = () => {
  updateForm.id = 0;
  updateForm.level_name = "";
  updateForm.level_code = "";
  updateForm.amount = 0;
  updateForm.background_id = 0;
  updateForm.note = "";
  updateForm.sort = 100;
};

//定义props
const props = withDefaults(
  defineProps<{
    propsUpdateForm?: UpdateUserLevel;
  }>(),
  {
    propsUpdateForm: () => ({
      id: 0,
      level_name: "",
      level_code: "",
      amount: 0,
      background_id: 0,
      note: "",
      sort: 100,
    }),
  }
);

//监听父级表单值的变化
watch(
  () => props.propsUpdateForm,
  (newVal) => {
    //console.log('整个对象变化：', newVal, oldVal)
    Object.assign(updateForm, newVal);
    uploadPicutreUrl.value = newVal.background ? newVal.background : "";
  },
  { deep: true, immediate: true } // 因为是对象，需要开启深度监听
);

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
      //console.log(updateForm)
      const result = await UserLevelAPI.updateUserLevel(updateForm);
      // 3. 提交成功提示
      ElMessage.success(result.msg);
      // 4. 重置表单（可选，根据业务需求）
      resetForm(formEl);
      // 初始化表单
      initUpdateForm();
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
