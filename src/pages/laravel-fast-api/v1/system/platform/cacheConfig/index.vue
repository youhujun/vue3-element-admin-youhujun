<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard :loading="loading">
      <template #cardTitle>缓存设置</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">清理redis缓存专用</el-tag>
      </template>
      <template #cardButton></template>
      <template #cardContent>
        <div class="custom-node">
          <el-card shadow="always" class="card-box">
            <template #header>
              <el-tag effect="plain" type="primary">清理系统缓存</el-tag>
            </template>
            <el-row :gutter="10" class="line-item">
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">全部缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanConfigCache()">
                  清理
                </el-button>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="line-item">
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">地区缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanRegionCache()">
                  清理
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">标签分类</el-tag>
                <el-button type="primary" size="small" @click="handleCleanLabelCache()">
                  清理
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">系统配置缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanSystemConfigCache()">
                  清理
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">文章分类缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanCategoryCache()">
                  清理
                </el-button>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">角色缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanRoleCache()">
                  清理
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">产品分类缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanGoodsClassCache()">
                  清理
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">权限路由缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanPermissionCache()">
                  清理
                </el-button>
              </el-col>
            </el-row>
          </el-card>
          <el-card shadow="always">
            <template #header>
              <el-tag effect="plain" type="primary">清理用户缓存</el-tag>
            </template>
            <el-row :gutter="10" class="line-item">
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right: 1rem">
                  登录用户信息缓存
                </el-tag>
                <el-button type="primary" size="small" @click="handleCleanLoginUserInfoCache()">
                  清理
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </template>
    </YhCard>
    <!-- 页面内容结束 -->
    <!-- 弹窗内容开始 -->
    <YhDialog
      v-model="dialogVisible"
      :dialog-width="dialogWidth"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
    >
      <!-- 添加表单 -->
      <template #addForm>
        <!-- <CreateReplaceForm ref="createFormRef" :props-create-form="propsCreateForm"   @update:CloseDialog="listenToCloseDialog"></CreateReplaceForm> -->
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <!-- <UpdateReplaceForm ref="updateFormRef" :props-update-form="propsUpdateForm"   @update:CloseDialog="listenToCloseDialog"></UpdateReplaceForm> -->
      </template>
      <!-- 显示内容 -->
      <template #showContent>
        <!-- <ReplaceRowData :props-row-data="propsRowData" :props-show-index="propsShowIndex" @update:ShowIndex="listenToUpdateIndex"  @update:CloseDialog="listenToCloseDialog"></ReplaceRowData> -->
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
//api
import SystemCacheAPI from "@/api/laravel-fast-api/v1/system/platform/cache/system/system-cache-api";
import UserCacheAPI from "@/api/laravel-fast-api/v1/system/platform/cache/user/user-cache-api";
//定义组件名称
defineOptions({
  name: "CacheConfig",
});

//初始化加载样式
const loading = ref(true);
//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(10);
//弹窗宽度
const dialogWidth = ref("65%");

onMounted(() => {
  loading.value = false;
});

//清理全部缓存
const handleCleanConfigCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await SystemCacheAPI.cleanConfigCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
//清理地区缓存
const handleCleanRegionCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await SystemCacheAPI.cleanRegionCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
//标签分类缓存
const handleCleanLabelCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await SystemCacheAPI.cleanLabelCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
//清理系统配置缓存
const handleCleanSystemConfigCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await SystemCacheAPI.cleanSystemConfigCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
//清理文章分类缓存
const handleCleanCategoryCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await SystemCacheAPI.cleanCategoryCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
//清理角色缓存
const handleCleanRoleCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await SystemCacheAPI.cleanRoleCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
//清理产品分类缓存
const handleCleanGoodsClassCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await SystemCacheAPI.cleanGoodsClassCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
//清理权限缓存
const handleCleanPermissionCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await SystemCacheAPI.cleanPermissionCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
//清理登录用户缓存
const handleCleanLoginUserInfoCache = () => {
  ElMessageBox.confirm("确认清理缓存吗?", "确认清理缓存", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "清理",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await UserCacheAPI.cleanLoginUserInfoCache();

        ElMessage.success(res.msg);
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`失败：${err.message || "未知错误"}`);
      }
    })
    .catch(() => {
      return;
    });
};
</script>
<style lang="scss" scoped>
.card-box {
  margin-bottom: 1rem;
}
.line-item {
  margin-bottom: 1rem;
}
</style>
