<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-25 08:32:26
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-27 20:13:39
 * @FilePath: \src\pages\laravel-fast-api\v1\components\element\Dialog\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<!-- 父组件使用时处理未保存逻辑：
 <yh-dialog 
  :before-close="handleBeforeClose"
>
</yh-dialog>

<script setup lang="ts">
const formDirty = ref(false); // 标记表单是否有未保存修改

const handleBeforeClose = () => {
  if (formDirty.value) {
    return confirm('表单内容未保存，是否放弃？'); // 浏览器原生确认框
  }
  return true;
};
</script>
-->
<template>
  <div>
    <el-dialog
      v-model="innerVisible"
      :width="dialogWidth"
      destroy-on-close
      center
      append-to-body
      @close="handlToClose()"
    >
      <template #header>
        <div class="yh-header">
          <el-button type="primary" plain>{{ dialogTitle }}</el-button>
        </div>
      </template>
      <div v-if="dialogType === 10" class="content">
        <slot name="addForm">添加表单</slot>
      </div>
      <div v-if="dialogType === 20" class="content">
        <slot name="updateForm">修改表单</slot>
      </div>
      <div v-if="dialogType === 30" class="info-content">
        <slot name="showContent">查看详情</slot>
      </div>
      <!-- <template #footer>
				<slot name="footer">
					<el-button @click="handlToClose()">关闭</el-button>
					<el-button type="primary">确定</el-button>
				</slot>
			</template> -->
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
// 直接在 setup 脚本中定义名称
defineOptions({
  name: "YhDialog",
});
// 定义弹窗类型枚举
enum DialogType {
  ADD = 10, // 添加
  EDIT = 20, // 修改
  VIEW = 30, // 查看
}
const props = withDefaults(
  defineProps<{
    dialogTitle?: string;
    dialogType?: DialogType;
    dialogWidth?: string;
    beforeClose?: () => boolean | Promise<boolean>; // 关闭前回调
  }>(),
  {
    //弹窗标题
    dialogTitle: "标题",
    //弹窗类型 10添加表单 20修改表单 30查看详情
    dialogType: DialogType.ADD,
    //弹窗宽度
    dialogWidth: "50%",
    beforeClose: () => true, // 默认允许关闭
  }
);

// 显式声明类型为 boolean，且通过 options 限定值类型
const innerVisible = defineModel<boolean>({
  default: false, // 默认值
  type: Boolean, // 限定类型为布尔值，解决 TS 泛型报错
});
// 先执行回调再决定是否关闭
const handlToClose = async () => {
  const canClose = await props.beforeClose(); // 执行回调
  if (canClose) {
    innerVisible.value = false;
  }
};
</script>

<style lang="scss" scoped>
.yh-header {
  text-align: center;
}
.content {
  width: 100%;
  height: auto;
  min-height: 5rem;
  margin: 0 auto;
  background: rgba(229, 233, 14, 0.1);
  border-radius: 5px;
}
.info-content {
  width: 100%;
  height: auto;
  min-height: 5rem;
  padding: 10px;
  margin: 0 auto;
  background: rgba(100, 218, 145, 0.1); // 查看详情区域背景保持白色，可根据需要修改
}
/**对话框 */
</style>
