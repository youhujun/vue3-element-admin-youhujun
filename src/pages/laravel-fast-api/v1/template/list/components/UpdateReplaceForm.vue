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
          <el-form-item label="名称" prop="replace_name">
            <el-input
              v-model="updateForm.replace_name"
              placeholder="请输入名称"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="值" prop="replace_value">
            <el-input
              v-model="updateForm.replace_value"
              placeholder="请输入值"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="类型" prop="type">
            <el-select v-model="updateForm.type" placeholder="请选择" class="select">
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
      <el-row
        v-show="updateForm.type == 10"
        type="flex"
        justify="center"
        :offset="-6"
        class="path-item"
      >
        <el-col :span="24">
          <el-form-item label="配置项路径" prop="replace_path">
            <YhUploadFile
              v-model:file-path="updateForm.replace_path"
              file-name="file"
              action-url="uploadConfigFile"
              :upload-data="{ type: null, use_type: 10, file_type: '', save_path: 'config' }"
              type="excel"
              show-content="上传文件"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="updateForm.type == 10" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="本地地址" prop="replace_path">
            <el-input v-model="updateForm.replace_path" disabled class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="updateForm.type == 20" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="云端地址" prop="replace_rul">
            <el-input
              v-model="updateForm.replace_value"
              placeholder="请输入云端地址"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="选择分类" prop="category_id">
            <SelectCategory
              v-model:category-id-item-array="updateForm.category_id"
              v-model:category-id-array="updateForm.categoryArray"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="时间" prop="time">
            <FutureSelectDateTime v-model:future-time="updateForm.time"></FutureSelectDateTime>
          </el-form-item>
          <span style="position: relative; top: -0.5rem">
            <el-tag type="info">默认1小时后</el-tag>
          </span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="描述" prop="note">
            <el-input
              v-model="updateForm.note"
              placeholder="描述"
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
          <el-form-item label="排序" prop="sort">
            <el-input v-model="updateForm.sort" placeholder="排序" clearable class="yh-input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm(updateFormRef)">编辑替换</el-button>
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
import FutureSelectDateTime from "@/pages/laravel-fast-api/v1/components/element/Time/FutureSelectDateTime.vue";
import SelectCategory from "@/pages/laravel-fast-api/v1/components/element/Group/Category/SelectCategory.vue";
//api和type
import type { UpdateReplace } from "@/api/laravel-fast-api/v1/replace/replace/replace-type";
import ReplaceAPI from "@/api/laravel-fast-api/v1/replace/replace/replace-api";

//定义组件名称
defineOptions({
  name: "UpdateReplaceForm",
});

const updateFormRef = ref<FormInstance>();
const updateForm = reactive<UpdateReplace>({
  id: 0,
  replace_name: "",
  replace_value: "",
  type: 10,
  replace_path: "",
  replace_url: "",
  category_id: [],
  categoryArray: [],
  time: "",
  note: "",
  sort: 100,
});

//选项
const chooseOptions = [
  { label: "本地", value: 10 },
  { label: "云端", value: 20 },
];

const updateRules = reactive<FormRules<UpdateReplace>>({
  replace_name: [{ type: "string", required: true, message: "必须有名称", trigger: "blur" }],
  replace_value: [{ type: "string", required: true, message: "必须有名称", trigger: "blur" }],
  type: [{ type: "number", required: true, message: "必须有值", trigger: "blur" }],
  replace_path: [{ type: "string", message: "字符串", trigger: "blur" }],
  replace_url: [{ type: "string", message: "字符串", trigger: "blur" }],
});

//初始化表单
const initUpdateForm = () => {
  updateForm.id = 0;
  updateForm.replace_name = "";
  updateForm.replace_value = "";
  updateForm.type = 10;
  updateForm.replace_path = "";
  updateForm.replace_url = "";
  updateForm.category_id = [];
  updateForm.categoryArray = [];
  updateForm.time = "";
  updateForm.note = "";
  updateForm.sort = 0;
};

//定义props
const props = withDefaults(
  defineProps<{
    propsUpdateForm?: UpdateReplace;
  }>(),
  {
    propsUpdateForm: () => ({
      id: 0,
      replace_name: "",
      replace_value: "",
      type: 10,
      replace_path: "",
      replace_url: "",
      category_id: [],
      categoryArray: [],
      time: "",
      note: "",
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
      // 3. 提交成功提示
      ElMessage.success(result.msg);
      // 4. 重置表单（可选，根据业务需求）
      resetForm(formEl);
      // 初始化表单
      initUpdateForm();
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
