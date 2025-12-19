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
      style="width: 80%; padding: 30px 20px; margin-right: auto; margin-left: auto"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="createForm.phone" placeholder="手机号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">注册手机号</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="'(默认密码:abc123)" prop="password">
            <el-input v-model="createForm.password" placeholder="请填写密码" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">密码</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="昵称" prop="nick_name">
            <el-input v-model="createForm.nick_name" placeholder="请填写昵称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">用户昵称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="createForm.sex">
              <el-radio :value="10">男</el-radio>
              <el-radio :value="20">女</el-radio>
              <el-radio :value="0">未知</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">性别</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加用户</el-button>
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

import { validPhone, validPassword } from "@/utils/validate";
//api和type
import type { CreateUserFrom } from "@/api/laravel-fast-api/v1/user/user/user-type";
import UserAPi from "@/api/laravel-fast-api/v1/user/user/user-api";

//定义组件名称
defineOptions({
  name: "CreateUserForm",
});

const createFormRef = ref<FormInstance>();
const createForm = reactive<CreateUserFrom>({
  source_user_id: 0,
  phone: "",
  password: "abc123",
  nick_name: "",
  sex: 0,
});

// 手机号验证
const validatePhone: (
  _rule: any,
  value: string,
  callback: (error?: Error | string) => void
) => void = (_rule, value, callback) => {
  if (!validPhone(value)) {
    callback(new Error("手机号不正确"));
  } else {
    callback();
  }
};

// 密码验证
const validatePassword: (
  _rule: any,
  value: string,
  callback: (error?: Error | string) => void
) => void = (_rule, value, callback) => {
  if (!validPassword(value)) {
    callback(new Error("请输入正确密码"));
  } else {
    callback();
  }
};

const createRules = reactive<FormRules<CreateUserFrom>>({
  source_user_id: [
    { type: "number", required: true, message: "必须有值", trigger: "blur" },
    // 数字类型不需要字符串正则，删除或改为数字范围验证
    { type: "number", min: 0, message: "不能为负数", trigger: "blur" },
  ],
  phone: [
    { type: "string", required: true, message: "请输入手机号", trigger: "blur" },
    { validator: validatePhone, trigger: "blur" },
  ],
  password: [
    { type: "string", required: true, message: "请输入密码", trigger: "blur" },
    { validator: validatePassword, trigger: "blur" },
  ],
  nick_name: [
    {
      pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{0,10}$/,
      message: "只能以字母,数字,汉字和_这种字符组成",
      trigger: "blur",
    },
  ],
});

//定义props
const props = withDefaults(
  defineProps<{
    propsCreateForm?: CreateUserFrom;
  }>(),
  {
    propsCreateForm: () => ({
      source_user_id: 0,
      phone: "",
      password: "abc123",
      nick_name: "",
      sex: 0,
    }),
  }
);

//监听父级表单值的变化
watch(
  () => props.propsCreateForm,
  (newVal) => {
    createForm.source_user_id = newVal.source_user_id;
    createForm.phone = "";
    createForm.password = "abc123";
    createForm.nick_name = "";
    createForm.sex = 0;
  },
  { deep: true, immediate: true } // 因为是对象，需要开启深度监听
);

//初始化表单
const initCreateForm = () => {
  createForm.source_user_id = 0;
  createForm.phone = "";
  createForm.password = "abc123";
  createForm.nick_name = "";
  createForm.sex = 0;
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
      const result = await UserAPi.create(createForm);
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
