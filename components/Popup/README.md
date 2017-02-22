# Popup 组件

Popup 弹出框

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