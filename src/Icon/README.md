# Icon
语义化的矢量图形

## 图标的命名规范
为每个矢量图标赋予语义化的命名

## 代码示例

```js
class IconTest extends React.Component {
  render(){
    return (
      <div>
        <Icon type='tip' />
        <Icon type='del' />
        <Icon type='arrow' />
        <Icon type='tick' />
        <Icon type='loading' />
        <Icon type='wait' />
        <Icon type='close' />
        <Icon type='warning' />
        <Icon type='success' />
      </div>
    )
  }
}
```

## API
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
className | 样式别名 | String | NEUI
type | 语义化类型名 | Stirng | tip