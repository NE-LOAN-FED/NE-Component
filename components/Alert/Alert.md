# Alert 组件
Alert 对话框，包含无按钮，确认，确认和取消多种情况。规则如下：
- 根据是否有确认和取消按钮的内容来设置是否显示。建议都没有的情况使用 Toast 请提示。
- 根据 show 属性决定是否显示，内部不维护是否显示的状态。

## 代码示例
```
class Test extends React.Component {
  onAlertConfirm = () => {...}
  render(){
    return (
      <div>
        <Alert show={this.props.alertShow} confirmContent="确认" onConfirm={this.onAlertConfirm}>
          <div>Alert组件</div>
        </Alert>
      </div>
    )
  }
}
```

## API 
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
show | alert对话框是否显示 | Boolean | false
headerContent | 头部内容 | Element | 无
confirmContent | 确认按钮内容 | String | 无
cancelContent | 取消按钮内容 | String | 无
onConfirm | 确认按钮回调 | Function | 无
onCancel | 取消按钮回调 | Function | 无
    