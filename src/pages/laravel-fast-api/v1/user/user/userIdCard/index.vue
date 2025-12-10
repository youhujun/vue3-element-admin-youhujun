<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-01 13:10:56
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 03:41:44
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\user\user\userIdCard\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 卡片容器开始 -->
    <YhCardList>
      <template #description>
        <UserDescription v-model:row-data="row"></UserDescription>
      </template>
      <template #cardContent>
        <div class="action-btn-box"></div>
        <div>
          <YhCardItem>
            <template #item-content>
              <div class="item-box">
                <div class="item-left-box">
                  <el-tag type="info" style="margin-bottom: 1rem">身份证号</el-tag>
                  <el-input v-model="idNUmber" placeholder="身份证号"></el-input>
                  <el-button type="primary" style="margin-top: 1rem" @click="handleToUpdate()">
                    修改身份证号
                  </el-button>
                </div>
                <div class="item-center-box">
                  <el-row :gutter="10">
                    <el-col :span="12" style="text-align: center">
                      <el-tag type="primary" style="margin-bottom: 1rem">身份证正面</el-tag>
                      <br />
                      <el-image
                        v-show="idCardFrontUrl"
                        style="width: 300px"
                        :src="idCardFrontUrl"
                        fit="cover"
                      ></el-image>
                      <el-tag v-show="!idCardFrontUrl" type="info">暂无照片</el-tag>
                      <div>
                        <UplaodSinglePicture
                          v-model:upload-picture-id="idCardFrontId"
                          v-model:upload-picture-url="preIdCardFrontUrl"
                          :upload-data="{
                            type: null,
                            use_type: 20,
                            file_type: '',
                            save_path: 'picture',
                          }"
                          type="image"
                          show-content="正面照片"
                          :is-show-button="true"
                        />
                      </div>
                      <div style="margin-top: 1rem">
                        <el-tag
                          v-show="preIdCardFrontUrl"
                          type="warning"
                          style="margin-bottom: 1rem"
                        >
                          预览照片
                        </el-tag>
                        <br />
                        <el-image
                          v-show="preIdCardFrontUrl"
                          style="width: 300px"
                          :src="preIdCardFrontUrl"
                          fit="cover"
                        ></el-image>
                      </div>
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                      <el-tag type="primary" style="margin-bottom: 1rem">身份证背面</el-tag>
                      <br />
                      <el-image
                        v-show="idCardBackUrl"
                        style="width: 300px"
                        :src="idCardBackUrl"
                        fit="cover"
                      ></el-image>
                      <el-tag v-show="!idCardBackUrl" type="info">暂无照片</el-tag>
                      <div>
                        <UplaodSinglePicture
                          v-model:upload-picture-id="idCardBackId"
                          v-model:upload-picture-url="preIdCardBackUrl"
                          :upload-data="{
                            type: null,
                            use_type: 20,
                            file_type: '',
                            save_path: 'picture',
                          }"
                          type="image"
                          show-content="背面照片"
                          :is-show-button="true"
                        />
                      </div>
                      <div style="margin-top: 1rem">
                        <el-tag
                          v-show="preIdCardBackUrl"
                          type="warning"
                          style="margin-bottom: 1rem"
                        >
                          预览照片
                        </el-tag>
                        <br />
                        <el-image
                          v-show="preIdCardBackUrl"
                          style="width: 300px"
                          :src="preIdCardBackUrl"
                          fit="cover"
                        ></el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="item-right-box">
                  <el-button type="primary" @click="handleToSet()">确定</el-button>
                </div>
              </div>
            </template>
          </YhCardItem>
        </div>
      </template>
    </YhCardList>
    <!-- 卡片容器结束 -->
  </div>
</template>
<script setup lang="ts">
//系统
import { useRoute } from "vue-router";
//工具
import { decryptData } from "@/utils/crypt";
//公共组件
import YhCardList from "@/pages/laravel-fast-api/v1/components/element/Card/CardList/index.vue";
import YhCardItem from "@/pages/laravel-fast-api/v1/components/element/Card/CardList/CardItem.vue";
import UplaodSinglePicture from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadPicture/UplaodSinglePicture.vue";
//业务公共组件
import UserDescription from "../components/UserDescription.vue";
//store
import { useUserStore } from "@/store";
//工具
import { validIdNumber } from "@/utils/validate";
//api和type
import UserIdCardAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userIdCard/user-idcard-api";

defineOptions({
  name: "UserIdCard",
});

const route = useRoute();
const row = decryptData(route.query.row as string);
//store
const userStore = useUserStore();

let unwatchRole: (() => void) | null = null;
//搜索查询条件
const where = ref({
  user_id: 0,
});

//定义身份证号
const idNUmber = ref<string>("");

//定义身份证正面
const idCardFrontUrl = ref("");
//正面预览照片
const preIdCardFrontUrl = ref("");
//正面照片id
const idCardFrontId = ref(0);
//定义身份证背面
const idCardBackUrl = ref("");
// 背面预览照片
const preIdCardBackUrl = ref("");
//背面照片id
const idCardBackId = ref(0);
//获取列表
const getUserIdCard = async () => {
  where.value.user_id = row.id;
  //console.log('请求参数',where.value)
  const result = await UserIdCardAPI.getUserIdCard(where.value);

  idNUmber.value = result.data?.id_number;
  idCardFrontUrl.value = result.data?.id_card?.card_front?.picture
    ? result.data?.id_card?.card_front?.picture
    : "";
  idCardBackUrl.value = result.data?.id_card?.card_back?.picture
    ? result.data?.id_card?.card_back?.picture
    : "";
};

//修改身份证号
const handleToUpdate = async () => {
  if (!idNUmber.value) {
    ElMessage.warning("未设置身份证号");
    return;
  }
  if (!validIdNumber(idNUmber.value)) {
    ElMessage.warning("身份证号不正确");
    return;
  }
  const param = {
    user_id: row.id,
    id_number: idNUmber.value,
  };
  const result = await UserIdCardAPI.updateUserIdNumber(param);

  ElMessage.success(result.msg);
};

//确定设置
const handleToSet = async () => {
  if (!idCardFrontId.value) {
    ElMessage.warning("身份证正面缺失");
    return;
  }
  if (!idCardBackId.value) {
    ElMessage.warning("身份证背面缺失");
    return;
  }
  const param = {
    user_id: row.id,
    id_card_front_id: idCardFrontId.value,
    id_card_back_id: idCardBackId.value,
    sort: 100,
  };

  try {
    const result = await UserIdCardAPI.setUserIdCard(param);

    ElMessage.success(result.msg);
    //清空
    preIdCardFrontUrl.value = "";
    preIdCardBackUrl.value = "";
    getUserIdCard();
  } catch {
    //清空
    preIdCardFrontUrl.value = "";
    preIdCardBackUrl.value = "";
    getUserIdCard();
  }
};

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  //console.log('页面加载')
  //console.log(row)
  //console.log(row.phone)
  where.value.user_id = row.id;
  //获取用户身份证
  getUserIdCard();
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
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
