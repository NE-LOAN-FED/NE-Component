# NoticeBar 组件

NoticeBar 公告框，可传入点击事件、关闭事件、定制首部Icon。

## 代码示例

```js
class Test extends React.Component {
  onClick = () => {
    // ...
  }
  onClose = () => {
    // ...
  }
  render(){
    return (
      <div>
        <NoticeBar
          type='link'
          icon={<Icon type='tip'/>}
        >
      </div>
    )
  }
}
```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
type | 最后一个icon的类型，值可以为closable,link | String |''
onClick | 点击回调 | Function | 无
onClose | 关闭回调 | Function | 无
icon | 首部的icon元素 |Element | 无