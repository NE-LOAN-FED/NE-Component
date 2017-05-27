# Alert 组件

Alert 弹框，只包含一个关闭 Icon，来关闭 Alert。

## 代码示例

```js
class Test extends React.Component {
  onAlertClose = () => {
    // ...
  }
  render(){
    return (
      <div>
        <Alert show={this.props.AlertShow}
          onClose={this.onAlertClose}>
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
show | Alert 框是否显示 | Boolean | false
onClose | 关闭回调 | Function | 无
transitionName | 出现和消失动画的类名 |String | verticalSlideTB
transitionTimeOut | 动画的时间 | Number | 300 单位ms
