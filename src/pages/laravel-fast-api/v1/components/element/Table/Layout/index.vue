<template>
  <div class="table-layout">
    <!-- 搜索条件 -->
    <div class="slot-container">
      <slot name="search">
        <!-- 搜索区 -->
      </slot>
    </div>

    <!-- 统计展示 -->
    <div class="slot-container">
      <slot name="total">
        <!-- 统计展示区 -->
      </slot>
    </div>

    <!-- 批量设置 -->
    <div class="slot-container">
      <slot name="batch">
        <!-- 批量设置区 -->
      </slot>
    </div>

    <!-- 表格 -->
    <div class="slot-container">
      <slot name="table">
        <!-- 列表区 -->
      </slot>
    </div>

    <!-- 分页 -->
    <div class="slot-container">
      <slot name="paginate">
        <!-- 分页区 -->
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "YhTableLayout",
});
</script>

<style lang="scss" scoped>
.table-layout {
  box-sizing: border-box; // 避免padding导致宽度溢出
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 20px; // 与 Element Plus 组件默认间距对齐
}

// 给每个插槽容器添加间距，替代深度选择器
.slot-container {
  margin-bottom: 16px; // Element Plus 常用间距单位

  &:last-child {
    margin-bottom: 0;
  }
}

// 如果需要调整插槽内部Element组件的样式（示例）
:deep(.el-divider) {
  margin: 8px 0 16px; // 调整分割线间距
}

:deep(.el-row) {
  margin-top: 12px; // 调整批量操作区行间距
}

:deep(.btn-action) {
  text-align: center; // 按钮列居中
}
</style>
