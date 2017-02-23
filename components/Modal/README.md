# Modal 组件

Modal 弹框，只包含一个关闭 Icon，来关闭 Modal。

## 代码示例

```js
class Test extends React.Component {
  onModalClose = () => {
    // ...
  }
  render(){
    return (
      <div>
        <Modal show={this.props.ModalShow}
          onClose={this.onModalClose}>
          <div>Modal组件</div>
        </Modal>
      </div>
    )
  }
}
```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
show | Modal 框是否显示 | Boolean | false
onClose | 关闭回调 | Function | 无