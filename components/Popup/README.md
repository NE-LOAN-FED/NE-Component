# Popup 组件

Popup 对话框，包含无按钮，确认，确认和取消多种情况。规则如下：

- 根据是否有确认和取消按钮的内容来设置是否显示。建议都没有的情况使用 Toast 请提示。
- 根据 show 属性决定是否显示，内部不维护是否显示的状态。

## 代码示例

```js
class Test extends React.Component {
  onPopupClose = () => {
    //...
  }
  render(){
    return (
      <div>
        <Popup show={this.props.popupShow}
          type="top"
          onMaskClose={this.onPopupClose}>
          <div>Popup组件</div>
        </Popup>
      </div>
    )
  }
}
```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
show | 是否显示 | Boolean | false
type | 弹出位置 | oneOf('bottom', 'top') | 'bottom'
maskClosable | 点击遮罩是否可以关闭,默认可以关闭 | Boolean | true
onMaskClose | 关闭回调 | Function | 无