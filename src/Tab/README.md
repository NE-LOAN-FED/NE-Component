# Tab
Tab 组件

# 示例
```js
import React from 'react'
import { Tab } from 'ne-rc'
class TabDemo extends React.Component {
  render() {
    return (
      <div>
        <h3>Normal</h3>
        <Tab>
          <Tab.Item title={'借款中'} key={1}>
            内容：借款中
          </Tab.Item>
          <Tab.Item title={'审核中'} key={2}>
            内容：审核中
          </Tab.Item>
          <Tab.Item title={'还款中'} key={3} disabled>
            内容：还款中
          </Tab.Item>
          <Tab.Item title={'放款中'} key={4}>
            内容：还款中
          </Tab.Item>
        </Tab>
         <h3>Controlled</h3>
        <Tab activeIndex={1}>
          <Tab.Item title={'借款中'} key={1}>
            内容：借款中
          </Tab.Item>
          <Tab.Item title={'审核中'} key={2}>
            内容：审核中
          </Tab.Item>
          <Tab.Item title={'还款中'} key={3} disabled>
            内容：还款中
          </Tab.Item>
          <Tab.Item title={'放款中'} key={4}>
            内容：还款中
          </Tab.Item>
        </Tab>
      </div>
    )
  }
}

```

# 子组件
组件名 | 描述 | 功能
--- | --- | --- isClickMaskToClose | Tab.Item | 单个 Tab 块 | 
## API
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
title | 标题 | ReactElement | 无
disabled | 是否禁用 | Boolean | 
# API
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
defaultActiveIndex | 默认选中的 Tab 栏，有此选项则为非控制型 Tab | all | 
activeIndex | 当前选中的 Tab 栏，有此选项则为控制型 Tab | all |
onChange | Tab 变化时的回调，接收当前选中 Tab 栏的 key 为参数 | Function | 
