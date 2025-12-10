<template>
  <div>
    <el-card shadow="always" class="box-card">
      <slot name="item-content"></slot>
    </el-card>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "YhCardItem",
});
</script>

<style lang="scss" scoped>
/* 卡片 */
.box-card {
  width: 99%;
  height: auto;
  margin-bottom: 1rem;
}
.box-card:hover {
  background: #dae7ec7e;
}
</style>
