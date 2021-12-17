//姓名正则
const nameReg = /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
//身份证正则
const phoneReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
//手机号+邮箱正则
const zfbReg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

export function testName(name) {
  return nameReg.test(name);
}
export function testPhone(phone) {
  return phoneReg.test(phone);
}

export function testZFB(zfb) {
  return zfbReg.test(zfb);
}
