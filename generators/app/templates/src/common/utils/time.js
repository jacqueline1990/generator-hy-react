export function fillZero(v) {
  return v < 10 ? '0' + v : v;
}

/**
 *
 * @param milliseconds
 * @param {*} type  1, 2, 3， 4, 5分别代表ss, mm:ss, hh:mm:ss, hh:mm:ss:ms, {day,hours,minutes,seconds}
 */
export function parseDuration(milliseconds = 0, type = 2) {
  milliseconds = isNaN(milliseconds) ? 0 : milliseconds;
  let ms = 0;
  let seconds = 0;
  if (type === 4) {
    ms = Math.floor(milliseconds / 100) % 10;
    seconds = Math.floor(milliseconds / 1000);
  } else {
    // 向上取整，防止服务器还有几百毫秒才到时间
    seconds = Math.ceil(milliseconds / 1000);
  }
  const dd = Math.floor(seconds / 3600 / 24);
  const hh = Math.floor(seconds / 3600) % 24;
  const mm = Math.floor((seconds / 60) % 60);
  const ss = Math.floor(seconds % 60);

  switch (type) {
    case 1:
      return `${fillZero(ss)}`;
    case 2:
      return `${fillZero(mm)}:${fillZero(ss)}`;
    case 3:
      return `${fillZero(hh)}:${fillZero(mm)}:${fillZero(ss)}`;
    case 4:
      return `${fillZero(hh)}:${fillZero(mm)}:${fillZero(ss)}:${ms}`;
    case 5:
      return {
        day: fillZero(dd),
        hours: fillZero(hh),
        minutes: fillZero(mm),
        seconds: fillZero(ss),
      };
    default:
      return '';
  }
}

export function parseTime(seconds = 0, type = 2) {
  if (seconds >= 3600) {
    type = 3;
  }
  return parseDuration(seconds, type);
}

export function formatTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(/{(y|m|d|h|i|s|a)+}/gi, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
}

/**
 *
 * @param {*} seconds
 * @param {*} type  1, 2, 3分别代表ss, mm:ss, hh:mm:ss
 */
function _formatDuration(seconds = 0, type = 2) {
  seconds = parseInt(seconds);
  seconds = isNaN(seconds) ? 0 : seconds;
  const secs = seconds % 60;
  const min = parseInt(seconds / 60, 10) % 60;
  const h = parseInt(seconds / 3600, 10);
  let str = '';
  switch (type) {
    case 1:
      str = `${secs}秒`;
      break;
    case 2:
      str = `${min}分钟${secs}秒`;
      break;
    case 3:
      str = `${h}小时${min}分钟`;
      break;
    default:
      break;
  }
  return str;
}

export function formatDuration(duration = 0, type) {
  if (duration >= 3600) {
    type = 3;
  } else if (duration <= 60) {
    type = 1;
  } else {
    type = 2;
  }
  return _formatDuration(duration, type);
}
