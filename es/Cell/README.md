# Cell
列表组件，展示型组件，不包含特定功能。
包含了一下几个组件：
- Cells
- Cell
- CellHeader
- CellBody
- CellFooter
## 代码示例

```js
export default class CellsPage extends Component {
  render() {
    return (
      <section>
        <div className="page--header">
          <h1 className="page-title">Cells</h1>
          <p className="page--desc">列表</p>
        </div>
        <CellTip>完整的 Cell</CellTip>
        <Cells>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellBody>Body</CellBody>
            <CellFooter>Footer</CellFooter>
          </Cell>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellBody>Body</CellBody>
            <CellFooter>Footer</CellFooter>
          </Cell>
        </Cells>
        <CellTip>不完整的</CellTip>
        <Cells>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellBody>Body</CellBody>
          </Cell>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellFooter>Footer</CellFooter>
          </Cell>
        </Cells>
        <CellTip>带链接的</CellTip>
        <Cells>
          <Cell href="/#/">
            <CellHeader>Go Home</CellHeader>
            <CellFooter><Icon type={'arrow'}/></CellFooter>
          </Cell>
        </Cells>
      </section>
    )
  }
}

```

## API

### Cell
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
tip | 普通下划线提示 | bool | false
warning | 警告提示 | bool | false
