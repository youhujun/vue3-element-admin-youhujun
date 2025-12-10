<template>
  <div>
    <!-- 卡片容器开始 -->
    <YhCardList>
      <template #description>
        <UserDescription v-model:row-data="row"></UserDescription>
      </template>
      <template #cardContent>
        <div class="action-btn-box">
          <el-button type="primary" @click="handlToAdd()">添加用户地址</el-button>
        </div>
        <div v-if="dataList.length > 0">
          <YhCardItem v-for="(item, index) in dataList" :key="index">
            <template #item-content>
              <div class="item-box">
                <div class="item-left-box">
                  <el-row :gutter="10" style="margin-bottom: 1rem">
                    <el-col :span="6">
                      <el-tag type="info">地址类型</el-tag>
                      <el-tag type="primary" style="margin-left: 0.5rem">
                        {{ showAddressType(item.address_type) }}
                      </el-tag>
                    </el-col>
                    <el-col :span="6">
                      <el-tag type="info">联系人</el-tag>
                      <el-tag type="primary" style="margin-left: 0.5rem">
                        {{ item.user_name }}
                      </el-tag>
                    </el-col>
                    <el-col :span="6">
                      <el-tag type="info">联系人电话</el-tag>
                      <el-tag type="primary" style="margin-left: 0.5rem">{{ item.phone }}</el-tag>
                    </el-col>
                    <el-col :span="6">
                      <el-tag type="info">是否默认地址</el-tag>
                      <el-tag v-show="item.is_default" type="success" style="margin-left: 0.5rem">
                        是
                      </el-tag>
                      <el-tag v-show="!item.is_default" type="primary" style="margin-left: 0.5rem">
                        否
                      </el-tag>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-tag type="info">地区</el-tag>
                      <el-tag type="primary" style="margin-left: 0.5rem">
                        {{ item.province_name + "-" + item.region_name + "-" + item.city_name }}
                      </el-tag>
                    </el-col>
                    <el-col :span="18">
                      <el-tag type="info">详细地址</el-tag>
                      <el-tag type="primary" style="margin-left: 0.5rem">
                        {{ item.address_info }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </div>
                <div class="item-right-box">
                  <el-row :gutter="10">
                    <el-col :span="12" style="text-align: center">
                      <el-button type="danger" @click="handleToDelete(item.id)">删除</el-button>
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                      <el-button type="primary" @click="handleToSetDefault(item.id)">
                        设为默认
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </template>
          </YhCardItem>
        </div>
        <div v-else>
          <el-empty description="暂无数据" />
        </div>
      </template>
      <template #paginate>
        <YhPaginate
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          v-model:total="total"
          :page-sizes="[5, 10, 20, 30, 40, 50]"
        />
      </template>
    </YhCardList>
    <!-- 卡片容器结束 -->
    <!-- 弹窗内容开始 -->
    <YhDialog
      v-model="dialogVisible"
      :dialog-width="dialogWidth"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
    >
      <!-- 添加表单 -->
      <template #addForm>
        <CreateUserAddressForm
          ref="createFormRef"
          :user-id="row.id"
          @update:close-dialog="listenToCloseDialog"
        ></CreateUserAddressForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm></template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
//系统
import { useRoute } from "vue-router";
//工具
import { decryptData } from "@/utils/crypt";
//公共组件
// 公共级组件
//公共组件
import YhCardList from "@/pages/laravel-fast-api/v1/components/element/Card/CardList/index.vue";
import YhCardItem from "@/pages/laravel-fast-api/v1/components/element/Card/CardList/CardItem.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import YhPaginate from "@/pages/laravel-fast-api/v1/components/element/Paginate/index.vue";
//业务公共组件
import UserDescription from "../components/UserDescription.vue";
//页面组件
import CreateUserAddressForm from "./components/CreateUserAddressForm.vue";
//store
import { useUserStore } from "@/store";
//api 和type
import UserAddressAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userAddress/user-address-api";
import type { UserAddressListItem } from "@/api/laravel-fast-api/v1/user/user/userDetails/userAddress/user-address-type";

defineOptions({
  name: "UserAddress",
});

const route = useRoute();
const row = decryptData(route.query.row as string);

//store
const userStore = useUserStore();

let unwatchRole: (() => void) | null = null;
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

//搜索查询条件
const where = ref({
  user_id: 0,
  // 分页
  currentPage: 1,
  //每页条数
  pageSize: 10,
  //排序方式
  sortType: 2,
  //数据总数
  total: 0,
});

//将分页处理定义为计算属性
//当前页
const currentPage = computed({
  get() {
    return where.value.currentPage;
  },
  set(newValue) {
    where.value.currentPage = newValue;
  },
});
//页面条数
const pageSize = computed({
  get() {
    return where.value.pageSize;
  },
  set(newValue) {
    where.value.pageSize = newValue;
  },
});
//计算总数
const total = computed({
  get() {
    return where.value.total;
  },
  set(newValue) {
    where.value.total = newValue;
  },
});

//侦听分页变化
watch([currentPage, pageSize], () => {
  loading.value = true;
  //getReplaceList()
});

//数据列表容器
const dataList = ref<UserAddressListItem[]>([]);

//获取列表
const getUserAddress = async () => {
  loading.value = true;
  where.value.user_id = row.id;
  //console.log('请求参数',where.value)
  const result = await UserAddressAPI.getUserAddress(where.value);
  const { data, meta } = result;
  dataList.value = data;
  where.value.total = meta.total;
  where.value.currentPage = meta.current_page;
  where.value.pageSize = meta.per_page;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

//点击添加
const handlToAdd = () => {
  dialogVisible.value = true;
  dialogTitle.value = "添加用户地址";
  dialogType.value = 10;
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  //重新获取列表
  getUserAddress();
  //初始化表单
  //initPropsUpdateForm()
  //初始化查看详情
  //initPropsRowData()
  dialogVisible.value = false;
};

//定义显示的地址类型
const showAddressType = (type: number): string => {
  switch (type) {
    case 10:
      return "家庭地址";
    case 20:
      return "学校地址";
    case 30:
      return "公司地址";
    case 40:
      return "其他地址";
    default:
      return "未知类型";
  }
};

//删除
const handleToDelete = (user_address_id: number) => {
  ElMessageBox.confirm("确认删除吗?", "确认删除", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "删除",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const param = {
          user_address_id,
        };
        const result = await UserAddressAPI.deleteUserAddress(param);
        ElMessage.success(result.msg);
        getUserAddress();
      } catch {
        //const err = error as Error;
        //ElMessage.error(`提交失败：${err.message || '未知错误'}`);
      }
    })
    .catch(() => {
      return;
    });
};

//设为默认
const handleToSetDefault = async (user_address_id: number) => {
  ElMessageBox.confirm("确认设置吗?", "确认设置", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "确定",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const param = {
          user_address_id,
          user_id: row.id,
        };
        const result = await UserAddressAPI.setDefaultUserAddress(param);
        ElMessage.success(result.msg);
        getUserAddress();
      } catch {
        //const err = error as Error;
        //ElMessage.error(`提交失败：${err.message || '未知错误'}`);
      }
    })
    .catch(() => {
      return;
    });
};

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  //console.log('页面加载')
  //console.log(row)
  //console.log(row.phone)
  where.value.user_id = row.id;
  //获取用户地址
  getUserAddress();
});

//组件卸载
onUnmounted(() => {
  // 组件卸载时停止监听，防止内存泄漏
  if (unwatchRole) {
    unwatchRole();
  }
});
</script>

<style lang="scss" scoped>
.action-btn-box {
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  height: auto;
  padding: 0 1rem;
  margin-bottom: 1rem;
}
.item-box {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  .item-left-box {
    width: 80%;
    // background-color: red;
  }
  .item-right-box {
    width: 20%;
  }
}
</style>
