import axios, { type InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import { useUserStoreHook } from "@/store/modules/user-store";
import { AuthToken } from "@/utils/token";

/**
 * 创建 HTTP 请求实例
 */
const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000000,
  // headers: { "Content-Type": "application/json;charset=utf-8" },
  paramsSerializer: (params) => qs.stringify(params),
});

/**
 * 请求拦截器 - 添加 Authorization 头
 */
httpRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const accessToken = AuthStorage.getAccessToken();

    // // 如果 Authorization 设置为 no-auth，则不携带 Token
    // if (config.headers.Authorization !== "no-auth" && accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // } else {
    //   delete config.headers.Authorization;
    // }

    const token = useUserStoreHook().token;

    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["X-Token"] = AuthToken.getToken();
    }

    config.headers["time"] = new Date().getTime();

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器 - 统一处理响应和错误
 */
httpRequest.interceptors.response.use(
  (response) => {
    const result = response.data;

    if (result.code === 0) {
      return result;
    } else {
      if (result.code === 90010) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        ElMessageBox.confirm("您已经退出, 您可以取消留在该页,或者重新登录", "确认退出", {
          // confirmButtonText: 'Re-Login',
          confirmButtonText: "重新登录",
          // cancelButtonText: 'Cancel',
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            useUserStoreHook().resetAllState();
            location.reload();
          })
          .catch(() => {
            return;
          });
      }
      // 业务错误
      ElMessage.error(result.msg || "系统出错");
    }

    return Promise.reject(new Error(result.msg || "Business Error"));
  },
  async (error) => {
    console.error("Response interceptor error:", error);

    ElMessage.error(error.msg);
    return Promise.reject(error.response);
  }
);

/**
 * 重定向到登录页面
 */
// async function redirectToLogin(message: string = "请重新登录"): Promise<void> {
//   try {
//     ElNotification({
//       title: "提示",
//       message,
//       type: "warning",
//       duration: 3000,
//     });

//     await useUserStoreHook().resetAllState();

//     // 跳转到登录页，保留当前路由用于登录后跳转
//     const currentPath = router.currentRoute.value.fullPath;
//     await router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
//   } catch (error) {
//     console.error("Redirect to login error:", error);
//   }
// }

export default httpRequest;
