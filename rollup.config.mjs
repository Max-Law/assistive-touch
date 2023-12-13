import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js', // 入口文件
  output: [
    {
      file: './dist/index.js',
      format: 'esm', // 将软件包保存为 ES 模块文件
      footer:
        '/*!【Assistive Touch JS】v1.0.0 | MIT License | https://gitee.com/max_law/assistive-touch-js.git */\n',
    },
    {
      file: './dist/cjs.js',
      format: 'cjs', // CommonJS，适用于 Node 和 Browserify/Webpack
      footer:
        '/*!【Assistive Touch JS】v1.0.0 | MIT License | https://gitee.com/max_law/assistive-touch-js.git */\n',
    },
    {
      file: './dist/bundle.js',
      format: 'umd', // UMD 被设计用于任何地方 — 包括服务端和浏览器端
      name: 'AssistiveTouch',
      footer:
        '/*!【Assistive Touch JS】v1.0.0 | MIT License | https://gitee.com/max_law/assistive-touch-js.git */\n',
    },
  ],
  watch: {
    // 配置监听处理
    exclude: 'node_modules/**',
  },
  plugins: [cleanup(), terser()],
};
