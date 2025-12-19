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
          <el-form-item label="配置项类型" prop="item_type">
            <el-select v-model="updateForm.item_type" placeholder="请选择" class="select">
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
              v-model="updateForm.item_label"
              placeholder="配置项标签"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="updateForm.item_type == 20" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项值" prop="item_value">
            <el-input
              v-model="updateForm.item_value"
              placeholder="配置项数值"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="updateForm.item_type == 30" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项数值" prop="item_price">
            <el-input
              v-model="updateForm.item_price"
              placeholder="配置项数值"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-show="updateForm.item_type == 40"
        type="flex"
        justify="center"
        :offset="-6"
        class="path-item"
      >
        <el-col :span="24">
          <el-form-item label="配置项路径" prop="item_path">
            <YhUploadFile
              v-model:file-path="updateForm.item_path"
              file-name="file"
              action-url="uploadConfigFile"
              :upload-data="{ type: null, use_type: 10, file_type: '', save_path: 'config' }"
              type="excel"
              show-content="上传文件"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="updateForm.item_type == 40" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="路径:">
            <el-input v-model="updateForm.item_path" placeholder="暂无" disabled class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项说明" prop="item_introduction">
            <el-input
              v-model="updateForm.item_introduction"
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
            <el-input v-model="updateForm.sort" placeholder="说明" clearable class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm(updateFormRef)">修改配置项</el-button>
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
//公共组件
import YhUploadFile from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadFile/index.vue";

//api和type
import type { UpdateSystemConfig } from "@/api/laravel-fast-api/v1/system/system/config/system-config-type";
import { ItemType } from "@/api/laravel-fast-api/v1/system/system/config/system-config-enum";
import SystemConfigAPi from "@/api/laravel-fast-api/v1/system/system/config/system-config-api";

//定义组件名称
defineOptions({
  name: "UpdateSystemConfigForm",
});

const updateFormRef = ref<FormInstance>();
const updateForm = reactive<UpdateSystemConfig>({
  id: 0,
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

const updateRules = reactive<FormRules<UpdateSystemConfig>>({
  id: [{ type: "number", required: true, message: "必须有id", trigger: "blur" }],
  item_type: [{ type: "number", required: true, message: "必须有值", trigger: "blur" }],
  item_label: [{ type: "string", required: true, message: "请填写配置项label", trigger: "blur" }],
  item_value: [{ type: "string", message: "", trigger: "blur" }],
  item_price: [{ pattern: /^[0-9.]{0,50}$/, message: "只能是整数或者小数", trigger: "blur" }],
  item_introduction: [{ type: "string", message: "", trigger: "blur" }],
});

//初始化表单
const initUpdateForm = () => {
  updateForm.id = 0;
  updateForm.item_type = ItemType.string;
  updateForm.item_label = "";
  updateForm.item_name = "";
  updateForm.item_price = 0;
  updateForm.item_value = "";
  updateForm.item_path = "";
  updateForm.item_introduction = "";
  updateForm.sort = 0;
};

//定义props
const props = withDefaults(
  defineProps<{
    propsUpdateForm?: UpdateSystemConfig;
  }>(),
  {
    propsUpdateForm: () => ({
      id: 0,
      item_type: ItemType.string,
      item_label: "",
      item_name: "",
      item_price: 0,
      item_value: "",
      item_path: "",
      item_introduction: "",
      sort: 100,
    }),
  }
);

//监听父级表单值的变化
watch(
  () => props.propsUpdateForm,
  (newVal) => {
    //console.log("整个对象变化：", newVal, oldVal);
    Object.assign(updateForm, newVal);
    //updateForm.item_type = String(newVal.item_type)
    if (newVal.item_type === 10) {
      updateForm.item_type = ItemType.label;
      updateForm.item_label = newVal.item_value;
      updateForm.item_value = "";
    }

    if (newVal.item_type === 20) {
      updateForm.item_type = ItemType.string;
      updateForm.item_value = newVal.item_value;
    }

    if (newVal.item_type === 30) {
      updateForm.item_type = ItemType.number;
      updateForm.item_price = Number(newVal.item_value);
      updateForm.item_value = "";
    }

    if (newVal.item_type === 40) {
      updateForm.item_type = ItemType.path;
      updateForm.item_path = newVal.item_value;
      updateForm.item_value = "";
    }
    console.log(updateForm);
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
      const result = await SystemConfigAPi.updateSystemConfig(updateForm);
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
