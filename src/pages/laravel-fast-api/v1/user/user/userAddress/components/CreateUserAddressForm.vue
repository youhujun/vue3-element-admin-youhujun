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
          <el-form-item label="地址类型" prop="address_type">
            <el-select v-model="createForm.address_type" placeholder="请选择" class="select">
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
          <el-form-item label="联系人" prop="user_name">
            <el-input
              v-model="createForm.user_name"
              placeholder="联系人"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="createForm.phone" placeholder="手机号" clearable class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="是否默认地址" prop="is_default">
            <el-select v-model="createForm.is_default" placeholder="请选择" class="select">
              <el-option label="否" :value="0" />
              <el-option label="是" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="选择地区" prop="category_id">
            <SelectSingleRegion
              v-model:region-id-array="createForm.regionArray"
            ></SelectSingleRegion>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="详细地址" prop="address_info">
            <el-input
              v-model="createForm.address_info"
              placeholder="详细地址"
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
            <el-button type="primary" @click="submitForm(createFormRef)">添加用户地址</el-button>
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
import SelectSingleRegion from "@/pages/laravel-fast-api/v1/components/element/Address/SelectSingleRegion.vue";
//api和type
//api 和type
import UserAddressAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userAddress/user-address-api";
import type { AddUserAddressFrom } from "@/api/laravel-fast-api/v1/user/user/userDetails/userAddress/user-address-type";

//定义组件名称
defineOptions({
  name: "CreateUserAddressForm",
});

//定义props
const props = withDefaults(
  defineProps<{
    userId?: number;
  }>(),
  {
    userId: 0,
  }
);

//监听用户id
watch(
  () => props.userId,
  (newValue) => {
    // 确保 newValue 是有效数字再赋值
    if (typeof newValue === "number" && newValue > 0) {
      // 使用 nextTick 确保 reactive 对象已初始化
      nextTick(() => {
        createForm.user_id = newValue;
      });
    }
  },
  { immediate: true }
);

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddUserAddressFrom>({
  user_id: 0,
  user_name: "",
  phone: "",
  is_default: 0,
  address_type: 10,
  regionArray: [],
  address_info: "",
});

//选项
const chooseOptions = [
  { label: "家庭", value: 10 },
  { label: "学校", value: 20 },
  { label: "公司", value: 30 },
  { label: "其他", value: 40 },
];

const createRules = reactive<FormRules<AddUserAddressFrom>>({
  address_info: [{ type: "string", required: true, message: "必须有详细地址", trigger: "blur" }],
});

//初始化表单
const initCreateForm = () => {
  createForm.user_id = 0;
  createForm.user_name = "";
  createForm.phone = "";
  createForm.is_default = 0;
  createForm.address_type = 10;
  createForm.regionArray = [];
  createForm.address_info = "";
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
      const result = await UserAddressAPI.addUserAddress(createForm);
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
