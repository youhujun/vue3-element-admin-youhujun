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
          <el-form-item label="分类名称" prop="goods_class_name">
            <el-input
              v-model="createForm.goods_class_name"
              placeholder="分类名称"
              class="yh-input"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="分类编码" prop="goods_class_code">
            <el-input
              v-model="createForm.goods_class_code"
              placeholder="分类编码"
              class="yh-input"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="是否需要证书" prop="is_certificate">
            <el-select v-model="createForm.is_certificate" placeholder="请选择" class="select">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="createForm.is_certificate" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="证书数量" prop="certificate_number">
            <el-input
              v-model="createForm.certificate_number"
              placeholder="证书数量"
              class="yh-input"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="分配比例" prop="rate">
            <el-input v-model="createForm.rate" placeholder="分配比例" class="yh-input" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="分类图片" prop="goods_class_picture_id">
            <div class="yh-input">
              <UploadSinglePicture
                v-model:upload-picture-id="createForm.goods_class_picture_id"
                v-model:upload-picture-url="uploadPicutreUrl"
                :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
                type="image"
                show-content="分类图片"
                :is-show-button="true"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="uploadPicutreUrl" type="flex" justify="center">
        <el-col :span="24">
          <el-image style="width: 100px; height: 100px" :src="uploadPicutreUrl"></el-image>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="备注" prop="note">
            <el-input
              v-model="createForm.note"
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
            <el-input v-model="createForm.sort" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="text-align: center">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm(createFormRef)">添加分类</el-button>
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
// 公共组件
import UploadSinglePicture from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadPicture/UplaodSinglePicture.vue";
//api和type
import GoodsClassAPI from "@/api/laravel-fast-api/v1/business/group/goodsClass/goods-class-api";
import type { AddGoodsClass } from "@/api/laravel-fast-api/v1/business/group/goodsClass/goods-class-type";
//定义组件名称
defineOptions({
  name: "CreateGoodsClassTreeForm",
});
//定义上传图片的rurl
const uploadPicutreUrl = ref<string>("");
const createFormRef = ref<FormInstance>();
const createForm = reactive<AddGoodsClass>({
  id: 0,
  goods_class_name: "",
  goods_class_code: "",
  goods_class_picture_id: 0,
  deep: 1,
  is_certificate: 0,
  certificate_number: 0,
  parent_id: 0,
  rate: 0,
  note: "",
  sort: 100,
});

const createRules = reactive<FormRules<AddGoodsClass>>({
  goods_class_name: [
    { type: "string", required: true, message: "请输入产品分类名称", trigger: "blur" },
    {
      pattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_-])+$/,
      message: "只能是汉字、数字、字母或_-组成",
      trigger: "blur",
    },
  ],
  goods_class_code: [
    { pattern: /^([a-zA-Z0-9_-])+$/, message: "只能是汉字、数字、字母或_-组成", trigger: "blur" },
  ],
  certificate_number: [{ pattern: /^([0-9])+$/, message: "只数字", trigger: "blur" }],
  rate: [{ pattern: /^([0-9])+$/, message: "只数字", trigger: "blur" }],
});

//定义props
const props = withDefaults(
  defineProps<{
    propsCreateForm?: AddGoodsClass;
  }>(),
  {
    propsCreateForm: () => ({
      id: 0,
      certificate_number: 0,
      goods_class_code: "",
      goods_class_name: "",
      goods_class_picture_id: 0,
      deep: 1,
      is_certificate: 0,
      parent_id: 0,
      rate: 0,
      note: "",
      sort: 100,
    }),
  }
);

//监听父级表单值的变化
watch(
  () => props.propsCreateForm,
  (newVal) => {
    createForm.parent_id = newVal.parent_id;
    createForm.deep = newVal.deep;
  },
  { deep: true, immediate: true } // 因为是对象，需要开启深度监听
);

//初始化表单
const initCreateForm = () => {
  createForm.parent_id = 0;
  createForm.deep = 1;
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
      const result = await GoodsClassAPI.addGoodsClass(createForm);
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
