import { env, url2obj } from '../utils';

const axiosPromise = import('axios');

/**
 * 浏览器回退可以缓存的url
 * @type {string[]}
 */
const cacheUrl = [];

/**
 * 是否可以缓存
 * @param url
 * @returns {boolean}
 */
const canCache = (url) => {
  let isCache = false;
  cacheUrl.forEach((item) => {
    if (url.includes(item)) {
      return (isCache = true);
    }
  });
  return isCache;
};

const deleteParams = [
  'app',
  'version',
  '_full_with_transparent_bar',
  'isAdopt',
];

/**
 * 删除不需要的参数
 * @param searchParams
 */
function deleteSearchParams(searchParams) {
  deleteParams.forEach((param) => {
    delete searchParams[param];
  });
}

/**
 * 获取接口
 * @param url
 * @param method
 * @param params
 * @param data
 * @returns {Promise<AxiosResponse<any> | void>}
 */
const fetch = ({ url, method = 'get', data = {}, tip = true }) => {
  const searchParams =
    (window.location.search && url2obj(window.location.search)) || {};
  if (!canCache(url)) {
    url = `${url}${url.includes('?') ? '&' : '?'}ts=${Date.now()}&_sonic=0`;
  }
  deleteSearchParams(searchParams);
  const reobj = {
    url,
    method,
    params: method === 'get' ? { ...searchParams, ...data } : searchParams,
    data: method === 'post' ? data : {},
    timeout: env.isTest ? 20000 : 6000,
    // headers: { 'Content-Type': 'application/json' },
  } as any;
  reobj.withCredentials = true;
  return axiosPromise.then((axios: any) => {
    return axios
      .request(reobj)
      .then((res) => {
        const { ret = 0, msg = '服务异常' } = res.data;
        switch (ret) {
          case 0:
            return res.data;
          case 303:
            return res.data;
          default:
            console.log(msg);
            return res.data;
        }
      })
      .catch((e: any) => {
        console.warn(e.response.data.errorCode);
        // const message = `${url.split('/').pop()} ${e && e.message || '出错了，请稍后再试'}`;
        tip && setTimeout(() => console.log('出错了，请稍后再试！'), 100);
        return Promise.reject();
      });
  });
};

export default fetch;
