---
title: vue-cli升级vite
date: 2024-02-23 10:02:01
cover: /img/common/t3.jpg
categories: 脚手架
tags:
---
# vue升级2.7,关联vite升级
> https://v2.cn.vuejs.org/v2/guide/migration-vue-2-7.html

vue-template-compiler@2.6.10 需要升级到2.7.16
vite-plugin-vue2 替换为 @vitejs/plugin-vue2
vite.createFilter is not a function

需要升级vite到3.x版本，这个错误是vite与插件不兼容,查看@vitejs/plugin-vue2源码发现，引入了vite3.0
Error in render: "ReferenceError: React is not defined"
需要安装@vitejs/plugin-vue-jsx
使用vue this, vuex等
import { getCurrentInstance } from 'vue'

// 访问vuex
export const useStore = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  console.log('vm--', vm);
  return vm.proxy.$store
}
// 访问this
export const useCtx = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy;
}

--------------------------------------------------------------------------------
## 增加vite开发环境
README.md
## 新增vite dev环境
#### 渐进升级,不影响原使用,目前保留vue-cli-service和vite共存
#### node v14.8以上(我使用了v16)
切换版本后需要删除node_module报包重新执行 npm install
### 本地
npm run dev-vite
#### 其他说明
css尽量别使用 module 这个名称,会报这么个错误,待排查

```
[vite] Internal server error: Unexpected token (1:0)
  Plugin: vite-plugin-commonjs
```
babel.config.js

```
var npmEvent = process.env.npm_lifecycle_event;
console.log('babel p', npmEvent);
module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    npmEvent === 'dev-vite' ? '@babel/preset-env' : '@vue/cli-plugin-babel/preset',
    // '@babel/preset-env', // vite版需要安装这个
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      'plugins': ['dynamic-import-node']
    }
  }
}
```

package.json 增加脚本
```
"dev-vite": "vite",
"build-vite": "vite build",
"preview-vite": "vite preview"
```

main.js
```
 if (process.env.VITE) {
   import('virtual:svg-icons-register')
 }
 ```
 // vite显示svg需要引入这个,但是在vue-cli里面引入报错,待TODO
index.html
修改main.js为 type="module"


vite.config.js
```
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
import ViteRequireContext from "@originjs/vite-plugin-require-context";
// import viteComponents, { VuetifyResolver } from "vite-plugin-components";
import envCompatible from "vite-plugin-env-compatible";
// import OptimizationPersist from "vite-plugin-optimize-persist";
// import PkgConfig from "vite-plugin-package-config";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// import { createVuePlugin } from "vite-plugin-vue2";
import vue from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx'
// import { viteExternalsPlugin } from 'vite-plugin-externals'

import path from "path";
import requireTransform from 'vite-plugin-require-transform';
import legacy from '@vitejs/plugin-legacy'

// const { createVuePlugin } = require('vite-plugin-vue2')
// const path = require('path')
const REPLACEMENT = `${path.resolve(__dirname, "./src")}/`;
const REPLACEMENT2 = `${path.resolve(__dirname, "./static")}/`;
export default defineConfig({
  server: {
    host: "0.0.0.0",
    https: false,
    port: 8080,
    proxy: {
    },
    // open: true
  },
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: REPLACEMENT,
      },
      {
        find: "src/",
        replacement: REPLACEMENT,
      },
      {
        find: /^~@\//,
        replacement: REPLACEMENT,
      },
      {
        find: '~static/',
        replacement: REPLACEMENT2
      },
      {
        find: /^~/,
        replacement: '',
      },
    ],
    extensions: [
      ".vue",
      ".js",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx",
      ".json",
      ".css",
      ".scss",
    ],
  },
  plugins: [
    legacy({
      targets: ['defaults', 'ie >= 11', 'chrome 52'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    // viteExternalsPlugin({
    //   vue: 'Vue',
    //   'vuex': 'Vuex',
    //   'vue-router': 'VueRouter',
    //   'element-ui':'ELEMENT'
    // }),
    // createVuePlugin({ jsx: true }),
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-preset-jsx
    }),
    // viteComponents({
    //   customComponentResolvers: [VuetifyResolver()],
    // }),
    requireTransform({
      fileRegex: /.js$|.vue$/
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "./src/icons/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
    commonjs(/* options */),
    ViteRequireContext(/* options */),
    envCompatible(),
    // PkgConfig(),
    // OptimizationPersist()
  ],
  build: {
    target: "es2015"
  }
});
```

