<template>
  <div>
    <!-- 卡片容器开始 -->
    <YhCardList>
      <template #description>
        <UserDescription v-model:row-data="row"></UserDescription>
      </template>
      <template #cardContent>
        <div class="action-btn-box">
          <el-button type="primary" @click="handlToAdd()">添加用户银行卡</el-button>
        </div>
        <div v-if="dataList.length > 0">
          <YhCardItem v-for="(item, index) in dataList" :key="index">
            <template #item-content>
              <div class="item-box">
                <div class="item-left-box">
                  <el-row :gutter="10" style="margin-bottom: 1rem">
                    <el-tag type="info">银行</el-tag>
                    <el-tag type="primary" style="margin-left: 0.5rem">{{ item.bank_name }}</el-tag>
                  </el-row>
                  <el-row :gutter="10" style="margin-bottom: 1rem">
                    <el-tag type="info">银行卡号</el-tag>
                    <el-tag type="primary" style="margin-left: 0.5rem">
                      {{ item.bank_number }}
                    </el-tag>
                  </el-row>
                  <el-row :gutter="10" style="margin-bottom: 1rem">
                    <el-tag type="info">银行卡号</el-tag>
                    <el-tag type="primary" style="margin-left: 0.5rem">
                      {{ item.bank_account }}
                    </el-tag>
                  </el-row>
                  <el-row :gutter="10" style="margin-bottom: 1rem">
                    <el-tag type="info">开户行</el-tag>
                    <el-tag type="primary" style="margin-left: 0.5rem">
                      {{ item.bank_address }}
                    </el-tag>
                  </el-row>
                  <el-row :gutter="10" style="margin-bottom: 1rem">
                    <el-tag type="info">是否默认银行卡</el-tag>
                    <el-tag v-show="item.is_default" type="success" style="margin-left: 0.5rem">
                      是
                    </el-tag>
                    <el-tag v-show="!item.is_default" type="primary" style="margin-left: 0.5rem">
                      否
                    </el-tag>
                  </el-row>
                </div>
                <div class="item-center-box">
                  <el-row :gutter="10">
                    <el-col :span="12" style="text-align: center">
                      <el-tag type="primary" style="margin-bottom: 1rem">银行卡正面</el-tag>
                      <br />
                      <el-image
                        v-show="item.bank_front_pciture"
                        style="width: 300px"
                        :src="item.bank_front_pciture"
                        fit="cover"
                      ></el-image>
                      <el-tag v-show="!item.bank_front_pciture" type="info">暂无照片</el-tag>
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                      <el-tag type="primary" style="margin-bottom: 1rem">银行卡背面</el-tag>
                      <br />
                      <el-image
                        v-show="item.bank_back_pciture"
                        style="width: 300px"
                        :src="item.bank_back_pciture"
                        fit="cover"
                      ></el-image>
                      <el-tag v-show="!item.bank_back_pciture" type="info">暂无照片</el-tag>
                    </el-col>
                  </el-row>
                </div>
                <div class="item-right-box">
                  <el-row :gutter="10" style="margin-bottom: 1rem; text-align: center">
                    <el-button type="danger" @click="handleToDelete(item.id)">删除</el-button>
                  </el-row>
                  <el-row :gutter="10" style="margin-top: 1rem; text-align: center">
                    <el-button type="primary" @click="handleToSetDefault(item.id)">
                      设为默认
                    </el-button>
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
        <CreateUserBankForm
          ref="createFormRef"
          :user-id="row.id"
          @update:close-dialog="listenToCloseDialog"
        ></CreateUserBankForm>
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
//业务公共组件
import UserDescription from "../components/UserDescription.vue";
//页面组件
import CreateUserBankForm from "./components/CreateUserBankForm.vue";
//store
import { useUserStore } from "@/store";
//api 和type
import UserBankAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userBank/user-bank-api";
import type { UserBankItem } from "@/api/laravel-fast-api/v1/user/user/userDetails/userBank/user-bank-type";

defineOptions({
  name: "UserBank",
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
});

//数据列表容器
const dataList = ref<UserBankItem[]>([]);

//获取列表
const getUserBank = async () => {
  loading.value = true;
  where.value.user_id = row.id;
  //console.log('请求参数',where.value)
  const result = await UserBankAPI.getUserBank(where.value);
  const { data } = result;
  dataList.value = data;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

//点击添加
const handlToAdd = () => {
  dialogVisible.value = true;
  dialogTitle.value = "添加用户银行卡";
  dialogType.value = 10;
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  //重新获取列表
  getUserBank();
  //初始化表单
  //initPropsUpdateForm()
  //初始化查看详情
  //initPropsRowData()
  dialogVisible.value = false;
};

//删除
const handleToDelete = (id: number) => {
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
          id,
        };
        const result = await UserBankAPI.deleteUserBank(param);
        ElMessage.success(result.msg);
        getUserBank();
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
const handleToSetDefault = async (id: number) => {
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
          id,
          user_id: row.id,
        };
        const result = await UserBankAPI.setUserDefaultBank(param);
        ElMessage.success(result.msg);
        getUserBank();
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
  getUserBank();
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
    width: 30%;
    // background-color: red;
  }
  .item-center-box {
    width: 60%;
  }
  .item-right-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10%;
  }
}
</style>
