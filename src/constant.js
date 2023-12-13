/**
 * AssistiveBox样式
 */

export const BoxStyle = {
  position: 'fixed',
  top: '10px',
  left: '10px',
};

/**
 * AssistiveButton样式
 */

export const BottonStyle = {
  width: '30px',
  height: '30px',
  border: '1px solid rgba(128,128,128,.8)',
  cursor: 'pointer',
  borderRadius: '50%',
  opacity: 0.9,
  backgroundColor: '#f4f4f5',
};

/**
 * AssistiveLayer样式
 */

export const LayerStyle = {
  width: '220px',
  height: '220px',
  backgroundColor: '#666',
  opacity: 0.8,
  background: '#000',
  borderRadius: '15px',
  padding: '10px',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gridGap: '10px',
};

/**
 * AssistiveItem样式
 */

export const ItemStyle = {
  width: '60px',
  height: '60px',
  fontSize: '12px',
  color: '#fff',
};

/**
 * AssistiveImg样式
 */

export const ImgStyle = {
  width: '40px',
  height: '40px',
  margin: '0 10px',
};

/**
 * AssistiveLabel样式
 */

export const LabelStyle = {
  width: '100%',
  textAlign: 'center',
  lineHeight: '14px',
  display: 'inline-block',
};

/**
 * 菜单排列情况数组
 */

export const Arrange = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 2, 0, 0, 0],
  [0, 1, 0, 2, 0, 3, 0, 0, 0],
  [0, 1, 0, 2, 0, 3, 0, 4, 0],
  [0, 1, 0, 2, 0, 3, 4, 0, 5],
  [0, 1, 0, 2, 0, 3, 4, 5, 6],
  [1, 0, 2, 3, 0, 4, 5, 6, 7],
  [1, 2, 3, 4, 0, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];

/**
 * 返回上级菜单logo【Base64】
 */
export const BackIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAqpJREFUeF7tm2tuwyAQhM3J2pyszcmSnoxmLZCQA2b2ER62I/VHVQeYj9ldwNQtJ/+4k+tfLgAWDvDefy/LQj+Lc+7Xos1Wbagd4L0nwT/JgG/OuWcrAdp+VAAy4mk895lcIAIQLE+zvtp+8zk2gCD+sWO94wIoWP4cDvDe06znLH9sAJV4z0UCVYA7mp17V4zdJAhaHtVaey5Ce7aEUgTQWHwOzgrk0yU1C2AA8c3yyhuAAcWnMMxLbA6ArwVr57+bQsgBQMtdZw42S+5SDjgNhJGrAOowVUiMtA5ABWdLprRcVneDwObnrWS9lsyc84C4vE7PFCQwROcQVQBxJIzyKLZk6IO6lMJgQ4AB0KhACGIACex4xMYFQcvoG8c+LAABAg2udBhieiIEAt/qZbmADQAICbUDUkUSCO6VEVEXwA/mGmx1JihJxGhVUAEouIFlQXSmuE5AXWACABWhfY5xKkVdQRMxFYCQhNHNGlQRZgSwfRFTNBYSBtMBYLqgGgazAkB3q9WSPCsAWoztvZyJYVHNAxcAbWnq8X3GwuiYDuAkwlolmDIETg/g9CFwAXi/llPKxYddB6D7geMBYNgf2hFOVwU45wK1EkiEpgLAEY/eVrsA9FjKSvpkzj5drIAmF3pIMmDL73DFo/afIgcIxMOzPzQAwe20aLpq7U/dOWQISGY9iGKJH8oBihmHT39yecnEAWHw1D5ykzQdx1f4hfu9nJbqAag5AINZsyoWbOvHjlUOYL6psRK7bUcsXpUDFInKEoTI9iZVwL8IWCphtrVeyLa4UywKAeaWlKmt+rjK8tvWRQCokQ7xbzbrViEAv6Sszun+Ax8RblUFPgWBRP/RdTuLON/jKw6BtFFlRYh3ClfBa2lq+H+HJgCUFu/69QtAV/wDdP4Pk3lCUDkn+qIAAAAASUVORK5CYII=';
