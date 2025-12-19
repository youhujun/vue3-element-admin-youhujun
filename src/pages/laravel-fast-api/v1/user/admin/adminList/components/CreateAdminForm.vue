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
        <el-col :span="12">
          <el-form-item label="选择用户" prop="user_id">
            <SelectUser v-model:select-user-id="createForm.user_id"></SelectUser>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="选择角色" prop="category_id">
            <SelectRole
              v-model:role-id-array="createForm.roleIdArray"
              v-model:role-id-item-array="createForm.role"
            ></SelectRole>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="createForm.phone" placeholder="手机号" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加管理员</el-button>
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
import SelectUser from "@/pages/laravel-fast-api/v1/components/element/User/SelectUser.vue";
import SelectRole from "@/pages/laravel-fast-api/v1/components/element/Role/SelectRole.vue";
//api和type
import type { AddAdmin } from "@/api/laravel-fast-api/v1/user/admin/admin-type";
import AdminAPI from "@/api/laravel-fast-api/v1/user/admin/admin-api";

//定义组件名称
defineOptions({
  name: "CreateAdminForm",
});

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddAdmin>({
  user_id: 0,
  role: [],
  roleIdArray: [],
  phone: "",
});

const createRules = reactive<FormRules<AddAdmin>>({
  user_id: [{ type: "number", required: true, message: "必须有用户", trigger: "blur" }],
});

//初始化表单
const initCreateForm = () => {
  createForm.user_id = 0;
  createForm.role = [];
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
      const result = await AdminAPI.addAdmin(createForm);
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
