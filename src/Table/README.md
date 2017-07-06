# Button
表格组件，展示型组件，不包含特定功能。

## 代码示例

```js
export default class ButtonPage extends Component {
  render() {
    const columns = [{
      title: '姓名',
      name: 'name'
    }, {
      title: '年龄',
      name: 'age'
    }]
    const data = [{
      name: '小贷',
      age: '2'
    }, {
      name: '金融',
      age: '5'
    }]
    return(
      <section>
        <div className="page--header">
          <h1 className="page-title">Table</h1>
          <p className="page--desc">表格</p>
        </div>
        <p>有边框</p>
        <Table columns={columns} data={data} cellBorder={true}></Table>
        <p>无边框</p>
        <Table columns={columns} data={data} cellBorder={false}></Table>
        <p>自定义</p>
        <Table>
          <thead>
            <tr style={{'backgroundColor': 'rgba(247,247,247,1)'}}>
              <th>姓名</th>
              <th>年龄</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>网易</td>
              <td>20</td>
            </tr>
            <tr>
              <th>金融</th>
              <th>5</th>
            </tr>
          </tbody>
        </Table>
      </section>
    )
  }
}

```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
columns | 对表格头的描述以及表格body数据的字段索引 | Array | []
data | 数据 | Array | []
