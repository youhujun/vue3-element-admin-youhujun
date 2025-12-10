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
          <el-form-item label="配置项" prop="level_item_id">
            <SelectLevelItem
              v-model:select-level-item-id="createForm.level_item_id"
            ></SelectLevelItem>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项值" prop="value">
            <el-input
              v-model="createForm.value"
              placeholder="请输入配置项值"
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项与值的关系" prop="value_type">
            <el-select v-model="createForm.value_type" placeholder="请选择" class="select">
              <el-option
                v-for="(item, index) in valueTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
            <el-button type="primary" @click="submitForm(createFormRef)">
              添加用户级别配置项
            </el-button>
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
// 组件
import SelectLevelItem from "@/pages/laravel-fast-api/v1/components/element/Level/LevelItem/SelectLevelItem.vue";
//api和type
import type { AddUserLevelItemUnion } from "@/api/laravel-fast-api/v1/business/level/userLevel/union/user-level-item-union-type";
import UserLevelItemUnionAPI from "@/api/laravel-fast-api/v1/business/level/userLevel/union/user-level-item-union-api";
//引入bus
import bus from "@/utils/eventBus";

//定义组件名称
defineOptions({
  name: "CreateUserLevelItemForm",
});

//定义proos
const props = withDefaults(
  defineProps<{
    userLevelId?: number;
  }>(),
  {
    userLevelId: 0,
  }
);

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddUserLevelItemUnion>({
  user_level_id: 0,
  level_item_id: 0,
  value: "",
  value_type: 10,
  sort: 100,
});

const createRules = reactive<FormRules<AddUserLevelItemUnion>>({
  level_item_id: [{ type: "number", required: true, message: "必须有配置项", trigger: "blur" }],
  value: [{ type: "string", required: true, message: "必须有值", trigger: "blur" }],
});

const valueTypeOptions = [
  { value: 10, label: "=" },
  { value: 20, label: ">" },
  { value: 30, label: "<" },
  { value: 40, label: ">=" },
  { value: 50, label: "<=" },
];

//初始化表单
const initCreateForm = () => {
  createForm.user_level_id = 0;
  createForm.level_item_id = 0;
  createForm.value = "";
  createForm.value_type = 10;
  createForm.sort = 0;
};

//监听用户级别id
watch(
  () => props.userLevelId,
  (newValue) => {
    console.log("用户级别id", newValue);
    // 可以在这里处理 newValue 的逻辑
    createForm.user_level_id = newValue; // 例如同步到表单中
  },
  { immediate: true }
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
      console.log("提交表单", createForm);
      const result = await UserLevelItemUnionAPI.addUserLevelItemUnion(createForm);
      // 3. 提交成功提示
      ElMessage.success(result.msg);
      // 4. 重置表单（可选，根据业务需求）
      resetForm(formEl);
      // 初始化表单
      initCreateForm();
      // 6. 关闭对话框（可选，根据业务需求）
      emit("update:CloseDialog", false);
      // 重新加载用户级别列表
      bus.emit("reloadUserLevelList", true);
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
