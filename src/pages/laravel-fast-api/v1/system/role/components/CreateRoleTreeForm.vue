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
        width: 60%;
        padding: 30px 20px;
        margin-right: auto;
        margin-left: auto;
        text-align: center;
      "
    >
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="角色名称" prop="role_name">
            <el-input
              v-model="createForm.role_name"
              placeholder="汉字显示"
              class="yh-input"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="逻辑名称" prop="logic_name">
            <el-input
              v-model="createForm.logic_name"
              placeholder="字母标识"
              class="yh-input"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="createForm.sort" clearable class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加角色</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
//api和type
import SystemRoleAPI from "@/api/laravel-fast-api/v1/system/role/role-api";
import type { AddRole } from "@/api/laravel-fast-api/v1/system/role/role-type";

//定义组件名称
defineOptions({
  name: "CreateRoleTreeForm",
});

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddRole>({
  id: 0,
  parent_id: 0,
  deep: 1,
  role_name: "",
  logic_name: "",
  sort: 100,
});

const createRules = reactive<FormRules<AddRole>>({
  role_name: [
    { type: "string", required: true, message: "请输入角色名称", trigger: "blur" },
    {
      pattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_-])+$/,
      message: "只能是汉字、数字、字母或_-组成",
      trigger: "blur",
    },
  ],
  logic_name: [
    { type: "string", required: true, message: "请输入角色名称", trigger: "blur" },
    { pattern: /^([a-zA-Z0-9_-])+$/, message: "只能是汉字、数字、字母或_-组成", trigger: "blur" },
  ],
});

//定义props
const props = withDefaults(
  defineProps<{
    propsCreateForm?: AddRole;
  }>(),
  {
    propsCreateForm: () => ({
      id: 0,
      parent_id: 0,
      deep: 1,
      role_name: "",
      logic_name: "",
      sort: 100,
    }),
  }
);

//监听父级表单值的变化
watch(
  () => props.propsCreateForm,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(oldVal);
    createForm.parent_id = newVal.parent_id;
    createForm.deep = newVal.deep;
  },
  { deep: true, immediate: true } // 因为是对象，需要开启深度监听
);

//初始化表单
const initCreateForm = () => {
  createForm.id = 0;
  createForm.parent_id = 0;
  createForm.deep = 1;
  createForm.logic_name = "";
  createForm.role_name = "";
  createForm.sort = 100;
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
      const result = await SystemRoleAPI.addRole(createForm);

      ElMessage.success(result.msg);
      //  重置表单（可选，根据业务需求）
      resetForm(formEl);
      // 初始化表单
      initCreateForm();
      // 关闭对话框（可选，根据业务需求）
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

onMounted(() => {
  console.log("子组件挂载时收到的 propsCreateForm:", props.propsCreateForm);
});
</script>
<style lang="scss" scoped>
/**表单 */
.content :deep(.el-form-item__label) {
  width: 150px;
}
.yh-input {
  width: 20rem;
}
</style>
