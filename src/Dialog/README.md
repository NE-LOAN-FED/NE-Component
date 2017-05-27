# Dialog 组件

Dialog 对话框，包含无按钮，确认，确认和取消多种情况。规则如下：

- 根据是否有确认和取消按钮的内容来设置是否显示。建议都没有的情况使用 Toast 请提示。
- 根据 show 属性决定是否显示，内部不维护是否显示的状态。

## 代码示例

```js
class Test extends React.Component {
  onDialogConfirm = () => {...}
  render(){
    return (
      <div>
        <Dialog show={this.props.DialogShow} confirmContent="确认" onConfirm={this.onDialogConfirm}>
          <div>Dialog组件</div>
        </Dialog>
      </div>
    )
  }
}
```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
show | Dialog对话框是否显示 | Boolean | false
headerContent | 头部内容 | Element | 无
confirmContent | 确认按钮内容 | String | 无
cancelContent | 取消按钮内容 | String | 无
onConfirm | 确认按钮回调 | Function | 无
onCancel | 取消按钮回调 | Function | 无
transitionName | 出现和消失动画的类名 |String | verticalSlideTB
transitionTimeOut | 动画的时间 | Number | 300 单位ms
