<template>
  <el-row style="margin-bottom: 0.5rem" :gutter="8">
    <slot name="albumItem" />
  </el-row>
</template>
<script setup lang="ts">
defineOptions({
  name: "AlbumLine",
});
</script>

<style lang="scss" scoped></style>
