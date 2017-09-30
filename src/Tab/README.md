# Tab
Tab 组件
# 示例
```js
export default class TabPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        { title: '借款中', disabled: false },
        { title: '审核中', disabled: false },
        { title: '还款中', disabled: true },
        { title: '放款中', disabled: false}
      ],
      activeIndex: 0
    }
  }

  onTabChange = (index) => {
    console.log('current tab:', index)
  }

  onControlledTabChange = (index) => {
    this.setState({
      activeIndex: index
    })
  }

  handleTabChange = () => {
    this.setState({
      activeIndex: 3
    })
  }

  render() {
    const { tabs, activeIndex } = this.state
    return (
      <section className='page_collapse'>
        <div className='page--header'>
          <h1 className='page-title'>Tab</h1>
          <p className='page--desc'>选项卡列表</p>
        </div>
        <h3>Normal</h3>
        <Tab defaultActiveIndex='key1' onChange={this.onTabChange}>
          {tabs.map((item, index) => {
            return <Tab.Item title={item.title} key={`key${index}`} disabled={item.disabled}>内容：{item.title}</Tab.Item>
          })}
        </Tab>
        <h3>Controlled</h3>
        <Tab activeIndex={activeIndex} onChange={this.onControlledTabChange}>
          {tabs.map((item, index) => {
            return <Tab.Item title={item.title} key={index} disabled={item.disabled}>内容：{item.title}</Tab.Item>
          })}
        </Tab>
        <Button onClick={this.handleTabChange}>放款中</Button>
      </section>
    )
  }
}
```
# 子组件
组件名 | 描述 | 功能
--- | --- | --- isClickMaskToClose
Tab.Item | 单个 Tab 块 | 
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
