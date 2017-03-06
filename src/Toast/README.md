# Toast 组件

Toast 轻提示，建议包含文字和 Icon 信息，规则如下：

- 建议文字内容不超过 13 个字
- 默认自动隐藏，手动隐藏建议使用 Modal

## 代码示例

```js
class Test extends React.Component {
  onClose = () => {
    // ...
  }
  render(){
    return (
      <div>
        <Toast show={this.props.ToastShow}
          content="出错啦！"
          onClose={this.onClose} />
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
content | 显示文字内容 | String | 无
icon | 显示 icon 的 type | String | 无
timeout | 自动隐藏时间 | Number | 2000