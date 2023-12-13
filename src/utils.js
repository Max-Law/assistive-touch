/**
 * 创建DOM结构
 * @param {String} nodeName
 * @param {String} className
 * @param {String} text
 */
export const _creEle = (nodeName, className = '', text = '') => {
  const ele = document.createElement(nodeName);
  ele.className = className;
  ele.innerHTML = text;
  return ele;
};

/**
 * 添加样式
 * @param {HTMLElement} ele
 * @param {Object} styles
 */
export const _setCSS = (ele, styles) => {
  for (let key in styles) {
    ele.style[key] = styles[key];
  }
  return ele;
};

/**
 * 使用proxy实现一个简单的响应式
 * @param {Object} data 监听的对象
 * @param {function} onChange 回调函数
 */
export const _defineReactiveByProxy = (data, onChange) => {
  return new Proxy(data, {
    // 拦截属性的读取
    get(target, key, receiver) {
      return target[key];
    },
    // 拦截属性的设置
    set(target, key, value, receiver) {
      target[key] = value;
      // 触发回调函数，通知属性值发生变化
      onChange && onChange(key, value);
      return true;
    },
  });
};

/**
 * 给元素绑定点击事件，并在点击时调用回调函数
 * @param {HTMLElement} ele - 要绑定事件的元素
 * @param {function} callback - 回调函数，点击事件被触发时调用
 * @param {Boolean} once - 是否只绑定一次
 */
export const _bindEvent = (ele, callback, type = 'click', once = false) => {
  ele.addEventListener(
    type,
    (e) => {
      const target = e.target; // 被点击的元素
      callback(target); // 调用回调函数
    },
    {
      passive: false,
      once,
    },
  );
};

/**
 * 边界值处理函数
 * @param {Number} value - 要处理的值
 * @param {Number} limit - 限制值
 */
export const _handleLimit = (value = 0, limit = 0) => {
  return Math.min(Math.max(0, value), limit);
};
