/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-08 20:40:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-09 15:01:52
 * @FilePath: \src\socket\laravel-socket.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
// import Echo from "laravel-echo";
// import io from "socket.io-client";

// // 扩展Window接口以支持io和Echo全局变量
// declare global {
//   interface Window {
//     io: typeof io;
//     Echo: InstanceType<typeof Echo> | Record<string, any>; // 兼容mock对象
//   }
// }

// // 挂载io到window
// window.io = io;

// // 核心：根据环境变量判断是否创建真实Echo实例
// const useSocket = import.meta.env.VITE_APP_SOCKET_USE === "true";
// let LaravelSocket: InstanceType<typeof Echo> | Record<string, any>;

// if (useSocket) {
//   // 仅当启用socket时，才创建真实Echo实例并发起连接
//   const host = import.meta.env.VITE_APP_SOCKET_HOST;
//   console.log(host);
//   LaravelSocket = new Echo({
//     broadcaster: "socket.io",
//     host: host,
//     path: "/socket.io", // Laravel Socket.IO 默认路径，必填
//     transports: ["websocket", "polling"], // 优先websocket，降级为polling
//     // auth: {
//     //   // 如果你的Socket需要认证，补充token（根据实际情况调整）
//     //   headers: {
//     //     Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//     //   },
//     // },
//   });
//   window.Echo = LaravelSocket;
// } else {
//   // 不启用时，导出mock对象（避免调用channel/listen时报错）
//   LaravelSocket = {
//     channel: () => ({
//       listen: () => {}, // 空的listen方法，什么都不做
//     }),
//   };
//   window.Echo = LaravelSocket; // 避免window.Echo未定义
// }

// export default LaravelSocket;

import Echo from "laravel-echo";
import io from "socket.io-client"; // 正确导入Socket类型

// 扩展Window接口以支持io和Echo全局变量
declare global {
  interface Window {
    io: typeof io;
    Echo: InstanceType<typeof Echo> | Record<string, any>;
    socketMonitor:
      | {
          disconnect: () => void;
          reconnect: () => void;
          getStatus: () => { status: string; isConnected: boolean };
        }
      | Record<string, any>;
  }

  // 自定义Socket.IO连接器类型（适配v4+版本）
  interface SocketIoConnector {
    socket: Socket; // 使用官方导出的Socket类型
  }

  // 扩展Echo实例的类型
  interface EchoInstance {
    connector: SocketIoConnector | Record<string, any>;
  }

  // 扩展Socket类型，仅保留官方暴露的公开API
  interface Socket {
    connected: boolean; // 官方暴露的核心状态（布尔值：是否已连接）
    disconnect: () => void;
    connect: () => void;
    id: string | null; // 连接成功后的唯一ID
    on: (event: string, callback: (...args: any[]) => void) => void;
    off: (event: string, callback?: (...args: any[]) => void) => void;
  }
}

// 挂载io到window
window.io = io;

// 核心：根据环境变量判断是否创建真实Echo实例
const useSocket = import.meta.env.VITE_APP_SOCKET_USE === "true";
let LaravelSocket: InstanceType<typeof Echo> | Record<string, any>;

/**
 * Socket连接状态监控函数（适配socket.io-client v4+，无TS报错）
 * @param echoInstance Echo真实实例（非mock）
 */
