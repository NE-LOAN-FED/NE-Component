# Collapse

通用行折叠列表，用来包裹其他需要折叠需求的具体组件。

## 代码示例

```js
import React, { Component } from "react";
import { Collapse } from "../../../src";
// import './Collapse.scss'

const questions = [
  {
    q: "Q：客服电话是多少？",
    a: "A：客服热线：400-88888888  服务时间：工作日09:30-12:00 ;13:30-18:00"
  },
  {
    q: "Q：申请的条件是什么？",
    a: "A：年龄在18-60周岁的在职员工。"
  },
  {
    q: "Q：申请借款需要哪些材料？",
    a: "A：只需要储蓄卡和身份证。"
  }
];

const collapseListData = questions.map((v, k) => {
  return {
    title: v.q,
    content: v.a
  };
});

export default class CollapsePage extends Component {
  handleCollapseListChange = (id, collapse, activeIdList) => {
    console.log(id, collapse, activeIdList);
  };

  render() {
    return (
      <section className="page_collapse">
        <div className="page--header">
          <h1 className="page-title">Collapse</h1>
          <p className="page--desc">折叠列表</p>
        </div>
        <h3>Normal</h3>
        <Collapse onListChange={this.handleCollapseListChange}>
          {collapseListData.map((data, index) => {
            return (
              <Collapse.Item title={data.title} key={index}>
                {data.content}
              </Collapse.Item>
            );
          })}
        </Collapse>
        <h3>Accordion</h3>
        <Collapse accordion onListChange={this.handleCollapseListChange}>
          {collapseListData.map((data, index) => {
            return (
              <Collapse.Item title={data.title} key={index}>
                {data.content}
              </Collapse.Item>
            );
          })}
        </Collapse>
      </section>
    );
  }
}
```

## API

| 属性名                                     | 描述                                     | 类型                    | 默认值 |
| ------------------------------------------ | ---------------------------------------- | ----------------------- | ------ |
| prefixCls                                  | 样式前缀                                 | String                  | NEUI   |
| activeIdList                               | 当前所有打开状态组件的 ID 列表           | Array                   | []     |
| collapseListData                             | 包裹组件渲染所需要的数据                 | Array                   | []     |
| accordion                                  | 是否打开手风琴模式                       | bool                    | false  |
| onListChange(id, isCollapse, activeIdList) | 包裹组件状态发生变化时的回调函数         | Function                | 无     |
| subComponent                               | 要包裹的组件（需要自行实现打开关闭功能） | React.PropTypes.element | 无     |

### CollapseHOC

高阶组件，用来创建 subComponent. 创建的组件会接收当前的 isActive 作为 props.

### subComponent:React.PropTypes.element

要包裹的组件，需要自己实现折叠功能。可以通过高级组件 CollapseHOC 来生成，当前的 collapse 状态会作为 props 传入。
