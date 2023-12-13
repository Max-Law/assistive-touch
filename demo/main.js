// @ts-nocheck

window.onload = function () {
  // 菜单列表
  const menus = [
    {
      title: '返回',
      icon: './demo/assets/return.png',
      callback: function () {
        console.log('返回');
      },
    },
    {
      title: '刷新',
      icon: './demo/assets/refresh.png',
      callback: function () {
        console.log('刷新');
      },
    },
    {
      title: '导出数据',
      icon: './demo/assets/export.png',
      callback: function () {
        console.log('导出数据');
      },
    },
    {
      title: '数据处理',
      icon: './demo/assets/modify.png',
      children: [
        {
          title: '修改',
          icon: './demo/assets/modify.png',
          callback: function () {
            console.log('修改');
          },
        },
        {
          title: '删除',
          icon: './demo/assets/delete.png',
          callback: function () {
            console.log('删除');
          },
        },
      ],
    },
  ];

  new AssistiveTouch({
    top: '80px',
    left: '50px',
    btnStyle: {
      // 按钮样式
      width: '35px',
      height: '35px',
    },
    menus,
  });
};
