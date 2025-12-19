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
      style="width: 98%; padding: 20px 10px; margin-right: auto; margin-left: auto"
    >
      <!-- 第一行标题 -->
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input
              v-model="createForm.title"
              placeholder="标题"
              maxlength="35"
              show-word-limit
              clearable
              class="yh-input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第一行标题 -->
      <!-- 第二行选择 -->
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-form-item label="选择分类" prop="category_id">
            <SelectCategory
              v-model:category-id-item-array="createForm.category_id"
              v-model:category-id-array="createForm.categoryArray"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择标签" prop="label_id">
            <SelectLabel
              v-model:label-id-item-array="createForm.label_id"
              v-model:label-id-array="createForm.labelArray"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否置顶" prop="is_top">
            <el-radio-group v-model="createForm.is_top">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第二行选择 -->
      <!-- 第三行时间和排序 -->
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="发布时间" prop="published_time">
            <FutureSelectDateTime
              v-model:future-time="createForm.published_time"
            ></FutureSelectDateTime>
          </el-form-item>
          <span style="position: relative; top: -0.5rem">
            <el-tag type="info">默认1小时后</el-tag>
          </span>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="createForm.sort" placeholder="排序" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第三行时间和排序 -->
      <!-- 第四行内容 -->
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="内容" prop="content" class="editor">
            <TinyMceEditor
              v-model:content-value="createForm.content"
              :disabled="false"
            ></TinyMceEditor>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第四行内容 -->
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加文章</el-button>
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
import FutureSelectDateTime from "@/pages/laravel-fast-api/v1/components/element/Time/FutureSelectDateTime.vue";
import TinyMceEditor from "@/pages/laravel-fast-api/v1/components/element/Editor/Tinymce/TinyMceEditor.vue";
import SelectCategory from "@/pages/laravel-fast-api/v1/components/element/Group/Category/SelectCategory.vue";
import SelectLabel from "@/pages/laravel-fast-api/v1/components/element/Group/Label/SelectLabel.vue";
//api和type
import type { AddArticle } from "@/api/laravel-fast-api/v1/article/article-type";
import ArticleAPi from "@/api/laravel-fast-api/v1/article/article-api";
//定义组件名称
defineOptions({
  name: "CreateArticleForm",
});

const createFormRef = ref<FormInstance>();
const createForm = reactive<AddArticle>({
  type: 10,
  title: "",
  category_id: [],
  categoryArray: [],
  label_id: [],
  labelArray: [],
  is_top: 0,
  content: "",
  published_time: "",
  sort: 100,
});
//验证规则
const createRules = reactive<FormRules<AddArticle>>({
  title: [
    { required: true, message: "必须有标题", trigger: "blur" },
    { pattern: /^[\S]{4,35}$/, message: "不得少于4个字符,不得多于35个字符", trigger: "blur" },
  ],
  category_id: [{ type: "array", required: true, message: "请选择分类", trigger: "blur" }],
  content: [{ required: true, message: "必须有内容", trigger: "blur" }],
});

//监听
/* watch(noticeCategoryOptions,(newValue)=>{
	 // 检查新值是否为数组且长度为0
    if (Array.isArray(newValue) && newValue.length === 0) {
      categoryStore.getTreeCategory(); // 调用获取数据的方法
    }
},{
	immediate:true,
	deep:false
}) */

//初始化表单
const initCreateForm = () => {
  createForm.type = 10;
  createForm.title = "";
  createForm.category_id = [];
  createForm.categoryArray = [];
  createForm.label_id = [];
  createForm.labelArray = [];
  createForm.is_top = 0;
  createForm.content = "";
  createForm.published_time = "";
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
      const result = await ArticleAPi.addArticle(createForm);
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
  width: 80rem;
}
.yh-input {
  width: 70rem;
}
.editor :deep(.el-form-item__content) {
  width: 100%;
  min-width: 40rem;
  max-width: 100rem;
  height: auto;
}
</style>
