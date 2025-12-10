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
          <el-form-item label="银行名称" prop="bank_name">
            <el-input
              v-model="createForm.bank_name"
              placeholder="请输入名称"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="银行编码" prop="bank_code">
            <el-input
              v-model="createForm.bank_code"
              placeholder="请输入值"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="是否默认" prop="is_default">
            <el-select v-model="createForm.is_default" placeholder="请选择" class="select">
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
            <el-button type="primary" @click="submitForm(createFormRef)">添加银行</el-button>
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

//api和type
import SystemBankAPI from "@/api/laravel-fast-api/v1/system/bank/bank-api";
import type { AddBank } from "@/api/laravel-fast-api/v1/system/bank/bank-type";

//定义组件名称
defineOptions({
  name: "CreateBankForm",
});

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddBank>({
  bank_name: "",
  bank_code: "",
  is_default: 0,
  sort: 100,
});

//选项
const chooseOptions = [
  { label: "是", value: 1 },
  { label: "否", value: 0 },
];

const createRules = reactive<FormRules<AddBank>>({
  bank_name: [{ type: "string", required: true, message: "必须有名称", trigger: "blur" }],
  bank_code: [{ type: "string", message: "银行编码不正确", trigger: "blur" }],
  is_default: [{ type: "number", required: true, message: "必须有值", trigger: "blur" }],
});

//初始化表单
const initCreateForm = () => {
  createForm.bank_name = "";
  createForm.bank_code = "";
  createForm.is_default = 0;
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
      const result = await SystemBankAPI.addBank(createForm);
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
