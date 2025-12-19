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
          <el-form-item label="开户银行" prop="bank_id">
            <SelectBank v-model:select-bank-id="createForm.bank_id"></SelectBank>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="银行卡号" prop="bank_number">
            <el-input
              v-model="createForm.bank_number"
              placeholder="银行卡号"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="持卡人" prop="bank_account">
            <el-input
              v-model="createForm.bank_account"
              placeholder="持卡人"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="开户行地址" prop="bank_address">
            <el-input
              v-model="createForm.bank_address"
              placeholder="详细地址"
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
          <el-form-item label="是否默认银行卡" prop="is_default">
            <el-select v-model="createForm.is_default" placeholder="请选择" class="select">
              <el-option label="否" :value="0" />
              <el-option label="是" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="银行卡正面" prop="is_default">
            <UplaodSinglePicture
              v-model:upload-picture-id="createForm.bank_front_id"
              v-model:upload-picture-url="uploadPicutreBankFrontUrl"
              :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
              type="image"
              show-content="正面照片"
              :is-show-button="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="uploadPicutreBankFrontUrl" type="flex" justify="center">
        <el-col :span="24">
          <el-image style="width: 200px" :src="uploadPicutreBankFrontUrl"></el-image>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="银行卡背面" prop="is_default">
            <UplaodSinglePicture
              v-model:upload-picture-id="createForm.bank_back_id"
              v-model:upload-picture-url="uploadPicutreBankBackUrl"
              :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
              type="image"
              show-content="背面照片"
              :is-show-button="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="uploadPicutreBankBackUrl" type="flex" justify="center">
        <el-col :span="24">
          <el-image style="width: 200px" :src="uploadPicutreBankBackUrl"></el-image>
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
            <el-button type="primary" @click="submitForm(createFormRef)">添加银行卡</el-button>
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
import SelectBank from "@/pages/laravel-fast-api/v1/components/element/Bank/SelectBank.vue";
import UplaodSinglePicture from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadPicture/UplaodSinglePicture.vue";

//api 和type
import UserBankAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userBank/user-bank-api";
import type { AddUserBankForm } from "@/api/laravel-fast-api/v1/user/user/userDetails/userBank/user-bank-type";

//定义组件名称
defineOptions({
  name: "CreateUserBankForm",
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
const createForm = reactive<AddUserBankForm>({
  user_id: 0,
  bank_id: 0,
  bank_number: "",
  bank_account: "",
  bank_address: "",
  bank_front_id: 0,
  bank_back_id: 0,
  is_default: 0,
  sort: 100,
});

const createRules = reactive<FormRules<AddUserBankForm>>({
  bank_number: [{ type: "string", required: true, message: "必须有银行卡号", trigger: "blur" }],
  bank_account: [{ type: "string", required: true, message: "必须有开户人", trigger: "blur" }],
  bank_address: [{ type: "string", required: true, message: "必须有开户行地址", trigger: "blur" }],
});

//银行卡正面图片
const uploadPicutreBankFrontUrl = ref("");
//银行卡背面图片
const uploadPicutreBankBackUrl = ref("");

//初始化表单
const initCreateForm = () => {
  createForm.user_id = 0;
  createForm.bank_id = 0;
  createForm.bank_number = "";
  createForm.bank_account = "";
  createForm.bank_address = "";
  createForm.bank_front_id = 0;
  createForm.bank_back_id = 0;
  createForm.is_default = 0;
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
      const result = await UserBankAPI.addUserBank(createForm);
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
