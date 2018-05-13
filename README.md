# 美自美业

> mzmy system

## 目录结构

```
├─ src // 开发包
├   ├─ components // 组件文件库
├   ├   ....
├   ├─ config // 初始化配置
├   ├   ....
├   ├─ filter // 过滤器
├   ├   ....
├   ├─ store  // vuex store
├   ├─ router // 路由
├   ├─ assets // 打包输出目录
├   ├─ theme // 主题样式
├   ├─ util // 工具扩展
├   ├─ App.vue // 根组件
├   └─ main.js // 入口文件
├─ static // 静态文件目录
├   ├─ mac // mac运行包目录
├   ├─ win-ia32-unpacked // windows 运行包目录
├   ├─ portal-setup-1.1.9.dmg // mac dmg
├   ├─ portal-setup-1.1.9.exe // windows exe
├   └─ portal-setup-1.1.9.zip // 打包后的压缩文件
├─ build // 构建代码目录
├─ config // 配置目录
├─ test // 测试代码目录
├─ .babelrc // es6 es7配置
├─ .editorconfig // editor配置
├─ index.html // 模版
├─ package.json // 包配置
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
