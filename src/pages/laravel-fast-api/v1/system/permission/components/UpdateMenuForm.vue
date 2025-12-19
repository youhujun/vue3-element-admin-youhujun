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
      style="width: 80%; padding: 30px 20px; margin-right: auto; margin-left: auto"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="updateForm.sort" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">
          数值越大,顺序靠前
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="显示名称(title)" prop="title">
            <el-input v-model="updateForm.title" placeholder="用户管理" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">在标题中的名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="菜单路径(path)" prop="route_path">
            <el-input v-model="updateForm.route_path" placeholder="/user" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">
          在路由中的path,顶级路径前缀/
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="菜单组件(component)" prop="component">
            <el-input v-model="updateForm.component" placeholder="Layout" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">
          不是模版,写对应组件路径
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="逻辑名称" prop="route_name">
            <el-input v-model="updateForm.route_name" placeholder="user" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">在路由中的name</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="跳转路径(redirect)" prop="redirect">
            <el-input v-model="updateForm.redirect" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">
          如果不跳转填写noRedirect
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="图标标识(icon)" prop="icon">
            <!-- 图标选择器 -->
            <icon-select v-model="updateForm.icon" width="260px" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">
          示例:'svg-name'/'el-icon-x'
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否隐藏(hidden)" prop="hidden">
            <el-radio-group v-model="updateForm.hidden">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">隐藏就不显示</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否总是显示(alwaysShow)" prop="always_show">
            <el-radio-group v-model="updateForm.always_show">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">始终显示出来</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否缓存(noCache)" prop="cache">
            <el-radio-group v-model="updateForm.cache">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">是否缓存路由</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否在固定在视图中(affix)" prop="affix">
            <el-radio-group v-model="updateForm.affix">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">在视图固定</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否在面包屑显示(breadcrumb)" prop="breadcrumb">
            <el-radio-group v-model="updateForm.breadcrumb">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="line-height: 40px; vertical-align: middle">
          就是主页常驻那行面包屑
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
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
import MenuAPI from "@/api/laravel-fast-api/v1/system/menu/menu-api";
import type { MenuForm, TreeMenuItem } from "@/api/laravel-fast-api/v1/system/menu/menu.type";
//定义组件名称
defineOptions({
  name: "UpdateMenuForm",
});

const updateFormRef = ref<FormInstance>();
const updateForm = reactive<MenuForm>({
  id: 0,
  parent_id: 0,
  deep: 1,
  type: 20,
  route_name: "",
  route_path: "",
  component: "",
  hidden: 0,
  always_show: 1,
  perm: "",
  switch: 1,
  sort: 100,
  icon: "",
  title: "",
  cache: 0,
  affix: 0,
  breadcrumb: 1,
  active_menu: "",
  redirect: "",
});

const updateRules = reactive<FormRules<MenuForm>>({
  title: [
    { type: "string", required: true, message: "请输入标题显示名称", trigger: "blur" },
    {
      pattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_-])+$/,
      message: "只能是汉字、数字、字母或_-组成",
      trigger: "blur",
    },
  ],
  route_path: [
    { type: "string", required: true, message: "请输入路径", trigger: "blur" },
    {
      pattern: /^([a-zA-Z0-9/_-]){3,60}$/,
      message: "只能以数字,字母和/_-组成,且不得低于3位",
      trigger: "blur",
    },
  ],
  component: [
    { type: "string", required: true, message: "请输入组件名称", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9/_-]{3,60}$/,
      message: "只能以数字,字母和/_-组成,且不得低于3位",
      trigger: "blur",
    },
  ],
  redirect: [
    { type: "string", required: false },
    {
      pattern: /^([a-zA-Z0-9/_-]){3,60}$/,
      message: "只能以数字,字母和/_-组成,且不得低于3位",
      trigger: "blur",
    },
  ],
  route_name: [
    { type: "string", required: true, message: "请输入标题显示名称", trigger: "blur" },
    {
      pattern: /^([a-zA-Z0-9/_-]){3,60}$/,
      message: "只能以数字,字母和/_-组成,且不得低于3位",
      trigger: "blur",
    },
  ],
  icon: [
    {
      pattern: /^[a-zA-Z-/_-]{3,60}$/,
      message: "只能以字母和-这种字符组成,且不得低于3位",
      trigger: "blur",
    },
  ],
});

//定义props
const props = withDefaults(
  defineProps<{
    propsUpdateForm?: TreeMenuItem;
  }>(),
  {
    propsUpdateForm: () => ({
      id: 0,
      parent_id: 0,
      deep: 1,
      type: 20,
      route_name: "",
      route_path: "",
      component: "",
      hidden: 0,
      always_show: 1,
      perm: "",
      switch: 1,
      sort: 100,
      icon: "",
      title: "",
      cache: 0,
      affix: 0,
      breadcrumb: 1,
      active_menu: "",
      redirect: "",
    }),
  }
);

//监听父级表单值的变化
watch(
  () => props.propsUpdateForm,
  (newVal) => {
    // console.log('整个对象变化：', newVal, oldVal)
    Object.assign(updateForm, newVal);
  },
  { deep: true, immediate: true } // 因为是对象，需要开启深度监听
);

//初始化表单
const initUpdateForm = () => {
  updateForm.id = 0;
  updateForm.parent_id = 0;
  updateForm.deep = 1;
  updateForm.type = 20;
  updateForm.route_name = "";
  updateForm.route_path = "";
  updateForm.component = "";
  updateForm.hidden = 0;
  updateForm.always_show = 1;
  updateForm.perm = "";
  updateForm.switch = 1;
  updateForm.sort = 100;
  updateForm.icon = "";
  updateForm.title = "";
  updateForm.cache = 0;
  updateForm.affix = 0;
  updateForm.breadcrumb = 1;
  updateForm.active_menu = "";
  updateForm.redirect = "";
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
      await MenuAPI.updateMenu(updateForm);
      // 3. 提交成功提示
      ElMessage.success("菜单修改成功！");
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
  //formEl.resetFields()
  Object.assign(updateForm, props.propsUpdateForm);
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
