# Flow 组件

Flow

流程组件，展示一个操作流程中当前进展到的位置
- Flow的方向由direction决定，可以为vertical(垂直)或者horizontal（水平）
- Flow中项的数目由子组件Flow.Item决定
- 每个Flow.Item组件中的标题通过title设置
- 当前进行到的步骤由Flow组件的current控制

## 代码示例

```js
class FlowPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  handleNext()  {
    let { current } = this.state
    this.setState({
      current: current === 3 ? 0 : ++current
    })
  }

  render() {
    const { current } = this.state
    return (
      <section className='page_collapse'>
        <div className='page--header'>
          <h1 className='page-title'>Flow</h1>
          <p className='page--desc'>流程进度</p>
        </div>
        <h3>Normal</h3>
        <Flow current={current}>
          <Flow.Item title='Finish' />
          <Flow.Item title='Progress' />
          <Flow.Item title='Wait' />
          <Flow.Item title='Wait' />
        </Flow>
        <h3>Vertical</h3>
        <Flow current={current} direction='vertical' style={{ 'height': '10rem' }}>
          <Flow.Item title='Finish' />
          <Flow.Item title='Progress' />
          <Flow.Item title='Wait' />
          <Flow.Item title='Wait' />
        </Flow>
        <Button onClick={this.handleNext}>Next</Button>
      </section>
    )
  }
}

```

## API
通过设置Flow的属性来产生不同的流程样式

Flow
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
current | 当前流程 | Number | 0
direction | 延展方向 | String | horizontal


Flow.Item
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
title | 流程描述 | String|ReactNode | null
number | 流程序号 | Number | null
status | 当前状态 | oneOf('finish', 'wait', 'process') | wait