const monitorSocketStatus = (echoInstance: InstanceType<typeof Echo> & EchoInstance) => {
  // 初始化当前状态（用语义化变量替代readyState）
  let currentStatus = "未连接";

  try {
    // 宽松类型断言：获取socket实例（绕过TS联合类型检查）
    const socket = (echoInstance.connector as unknown as SocketIoConnector).socket;

    // 运行时兜底校验：确保socket有效
    if (!socket || typeof socket.on !== "function") {
      console.warn(
        "%c[Socket监控]",
        "color: #ed8936;",
        "未获取到有效的Socket.IO实例，监控功能禁用"
      );
      return {
        disconnect: () => {},
        reconnect: () => {},
        getStatus: () => ({ status: "无效的Socket实例", isConnected: false }),
      };
    }

    // 监听核心状态事件，更新语义化状态（替代readyState）
    socket.on("connecting", () => {
      currentStatus = "连接中";
      console.log(
        "%c[Socket监控]",
        "color: #4299e1; font-weight: bold;",
        `状态：${currentStatus} → ` + import.meta.env.VITE_APP_SOCKET_HOST
      );
    });

    socket.on("connect", () => {
      currentStatus = "已连接";
      console.log(
        "%c[Socket监控]",
        "color: #48bb78; font-weight: bold;",
        `状态：${currentStatus} ✅`
      );
      console.log("%c[Socket监控]", "color: #48bb78;", "Socket ID：", socket.id);
    });

    socket.on("disconnect", (reason: string) => {
      currentStatus = "已断开";
      let reasonDesc = "";
      switch (reason) {
        case "io server disconnect":
          reasonDesc = "服务端主动断开";
          break;
        case "io client disconnect":
          reasonDesc = "客户端主动断开";
          break;
        case "ping timeout":
          reasonDesc = "心跳超时（服务端无响应）";
          break;
        case "transport close":
          reasonDesc = "传输层关闭（网络问题）";
          break;
        default:
          reasonDesc = "未知原因：" + reason;
      }
      console.log(
        "%c[Socket监控]",
        "color: #ed8936; font-weight: bold;",
        `状态：${currentStatus} ❌ → ${reasonDesc}`
      );
    });

    socket.on("connect_error", (error: Error) => {
      currentStatus = "连接失败";
      console.error(
        "%c[Socket监控]",
        "color: #e53e3e; font-weight: bold;",
        `状态：${currentStatus} 🚨 → ${error.message}`
      );
      console.error("%c[Socket监控]", "color: #e53e3e;", "错误详情：", error);
    });

    socket.on("reconnecting", (attemptNumber: number) => {
      currentStatus = "重连中";
      console.log(
        "%c[Socket监控]",
        "color: #9f7aea; font-weight: bold;",
        `状态：${currentStatus} → 第${attemptNumber}次重试`
      );
    });

    socket.on("reconnect", (attemptNumber: number) => {
      currentStatus = "重连成功";
      console.log(
        "%c[Socket监控]",
        "color: #38b2ac; font-weight: bold;",
        `状态：${currentStatus} ✅ → 第${attemptNumber}次尝试`
      );
    });

    socket.on("reconnect_failed", () => {
      currentStatus = "重连失败";
      console.error(
        "%c[Socket监控]",
        "color: #e53e3e; font-weight: bold;",
        `状态：${currentStatus} 🚨 → 已放弃重试`
      );
    });

    // 暴露手动控制方法（类型完全明确）
    return {
      disconnect: () => {
        console.log("%c[Socket监控]", "color: #ed8936; font-weight: bold;", "手动触发：断开连接");
        socket.disconnect();
      },
      reconnect: () => {
        console.log("%c[Socket监控]", "color: #4299e1; font-weight: bold;", "手动触发：重新连接");
        socket.connect();
      },
      getStatus: () => {
        // 改用官方暴露的connected属性判断是否连接，彻底放弃readyState
        return {
          status: currentStatus, // 语义化状态（如：已连接/连接中/已断开）
          isConnected: socket.connected, // 官方核心状态（布尔值，类型安全）
        };
      },
    };
  } catch (error) {
    console.error(
      "%c[Socket监控]",
      "color: #e53e3e; font-weight: bold;",
      "监控初始化失败 → ",
      error
    );
    return {
      disconnect: () => {},
      reconnect: () => {},
      getStatus: () => ({ status: "监控初始化失败", isConnected: false }),
    };
  }
};

if (useSocket) {
  // 仅当启用socket时，才创建真实Echo实例
  const host = import.meta.env.VITE_APP_SOCKET_HOST || "http://localhost:6001";
  LaravelSocket = new Echo({
    broadcaster: "socket.io", // 明确指定Socket.IO连接器
    host,
    clientConfig: {
      reconnectionAttempts: 5, // 最大重连次数
      reconnectionDelay: 1000, // 重连间隔（毫秒）
      timeout: 5000, // 连接超时时间
    },
    transports: ["websocket", "polling"], // 优先websocket，降级为polling
    // auth: {
    //   // 如果你的Socket需要认证，补充token（根据实际情况调整）
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    //   },
    // },
  });
  window.Echo = LaravelSocket;

  // 启动状态监控（类型断言匹配扩展后的EchoInstance）
  window.socketMonitor = monitorSocketStatus(
    LaravelSocket as InstanceType<typeof Echo> & EchoInstance
  );
} else {
  // 不启用时，导出mock对象（类型完全匹配，无报错）
  LaravelSocket = {
    channel: () => ({
      listen: () => {},
    }),
    connector: {
      socket: {
        connected: false,
        disconnect: () => {},
        connect: () => {},
        id: null,
        on: () => {},
        off: () => {},
      },
    },
  };
  window.Echo = LaravelSocket;
  window.socketMonitor = {
    disconnect: () => console.log("%c[Socket监控]", "color: #718096;", "Socket未启用，无需断开"),
    reconnect: () => console.log("%c[Socket监控]", "color: #718096;", "Socket未启用，无需重连"),
    getStatus: () => ({ status: "Socket未启用", isConnected: false }),
  };
}

export default LaravelSocket;
