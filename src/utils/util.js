/**
 * @description 公共方法
 */

// 获取用户信息
const getUserInfo = () => {
  let userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};

// 保存用户信息
const saveUserInfo = userInfo => {
  if (userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
};

export default { getUserInfo, saveUserInfo };
