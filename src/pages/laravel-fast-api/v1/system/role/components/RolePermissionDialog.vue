<template>
  <!-- 弹窗内容开始 -->
  <YhDialog
    v-model="rolePermissionVisible"
    :dialog-width="dialogWidth"
    :dialog-title="dialogTitle"
    :dialog-type="dialogType"
  >
    <template #showContent>
      <ElTree
        ref="treeRef"
        v-loading="loading"
        :data="treeSoureData"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        default-expand-all
        element-loading-text="拼命加载中"
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(38, 38, 38, 0.8)"
      >
        <template #default="{ node }">
          <div class="custom-tree-node">
            <div>{{ node.label }}</div>
          </div>
        </template>
      </ElTree>
      <div class="reset-button">
        <el-button type="primary" @click="() => resetRolePermission()">确认修改</el-button>
      </div>
    </template>
  </YhDialog>
  <!-- 弹窗内容结束 -->
</template>
<script setup lang="ts">
//系统
// 从 element-plus 中导入 ElTree 组件
import { ElTree } from "element-plus";
//公共组件
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
//api和type
import MenuAPI from "@/api/laravel-fast-api/v1/system/menu/menu-api";
import type { TreeMenuItem } from "@/api/laravel-fast-api/v1/system/menu/menu.type";
import SystemRoleAPI from "@/api/laravel-fast-api/v1/system/role/role-api";

defineOptions({
  name: "RolePermissionDialog",
});

const emit = defineEmits(["update:reloadRolePerimission"]);
//定义的svg图标
const svg = `
	<path class="path" d="
		M 30 15
		L 28 17
		M 25.61 25.61
		A 15 15, 0, 0, 1, 15 30
		A 15 15, 0, 1, 1, 27.99 7.5
		L 15 15
	" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;

//定义之前的选中数据
const props = withDefaults(
  defineProps<{
    beforeCheckedKeyIdArray?: number[];
    roleId?: number;
  }>(),
  {
    beforeCheckedKeyIdArray: () => [],
    roleId: 0,
  }
);

// 使用 InstanceType<typeof ElTree> 来获取 ElTree 组件的实例类型
const treeRef = ref<InstanceType<typeof ElTree> | null>(null);
//定义调用弹框
const rolePermissionVisible = defineModel<boolean>("callAlbumDialogVisible", {
  default: false,
});

//初始化加载样式
const loading = ref(true);
//弹窗标题
const dialogTitle = ref("权限管理");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(30);
//弹窗宽度
const dialogWidth = ref("95%");

//源数据
const treeSoureData = ref<TreeMenuItem[]>([]);

//树形组件props
const defaultProps = {
  children: "children",
  label: "title",
};

//获取服务器树形路由
const getServerMenu = async () => {
  loading.value = true;
  const result = await MenuAPI.getTreeMenu();
  const { data } = result;
  treeSoureData.value = data;
  //console.log(props.beforeCheckedKeyIdArray)
  // 当有初始选中数据时，设置树节点选中状态
  if (props.beforeCheckedKeyIdArray.length > 0 && treeRef.value) {
    // 等待DOM更新后再设置选中状态（确保树已渲染）
    nextTick(() => {
      props.beforeCheckedKeyIdArray.forEach((element) => {
        treeRef.value!.setChecked(element, true, false);
      });
      loading.value = false;
    });
  } else {
    loading.value = false;
  }
};

//修改权限
const resetRolePermission = async () => {
  //console.log('修改权限')
  // 确保 treeRef 已经绑定到组件实例
  if (treeRef.value) {
    // 获取所有选中节点的 ID（包括半选中的父节点）
    const checkedKeys = treeRef.value.getCheckedKeys().map((key) => Number(key));
    const halfCheckedKeys = treeRef.value.getHalfCheckedKeys().map((key) => Number(key));
    const allSelectedKeys = checkedKeys.concat(halfCheckedKeys);

    // console.log('之前选中的节点 ID:', props.beforeCheckedKeyIdArray);
    // console.log('所有选中的节点 ID:', allSelectedKeys);
    // console.log('角色id:', props.role_id);

    const param = {
      before_permission: props.beforeCheckedKeyIdArray,
      after_permission: allSelectedKeys,
      role_id: props.roleId,
    };

    const result = await SystemRoleAPI.resetRolePermission(param);

    emit("update:reloadRolePerimission", true);

    ElMessage.success(result.msg);

    rolePermissionVisible.value = false;
    loading.value = true;
  }
};

// 监听弹框显示状态
watch(
  rolePermissionVisible,
  (newVal) => {
    if (newVal) {
      // 弹框显示时执行的逻辑（如重新加载菜单、设置选中状态）
      getServerMenu();
    }
  },
  { immediate: true }
); // immediate: true 确保初始状态也会触发
</script>

<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;
  font-size: 1rem;
}
.reset-button {
  width: 100%;
  text-align: center;
}
</style>
