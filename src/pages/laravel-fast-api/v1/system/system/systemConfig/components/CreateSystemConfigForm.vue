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
          <el-form-item label="配置项类型" prop="item_type">
            <el-select v-model="createForm.item_type" placeholder="请选择" class="select">
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
          <el-form-item label="配置项标签" prop="item_label">
            <el-input
              v-model="createForm.item_label"
              placeholder="配置项标签"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="createForm.item_type == 20" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项值" prop="item_value">
            <el-input
              v-model="createForm.item_value"
              placeholder="配置项数值"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="createForm.item_type == 30" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项数值" prop="item_price">
            <el-input
              v-model="createForm.item_price"
              placeholder="配置项数值"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-show="createForm.item_type == 40"
        type="flex"
        justify="center"
        :offset="-6"
        class="path-item"
      >
        <el-col :span="24">
          <el-form-item label="配置项路径" prop="item_path">
            <YhUploadFile
              v-model:file-path="createForm.item_path"
              file-name="file"
              action-url="uploadConfigFile"
              :upload-data="{ type: null, use_type: 10, file_type: '', save_path: 'config' }"
              type="excel"
              show-content="上传文件"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="createForm.item_type == 40" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="路径:">
            <el-input v-model="createForm.item_path" placeholder="暂无" disabled class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项说明" prop="item_introduction">
            <el-input
              v-model="createForm.item_introduction"
              placeholder="说明"
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
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加配置项</el-button>
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
import YhUploadFile from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadFile/index.vue";

//api和type
import type { AddSystemConfig } from "@/api/laravel-fast-api/v1/system/system/config/system-config-type";
import { ItemType } from "@/api/laravel-fast-api/v1/system/system/config/system-config-enum";
import SystemConfigAPi from "@/api/laravel-fast-api/v1/system/system/config/system-config-api";

//定义组件名称
defineOptions({
  name: "CreateSystemConfigForm",
});

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddSystemConfig>({
  item_type: ItemType.string,
  item_label: "",
  item_name: "",
  item_price: 0,
  item_value: "",
  item_path: "",
  item_introduction: "",
  sort: 100,
});

//选项
const chooseOptions = [
  { label: "标签", value: 10 },
  { label: "字符串", value: 20 },
  { label: "数值", value: 30 },
  { label: "路径", value: 40 },
];

const createRules = reactive<FormRules<AddSystemConfig>>({
  item_type: [{ type: "number", required: true, message: "必须有值", trigger: "blur" }],
  item_label: [{ type: "string", required: true, message: "请填写配置项label", trigger: "blur" }],
  item_value: [{ type: "string", message: "", trigger: "blur" }],
  item_price: [{ pattern: /^[0-9.]{0,50}$/, message: "只能是整数或者小数", trigger: "blur" }],
  item_introduction: [{ type: "string", message: "", trigger: "blur" }],
});

//初始化表单
const initCreateForm = () => {
  createForm.item_type = ItemType.string;
  createForm.item_label = "";
  createForm.item_name = "";
  createForm.item_price = 0;
  createForm.item_value = "";
  createForm.item_path = "";
  createForm.item_introduction = "";
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
      const result = await SystemConfigAPi.addSystemConfig(createForm);
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
