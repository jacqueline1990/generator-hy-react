import { env } from './env';

export { env };

export { shallowEqual } from './shallowEqual';

/**
 * 检验是否为手机号
 * @param phone
 * @param strict
 * @returns {boolean}
 */
const isPhone = (phone, strict = false) => {
  const regular = strict
    ? /^1(?:3[0-9]|4[5-9]|5[0-9]|6[12456]|7[0-8]|8[0-9]|9[0-9])[0-9]{8}$/
    : /^1[3-9][0-9]{9}$/;
  return regular.test(phone);
};

/**
 * 对象转换成url
 * @param url
 */
const url2obj = (url) => {
  const obj = {};
  const params = url.split(/[?&]/).filter(Boolean);
  params.forEach((param) => {
    const [k, v = true] = param.split(/=/);
    obj[k] = v;
  });
  return obj;
};

/**
 * 对象转换成url
 * @param obj
 * @param encode
 */
const obj2url = (obj, encode = true) => {
  let path = '';
  Object.entries(obj).forEach(([key, value], index) => {
    if (index === 0) {
      path += `${key}=${value}`;
    } else {
      path += `&${key}=${value}`;
    }
  });
  return encode ? encodeURIComponent(path) : path;
};

/**
 * 节流
 * @param fn
 * @param delay
 * @param mustRun
 * @param limitOperate 是否限制并发
 * @returns {Function}
 */
