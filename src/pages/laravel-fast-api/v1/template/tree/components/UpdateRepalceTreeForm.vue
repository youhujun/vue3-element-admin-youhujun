<template>
  <div>
    <el-form
      ref="updateFormRef"
      :model="updateForm"
      :rules="updateRules"
      label-width="220px"
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
          <el-form-item label="排序" prop="sort">
            <el-input v-model="updateForm.sort" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="替换内容" prop="replace_name">
            <el-input v-model="updateForm.replace_name" placeholder="提示内容" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm(updateFormRef)">修改菜单</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
//api和type
import ReplaceAPI from "@/api/laravel-fast-api/v1/replace/replace/tree-replce-api";
import type { UpdateReplace } from "@/api/laravel-fast-api/v1/replace/replace/tree-replace-type";

//定义组件名称
defineOptions({
  name: "UpdateReplaceTreeForm",
});

const updateFormRef = ref<FormInstance>();
const updateForm = reactive<UpdateReplace>({
  id: 0,
  replace_name: "",
  sort: 100,
});

const updateRules = reactive<FormRules<UpdateReplace>>({
  replace_name: [
    { type: "string", required: true, message: "请输入标题显示名称", trigger: "blur" },
    {
      pattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_-])+$/,
      message: "只能是汉字、数字、字母或_-组成",
      trigger: "blur",
    },
  ],
});

//定义props
const props = withDefaults(
  defineProps<{
    propsUpdateForm?: UpdateReplace;
  }>(),
  {
    propsUpdateForm: () => ({
      id: 0,
      replace_name: "",
      type: 10,
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
  },
  { deep: true, immediate: true } // 因为是对象，需要开启深度监听
);

//初始化表单
const initUpdateForm = () => {
  updateForm.id = 0;
  updateForm.replace_name = "";
  updateForm.sort = 100;
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
      //console.log(updateForm)
      const result = await ReplaceAPI.updateReplace(updateForm);
      ElMessage.success(result.msg);
      resetForm(formEl);
      // 初始化表单
      initUpdateForm();
      emit("close-dialog", false);
    }
  } catch (error) {
    const err = error as Error;
    ElMessage.error(`提交失败：${err.message || "未知错误"}`);
  }
};

//重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//组件加载完成
onMounted(() => {
  Object.assign(updateForm, props.propsUpdateForm);
});
</script>
<style lang="scss" scoped>
/**表单 */
.content :deep(.el-form-item__label) {
  width: 150px;
}
</style>
