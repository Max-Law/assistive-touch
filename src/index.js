// @ts-nocheck
import {
  BoxStyle,
  BottonStyle,
  LayerStyle,
  ItemStyle,
  ImgStyle,
  LabelStyle,
  Arrange,
  BackIcon,
} from './constant';

import {
  _bindEvent,
  _creEle,
  _setCSS,
  _defineReactiveByProxy,
  _handleLimit,
} from './utils';

export default class AssistiveTouch {
  constructor(option = {}) {
    // 运行环境
    this.isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);

    // 默认值
    this.default = {
      boxStyle: Object.assign(BoxStyle, {
        top: option.top,
        left: option.left,
      }),
      btnStyle: Object.assign(BottonStyle, option.btnStyle),
      layerStyle: Object.assign(LayerStyle, option.layerStyle),
      menus: option.menus || [],
    };

    // 按钮状态数据劫持
    this.btnState = _defineReactiveByProxy(
      {
        active: null,
        hadMove: false,
        isDragging: false,
        initialX: 0,
        initialY: 0,
        limitX: 0,
        limitY: 0,
      },
      (key, value) => {
        if (key == 'active') {
          this.handleBtnActive(value);
        }
      },
    );

    // dom实例
    this.BOX = null;
    this.BUTTON = null;
    this.DISPLAY_LAYER = null;

