const hasOwn = Object.prototype.hasOwnProperty;

/**
 * 子元素比较
 * @param x
 * @param y
 * @returns {boolean}
 */
function is(x, y) {
  if (typeof x === 'object' && typeof y === 'object') {
    return (
      Object.prototype.toString.call(x) === Object.prototype.toString.call(y)
    );
  } else {
    return Object.is(x, y);
  }
}

export function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!hasOwn.call(objB, key) || !is(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
