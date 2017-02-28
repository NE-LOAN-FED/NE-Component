# Collapse (实现不够友好，需要考虑重构)
通用行折叠列表，用来包裹其他需要折叠需求的具体组件。

## 代码示例

```js
import List from '../../../components/Collapse/List'

const questions = [
  {
    q: 'Q：客服电话是多少？',
    a: 'A：客服热线：400-0881188  服务时间：工作日09:30-12:00 ;13:30-18:00'
  }, {
    q: 'Q：申请的条件是什么？',
    a: 'A：年龄在18-60周岁的在职员工。'
  }, {
    q: 'Q：申请借款需要哪些材料？',
    a: 'A：只需要储蓄卡和身份证。'
  }
]

const collapseListData = questions.map((v, k) => {
  const obj = {
    title: v.q,
    content: v.a
  }
  return obj
})

export default class CollapsePage extends Component {

  handleCollapseListChange = (openListIdCollection) => {
    console.log(openListIdCollection)
  }

  render() {
    const CollapseSubComponent = <List/>
    return (
      <section className="page_collapse">
        <div className="page--header">
          <h1 className="page-title">Collapse</h1>
          <p className="page--desc">折叠列表</p>
        </div>
        <h3>Normal</h3>
        <Collapse listCollection={collapseListData}
                  onListChange={this.handleCollapseListChange}
                  subComponent={CollapseSubComponent}
        />
        <h3>Accordion</h3>
        <Collapse listCollection={collapseListData}
                  accordion={true}
                  onListChange={this.handleCollapseListChange}
                  subComponent={CollapseSubComponent}
        />
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
openListIdCollection | 当前所有打开状态组件的 ID 列表 | Array | []
listCollection | 包裹组件渲染所需要的数据 | Array | []
accordion | 是否打开手风琴模式 | bool | false
onListChange(openListIdCollection) | 包裹组件状态发生变化时的回调函数 | Function | 无
subComponent | 要包裹的组件（需要自行实现打开关闭功能）| React.PropTypes.element | 无

#### subComponent:React.PropTypes.element

要包裹的组件，需要自己实现折叠功能。

* [ ] TODO 做成一个高阶函数，以方便生成 Collapse 自组件。

Collapse 会通过 clone 包裹的组件来传入 `data`,`onChange`,`id` 这三个参数。

```js
renderList = () => {
    const {openListIdCollection, listCollection} = this.state
    const subComponent = this.props.subComponent
    return listCollection.map((v, k) => {
      v.isCollapse = openListIdCollection.indexOf(k) === -1
      return React.cloneElement(subComponent, {
        data: v,
        onChange: this.handleListChange,
        id: k,
        key: k,
      })
    })
  }
```

##### data:object
渲染所需要的数据,里面会包含一个 key 为 isCollapse 的参数，用来标识当前这个组件需要展示的状态。

##### id
由 Collapse 传递给的 ID，作为当前 Collapse 下面的唯一标识。

##### onChange(id, nextCollapse:bool)
组件需要在自己状态发生变化时调用这个函数来告诉 Collapse 组件当前变化的组件的 ID 和 它的下一个状态。