    // 初始化
    this.init();
  }

  init() {
    if (!Array.isArray(this.default.menus)) {
      console.error('menus 必须为数组');
      return;
    }

    // 渲染 dom
    this.render();
    // 按钮默认状态
    this.btnState.active = false;
    // 绑定事件
    this.bindAllEvent();
  }

  /**
   * 创建 dom 对象
   */
  render() {
    // 创建元素暂存空间
    const frg = document.createDocumentFragment();

    // 创建一个盒子
    this.BOX = _setCSS(
      _creEle('div', 'AssistiveTouchBox'),
      this.default.boxStyle,
    );

    // 创建按钮
    this.BUTTON = _setCSS(
      _creEle('div', 'AssistiveTouch'),
      this.default.btnStyle,
    );

    // 创建展开层
    this.DISPLAY_LAYER = _setCSS(
      _creEle('div', 'DisplayLayer'),
      this.default.layerStyle,
    );

    this.createMenuDom(this.handleMenus(this.default.menus));
    this.BOX.appendChild(this.BUTTON);
    this.BOX.appendChild(this.DISPLAY_LAYER);

    // 加入暂存空间
    frg.appendChild(this.BOX);

    // 渲染到 body 下
    document.body.appendChild(frg);
  }

  // 菜单 dom 生成
  createMenuDom(menuList) {
    const frg = document.createDocumentFragment();
    this.DISPLAY_LAYER.innerHTML = '';

    // 添加菜单dom
    menuList.forEach((element) => {
      // 生成一个菜单项
      const LayerItem = _setCSS(_creEle('div', 'DisplayLayer-item'), ItemStyle);
      // 生成一个图片
      const Img = _setCSS(_creEle('img', 'DisplayLayer-item-logo'), ImgStyle);
      // 生成一个标题
      const Label = _setCSS(
        _creEle('span', 'DisplayLayer-item-label'),
        LabelStyle,
      );

      const { hide, icon, title, children, callback } = element;

      // 属性赋值
      if (hide) {
        LayerItem.style.opacity = '0';
      } else {
        LayerItem.style.cursor = 'pointer';
      }

      Img.src = icon;
      Img.alt = title;
      Label.innerText = title;

      LayerItem.appendChild(Img);
      LayerItem.appendChild(Label);

      // callback 绑定
      _bindEvent(LayerItem, () => {
        if (children && Array.isArray(children)) {
          const childrenList = this.handleMenus(children);

          childrenList.splice(4, 1, {
            title: '返回上级',
            icon: BackIcon,
            callback: () => {
              this.createMenuDom(menuList);
            },
          });

          this.createMenuDom(childrenList);
        } else if (callback) {
          callback();
        }
      });

      frg.appendChild(LayerItem);
    });

    this.DISPLAY_LAYER.appendChild(frg);
  }

  /**
   * 根据menus数量补全九个菜单
   */
  handleMenus(menuList) {
    const count = menuList.length;

    if (count == 0 || !Arrange[count - 1]) {
      console.error('menus 数量不正确!');
      return;
    }

    let menus = [];
    Arrange[count - 1].forEach((item) => {
      if (item == 0) {
        menus.push({
          title: '占位菜单',
          icon: '',
          hide: true,
        });
      } else {
        menus.push(menuList[item - 1]);
      }
    });

    return menus;
  }

  /**
   * 按钮状态处理
   * @param {Boolean} value - avtive 状态
   */
  handleBtnActive(value) {
    if (value) {
      this.BUTTON.hidden = true;
      this.DISPLAY_LAYER.style.display = 'grid';
      // 设置边界值
      this.btnState.limitX =
        window.innerWidth - this.DISPLAY_LAYER.offsetWidth - 1;
      this.btnState.limitY =
        window.innerHeight - this.DISPLAY_LAYER.offsetHeight - 1;
    } else {
      this.BUTTON.hidden = false;
      this.DISPLAY_LAYER.style.display = 'none';
      // 设置边界值
      this.btnState.limitX = window.innerWidth - this.BUTTON.offsetWidth - 1;
      this.btnState.limitY = window.innerHeight - this.BUTTON.offsetHeight - 1;
    }

    // 检查边界状态
    this.checkLimit(this.BOX.offsetLeft, this.BOX.offsetTop);
  }

  /**
   * 根据边界状态重新渲染
   */
  checkLimit(clientX = 0, clientY = 0) {
    const _w = _handleLimit(clientX, this.btnState.limitX);
    const _h = _handleLimit(clientY, this.btnState.limitY);
    // 重新定位
    this.BOX.style.left = _w + 'px';
    this.BOX.style.top = _h + 'px';
  }

  bindAllEvent() {
    // 绑定盒子移动事件
    this.bindDraggingEvent();

    // 按钮绑定点击事件
    _bindEvent(this.BUTTON, () => {
      if (!this.btnState.hadMove) {
        this.btnState.active = true;
      }
    });

    // 关闭展示层事件绑定
    _bindEvent(document, (e) => {
      const { className } = e;
      if (
        this.btnState.active &&
        className !== 'AssistiveTouch' &&
        className !== 'DisplayLayer' &&
        className !== 'DisplayLayer-item' &&
        className !== 'DisplayLayer-item-logo' &&
        className !== 'DisplayLayer-item-label'
      ) {
        this.btnState.active = false;
      }
    });
  }

  /**
   * 给元素绑定移动事件
   */
  bindDraggingEvent() {
    let moveEvent;
    // 根据环境选择绑定函数
    if (this.isMobile) {
      moveEvent = {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
      };
    } else {
      moveEvent = {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup',
      };
    }

    // 开始移动事件注册
    this.BOX.addEventListener(
      moveEvent.start,
      (event) => {
        this.btnState.hadMove = false;
        this.btnState.isDragging = true;
        // 记录初始坐标
        this.btnState.initialX = this.isMobile
          ? event.touches[0].radiusX + event.target.offsetLeft
          : event.offsetX + event.target.offsetLeft;
        this.btnState.initialY = this.isMobile
          ? event.touches[0].radiusY + event.target.offsetTop
          : event.offsetY + event.target.offsetTop;

        // 移动时事件注册
        document.addEventListener(moveEvent.move, handleMove, {
          passive: false,
        });

        // 结束移动事件注册
        document.addEventListener(
          moveEvent.end,
          () => {
            this.btnState.isDragging = false;
            document.removeEventListener(moveEvent.move, handleMove);
          },
          { passive: false, once: true },
        );
      },
      { passive: false },
    );

    // 绑定元素的移动事件
    const handleMove = (event) => {
      let clientX = this.isMobile ? event.touches[0].clientX : event.clientX;
      let clientY = this.isMobile ? event.touches[0].clientY : event.clientY;
      this.btnState.hadMove = true;
      if (this.btnState.isDragging === true) {
        this.checkLimit(
          clientX - this.btnState.initialX,
          clientY - this.btnState.initialY,
        );
      }
    };
  }
}
