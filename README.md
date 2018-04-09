[![npm](https://img.shields.io/npm/v/npm.svg)](https://github.com/NE-LOAN-FED/NE-Component)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Travis](https://img.shields.io/travis/NE-LOAN-FED/NE-Component.svg)]()
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://github.com/NE-LOAN-FED/NE-Component)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/NE-LOAN-FED/NE-Component/master/LICENSE)

# 文档

[https://ne-loan-fed.github.io/NE-Component/#/](https://ne-loan-fed.github.io/NE-Component/#/)

# 功能

* 开箱即用的移动端基础组件
* 基于 npm + webpack 开发
* 支持多种引入方式：ES Module 、umd(不建议使用)

# 环境

* React > 16.0.0
* ReactDOM > 16.0.0

# 支持环境

* IE9+ 和现代浏览器

# 安装

```bash
npm install ne-rc
```

# 示例

```js
// 入口文件
import React from "react";
import { render } from "react-dom";
// 引入组件库样式
import "ne-rc/lib/ne.css";
import "./style/app.scss";
// 引入需要的组件
import { Button } from "ne-rc";

render(
  <div>
    <Button />
  </div>,
  mountNode
);
```

# 本地开发

1. clone 项目

```bash
git clone git@github.com:NE-LOAN-FED/NE-Component.git
```

2. 开发:

```bash
// 服务默认会跑在 4000 端口上
npm run demo
```

3. 打包

```bash
npm run build
```
