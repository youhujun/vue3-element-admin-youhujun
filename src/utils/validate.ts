/**
 * @description: 验证账号
 * @param {string} account - 待验证的账号
 * @return {boolean} 验证结果
 */
export function validAccount(account: string): boolean {
  let res = true;
  // 修正：将 \_ 改为 _，移除不必要的转义
  const oneNameReg = /^[a-zA-Z0-9_\u4e00-\u9fa5\s·]{4,30}$/; // 这里移除了 _ 前面的反斜杠

  // 空白（连续下划线或首尾下划线）
  const twoNameReg = /(^_)|(__)|(_+$)/; // 同样将 \_ 改为 _

  // 纯数字（至少3位数字）
  const threeNameReg = /^\d{3,}$/; // 优化原正则，更准确表达"纯数字"含义

  const resOne = oneNameReg.test(account);
  const resTwo = twoNameReg.test(account);
  const resThree = threeNameReg.test(account);

  if (!resOne) {
    res = false;
  }

  if (resTwo || resThree) {
    res = false;
  }

  return res;
}

/**
 * @description: 验证手机号
 * @param {string} phone - 待验证的手机号
 * @return {boolean} 验证结果
 */
export function validPhone(phone: string): boolean {
  const reg =
    /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|16[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
  return reg.test(phone);
}

/**
 * @description: 验证手机验证码
 * @param {string} code - 验证码
 * @return {boolean} 验证结果
 */
export function validCode(code: string): boolean {
  const reg = /^\d{4}$/;
  return reg.test(code);
}

/**
 * @param {string} email - 待验证的邮箱
 * @returns {boolean} 验证结果
 */
export function validEmail(email: string): boolean {
  const reg = /([a-zA-Z0-9_]+)@(([a-zA-Z0-9]+)\.){1,2}[a-z]{2,3}/;
  return reg.test(email);
}

/**
 * @description: 验证密码
 * @param {string} password - 待验证的密码
 * @return {boolean} 验证结果
 */
export function validPassword(password: string): boolean {
  // 6-15位 必须有字母和数字 可以有特殊字符串
  const reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,15}$/;
  return reg.test(password);
}

/**
 * @description: 验证身份证号
 * @param {string} idNumber - 待验证的身份证号
 * @return {boolean} 验证结果
 */
export function validIdNumber(idNumber: string): boolean {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(idNumber);
}

/**
 * @description: 验证地址信息
 * @param {string} addressInfo - 待验证的地址信息
 * @return {boolean} 验证结果
 */
export function validAddressInfo(addressInfo: string): boolean {
  const reg = /^[\u4e00-\u9fa5\w]{1,50}$/;
  return reg.test(addressInfo);
}

/**
 * @param {string} path - 待验证的路径
 * @returns {boolean} 验证结果
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str - 待验证的用户名
 * @returns {boolean} 验证结果
 */
export function validUsername(str: string): boolean {
  const validMap: string[] = ["admin", "editor"];
  return validMap.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url - 待验证的URL
 * @returns {boolean} 验证结果
 */
export function validURL(url: string): boolean {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str - 待验证的字符串
 * @returns {boolean} 验证结果
 */
export function validLowerCase(str: string): boolean {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str - 待验证的字符串
 * @returns {boolean} 验证结果
 */
export function validUpperCase(str: string): boolean {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str - 待验证的字符串
 * @returns {boolean} 验证结果
 */
export function validAlphabets(str: string): boolean {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {unknown} str - 待检查的对象
 * @returns {boolean} 检查结果
 */
export function isString(str: unknown): str is string {
  return typeof str === "string" || str instanceof String;
}

/**
 * @param {unknown} arg - 待检查的对象
 * @returns {boolean} 检查结果
 */
export function isArray(arg: unknown): arg is any[] {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}