const throttle = (fn, delay = 100, mustRun = 200, limitOperate = false) => {
  let timer;
  let last;
  return function(...args) {
    // @ts-ignore
    const context = this;
    const now = Date.now();
    if (last && now < last + mustRun) {
      clearTimeout(timer);
      if (limitOperate) return; // 限制并发操作，不需要触发
      timer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

/**
 * 获取url中的参数
 * @param key
 * @param url
 * @returns {*}
 */
const getQuery = (key, url = window.location.search) => {
  try {
    const query = decodeURIComponent(url)
      .split(/[?&]/)
      .slice(1);
    if (!query.length) return '';
    let queryObj = {},
      k,
      v;
    query.forEach((item) => {
      const index = item.indexOf('=');
      k = item.substring(0, index);
      v = item.substring(index + 1);
      queryObj[k] = v;
    });
    return key ? queryObj[key] || key in queryObj : queryObj;
  } catch (e) {
    return '';
  }
};

/**
 * 获取cookie中的值
 * @param name
 * @returns {string}
 */
function getCookie(name = ''): string {
  try {
    const r = new RegExp(`${name}=([^;]*)`);

    const match = r.exec(document.cookie);
    if (match) {
      return match[1];
    }
    return '';
  } catch (e) {
    return '';
  }
}

/*
 * 设置标题
 * @param title
 */
const setTitle = (title) => {
  document.title = title;
};

function timeHandle(num: number): string | number {
  return num < 10 ? '0' + num : num;
}

function formatDate(
  date: string | number | Date,
  format = 'yyyy.MM.dd',
): string {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const month = timeHandle(_date.getMonth() + 1);
  let day = timeHandle(_date.getDate());

  const hours = timeHandle(_date.getHours());
  const minutes = timeHandle(_date.getMinutes());
  const seconds = timeHandle(_date.getSeconds());
  return format.replace(/(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, (reg: any) => {
    switch (reg) {
      case 'yyyy':
        return `${year}`;
      case 'MM':
        return `${month}`;
      case 'dd':
        return `${day}`;
      case 'hh':
        return `${hours}`;
      case 'mm':
        return `${minutes}`;
      case 'ss':
        return `${seconds}`;
    }
    return '';
  });
}

/**
 * 计算样式rem
 * @param px
 * @returns {string}
 */
const px2rem = (px) => {
  return px / 75 + 'rem';
};

/**
 * 预加载图片
 * @param url
 * @param cb
 */
function preloadImg(url, cb) {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    cb();
  } else {
    img.onload = () => {
      cb();
    };
  }
}

const timer: any = {
  timerStart: null,
  timerEnd: null,
};
/**
 * toast 提示
 * @param txt  提示内容
 * @param time  持续时间
 */
function toast(txt: string, time?: number) {
  function styleExtend(target: any, options: any) {
    Object.assign(target, options);
  }

  let mToast: any;
  const mToastStyles = {
    position: 'fixed',
    width: 'auto',
    height: '62px',
    top: '50%',
    transform: 'translateY(-50%)',
    bottom: '0',
    left: '0',
    right: '0',
    textAlign: 'center',
    opacity: '0',
    transition: 'all 0.8s',
    webkitTransition: 'all 0.8s',
    zIndex: '999999999',
  };
  const mTxtStyles = {
    fontSize: '14px',
    display: 'inline-block',
    background: 'rgba(0, 0, 0, 0.86)',
    color: '#fff',
    padding: '20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderRadius: '5px',
    maxWidth: '95%',
  };
  mToast = document.querySelector('#toast');
  if (mToast !== null) {
    document.body.removeChild(mToast);
  }
  mToast = document.createElement('div');
  const mTxt = document.createElement('span');
  mToast.id = 'toast';
  mTxt.id = 'toast-txt';

  styleExtend(mToast.style, mToastStyles);
  styleExtend(mTxt.style, mTxtStyles);
  mTxt.innerText = txt;
  mToast.appendChild(mTxt);

  document.body.appendChild(mToast);
  timer.timerStart = setTimeout(() => {
    styleExtend(mToast.style, {
      opacity: 1,
      zIndex: 999999,
    });
  }, 0);

  timer.timerEnd = setTimeout(() => {
    // styleExtend(mToast.style, {
    //   opacity: 0,
    //   zIndex: -999999,
    // });
    document.body.removeChild(mToast);
  }, time || 3000);
}

function toTxt(num) {
  switch (num) {
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    case 5:
      return '五';
    case 6:
      return '六';
    case 7:
      return '七';
    case 8:
      return '八';
    case 9:
      return '九';
    case 10:
      return '十';
    case 11:
      return '十一';
    case 12:
      return '十二';
    default:
      return '一';
  }
}

function stopMoveFn() {
  var mo = function(e) {
    e.preventDefault();
  };
  document.body.style.position = 'fixed';
  document.addEventListener('touchmove', mo, false); //禁止页面滑动
}
function moveFn() {
  var mo = function(e) {
    e.preventDefault();
  };
  document.body.style.position = 'auto'; //出现滚动条
  document.removeEventListener('touchmove', mo, false);
}

const noop = (_) => _;

const dayTs = 1000 * 3600 * 24;
function parseTimeStamp(ts: number) {
  if (typeof ts !== 'number') return {};
  const d = parseInt(ts / dayTs + '', 10);
  const h = parseInt((ts % dayTs) / 3600000 + '', 10);
  const m = parseInt((ts % 3600000) / 60000 + '', 10);
  const s = parseInt((ts % 60000) / 1000 + '', 10);
  const ms = parseInt((ts % 1000) + '');
  return {
    d: parseNum(d),
    h: parseNum(h),
    m: parseNum(m),
    s: parseNum(s),
    ms: parseNum(ms),
  };
}

function _parseNum(num) {
  let unit = 10000;
  if (num < 10000) {
    return num;
  }
  if (num < 10000 * 10000) {
    num = num / unit;
    return num.toFixed(2) + '万';
  }
  unit = unit * 10000;
  num = num / unit;
  return num.toFixed(2) + '亿';
}

function parseNum(num) {
  num = Number(num);
  num = isNaN(num) ? 0 : num;
  return num >= 0 ? _parseNum(num) : '-' + _parseNum(Math.abs(num));
}

export {
  toast,
  isPhone,
  url2obj,
  obj2url,
  throttle,
  getQuery,
  getCookie,
  setTitle,
  formatDate,
  px2rem,
  preloadImg,
  toTxt,
  stopMoveFn,
  moveFn,
  parseTimeStamp,
  noop,
  parseNum,
};
