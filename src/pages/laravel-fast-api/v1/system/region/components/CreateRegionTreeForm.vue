<template>
  <div>
    <el-form
      ref="createFormRef"
      :model="createForm"
      :rules="createRules"
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
          <el-form-item label="地区名称" prop="region_name">
            <el-input v-model="createForm.region_name" placeholder="地区名称" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="createForm.sort" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加地区</el-button>
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
import RegionAPI from "@/api/laravel-fast-api/v1/system/region/region-api";
import type { AddRegion } from "@/api/laravel-fast-api/v1/system/region/region-type";
//定义组件名称
defineOptions({
  name: "CreateRegionTreeForm",
});

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddRegion>({
  id: 0,
  parent_id: 0,
  deep: 1,
  region_name: "",
  sort: 100,
});

const createRules = reactive<FormRules<AddRegion>>({
  region_name: [
    { type: "string", required: true, message: "请输入地区名称", trigger: "blur" },
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
    propsCreateForm?: AddRegion;
  }>(),
  {
    propsCreateForm: () => ({
      id: 0,
      parent_id: 0,
      deep: 1,
      region_name: "",
      sort: 100,
    }),
  }
);

//监听父级表单值的变化
watch(
  () => props.propsCreateForm,
  (newVal) => {
    createForm.parent_id = newVal.parent_id;
    createForm.deep = newVal.deep;
  },
  { deep: true, immediate: true } // 因为是对象，需要开启深度监听
);

//初始化表单
const initCreateForm = () => {
  createForm.parent_id = 0;
  createForm.deep = 1;
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
      const result = await RegionAPI.addRegion(createForm);
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
  width: 150px;
}
</style>
