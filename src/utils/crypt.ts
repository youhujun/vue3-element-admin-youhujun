/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 22:54:24
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-12 22:57:53
 * @FilePath: \src\utils\crypt.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import CryptoJS from "crypto-js";

// 密钥（建议放在环境变量中，此处仅示例）
const SECRET_KEY = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_SEART_KEY); // 必须16位字符
const SECRET_IV = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_IV); // 16位向量

/**
 * 加密数据
 * @param data 要加密的数据（对象或字符串）
 * @returns 加密后的字符串
 */
export const encryptData = (data: any): string => {
  const jsonData = typeof data === "string" ? data : JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonData, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * 解密数据
 * @param encryptedStr 加密后的字符串
 * @returns 解密后的原始数据（对象）
 */
export const decryptData = (encryptedStr: string): any => {
  const decrypted = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const jsonStr = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(jsonStr);
};
