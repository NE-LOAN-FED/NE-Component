# Panel
一般详情展示面板
# 示例
```js
import {Panel} from 'ne-rc'
export default class PanelPage extends Component {
  render() {
    return(
      <section>
        <div className="page--header">
          <h1 className="page-title">Panel</h1>
          <p className="page--desc">信息展示面板</p>
        </div>
        <Panel className="panel">
          <Panel.Title>还款详情</Panel.Title>
          <Panel.Item label="还款银行卡">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
          <Panel.Item label="初始还款计划">
            <Panel.Content><a href="javascript:">查看</a></Panel.Content>
          </Panel.Item>
          <Panel.Button>查看更多</Panel.Button>
          <Panel.Driver />
          <Panel.Title>借款详情</Panel.Title>
          <Panel.Item label="借款编号">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
          <Panel.Item label="借款金额">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
        </Panel>
      </section>
    )
  }
}

```
# 子组件
组件名 | 描述 | 功能
--- | --- | --- 
Panel.Title | 块信息标题 | 
Panel.Item | 信息标题 |
Panel.Content | 信息内容 |
Panel.Driver |分割线 |
Panel.Button | 分割按钮 | 会自动隐藏按钮以下的内容，点击按钮会展开隐藏的内容
