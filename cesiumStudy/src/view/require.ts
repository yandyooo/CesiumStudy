// import { message } from 'antd';
// import axios from 'axios';
// import Qs from 'qs';
// import { store } from './store';
// import { decrypted, encrypted } from './util/crypto';

// const HOST = process.env.NODE_ENV;
// let baseURL = '';

// enum BaseURLS {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     BASE = window.BASEURL,
// }

// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// export const ISENCRYP = window.ISENCRYP;

// switch (
//     HOST // 可以在根目录的 package.json 配置 NODE_ENV
// ) {
//     case 'production':
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         baseURL = BaseURLS.BASE;
//         break;
//     case 'test':
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         baseURL = BaseURLS.BASE;
//         break;
//     default:
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         baseURL = BaseURLS.BASE;
// }
// const serverConfig = {
//     baseURL: baseURL, // 请求基础地址,可根据环境自定义
//     useTokenAuthorization: true, // 是否开启 token 认证
// };

// const serviceAxios = axios.create({
//     baseURL: serverConfig.baseURL, // 基础请求地址
//     timeout: 20000, // 请求超时设置
//     withCredentials: false, // 跨域请求是否需要携带 cookie
// });

// // 不需要加密的url
// const noEncryptUrl = [
//     '/api/system/login/login',
//     '/api/system/encryption/getKey',
//     '/api/system/login/loginOut',
// ];

// // 创建请求拦截
// serviceAxios.interceptors.request.use(
//     (config) => {
//         // 如果开启 token 认证
//         if (serverConfig.useTokenAuthorization && config.headers) {
//             const userData = store.getState().header.userData;
//             config.headers.token = userData && userData.token ? userData.token : ''; // 请求头携带 token
//         } // 设置请求头
//         if (config.headers && !config.headers['content-type']) {
//             config.headers['Content-Type'] = 'application/json'; // 默认类型
//         }
//         if (config.headers) config.headers['platform'] = 1; // 设置来源
//         const url: string = config.url ? config.url : '';
//         if (config.responseType != 'blob' && noEncryptUrl.indexOf(url) < 0 && ISENCRYP) {
//             let plaintext = null;
//             if (config.data && config.data.toString().length > 0) {
//                 const contentType: string =
//                     config.headers && config.headers['Content-Type']
//                         ? config.headers['Content-Type'].toString()
//                         : '';
//                 if (contentType == 'application/x-www-form-urlencoded') {
//                     plaintext = Qs.stringify(config.data);
//                 } else {
//                     try {
//                         plaintext = JSON.stringify(config.data);
//                     } catch (error) {
//                         plaintext = config.data.toString();
//                     }
//                 }
//             }
//             if (
//                 config.data &&
//                 typeof config.data == 'object' &&
//                 (JSON.stringify(config.data) == "['']" || JSON.stringify(config.data) == '[""]')
//             ) {
//                 config.data = encrypted('[]');
//             } else {
//                 if (plaintext && plaintext.length > 0 && plaintext != '{}') {
//                     config.data = encrypted(plaintext);
//                 }
//             }
//             if (config.params && config.params.toString().length > 0) {
//                 const params = config.params;
//                 for (const key in params) {
//                     if (Object.prototype.hasOwnProperty.call(params, key)) {
//                         if (
//                             params[key] != null &&
//                             typeof params[key] != 'undefined' &&
//                             params[key].toString().length > 0
//                         ) {
//                             params[key] = encrypted(params[key].toString());
//                         }
//                     }
//                 }
//                 config.params = params;
//             }
//             if (config.headers) config.headers['secret'] = 'true';

//             config.transformRequest = [
//                 function (res) {
//                     return res;
//                 },
//             ];
//         }
//         return config;
//     },
//     (error) => {
//         Promise.reject(error);
//     }
// );

// const messageMap = {
//     302: '接口重定向了！',
//     400: '请求参数错误！',
//     401: '您未登录，或者登录已经超时，请先登录！',
//     403: '您没有权限访问该资源！',
//     404: '您访问的资源不存在！',
//     500: '服务器内部错误！',
//     502: '网关错误！',
//     504: '网关超时！',
//     default: '异常问题，请联系管理员！',
// };

// // 创建响应拦截
// serviceAxios.interceptors.response.use(
//     // 响应成功
//     (res) => {
//         // todo
//         const config = res.config;
//         if (config && config.responseType && config.responseType == 'blob') {
//             return res;
//         }
//         const data = res.data;
//         let resData = undefined;
//         // 解密判断
//         if (config && config.headers && config.headers['secret']) {
//             // 解密
//             try {
//                 resData = JSON.parse(decrypted(data));
//             } catch (error) {
//                 // 解密失败，返回原信息
//                 resData = data;
//             }
//         } else {
//             resData = data;
//         }
//         if (resData.code / 1000000 !== 200) {
//             message.info(resData.message);
//         }
//         // 处理自己的业务逻辑，比如判断 token 是否过期等等
//         return resData;
//     },
//     // 响应失败
//     (error) => {
//         if (error && error.response) {
//             message.warning(messageMap[error.response.status]);
//             // 登录跳转
//             if (error.response.status === 401 || error.response.status === 403) {
//                 window.location.href = '/login';
//             }
//             return messageMap[error.response.status] || 'default';
//         }
//         // 服务器连结果都没有返回
//         if (!window.navigator.onLine) {
//             // 断网处理
//             message.error('网络中断');

//             return;
//         } else {
//             // 服务器错误
//             message.error('服务器错误');
//             return Promise.reject(error);
//         }
//     }
// );
// export default serviceAxios;
